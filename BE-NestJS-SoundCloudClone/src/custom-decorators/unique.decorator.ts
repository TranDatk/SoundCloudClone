import { Injectable, Inject } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, registerDecorator, ValidationOptions } from 'class-validator';
import { InjectModel, getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ModuleRef } from '@nestjs/core';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUniqueConstraint implements ValidatorConstraintInterface {
    constructor(private moduleRef: ModuleRef) { }

    async validate(value: any, args: ValidationArguments) {
        const [modelName, property] = args.constraints;
        const model = this.moduleRef.get<Model<any>>(getModelToken(modelName), { strict: false });
        if (!model) {
            throw new Error(`Model ${modelName} not found`);
        }
        const record = await model.findOne({ [property]: value });
        return !record;
    }

    defaultMessage(args: ValidationArguments) {
        const [modelName, property] = args.constraints;
        return `${property} already exists in ${modelName}`;
    }
}

export function IsUnique(modelName: string, property: string, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [modelName, property],
            validator: IsUniqueConstraint,
        });
    };
}
