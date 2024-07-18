import { IsNotEmpty } from "class-validator";

export class JwtDto {
    @IsNotEmpty()
    refresh_token: string;

    access_token: string;
}