import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { IUser } from 'src/users/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Track, TrackDocument } from './schemas/track.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { ConfigService } from '@nestjs/config';
import aqp from 'api-query-params';
import mongoose from 'mongoose';
import { InvalidIdException } from 'src/exceptions/invalid-id-format.exception';
import { Genre, GenreDocument } from 'src/genres/schemas/genre.schemas';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class TracksService {
  constructor(
    @InjectModel(Track.name) private trackModel: SoftDeleteModel<TrackDocument>,
    @InjectModel(Genre.name) private genreModel: SoftDeleteModel<GenreDocument>,
  ) { }

  async create(createTrackDto: CreateTrackDto, user: IUser) {
    const result = await this.trackModel.create({
      ...createTrackDto,
      view: 0,
      like: 0,
      user: user._id,
      createdBy: {
        _id: user._id,
        email: user.email,
        name: user.name
      }
    });

    if (result) {
      return result;
    } else {
      throw new BadRequestException('Track creation failed');
    }
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, skip, sort, projection, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    const offset = (+currentPage - 1) * (+limit);
    const defaultLimit = +limit ? +limit : 10;
    const totalItems = (await this.trackModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const results = await this.trackModel.find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
      .select(projection as any)
      .exec();

    return {
      meta: {
        current: currentPage ? currentPage = currentPage : currentPage = 1,
        pageSize: limit ? limit = limit : limit = defaultLimit,
        pages: totalPages,
        total: totalItems
      },
      results
    };
  }

  async fetchUserTrack(currentPage: number, limit: number, user: IUser) {
    const filter = { user: user._id };
    const sort = { createdAt: -1 }

    const offset = (+currentPage - 1) * (+limit);
    const defaultLimit = +limit ? +limit : 10;
    const totalItems = (await this.trackModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const results = await this.trackModel.find(filter)
      .skip(offset)
      .populate(
        {
          path: 'user',
          select: {
            name: 1,
            _id: 1,
          }
        }
      )
      .limit(defaultLimit)
      .sort(sort as any)
      .exec();

    return {
      meta: {
        current: currentPage ? currentPage = currentPage : currentPage = 1,
        pageSize: limit ? limit = limit : limit = defaultLimit,
        pages: totalPages,
        total: totalItems
      },
      results
    };
  }

  async findTopTrackByGenre(limit: number, genreName: string) {
    const genre = await this.genreModel.findOne({ name: genreName }).exec();
    if (!genre) {
      throw new NotFoundException(`Genre ${genreName} not found`);
    }

    const results = await this.trackModel.find({ genre: genre._id })
      .limit(limit)
      .sort({ view: -1 })
      .populate('genre')
      .exec();

    return results;
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new InvalidIdException(id);
    }

    return await this.trackModel.findById(id)
      .populate(
        {
          path: 'genre',
          select: {
            name: 1,
            _id: 1,
            description: 1,
          }
        }
      )
      .populate(
        {
          path: 'user',
          select: { _id: 1, email: 1, avatar: 1, name: 1 }
        });;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new InvalidIdException(id);
    }

    // This option allows the query to return new result.
    const option = { new: true }

    return (await this.trackModel.findByIdAndUpdate(
      id,
      {
        ...updateTrackDto,
        updatedBy: {
          _id: user._id,
          email: user.email,
          name: user.name
        }
      },
      option));
  }

  async remove(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new InvalidIdException(id);
    }

    await this.trackModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email,
          name: user.name
        }
      }
    );

    return await this.trackModel.softDelete({ _id: id })
  }

  async getAudioById(trackId: string): Promise<Buffer> {

    const track = await this.findOne(trackId);
    if (!track) {
      throw new InvalidIdException(trackId);
    }
    try {
      const audioBuffer: Buffer = await this.readFile(track.url);
      return audioBuffer;
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  private async readFile(trackUrl: string): Promise<Buffer> {
    const audioFilePath = join(__dirname, '..', '..', 'public', 'tracks', trackUrl);
    return new Promise<Buffer>((resolve, reject) => {
      fs.readFile(audioFilePath, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  async searchTrack(keyword: string) {
    const rgx = (pattern) => new RegExp(`.*${pattern}.*`, 'i');
    const searchRgx = rgx(keyword);

    return await this.trackModel.find({
      $or: [
        { 'createdBy.name': { $regex: searchRgx } },
        { title: { $regex: searchRgx } },
      ],
    })
      .select({ _id: 1, title: 1, description: 1, photo: 1 })
      .limit(5);
  }

  async increaseView(trackId: string) {
    if (!mongoose.Types.ObjectId.isValid(trackId)) {
      throw new InvalidIdException(trackId);
    }

    return await this.trackModel.findByIdAndUpdate(trackId, {
      $inc: { 'view': 1 }
    });
  }
}
