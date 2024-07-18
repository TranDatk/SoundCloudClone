import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { ResponseMessage } from 'src/custom-decorators/response-message-decorator';
import { User } from 'src/custom-decorators/parsing-user-decorator';
import { IUser } from 'src/users/users.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('playlists')
@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) { }

  @ResponseMessage('Create a playlist')
  @Post()
  create(@Body() createPlaylistDto: CreatePlaylistDto, @User() user: IUser) {
    return this.playlistsService.create(createPlaylistDto, user);
  }

  @ResponseMessage('Fetch list playlist with paginate')
  @Get()
  findAll(
    @Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string,
    @User() user: IUser
  ) {
    return this.playlistsService.findAll(+currentPage, +limit, qs, user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playlistsService.findOne(+id);
  }

  @ResponseMessage('Update playlist by id')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
    @User() user: IUser
  ) {
    return this.playlistsService.update(id, updatePlaylistDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playlistsService.remove(+id);
  }
}
