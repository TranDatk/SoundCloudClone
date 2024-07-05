import { ArrayMinSize, IsArray, IsMongoId, IsNotEmpty } from 'class-validator';

export class UpdatePlaylistDto {
    @IsMongoId({ each: true })
    @ArrayMinSize(1)
    track: string[];
}
