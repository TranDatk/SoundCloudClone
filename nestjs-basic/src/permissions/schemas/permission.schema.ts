import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type PermissionDocument = HydratedDocument<Permission>;

@Schema({ timestamps: true })
export class Permission {
    _id: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true, unique: true, dropDups: true })
    name: string;

    @Prop()
    description: string;

    @Prop()
    apiPath: string;

    @Prop()
    method: string;

    @Prop()
    isActive: boolean;

    @Prop()
    module: string;

    @Prop()
    createdAt: Date;

    @Prop({ type: Object })
    createdBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
        name: string;
    };

    @Prop({ type: Object })
    updatedBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
        name: string;
    };

    @Prop()
    updatedAt: Date;

    @Prop()
    isDeleted: boolean;

    @Prop()
    deletedAt: Date;

    @Prop({ type: Object })
    deletedBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
        name: string;
    };
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);