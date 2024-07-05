import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { IUser } from 'src/users/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Track, TrackDocument } from 'src/tracks/schemas/track.schema';
import { Playlist, PlaylistDocument } from './schemas/playlist.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import aqp from 'api-query-params';
import mongoose from 'mongoose';
import { InvalidIdException } from 'src/exceptions/invalid-id-format.exception';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectModel(Track.name) private trackModel: SoftDeleteModel<TrackDocument>,
    @InjectModel(Playlist.name) private playlistModel: SoftDeleteModel<PlaylistDocument>,
  ) { }

  async create(createPlaylistDto: CreatePlaylistDto, user: IUser) {
    const result = await this.playlistModel.create({
      ...createPlaylistDto,
      user: user._id
    });

    if (result) {
      return result;
    } else {
      throw new BadRequestException('Playlist creation failed');
    }
  }

  async findAll(currentPage: number, limit: number, qs, user: IUser) {
    const { skip, sort, projection } = aqp(qs);

    const filter = { user: user._id };
    const offset = (+currentPage - 1) * (+limit);
    const defaultLimit = +limit ? +limit : 10;
    const totalItems = (await this.playlistModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const results = await this.playlistModel.find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate({
        path: 'track',
        select: {
          title: 1,
          photo: 1,
          _id: 1,
          desciption: 1
        }
      })
      .select(projection as any)
      .exec();

    return {
      meta: {
        current: currentPage,
        pageSize: limit,
        pages: totalPages,
        total: totalItems
      },
      results
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} playlist`;
  }

  async update(id: string, updatePlaylistDto: UpdatePlaylistDto, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new InvalidIdException(id);
    }

    // This option allows the query to return new result.
    const option = { new: true }

    return (await this.playlistModel.findByIdAndUpdate(
      id,
      {
        track: updatePlaylistDto?.track,
      },
      option));
  }

  remove(id: number) {
    return `This action removes a #${id} playlist`;
  }
}
