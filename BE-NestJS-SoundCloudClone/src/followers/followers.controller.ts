import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { CreateFollowerDto } from './dto/create-follower.dto';
import { UpdateFollowerDto } from './dto/update-follower.dto';
import { ResponseMessage } from 'src/custom-decorators/response-message-decorator';
import { User } from 'src/custom-decorators/parsing-user-decorator';
import { IUser } from 'src/users/users.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('followers')
@Controller('followers')
export class FollowersController {
  constructor(private readonly followersService: FollowersService) { }

  @ResponseMessage('Create a new follower')
  @Post()
  create(@Body() createFollowerDto: CreateFollowerDto, @User() user: IUser) {
    return this.followersService.create(createFollowerDto, user);
  }

  @ResponseMessage('Fetch list follower with paginate')
  @Get()
  findAll(
    @Query("current") currentPage: string,
    @Query("pageSize") limit: string,
  ) {
    return this.followersService.findAll(+currentPage, +limit);
  }

  @ResponseMessage('Check was followed user')
  @Get(':id')
  findOne(@Param('id') authorId: string, @User() user: IUser) {
    return this.followersService.findOne(authorId, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFollowerDto: UpdateFollowerDto) {
    return this.followersService.update(+id, updateFollowerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.followersService.remove(+id);
  }
}
