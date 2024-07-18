import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ResponseMessage } from 'src/custom-decorators/response-message-decorator';
import { User } from 'src/custom-decorators/parsing-user-decorator';
import { IUser } from 'src/users/users.interface';
import { Public } from 'src/custom-decorators/is-public-decorator';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tracks')
@Controller('tracks')
export class TracksController {
  constructor(private readonly tracksService: TracksService) { }

  @ResponseMessage('Create a track')
  @Post()
  create(@Body() createTrackDto: CreateTrackDto, @User() user: IUser) {
    return this.tracksService.create(createTrackDto, user);
  }

  @ResponseMessage('Fetch list track with paginate')
  @Get('')
  findAll(
    @Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string,
  ) {
    return this.tracksService.findAll(+currentPage, +limit, qs);
  }

  @ResponseMessage("Fetch list user track with paginate")
  @Get('/user-track')
  FetchUserTrack(
    @Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @User() user: IUser
  ) {
    return this.tracksService.fetchUserTrack(+currentPage, +limit, user);
  }

  @Public()
  @ResponseMessage('Fetch top track by genre')
  @Post('/top')
  findTopTrack(
    @Query("limit") limit: string,
    @Body("genre") genreName: string,
  ) {
    return this.tracksService.findTopTrackByGenre(+limit, genreName);
  }

  @Public()
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

  @ResponseMessage('Get audio from track id')
  @Public()
  @Get('audio/:id')
  async getAudioById(@Param('id') trackId: string, @Res() res: Response) {
    const audioBuffer = await this.tracksService.getAudioById(trackId);
    res.setHeader('Content-Type', 'audio/mpeg');
    res.end(audioBuffer);
  }

  @Public()
  @ResponseMessage('Fetch tracks by search')
  @Post('/search')
  searchTrack(
    @Body("keyword") keyword: string,
  ) {
    return this.tracksService.searchTrack(keyword);
  }

  @Public()
  @ResponseMessage('Increase view for track')
  @Post('/increase-view')
  increaseView(
    @Body("trackId") trackId: string,
  ) {
    return this.tracksService.increaseView(trackId);
  }
}
