import { Injectable } from '@nestjs/common';
import { CreateFollowerDto } from './dto/create-follower.dto';
import { UpdateFollowerDto } from './dto/update-follower.dto';
import { IUser } from 'src/users/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Follower, FollowerDocument } from './schemas/follower.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import mongoose, { ObjectId } from 'mongoose';
import { InvalidIdException } from 'src/exceptions/invalid-id-format.exception';

@Injectable()
export class FollowersService {
  constructor(@InjectModel(Follower.name) private followerModel: SoftDeleteModel<FollowerDocument>) { }

  async create(createFollowerDto: CreateFollowerDto, user: IUser) {
    const follower = await this.followerModel.findOne({ follower: user?._id });
    if (!follower) {
      const newFol = await this.followerModel.create({
        authors: createFollowerDto.author,
        follower: user?._id,
        name: user?.name,
        email: user?.email,
      });
      return {
        _id: newFol?._id,
      }
    } else {
      const authors = follower.authors;
      const authorIndex = authors.findIndex((authorId: any) => authorId.equals(createFollowerDto.author));

      if (authorIndex !== -1) {
        authors.splice(authorIndex, 1);
      } else {
        authors.push(createFollowerDto.author as unknown as ObjectId);
      }

      follower.authors = authors;
      await follower.save();

      return {
        _id: follower._id,
      }
    }
  }

  async findAll(currentPage: number, limit: number) {
    const offset = (+currentPage ? + currentPage : 1 - 1) * (+limit);
    const defaultLimit = +limit ? +limit : 10;
    const totalItems = await this.followerModel.countDocuments({});
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const results = await this.followerModel.find({})
      .populate({ path: 'authors', select: "_id name email avatar" })
      .skip(offset)
      .limit(defaultLimit)
      .sort({ createdAt: -1 })
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

  async findOne(authorId: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(authorId)) {
      throw new InvalidIdException(authorId);
    }

    const isFollowed = await this.followerModel.findOne({
      follower: user?._id,
      authors: { $in: authorId }
    });
    return isFollowed ? { isFollow: true } : { isFollow: false };
  }

  update(id: number, updateFollowerDto: UpdateFollowerDto) {
    return `This action updates a #${id} follower`;
  }

  remove(id: number) {
    return `This action removes a #${id} follower`;
  }
}
