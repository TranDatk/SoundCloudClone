import { IsArray, IsBoolean, IsMongoId, IsNotEmpty } from "class-validator";
import { IsUnique } from "src/custom-decorators/unique.decorator";
import mongoose from "mongoose";

export class CreateFollowerDto {
    @IsNotEmpty()
    @IsMongoId()
    author: string;
}
