import { Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { statusCode } from '../constants/status-codes';
import { CResponse } from '../types/response';
import { Config } from '../config';

const { BAD_REQUEST, UN_AUTHORIZED } = statusCode;

export const AdminAuth = (req: Request, res: CResponse, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    if (typeof authHeader === 'undefined') return res.status(BAD_REQUEST).send({ status: 'error', message: 'Access Token not found' });

    const accessToken = authHeader && authHeader.split(' ')[1];
    if (accessToken == undefined || accessToken == null) return res.status(UN_AUTHORIZED).send({ status: 'error', message: 'Token is blank' });

    verify(accessToken, Config.admin_jwt.secret, (err: any, authUser: any) => {
        if (err) return res.status(UN_AUTHORIZED).send({ status: 'error', message: 'Invalid access token or token expired', errors: err });
        Object.assign(req, { authUser });
        next();
    });
};
