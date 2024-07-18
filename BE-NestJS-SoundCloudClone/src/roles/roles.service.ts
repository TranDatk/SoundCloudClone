import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { IUser } from 'src/users/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from './schemas/role.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { ExistedException } from 'src/exceptions/existed.format.exception';
import aqp from 'api-query-params';
import mongoose from 'mongoose';
import { InvalidIdException } from 'src/exceptions/invalid-id-format.exception';
import { ADMIN_ROLE } from 'src/databases/init-data';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: SoftDeleteModel<RoleDocument>) { }

  async create(createRoleDto: CreateRoleDto, user: IUser) {
    const newRole: Role = await this.roleModel.create({
      ...createRoleDto,
      createdBy: { _id: user._id, email: user.email }
    })

    return {
      _id: newRole?._id,
      createdAt: newRole?.createdAt
    };
  }

  async findAll(currentPage: number, pageSize: number, qs: string) {
    const { filter, skip, sort, projection, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    const offset = (+currentPage - 1) * (+pageSize);
    const defaultLimit = +pageSize ? +pageSize : 10;
    const totalItems = (await this.roleModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const results = await this.roleModel.find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
      .select(projection as any)
      .exec();

    return {
      meta: {
        current: currentPage,
        pageSize: pageSize,
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

    const result = await this.roleModel.findById(id);
    if (result) {
      return (result)
        .populate({
          path: "permissions",
          select: { _id: 1, apiPath: 1, name: 1, method: 1, module: 1 }
        });
    } else
      return null;
  }

  async findByName(name: string) {
    const result: Role = await this.roleModel.findOne({ name: name }).populate({
      path: "permissions",
      select: { _id: 1, apiPath: 1, name: 1, method: 1, module: 1 }
    });
    if (result) {
      return result;
    } else
      return null;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new InvalidIdException(id);
    }

    return await this.roleModel.updateOne(
      { _id: id },
      {
        ...updateRoleDto,
        updatedBy: {
          _id: user._id,
          email: user.email,
          name: user.name
        }
      }
    );
  }

  async remove(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new InvalidIdException(id);
    }

    const adminRole: Role = await this.roleModel.findById(id);
    if (adminRole.name === ADMIN_ROLE) {
      throw new BadRequestException("Cannot delete the admin role!!!")
    }
    await this.roleModel.updateOne(
      { _id: id },
      {
        deleteBy: {
          _id: user._id,
          email: user.email,
          name: user.name
        }
      }
    );
    return await this.roleModel.softDelete({
      _id: id
    });
  }
}
