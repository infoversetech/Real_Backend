import { Request } from 'express';
import { CResponse } from '../types/response';
import { roleService } from '../services/role.service';
import { statusCode } from '../constants/status-codes';
const { OK, BAD_REQUEST, CREATED, NOT_FOUND } = statusCode;

export const roleController = {
    async create(req: Request, res: CResponse) {
        //Collect all the body parameters
        const { roleName, roleText } = req.body;

        //Check if role with same name id exists
        let role = await roleService.getByRoleName(roleName);
        if (role) {
            return res.status(BAD_REQUEST).send({ status: 'error', message: 'Role with same name already exists' });
        }

        //Create the data for making entry to the database
        const dataToSave = {
            roleName: roleName,
            roleText: roleText
        };

        // Insert the data to the database
        let newRole = await roleService.create(dataToSave);

        //Create the response and send to user
        const data = newRole;

        return res.status(CREATED).send({ status: 'success', data, message: 'Role created successfully' });
    },

    async getAll(req: Request, res: CResponse) {
        const data = await roleService.getAll();
        return res.status(OK).send({ status: 'success', data, message: 'Roles fetched successfully' });
    },

    async getOne(req: Request, res: CResponse) {
        const role = await roleService.getById(Number(req.params.id));
        if (!role) {
            return res.status(NOT_FOUND).send({ status: 'error', message: 'Role not found' });
        }
        const data = role;
        return res.status(OK).json({ status: 'success', data, message: 'Role fetched successfully' });
    },

    async update(req: Request, res: CResponse) {
        //Collect all the body parameters
        const { roleName, roleText } = req.body;

        const isRoleFound = await roleService.getById(Number(req.params.id));
        if (!isRoleFound) {
            return res.status(NOT_FOUND).send({ status: 'error', message: 'Role not found' });
        }

        //Check if role with same name id exists
        let chkUser = await roleService.getByRoleIdAndName(Number(req.params.id), roleName);
        if (chkUser) {
            return res.status(BAD_REQUEST).send({ status: 'error', message: 'Role with same name already exists' });
        }

        //Create the data for making entry to the database
        const dataToUpdate = {
            roleName: roleName,
            roleText: roleText
        };

        // Insert the data to the database
        const data = await roleService.update(Number(req.params.id), dataToUpdate);

        res.status(OK).send({ status: 'success', data, message: 'User updated successfully' });
    },

    async delete(req: Request, res: CResponse) {
        const role = await roleService.delete(Number(req.params.id));
        if (!role) {
            return res.status(NOT_FOUND).send({ status: 'error', message: 'Role not found' });
        }
        const data = role;
        return res.status(OK).send({ status: 'success', data, message: 'Role deleted successfully' });
    }
};
