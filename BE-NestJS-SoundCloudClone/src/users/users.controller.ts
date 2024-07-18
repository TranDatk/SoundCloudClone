import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseFilters, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpExceptionFilter } from 'src/global-filters.ts/http-exception.filter';
import mongoose from "mongoose";
import { ResponseMessage } from 'src/custom-decorators/response-message-decorator';
import { User } from 'src/custom-decorators/parsing-user-decorator';
import { IUser } from './users.interface';
import { Public } from 'src/custom-decorators/is-public-decorator';
import { RegisterUserDto } from './dto/register-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ResponseMessage('Create user')
  @Post()
  create(@Body() createUserDto: CreateUserDto, @User() user: IUser) {
    return this.usersService.create(createUserDto, user);
  }

  @ResponseMessage('Fetch list user with paginate')
  @Get()
  findAll(
    @Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string,
  ) {
    return this.usersService.findAll(+currentPage, +limit, qs);
  }

  @ResponseMessage('Fetch user by id')
  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    let user = await this.usersService.findOne(id);
    return user;
  }

  @ResponseMessage('Update user by id')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @User() user: IUser
  ) {
    return this.usersService.update(id, updateUserDto, user);
  }

  @ResponseMessage('Remove user by id')
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.usersService.remove(id, user);
  }

}
