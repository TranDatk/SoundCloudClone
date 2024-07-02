import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMongoId, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, ValidateNested } from 'class-validator';
import mongoose from 'mongoose';
import { IsUnique } from 'src/custom-decorators/unique.decorator';

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    @IsUnique('User', 'email', { message: 'Email already exists' })
    email: string;

    phone: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    gender: string;

    age: number;

    address: string;

    @IsNotEmpty()
    @IsMongoId()
    role: mongoose.Schema.Types.ObjectId;

    // @IsNotEmptyObject()
    // @IsObject()
    // @ValidateNested()
    // @Type(() => Company)
    // company: Company;

    // createdAt: Date;

    // updatedAt: Date;
}

export class UserLoginDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'user1',
        description: 'username',
    })
    readonly username: string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: '12345678',
        description: 'password',
    })
    readonly password: string;
}
