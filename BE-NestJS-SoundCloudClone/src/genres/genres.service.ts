import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Genre, GenreDocument } from './schemas/genre.schemas';
import { ConfigService } from '@nestjs/config';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import { InvalidIdException } from 'src/exceptions/invalid-id-format.exception';
import mongoose from 'mongoose';

@Injectable()
export class GenresService {
  constructor(
    @InjectModel(Genre.name) private genreModel: SoftDeleteModel<GenreDocument>,
    private configService: ConfigService
  ) { }

  async create(createGenreDto: CreateGenreDto, user: IUser) {
    const result = await this.genreModel.create({
      ...createGenreDto,
      createdBy: {
        _id: user._id,
        email: user.email,
        name: user.name
      }
    });

    if (result) {
      return result;
    } else {
      throw new BadRequestException('Genre creation failed');
    }
  }

  async findAll() {
    return await this.genreModel.find({});
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new InvalidIdException(id);
    }

    return await this.genreModel.findById(id)
  }

  async update(id: string, updateGenreDto: UpdateGenreDto, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new InvalidIdException(id);
    }

    // This option allows the query to return new result.
    const option = { new: true }

    return (await this.genreModel.findByIdAndUpdate(
      id,
      {
        ...updateGenreDto,
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

    await this.genreModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email,
          name: user.name
        }
      }
    );

    return await this.genreModel.softDelete({ _id: id })
  }

}
