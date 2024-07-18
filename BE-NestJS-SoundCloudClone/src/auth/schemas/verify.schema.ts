import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type VerifyDocument = HydratedDocument<Verify>;

@Schema({ timestamps: true })
export class Verify {
    _id: mongoose.Schema.Types.ObjectId;

    @Prop()
    code: string;

    @Prop()
    email: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    user: mongoose.Schema.Types.ObjectId;

    @Prop()
    createdAt: Date;
}

export const VerifySchema = SchemaFactory.createForClass(Verify);