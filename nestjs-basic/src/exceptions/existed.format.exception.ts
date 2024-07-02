import { BadRequestException, HttpException, HttpStatus } from "@nestjs/common";

export class ExistedException extends BadRequestException {
    constructor(name: string) {
        super(`Unable to create a new ${name} because a duplicate entry exists. `);
    }
}