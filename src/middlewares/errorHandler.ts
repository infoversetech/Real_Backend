import { Request, Response, NextFunction } from 'express';
import { statusCode } from '../constants/status-codes';
import { logger } from '../library/logger';
import { CustomError } from '../types/custom-error';

const { SERVER_ERROR } = statusCode;

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    // Log the error details for debugging
    logger.error(err);

    // Send a custom error response with the status code and message
    return res.status(err.statusCode || SERVER_ERROR).send({
        status: 'error',
        message: err.message || 'Internal Server Error',
        details: err.details || {}
    });
};
