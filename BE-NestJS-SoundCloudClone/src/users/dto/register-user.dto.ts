import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { Match } from "src/custom-decorators/match.decorator";
import { IsUnique } from "src/custom-decorators/unique.decorator";

export class RegisterUserDto {
    @IsEmail()
    @IsNotEmpty()
    @IsUnique('User', 'email', { message: 'Email already exists' })
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    @Match('password', { message: "The passwords you entered don't align" })
    readonly rePassword: string;
}