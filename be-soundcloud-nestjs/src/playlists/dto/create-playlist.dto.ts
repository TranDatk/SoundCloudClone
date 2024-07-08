import { IsArray, IsBoolean, IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class CreatePlaylistDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    description: string;

    @IsBoolean()
    status: boolean;
}
