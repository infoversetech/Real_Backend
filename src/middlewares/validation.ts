import { Request, NextFunction } from 'express';
import { validate } from 'class-validator';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { CResponse } from '../types/response';

import { statusCode } from '../constants/status-codes';
const { BAD_REQUEST } = statusCode;

export const ValidateRequest = (dtoClass: ClassConstructor<unknown>) => {
    return (req: Request, res: CResponse, next: NextFunction) => {
        const output: any = plainToInstance(dtoClass, req.body);

        validate(output, { skipMissingProperties: true, stopAtFirstError: true }).then((errors) => {
            // errors is an array of validation errors
            if (errors.length === 0) next();

            if (errors.length > 0) {
                // console.log(errors);
                let errorTexts: Record<string, string> = {};
                for (const errorItem of errors) {
                    const { property, constraints } = errorItem;
                    if (constraints) errorTexts[property] = Object.values(constraints)[0];
                }
                return res.status(BAD_REQUEST).send({ status: 'error', message: 'following errors occurred', errors: errorTexts });
            }
        });
    };
};
