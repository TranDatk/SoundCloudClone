import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import mongoose from 'mongoose';
import { IsUnique } from 'src/custom-decorators/unique.decorator';

export class CreateGenreDto {
    @IsString()
    @IsNotEmpty()
    @IsUnique('Genre', 'name', { message: 'Name already exists' })
    name: string;

    @IsString()
    description: string;
}
