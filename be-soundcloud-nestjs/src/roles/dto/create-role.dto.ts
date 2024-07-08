import { IsArray, IsBoolean, IsMongoId, IsNotEmpty } from "class-validator";
import { IsUnique } from "src/custom-decorators/unique.decorator";
import { Role } from "../schemas/role.schema";
import mongoose from "mongoose";

export class CreateRoleDto {
    @IsNotEmpty()
    @IsUnique(Role.name, 'name', { message: 'Name already exists' })
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean;

    @IsNotEmpty()
    @IsMongoId()
    @IsArray()
    permission: mongoose.Schema.Types.ObjectId[];
}
