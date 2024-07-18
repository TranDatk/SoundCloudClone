import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { IUser } from 'src/users/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { CommentDocument, Comment } from './schemas/comment.schema';
import { Track, TrackDocument } from 'src/tracks/schemas/track.schema';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: SoftDeleteModel<CommentDocument>,
    @InjectModel(Track.name) private trackModel: SoftDeleteModel<TrackDocument>,
    private configService: ConfigService
  ) { }

  async create(createCommentDto: CreateCommentDto, user: IUser) {
    const track = await this.trackModel.findById(createCommentDto?.track);
    if (track) {
      return await this.commentModel.create({
        user: user?._id,
        ...createCommentDto
      });
    }
    throw new BadRequestException('The track ID is not found!');
  }

  findAll() {
    return `This action returns all comments`;
  }

  async fetchComments(trackId: string) {
    const track = await this.trackModel.findById(trackId);
    if (track) {
      return await this.commentModel.find({
        track: trackId
      }).populate(
        {
          path: 'user',
          select: { _id: 1, email: 1, avatar: 1, name: 1, type: 1 }
        });
    }
    throw new BadRequestException('The track ID is not found!');
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
