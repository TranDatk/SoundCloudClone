import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Track, TrackSchema } from 'src/tracks/schemas/track.schema';
import { CommentSchema, Comment } from './schemas/comment.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Track.name, schema: TrackSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
    ConfigModule
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule { }
