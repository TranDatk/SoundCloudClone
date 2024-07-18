import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Public } from 'src/custom-decorators/is-public-decorator';
import { ResponseMessage } from 'src/custom-decorators/response-message-decorator';
import { WebhookResponseDto } from './dto/webhook-response.dto';
import { User } from 'src/custom-decorators/parsing-user-decorator';
import { IUser } from 'src/users/users.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @ResponseMessage('Create a payment')
  @Post('/create')
  createOrder(@Body() body, @User() user: IUser) {
    return this.paymentService.createPaymentLink(body, user);
  }

  @ResponseMessage('Get a order')
  @Get('/:orderId')
  getOrder(@Param('orderId') orderId: string) {
    return this.paymentService.getPaymentLinkInformation(orderId);
  }

  @Put('/:orderId')
  @ResponseMessage('Cancel a order')
  cancelOrder(
    @Param('orderId') orderId: string,
    @Body('cancellationReason') cancellationReason: string,
    @User() user: IUser
  ) {
    return this.paymentService.cancelPaymentLink(orderId, cancellationReason, user);
  }

  @Post('/confirm-webhook')
  @ResponseMessage('Confirm webhook')
  confirmWebhook(@Body('webhookUrl') webhookUrl: string) {
    return this.paymentService.confirmWebhook(webhookUrl);
  }

  @Public()
  @Post('/receive-webhook')
  @ResponseMessage('Receive webhook')
  receiveWebhook(@Body() data: WebhookResponseDto) {
    return this.paymentService.receiveWebhook(data);
  }

  @ResponseMessage('Check is prenium')
  @Get('/check/:orderId')
  checkPayment(@Param('orderId') orderId: number, @User() user: IUser) {
    return this.paymentService.checkPayment(user, orderId);
  }
}
