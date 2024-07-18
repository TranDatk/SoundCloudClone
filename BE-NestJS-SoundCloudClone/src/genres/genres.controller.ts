import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { ResponseMessage } from 'src/custom-decorators/response-message-decorator';
import { User } from 'src/custom-decorators/parsing-user-decorator';
import { IUser } from 'src/users/users.interface';
import { Public } from 'src/custom-decorators/is-public-decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('genres')
@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) { }

  @ResponseMessage('Create a genre')
  @Post()
  create(@Body() createGenreDto: CreateGenreDto, @User() user: IUser) {
    return this.genresService.create(createGenreDto, user);
  }

  @Public()
  @ResponseMessage('Fetch list genre')
  @Get()
  findAll() {
    return this.genresService.findAll();
  }

  @ResponseMessage('Fetch genre by id')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genresService.findOne(id);
  }

  @ResponseMessage('Update genre by id')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGenreDto: UpdateGenreDto,
    @User() user: IUser
  ) {
    return this.genresService.update(id, updateGenreDto, user);
  }

  @ResponseMessage('Remove genre by id')
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.genresService.remove(id, user);
  }
}
