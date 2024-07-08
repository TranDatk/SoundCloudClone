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
    @Get('/refresh')
    handleRefreshToken(@Req() req: Request, @Res({ passthrough: true }) response: Response) {
        const refreshToken = req.cookies['refresh_token'];
        return this.authService.processNewToken(refreshToken, response);
    }

    @ResponseMessage('Logout user')
    @Post('/logout')
    handleLogout(
        @User() user: IUser,
        @Res({ passthrough: true }) response: Response) {
        return this.authService.logout(user, response);
    }
}
