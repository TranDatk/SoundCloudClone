import { BadRequestException, HttpException, HttpStatus } from "@nestjs/common";

export class InvalidIdException extends BadRequestException {
    constructor(id?: string) {
        super(`Invalid ID format: ${id}`);
    }
}