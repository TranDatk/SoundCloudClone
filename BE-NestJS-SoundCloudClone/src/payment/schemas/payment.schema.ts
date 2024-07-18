import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { STATUS } from 'src/databases/init-data';
import { User } from 'src/users/schemas/user.schema';

export type PaymentDocument = HydratedDocument<Payment>;

@Schema({ timestamps: true })
export class Payment {
    _id: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true })
    orderCode: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    user: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true })
    status: STATUS;

    @Prop()
    createdAt: Date;

    @Prop()
    isDeleted: boolean;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);