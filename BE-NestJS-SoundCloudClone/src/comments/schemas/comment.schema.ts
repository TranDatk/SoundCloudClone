import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Permission } from "src/permissions/schemas/permission.schema";
import { Track } from 'src/tracks/schemas/track.schema';
import { User } from 'src/users/schemas/user.schema';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ timestamps: true })
export class Comment {
    _id: mongoose.Schema.Types.ObjectId;

    @Prop()
    commentText: string;

    @Prop()
    moment: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Track.name })
    track: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    user: mongoose.Schema.Types.ObjectId;

    @Prop()
    createdAt: Date;

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

export const CommentSchema = SchemaFactory.createForClass(Comment);