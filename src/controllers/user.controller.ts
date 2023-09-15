import { Request } from 'express';
import { hashSync, genSaltSync } from 'bcryptjs';
import { Config } from '../config/index';
import { UserResponse, CResponse } from '../types/response';
import { userService } from '../services/user.service';
import { User } from '@prisma/client';
import { statusCode } from '../constants/status-codes';
const { OK, BAD_REQUEST, CREATED, NOT_FOUND } = statusCode;

const createUserResponse = (user: User): UserResponse => {
    const { id, firstName, lastName, email, mobile, roleId } = user;
    return { id, firstName, lastName, email, mobile, roleId };
};

export const userController = {
    async create(req: Request, res: CResponse<UserResponse>) {
        //Collect all the body parameters
        const { firstName, lastName, email, password, mobile, roleId } = req.body;

        //Check if user with same email id exists
        let user = await userService.getByEmail(email);
        if (user) {
            return res.status(BAD_REQUEST).send({ status: 'error', message: 'User with same email already exists' });
        }

        //Create the data for making entry to the database
        const dataToSave = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashSync(password, genSaltSync(Config.salt.rounds)),
            mobile: mobile,
            roleId: roleId
        };

        // Insert the data to the database
        let newUser = await userService.create(dataToSave);

        //Create the response and send to user
        const data = createUserResponse(newUser);

        return res.status(CREATED).send({ status: 'success', data, message: 'User created successfully' });
    },

    async getAll(req: Request, res: CResponse<UserResponse[]>) {
        const data = await userService.getAll();
        return res.status(OK).send({ status: 'success', data, message: 'Users fetched successfully' });
    },

    async getById(req: Request, res: CResponse<UserResponse>) {
        const user = await userService.getById(Number(req.params.id));
        if (!user) {
            return res.status(NOT_FOUND).send({ status: 'error', message: 'User not found' });
        }
        const data = createUserResponse(user);
        return res.status(OK).json({ status: 'success', data, message: 'User fetched successfully' });
    },

    async update(req: Request, res: CResponse<UserResponse>) {
        //Collect all the body parameters
        const { firstName, lastName, email, password, mobile, roleId } = req.body;

        const isUserFound = await userService.getById(Number(req.params.id));
        if (!isUserFound) {
            return res.status(NOT_FOUND).send({ status: 'error', message: 'User not found' });
        }

        //Check if user with same email id exists
        let chkUser = await userService.getByUserIdAndEmail(Number(req.params.id), email);
        if (chkUser) {
            return res.status(BAD_REQUEST).send({ status: 'error', message: 'User with same email already exists' });
        }

        //Create the data for making entry to the database
        const dataToUpdate = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashSync(password, genSaltSync(Config.salt.rounds)),
            mobile: mobile,
            roleId: roleId
        };

        // Insert the data to the database
        let user = await userService.update(Number(req.params.id), dataToUpdate);

        //Create the response and send to user
        const data = createUserResponse(user);

        return res.status(OK).send({ status: 'success', data, message: 'User updated successfully' });
    },

    async delete(req: Request, res: CResponse<UserResponse>) {
        const user = await userService.delete(Number(req.params.id));
        if (!user) {
            return res.status(NOT_FOUND).send({ status: 'error', message: 'User not found' });
        }
        const data = createUserResponse(user);
        return res.status(OK).send({ status: 'success', data, message: 'User deleted successfully' });
    }
};
