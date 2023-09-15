import { Request, Response } from 'express';
import { LoginRequest } from '../types/common';
import { authService } from '../services/auth.service';
import { comparePassword, createToken } from '../utils';

import { statusCode } from '../constants/status-codes';
import { CResponse } from '../types/response';
const { OK, BAD_REQUEST, SERVER_ERROR } = statusCode;

export const authController = {
    async adminLogin(req: Request<{}, {}, LoginRequest>, res: CResponse<any>) {
        const admin = await authService.getAdminByEmail(req.body.email);
        if (!admin) return res.status(BAD_REQUEST).send({ status: 'error', message: 'Invalid email address provided' });

        if (!comparePassword(req.body.password, admin.password)) return res.status(BAD_REQUEST).send({ status: 'error', message: 'Invalid password provided' });

        const { id, firstName, lastName, email, mobile } = admin;
        const token = createToken({ id, firstName, lastName, email, mobile, role: null }, 'admin_jwt');

        if (!token) return res.status(SERVER_ERROR).send({ status: 'error', message: 'Unable to create token..! Try again' });

        return res.status(OK).send({ status: 'success', data: { token, admin: { id, firstName, lastName, email, mobile } }, message: 'Token generated successfully' });
    },

    async userLogin(req: Request<{}, {}, LoginRequest>, res: CResponse<any>) {
        const user = await authService.getUserByEmail(req.body.email);
        if (!user) return res.status(BAD_REQUEST).send({ status: 'error', message: 'Invalid email address provided' });

        if (!comparePassword(req.body.password, user.password)) return res.status(BAD_REQUEST).send({ status: 'error', message: 'Invalid password provided' });

        const { id, firstName, lastName, email, mobile, roleId } = user;
        const token = createToken({ id, firstName, lastName, email, mobile, role: roleId.toString() }, 'user_jwt');

        if (!token) return res.status(SERVER_ERROR).send({ status: 'error', message: 'Unable to create token..! Try again' });

        return res.status(OK).send({
            status: 'success',
            data: { token, user: { id, firstName, lastName, email, mobile, roleId } },
            message: 'Token generated successfully'
        });
    },

    async checkToken(req: Request, res: Response) {
        const { authUser } = req;

        return res.send({
            message: 'from user login',
            data: authUser
        });
    }
};
