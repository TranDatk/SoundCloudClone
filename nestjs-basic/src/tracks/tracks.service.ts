import { BadRequestException, Injectable } from '@nestjs/common';
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

@Injectable()
export class TracksService {
  constructor(
    @InjectModel(Track.name) private trackModel: SoftDeleteModel<TrackDocument>,
    private configService: ConfigService
  ) { }

  async create(createTrackDto: CreateTrackDto, user: IUser) {
    const result = await this.trackModel.create({
      ...createTrackDto,
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
}