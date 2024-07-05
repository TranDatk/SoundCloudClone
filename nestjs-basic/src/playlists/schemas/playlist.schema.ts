import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Track } from 'src/tracks/schemas/track.schema';
import { User } from 'src/users/schemas/user.schema';

export type PlaylistDocument = HydratedDocument<Playlist>;

@Schema({ timestamps: true })
export class Playlist {
    _id: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true })
    title: string;

    @Prop()
    status: boolean;

    @Prop()
    description: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    user: mongoose.Schema.Types.ObjectId;

    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: Track.name })
    track: mongoose.Schema.Types.ObjectId[];

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

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
