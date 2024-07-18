import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
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
import { SocialUserDto } from 'src/users/dto/github-user.dto';
import { USER_ROLE } from 'src/databases/init-data';
import { JwtDto } from './dto/jwt.dto';
import { Verify, VerifyDocument } from './schemas/verify.schema';
import { Model } from 'mongoose';
import { generateRandomSixDigitString } from './utils/generate.random';
import { MailService } from 'src/mail/mail.service';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private mailerService: MailerService,
        private jwtService: JwtService,
        private configService: ConfigService,
        private rolesService: RolesService,
        @InjectModel(Verify.name) private verifyModel: Model<VerifyDocument>,
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
        const { _id, name, email, role, type, avatar } = user;
        const isVerify = await this.checkIsVerify({ email });
        const payload = {
            sub: "Token login",
            iss: "From server",
            _id,
            name,
            email,
            role,
            avatar,
            type
        };

        const refresh_token = this.createRefreshToken(payload);

        //update user refresh token in database
        const a = await this.usersService.updateUserToken(refresh_token, _id);

        //set cookies for response
        // const cookieOptions: CookieOptions = {
        //     httpOnly: true,
        //     maxAge: ms(this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRE')),
        // }
        // response.cookie('refresh_token', refresh_token, cookieOptions);

        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: refresh_token,
            user: {
                _id,
                name,
                email,
                role,
                avatar,
                type,
                ...isVerify
            }
        };
    }

    async loginWithThirdParty(SocialUserDto: SocialUserDto) {
        const checkUser = await this.usersService.findOneByUsername(SocialUserDto?.email);
        if (!checkUser) {
            const newUser = await this.usersService.registerGithubAccount(SocialUserDto);
            const payload = {
                sub: "Token login",
                iss: "From server",
                _id: newUser?._id,
                name: newUser?.name,
                email: newUser?.email,
                role: newUser?.role,
                avatar: newUser?.avatar,
                type: newUser?.type
            };

            const refresh_token = this.createRefreshToken(payload);
            const a = await this.usersService.updateUserToken(refresh_token, newUser?._id as unknown as string);

            return {
                access_token: this.jwtService.sign(payload),
                refresh_token: refresh_token,
                user: {
                    ...newUser
                }
            };
        } else {
            const role = await this.rolesService.findByName(USER_ROLE);
            const payload = {
                sub: "Token login",
                iss: "From server",
                _id: checkUser?._id,
                name: checkUser?.name,
                email: checkUser?.email,
                role: { _id: role?._id, name: role?.name },
                avatar: checkUser?.avatar,
                type: checkUser?.type
            };

            const refresh_token = this.createRefreshToken(payload);
            const a = await this.usersService.updateUserToken(refresh_token, checkUser?._id as unknown as string);
            return {
                access_token: this.jwtService.sign(payload),
                refresh_token: refresh_token,
                user: {
                    _id: checkUser?._id,
                    name: checkUser?.name,
                    email: checkUser?.email,
                    role: role?._id,
                    avatar: checkUser?.avatar,
                    type: checkUser?.type
                }
            }
        }
    }

    async register(user: RegisterUserDto) {
        try {
            const newUser = await this.usersService.register(user);
            const verify = await this.verifyModel.create({
                code: generateRandomSixDigitString(),
                user: newUser?._id,
                email: newUser?.email
            });
            if (verify) {
                this.mailerService.sendMail({
                    to: newUser?.email,
                    from: '"Sound Cloud Clone" <soundcloudclone@datk.com>', // override default from
                    subject: 'Verification Code',
                    template: 'verify',
                    context: {
                        name: newUser?.email,
                        verificationCode: verify?.code
                    }
                })
            }
            return {
                _id: newUser?._id,
                createAt: newUser?.createdAt,
                email: newUser?.email
            }
        } catch (error) {
            throw new BadRequestException(error?.message);
        }


    }

    async resendTheCode(user: IUser) {
        const u = await this.usersService.findOneByUsername(user?.email);
        if (u) {
            await this.verifyModel.deleteMany({ email: user?.email });
            const verify = await this.verifyModel.create({
                code: generateRandomSixDigitString(),
                user: u?._id,
                email: u?.email
            });
            if (verify) {
                this.mailerService.sendMail({
                    to: u?.email,
                    from: '"Sound Cloud Clone" <soundcloudclone@datk.com>', // override default from
                    subject: 'Verification Code',
                    template: 'verify',
                    context: {
                        name: u?.email,
                        verificationCode: verify?.code
                    }
                });
                return { isVerify: false }
            } else {
                throw new BadRequestException('Email sending has temporarily failed');
            }
        } else {
            throw new BadRequestException('Email does not exist');
        }
    }

    async checkIsVerify(data) {
        const { email } = data;
        const verify = await this.verifyModel.findOne({ email: email });
        if (verify) {
            return { isVerify: false }
        }
        return { isVerify: true }
    }

    async checkCode(data, user: IUser) {
        const { code } = data;
        const verify = await this.verifyModel.findOne({ email: user?.email, code: code }).sort({ createdAt: -1 });
        if (verify) {
            const currentTime = new Date();
            const codeCreatedTime = new Date(verify.createdAt);
            const timeDifference = (currentTime.getTime() - codeCreatedTime.getTime()) / 1000 / 60; // Chuyển đổi từ milliseconds sang minutes

            if (timeDifference < 5) {
                await this.verifyModel.deleteMany({ _id: verify?._id });
                return { isVerify: true, message: 'Valid code' }; // Mã xác nhận hợp lệ
            } else {
                await this.verifyModel.deleteOne({ _id: verify?._id });
                return { isVerify: false, message: 'Verification code has expired' }; // Mã xác nhận đã hết hạn
            }
        }

        return { isVerify: false, message: 'Invalid verification code' }; // Mã xác nhận không tồn tại
    }

    createRefreshToken = (payload) => {
        const signOption: JwtSignOptions = {
            secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
            expiresIn: ms(this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRE')) / 1000,
        }
        const refreshToken = this.jwtService.sign(payload, signOption);
        return refreshToken;
    }

    async processNewToken(jwt: JwtDto, response: Response) {

        if (jwt?.refresh_token === undefined) {
            return new JWTUnauthorizedException();
        }

        try {
            const option: JwtVerifyOptions = {
                secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
            }
            this.jwtService.verify(jwt?.refresh_token, option);

            const user = await this.usersService.findUserByToken(jwt?.refresh_token);

            //fetch user's role 
            const userRole = user.role as unknown as { _id: string };
            const temp = await this.rolesService.findOne(userRole._id);

            const parsingUser = {
                _id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role as any,
                avatar: user.avatar,
                type: user?.type
            }
            if (user) {
                return this.login(parsingUser, response);
            } else {
                return new NotFoundException(User.name);
            }
        } catch (err) {
            return new UnauthorizedException(err?.message);
        }
    }

    async logout(user: IUser, response: Response) {
        await this.usersService.updateUserToken(null, user._id);
        response.clearCookie("refresh_token");
        return "Log out successfully"
    }
}
