import { IsBoolean, IsMongoId } from "class-validator";
import mongoose from "mongoose";

export class CreateLikeDto {
    @IsBoolean()
    like: boolean;

    @IsMongoId()
    track: string;
}
