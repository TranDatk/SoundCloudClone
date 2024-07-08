import { UnauthorizedException } from "@nestjs/common";

export class UnauthorizedCustomException extends UnauthorizedException {
    constructor() {
        super("Invalid Username/Password!");
    }
}