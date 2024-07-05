import { Type } from "class-transformer";
import { IsInt, IsMongoId, IsString } from "class-validator";

export class CreateCommentDto {
    @IsString()
    commentText: string;

    @IsInt()
    @Type(() => Number)
    moment: number;

    @IsMongoId()
    track: string;
}
