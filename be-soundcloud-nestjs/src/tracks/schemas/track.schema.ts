import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Genre } from "src/genres/schemas/genre.schemas";
import { User } from "src/users/schemas/user.schema";

export type TrackDocument = HydratedDocument<Track>;

@Schema({ timestamps: true })
export class Track {
    _id: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true, unique: true, dropDups: true })
    title: string;

    @Prop()
    description: string;

    @Prop()
    photo: string;

    @Prop()
    like: number;

    @Prop()
    view: number;

    @Prop()
    url: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    user: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Genre.name })
    genre: mongoose.Schema.Types.ObjectId;

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

export const TrackSchema = SchemaFactory.createForClass(Track);