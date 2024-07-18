import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Track, TrackSchema } from './schemas/track.schema';
import { Genre, GenreSchema } from 'src/genres/schemas/genre.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Track.name, schema: TrackSchema },
      { name: Genre.name, schema: GenreSchema },
    ]),
    ConfigModule
  ],
  controllers: [TracksController],
  providers: [TracksService],
})
export class TracksModule { }
