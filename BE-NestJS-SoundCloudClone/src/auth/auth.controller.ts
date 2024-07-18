import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from 'src/custom-decorators/is-public-decorator';
import { ResponseMessage } from 'src/custom-decorators/response-message-decorator';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';
import { Request, Response } from 'express';
import { User } from 'src/custom-decorators/parsing-user-decorator';
import { IUser } from 'src/users/users.interface';
import { RolesService } from 'src/roles/roles.service';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UserLoginDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { SocialUserDto } from 'src/users/dto/github-user.dto';
import { JwtDto } from './dto/jwt.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private roleService: RolesService,
    ) { }

    @ApiBody({ type: UserLoginDto })
    @Public()
    @ResponseMessage('User login')
    @UseGuards(LocalAuthGuard)
    @UseGuards(ThrottlerGuard)
    @Post('/login')
    async handleLogin(
        @Res({ passthrough: true }) response: Response,
        @User() user
    ) {
        return this.authService.login(user, response);
    }

    @ResponseMessage('Get user information')
    @Get('/account')
    async handleGetAccount(@User() user: IUser) {
        const roleTemp = await this.roleService?.findOne(user.role._id) as any;
        roleTemp ? user.permissions = roleTemp.permissions : user.permissions = [];
        return { user };
    }


    @ResponseMessage('Register a new user')
    @Public()
    @Post('/register')
    register(@Body() registerUserDto: RegisterUserDto) {
        return this.authService.register(registerUserDto);
    }

    @Public()
    @ResponseMessage('Get user by refresh token')
    @Post('/refresh')
    handleRefreshToken(@Body() jwt: JwtDto, @Res({ passthrough: true }) response: Response) {
        return this.authService.processNewToken(jwt, response);
    }

    @ResponseMessage('Logout user')
    @Post('/logout')
    handleLogout(
        @User() user: IUser,
        @Res({ passthrough: true }) response: Response) {
        return this.authService.logout(user, response);
    }

    @ResponseMessage('Login with third party')
    @Public()
    @Post('/social-media')
    loginWithThirdParty(@Body() socialUserDto: SocialUserDto) {
        return this.authService.loginWithThirdParty(socialUserDto);
    }

    @Get('callback')
    @UseGuards(AuthGuard('github'))
    async authCallback(@User() user) {
        return user;
    }

    @ResponseMessage('Check is verify user')
    @Public()
    @Post('/verify')
    checkIsVerify(@Body() data) {
        return this.authService.checkIsVerify(data);
    }

    @ResponseMessage('Check verification code')
    @Post('/verify/code')
    checkCode(@Body() data, @User() user: IUser) {
        return this.authService.checkCode(data, user);
    }

    @ResponseMessage('Resend the verification code')
    @Get('/resend')
    resendTheCode(@User() user: IUser) {
        return this.authService.resendTheCode(user);
    }
}
