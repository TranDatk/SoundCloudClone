import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import { IUser } from 'src/users/users.interface';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';
import { ConfigService } from '@nestjs/config';
import ms from 'ms'
import { CookieOptions, Response } from 'express'
import { JWTUnauthorizedException } from 'src/exceptions/jwt.unauthorized.exception';
import { NotFoundException } from 'src/exceptions/not-found.exception';
import { User } from 'src/users/schemas/user.schema';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
        private rolesService: RolesService,
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user: any = await this.usersService.findOneByUsername(username);
        if (user) {
            const isValid = await this.usersService.isValidPassword(pass, user.password);
            if (isValid) {
                const userRole = user.role as unknown as { _id: string; name: string };
                const temp = await this.rolesService.findOne(userRole._id);
                const objectUser = {
                    ...user.toObject(),
                    permissions: temp.permissions ?? []
                }
                return objectUser;
            }
        }
        return null;
    }

    async login(user: IUser, response: Response) {
        const { _id, name, email, role, permissions, avatar } = user;
        const payload = {
            sub: "Token login",
            iss: "From server",
            _id,
            name,
            email,
            role,
            avatar
        };

        const refresh_token = this.createRefreshToken(payload);

        //update user refresh token in database
        const a = await this.usersService.updateUserToken(refresh_token, _id);

        //set cookies for response
        const cookieOptions: CookieOptions = {
            httpOnly: true,
            maxAge: ms(this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRE')),
        }
        response.cookie('refresh_token', refresh_token, cookieOptions);

        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: refresh_token,
            user: {
                _id,
                name,
                email,
                role,
                avatar,
                permissions
            }
        };
    }

    async register(user: RegisterUserDto) {
        const newUser = await this.usersService.register(user);

        return {
            _id: newUser?._id,
            createAt: newUser?.createdAt
        }
    }

    createRefreshToken = (payload) => {
        const signOption: JwtSignOptions = {
            secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
            expiresIn: ms(this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRE')) / 1000,
        }
        const refreshToken = this.jwtService.sign(payload, signOption);
        return refreshToken;
    }

    async processNewToken(refreshToken: string | undefined, response: Response) {
        if (refreshToken === undefined) {
            return new JWTUnauthorizedException();
        }

        try {
            const option: JwtVerifyOptions = {
                secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),

            }
            this.jwtService.verify(refreshToken, option);

            const user = await this.usersService.findUserByToken(refreshToken);

            //fetch user's role 
            const userRole = user.role as unknown as { _id: string };
            const temp = await this.rolesService.findOne(userRole._id);

            const parsingUser = {
                _id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role as any,
                permissions: temp as any,
                avatar: user.avatar
            }
            if (user) {
                return this.login(parsingUser, response);
            } else {
                return new NotFoundException(User.name);
            }
        } catch (err) {
            return new JWTUnauthorizedException();
        }
    }

    async logout(user: IUser, response: Response) {
        await this.usersService.updateUserToken(null, user._id);
        response.clearCookie("refresh_token");
        return "Log out successfully"
    }
}
