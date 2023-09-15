import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Config } from '../config/index';
import { AuthUser } from '../types/express';

export const comparePassword = (password: string, hashPassword: string) => {
    return bcrypt.compareSync(password, hashPassword);
};

export const createToken = (authUser: AuthUser, userType: 'admin_jwt' | 'user_jwt') => {
    const { expiry, secret, issuer } = Config[userType];
    return jwt.sign(authUser, secret, { algorithm: 'HS256', expiresIn: expiry, issuer: issuer });
};
