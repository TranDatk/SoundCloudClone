import { IsNotEmpty } from "class-validator";
import { IsUnique } from "src/custom-decorators/unique.decorator";
import { Permission } from "../schemas/permission.schema";

export class CreatePermissionDto {
    @IsNotEmpty()
    @IsUnique(Permission.name, 'name', { message: 'Name already exists' })
    name: string;

    @IsNotEmpty()
    apiPath: string;

    @IsNotEmpty()
    method: string;

    @IsNotEmpty()
    module: string;
}
