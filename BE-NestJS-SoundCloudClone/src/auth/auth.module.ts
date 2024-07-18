import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './passport/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './passport/jwt.strategy';
import ms from 'ms'
import { AuthController } from './auth.controller';
import { RolesModule } from 'src/roles/roles.module';
import { GithubStrategy } from './passport/github.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { Verify, VerifySchema } from './schemas/verify.schema';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    RolesModule,
    MailModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        privateKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: ms(configService.get<string>('JWT_ACCESS_TOKEN_EXPIRE')) / 1000,
        }
      }),
      inject: [ConfigService]
    }),
    ConfigModule,
    MongooseModule.forFeature([
      { name: Verify.name, schema: VerifySchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, GithubStrategy],
  exports: [AuthService],
})
export class AuthModule { }
