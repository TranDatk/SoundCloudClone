import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import PayOS from '@payos/node';
import crypto from 'crypto';
import { WebhookResponseDto } from './dto/webhook-response.dto';
import { IUser } from 'src/users/users.interface';
import { generateOrderCode, isValidData } from './utils/is.validate';
import { InjectModel } from '@nestjs/mongoose';
import { Payment, PaymentDocument } from './schemas/payment.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { STATUS } from 'src/databases/init-data';

@Injectable()
export class PaymentService {
    constructor(
        @Inject('PAYOS') private readonly payOS: PayOS,
        @InjectModel(Payment.name) private paymentModel: SoftDeleteModel<PaymentDocument>,
        private configService: ConfigService
    ) { }

    async createPaymentLink(body, user: IUser) {
        const orderCode = generateOrderCode();

        const orderBody = {
            orderCode: orderCode,
            amount: body?.amount,
            description: body?.description,
            cancelUrl: body?.cancelUrl,
            returnUrl: body?.returnUrl,
        };

        try {
            const paymentLinkRes = await this.payOS.createPaymentLink(orderBody);
            if (paymentLinkRes?.orderCode) {
                await this.paymentModel.create({
                    orderCode: paymentLinkRes?.orderCode,
                    user: user?._id,
                    status: STATUS.PENDING
                });
            }
            return {
                bin: paymentLinkRes?.bin,
                checkoutUrl: paymentLinkRes?.checkoutUrl,
                accountNumber: paymentLinkRes?.accountNumber,
                accountName: paymentLinkRes?.accountName,
                amount: paymentLinkRes?.amount,
                description: paymentLinkRes?.description,
                orderCode: paymentLinkRes?.orderCode,
                qrCode: paymentLinkRes?.qrCode,
            };
        } catch (error) {
            throw new BadRequestException(error?.message)
        }
    }

    async getPaymentLinkInformation(orderId) {
        try {
            const order = await this.payOS.getPaymentLinkInformation(orderId);
            if (!order) {
                throw new NotFoundException('Not found');
            }
            return order;
        } catch (error) {
            throw new BadRequestException(error?.message);
        }
    }

    async cancelPaymentLink(orderId, cancellationReason, user: IUser) {
        try {
            const payment = await this.paymentModel.findOneAndUpdate({
                orderCode: orderId,
                status: STATUS.PENDING,
                user: user?._id
            }, { status: STATUS.CANCELED });
            if (!payment) {
                throw new NotFoundException('Not found');
            }
            await this.paymentModel.softDelete({ _id: payment?._id });

            const order = await this.payOS.cancelPaymentLink(orderId, cancellationReason);
            if (!order) {
                throw new NotFoundException('Not found');
            }
            return order;
        } catch (error) {
            throw new BadRequestException(error?.message);
        }
    }

    async confirmWebhook(webhookUrl) {
        try {
            await this.payOS.confirmWebhook(webhookUrl);
            return null;
        } catch (error) {
            throw new BadRequestException(error?.message);
        }
    }

    async receiveWebhook(data: WebhookResponseDto) {
        try {
            if (isValidData(data?.data, data?.signature, this.configService.get<string>('PAYOS_CHECKSUM_KEY'))) {
                const payment = await this.paymentModel.findOneAndUpdate({
                    orderCode: data?.data?.orderCode,
                    status: STATUS.PENDING
                }, {
                    status: STATUS.PAID
                });
                await this.paymentModel.softDelete({ _id: payment?._id })
            }
            else {
                throw new BadRequestException('The data does not match the signature')
            }
        } catch (error) {
            throw new BadRequestException(error?.message);
        }
    }

    async checkPayment(user: IUser, orderId?: number) {
        if (orderId !== -1) {
            const payment = await this.paymentModel.findOne({
                orderCode: orderId,
                user: user?._id
            });
            return payment;
        } else {
            const payment = await this.paymentModel.findOne({
                status: STATUS.PAID,
                user: user?._id
            });
            return payment;
        }
    }
}

