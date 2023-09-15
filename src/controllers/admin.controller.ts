import { Request } from 'express';
import { hashSync, genSaltSync } from 'bcryptjs';
import { Config } from '../config/index';
import { AdminResponse, CResponse } from '../types/response';
import { adminService } from '../services/admin.service';
import { Admin } from '@prisma/client';
import { statusCode } from '../constants/status-codes';
const { OK, BAD_REQUEST, CREATED, NOT_FOUND } = statusCode;

const createAdminResponse = (admin: Admin): AdminResponse => {
    const { id, firstName, lastName, email, mobile } = admin;
    return { id, firstName, lastName, email, mobile };
};

export const adminController = {
    async create(req: Request, res: CResponse<AdminResponse>) {
        //Collect all the body parameters
        const { firstName, lastName, email, password, mobile } = req.body;

        //Check if admin with same email id exists
        const admin = await adminService.getByEmail(email);
        if (admin) {
            return res.status(BAD_REQUEST).send({ status: 'error', message: 'Admin with same email already exists' });
        }

        //Create the data for making entry to the database
        const dataToSave = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashSync(password, genSaltSync(Config.salt.rounds)),
            mobile: mobile
        };

        // Insert the data to the database
        const newAdmin = await adminService.create(dataToSave);

        //Create the response and send to user
        const data = createAdminResponse(newAdmin);

        return res.status(CREATED).send({ status: 'success', data, message: 'Admin created successfully' });
    },

    async getAll(req: Request, res: CResponse<AdminResponse[]>) {
        const data = await adminService.getAll();
        return res.status(OK).send({ status: 'success', data, message: 'Admins fetched successfully' });
    },

    async getById(req: Request, res: CResponse<AdminResponse>) {
        const admin = await adminService.getById(Number(req.params.id));
        if (!admin) {
            return res.status(NOT_FOUND).send({ status: 'error', message: 'Admin not found' });
        }

        const data = createAdminResponse(admin);

        return res.status(OK).json({ status: 'success', data, message: 'Admin fetched successfully' });
    },

    async update(req: Request, res: CResponse<AdminResponse>) {
        //Collect all the body parameters
        const { firstName, lastName, email, password, mobile } = req.body;

        const isAdminFound = await adminService.getById(Number(req.params.id));
        if (!isAdminFound) {
            return res.status(NOT_FOUND).send({ status: 'error', message: 'Admin not found' });
        }

        //Check if admin with same email id exists
        const chkAdmin = await adminService.getByAdminIdAndEmail(Number(req.params.id), email);
        if (chkAdmin) {
            return res.status(BAD_REQUEST).send({ status: 'error', message: 'Admin with same email already exists' });
        }

        //Create the data for making entry to the database
        const dataToUpdate = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashSync(password, genSaltSync(Config.salt.rounds)),
            mobile: mobile
        };

        // Insert the data to the database
        const admin = await adminService.update(Number(req.params.id), dataToUpdate);

        //Create the response and send to user
        const data = createAdminResponse(admin);

        return res.status(OK).send({ status: 'success', data, message: 'Admin updated successfully' });
    },

    async delete(req: Request, res: CResponse<AdminResponse>) {
        const admin = await adminService.delete(Number(req.params.id));
        if (!admin) {
            return res.status(NOT_FOUND).send({ status: 'error', message: 'Admin not found' });
        }
        const data = createAdminResponse(admin);

        return res.status(OK).send({ status: 'success', data, message: 'Admin deleted successfully' });
    }
};
