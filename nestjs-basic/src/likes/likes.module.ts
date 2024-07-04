import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Track, TrackSchema } from 'src/tracks/schemas/track.schema';
import { Like, LikeSchema } from './schemas/like.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Track.name, schema: TrackSchema },
      { name: Like.name, schema: LikeSchema },
    ]),
    ConfigModule
  ],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule { }
