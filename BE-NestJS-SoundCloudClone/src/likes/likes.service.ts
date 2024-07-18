import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { IUser } from 'src/users/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Track, TrackDocument } from 'src/tracks/schemas/track.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Like, LikeDocument } from './schemas/like.schema';
import { ITrack } from 'src/tracks/tracks.interface';
import { InvalidIdException } from 'src/exceptions/invalid-id-format.exception';
import mongoose from 'mongoose';
import aqp from 'api-query-params';

@Injectable()
export class LikesService {
  constructor(
    @InjectModel(Like.name) private likeModel: SoftDeleteModel<LikeDocument>,
    @InjectModel(Track.name) private trackModel: SoftDeleteModel<TrackDocument>,
    private configService: ConfigService
  ) { }

  async create(createLikeDto: CreateLikeDto, user: IUser) {
    const track = this.trackModel.findById(createLikeDto.track) as unknown as ITrack;
    if (track) {
      const alreadyLiked = await this.likeModel.findOne({ track: createLikeDto.track, user: user._id });
      if (alreadyLiked) {
        await this.likeModel.findByIdAndUpdate(
          alreadyLiked._id as unknown as string, {
          ...createLikeDto
        });

        if (createLikeDto?.like) {
          await this.trackModel.findByIdAndUpdate(createLikeDto.track, {
            $inc: { 'like': 1 }
          });
        } else {
          await this.trackModel.findByIdAndUpdate(createLikeDto.track, {
            $inc: { 'like': -1 }
          });
        }

      } else {
        await this.likeModel.create({
          user: user._id,
          ...createLikeDto
        });

        await this.trackModel.findByIdAndUpdate(createLikeDto.track, {
          like: track?.like ?? 0 + 1,
        });
      }
    } else {
      throw new InvalidIdException(createLikeDto.track);
    }
  }

  async findAll(currentPage, limit, qs, user: IUser) {
    const { skip, sort, projection } = aqp(qs);

    const filter = { user: user._id };
    const offset = (+currentPage - 1) * (+limit);
    const defaultLimit = +limit ? +limit : 10;
    const totalItems = (await this.likeModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const results = await this.likeModel.find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate({
        path: 'track',
        select: {
          title: 1,
          photo: 1,
          _id: 1
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

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new InvalidIdException(id);
    }

    return await this.likeModel.findById(id);
  }

  async checkTrackLike(trackId: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(trackId)) {
      throw new InvalidIdException(trackId);
    }

    const like = await this.likeModel.findOne({ track: trackId, user: user?._id });
    if (like) {
      return like
    } else {
      return {
        like: false
      }
    }
  }


  update(id: string, updateLikeDto: UpdateLikeDto) {
    return `This action updates a #${id} like`;
  }

  remove(id: number) {
    return `This action removes a #${id} like`;
  }

}
