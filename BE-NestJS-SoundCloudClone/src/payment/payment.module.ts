import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { ConfigModule } from '@nestjs/config';
import { PayOSProvider } from './payos.provider';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from './schemas/payment.schema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{
      name: Payment.name, schema: PaymentSchema,
    }]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService, PayOSProvider,],
  exports: [PaymentService]
})
export class PaymentModule { }
