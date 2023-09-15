import { Response } from 'express';
import { Admin } from '@prisma/client';
import { User } from '@prisma/client';

export interface StandardResponse<T> {
    status: 'success' | 'error';
    message?: string;
    data?: T;
    errors?: Record<string | any>;
}

export interface CResponse<T = unknown> extends Response<StandardResponse<T>> {}

export type AdminResponse = Omit<Admin, 'password' | 'isActive' | 'isDeleted'>;

export type UserResponse = Omit<User, 'password' | 'isActive' | 'isDeleted' | 'resetPasswordToken' | 'isEmailVerified' | 'isMobileVerified'>;
