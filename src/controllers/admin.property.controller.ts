import { Request } from 'express';

import { CResponse } from '../types/response';
import { statusCode } from '../constants/status-codes';
import { Property } from '@prisma/client';
import { propertyService } from '../services/property.service';
const { OK, NOT_FOUND } = statusCode;

export const adminPropertyController = {
    async getAll(req: Request, res: CResponse<Property[]>) {
        const data = await propertyService.getAllForAdmin();
        return res.status(OK).send({ status: 'success', data, message: 'Admin Property fetched successfully' });
    },

    async getById(req: Request, res: CResponse<Property>) {
        const data = await propertyService.getById(Number(req.params.id));
        if (!data) {
            return res.status(NOT_FOUND).send({ status: 'error', message: 'Property not found' });
        }
        return res.status(OK).send({ status: 'success', data, message: 'Admin Property details' });
    },

    async changeStatus(req: Request, res: CResponse<Property>) {
        const chkProperty = await propertyService.getById(Number(req.params.id));
        if (!chkProperty) {
            return res.status(NOT_FOUND).send({ status: 'error', message: 'Property not found' });
        }
        const { isVerified } = req.body;

        const data = await propertyService.update(Number(req.params.id), { isVerified: isVerified ? 1 : 0 });
        return res.status(OK).send({ status: 'success', data, message: 'Admin Property change status' });
    }
};
