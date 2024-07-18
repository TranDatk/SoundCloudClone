import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import mongoose from 'mongoose';
import { IsUnique } from 'src/custom-decorators/unique.decorator';

export class CreateTrackDto {
    @IsString()
    @IsNotEmpty()
    @IsUnique('Track', 'title', { message: 'Title already exists' })
    title: string;

    @IsString()
    description: string;

    @IsString()
    @IsNotEmpty()
    photo: string;

    @IsString()
    @IsNotEmpty()
    url: string;

    @IsMongoId()
    @IsNotEmpty()
    genre: string;
}
