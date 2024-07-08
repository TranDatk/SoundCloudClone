import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { error } from 'console';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(HttpExceptionFilter.name);

    constructor(private configService: ConfigService) { }

    catch(exception: HttpException | NotFoundException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const isProduction = this.configService.get<string>('NODE_ENV') === 'production';

        this.logger.error(`Exception: ${exception.message}, status ${status}`);

        response
            .status(status)
            .json(
                isProduction ?
                    {
                        statusCode: status,
                        timestamp: new Date().toISOString(),
                        message: exception.message,
                        error: exception.name
                    }
                    :
                    {
                        statusCode: status,
                        timestamp: new Date().toISOString(),
                        message: exception.message,
                        error: exception.name,
                        path: request.url,
                    }
            );
    }
}