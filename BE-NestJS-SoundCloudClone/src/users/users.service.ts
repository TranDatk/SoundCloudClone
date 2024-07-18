import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { NotFoundException } from 'src/exceptions/not-found.exception';
import mongoose from "mongoose";
import { InvalidIdException } from 'src/exceptions/invalid-id-format.exception';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import aqp from 'api-query-params';
import { IUser } from './users.interface';
import { RegisterUserDto } from './dto/register-user.dto';
import { ConfigService } from '@nestjs/config';
import { Role, RoleDocument } from 'src/roles/schemas/role.schema';
import { USER_ROLE, USER_TYPE } from 'src/databases/init-data';
import { join } from 'path';
import { SocialUserDto } from './dto/github-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: SoftDeleteModel<UserDocument>,
    @InjectModel(Role.name) private roleModel: SoftDeleteModel<RoleDocument>,
    private configService: ConfigService
  ) { }

  getHashPassword = (password: string) => {
    var bcrypt = require('bcryptjs');
    var salt = genSaltSync(10);
    var hash = hashSync(password, salt);
    return hash;
  }

  async create(createUserDto: CreateUserDto, user: IUser): Promise<User> {
    const hashPassword = this.getHashPassword(createUserDto.password);
    const userResult = (
      await this.userModel.create(
        {
          ...createUserDto,
          role: user?.role?._id,
          password: hashPassword,
          type: USER_TYPE.CREDENTIAL,
          createdBy: {
            _id: user._id,
            email: user.email,
            name: user.name,
          }
        }
      )
    );
    return userResult;
  }


  async register(registerUserDto: RegisterUserDto) {
    const hashPassword = this.getHashPassword(registerUserDto?.password);
    const userRole: Role = await this.roleModel.findOne({ name: USER_ROLE });
    const userResult = (
      await this.userModel.create({
        ...registerUserDto,
        password: hashPassword,
        role: userRole?._id,
        avatar: 'defaultuser.png',
        name: registerUserDto?.email,
        type: USER_TYPE.CREDENTIAL
      }
      )
    );
    return {
      _id: userResult?._id,
      email: userResult?.email,
      createdAt: userResult?.createdAt
    };
  }

  async registerGithubAccount(registerUserDto: SocialUserDto) {
    const userRole: Role = (await this.roleModel.findOne({ name: USER_ROLE }));
    const userResult = (
      await this.userModel.create({
        email: registerUserDto?.email,
        role: userRole?._id,
        avatar: registerUserDto?.image,
        name: registerUserDto?.name,
        type: registerUserDto?.type
      }
      )
    );
    return {
      _id: userResult?._id,
      email: userResult?.email,
      role: { _id: userRole?._id, name: userRole?.name },
      avatar: userResult?.avatar,
      name: userResult?.name,
      type: userResult?.type
    };
  }


  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, skip, sort, projection, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    const offset = (+currentPage - 1) * (+limit);
    const defaultLimit = +limit ? +limit : 10;
    const totalItems = (await this.userModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const results = await this.userModel.find(filter).select("-password")
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
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

  async findOne(id: string): Promise<User> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new InvalidIdException(id);
    }

    return await this.userModel.findById(id)
      .select('-password')
      .populate(
        {
          path: 'role',
          select: {
            name: 1,
            _id: 1
          }
        }
      )
  }

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.userModel.findOne({
      email: username
    }).populate({ path: "role", select: { name: 1, _id: 1 } });

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new InvalidIdException(id);
    }

    // This option allows the query to return new result.
    const option = { new: true }

    return (await this.userModel.findByIdAndUpdate(
      id,
      {
        ...updateUserDto,
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

    const adminUser: User = await this.userModel.findById(id);
    if (adminUser && adminUser.email === this.configService.get<string>('ADMIN_EMAIL')) {
      throw new BadRequestException("Cannot delete the admin account!!!")
    }

    await this.userModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email,
          name: user.name
        }
      }
    );

    return await this.userModel.softDelete({ _id: id })
  }

  isValidPassword(password: string, hash: string) {
    return compareSync(password, hash)
  }

  updateUserToken = async (refreshToken: string, id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new InvalidIdException(id);
    }

    return await this.userModel.findOneAndUpdate(
      { _id: id },
      {
        refreshToken: refreshToken
      }
    );
  }

  findUserByToken = async (refreshToken: string) => {
    return await this.userModel.findOne({
      refreshToken
    })
      .populate({
        path: 'role',
        select: { name: 1 }
      });
  }
}
