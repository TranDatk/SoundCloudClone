import {
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/custom-decorators/is-public-decorator';
import { JWTUnauthorizedException } from 'src/exceptions/jwt.unauthorized.exception';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        return super.canActivate(context);
    }

    handleRequest(err, user, info, context: ExecutionContext) {
        const request: Request = context.switchToHttp().getRequest();
        if (err || !user) {
            throw err || new JWTUnauthorizedException();
        }
        const targetMethod = request?.method;
        const targetEndpoint = request.route?.path as string;

        const permissions = user?.permissions ?? [];
        let isExist = permissions.find(
            permission =>
                permission.method === targetMethod
                &&
                permission.apiPath === targetEndpoint
        )

        if (targetEndpoint.startsWith('/api/v1/auth')) isExist = true;

        if (!isExist) {
            throw new ForbiddenException("Do not have permission to access this endpoint !!!")
        }

        return user;
    }
}
