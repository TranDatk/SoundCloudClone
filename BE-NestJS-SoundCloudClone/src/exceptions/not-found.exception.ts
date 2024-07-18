import { HttpException, HttpStatus } from "@nestjs/common";

export class NotFoundException extends HttpException {
    constructor(model?: string) {
        super(`Not found in ${model}`, HttpStatus.NOT_FOUND);
    }
}