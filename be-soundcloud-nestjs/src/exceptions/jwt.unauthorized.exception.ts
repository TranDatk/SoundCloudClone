import { UnauthorizedException } from "@nestjs/common";

export class JWTUnauthorizedException extends UnauthorizedException {
    constructor() {
        super("Invalid token!");
    }
}