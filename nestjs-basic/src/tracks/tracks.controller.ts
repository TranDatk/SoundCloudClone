import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ResponseMessage } from 'src/custom-decorators/response-message-decorator';
import { User } from 'src/custom-decorators/parsing-user-decorator';
import { IUser } from 'src/users/users.interface';

@Controller('tracks')
export class TracksController {
  constructor(private readonly tracksService: TracksService) { }

  @ResponseMessage('Create a track')
  @Post()
  create(@Body() createTrackDto: CreateTrackDto, @User() user: IUser) {
    return this.tracksService.create(createTrackDto, user);
  }

  @ResponseMessage('Fetch list track with paginate')
  @Get()
  findAll(
    @Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string,
  ) {
    return this.tracksService.findAll(+currentPage, +limit, qs);
  }

  @ResponseMessage('Fetch track by id')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tracksService.findOne(id);
  }

  @ResponseMessage('Update track by id')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
    @User() user: IUser
  ) {
    return this.tracksService.update(id, updateTrackDto, user);
  }

  @ResponseMessage('Remove track by id')
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.tracksService.remove(id, user);
  }
}
