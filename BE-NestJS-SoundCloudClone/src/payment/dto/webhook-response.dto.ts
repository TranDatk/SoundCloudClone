import { IsString, IsNumber, IsOptional, IsObject } from 'class-validator';

export class WebhookDataDto {
    @IsNumber()
    orderCode: number;

    @IsNumber()
    amount: number;

    @IsString()
    description: string;

    @IsString()
    accountNumber: string;

    @IsString()
    reference: string;

    @IsString()
    transactionDateTime: string;

    @IsString()
    paymentLinkId: string;

    @IsString()
    code: string;

    @IsString()
    desc: string;

    @IsOptional()
    @IsString()
    counterAccountBankId?: string;

    @IsOptional()
    @IsString()
    counterAccountBankName?: string;

    @IsOptional()
    @IsString()
    counterAccountName?: string;

    @IsOptional()
    @IsString()
    counterAccountNumber?: string;

    @IsOptional()
    @IsString()
    virtualAccountName?: string;

    @IsOptional()
    @IsString()
    virtualAccountNumber?: string;

    @IsString()
    currency: string;
}


export class WebhookResponseDto {
    @IsString()
    code: string;

    @IsString()
    desc: string;

    @IsString()
    signature: string;

    @IsObject()
    data: WebhookDataDto;
}
