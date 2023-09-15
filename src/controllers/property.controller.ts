import { Request } from 'express';

import { CResponse } from '../types/response';
import { Property } from '@prisma/client';
import { propertyService } from '../services/property.service';
import { masterService } from '../services/master.service';

import { masterNames } from '../constants/property';
import { statusCode } from '../constants/status-codes';

const { PROPERTY_FOR, PROPERTY_TYPE_AGRICULTURE, PROPERTY_TYPE_COMMERCIAL, PROPERTY_TYPE_RESIDENTIAL } = masterNames;
const { OK, CREATED, NOT_FOUND } = statusCode;

export const propertyController = {
    async create(req: Request, res: CResponse<Property>) {
        const { id: userId } = req.authUser;

        const dataToSave = {
            ...req.body,
            userId
        };

        const data = await propertyService.create(dataToSave);
        return res.status(CREATED).send({ status: 'success', data, message: 'Property saved successfully' });
    },

    async getAll(req: Request, res: CResponse<Property[]>) {
        const { id: userId } = req.authUser;

        const data = await propertyService.getAll(userId);
        return res.status(OK).send({ status: 'success', data, message: 'Property fetched successfully' });
    },

    // TODO: search api development
    async search(req: Request, res: CResponse<unknown>) {
        return res.status(OK).send({ status: 'success', data: [], message: 'Property search results' });
    },

    async getById(req: Request, res: CResponse<Property>) {
        const { id: userId } = req.authUser;

        const data = await propertyService.getUserPropertyById(Number(req.params.id), userId);

        if (!data) {
            return res.status(NOT_FOUND).send({ status: 'error', message: 'Property not found' });
        }

        return res.status(OK).send({ status: 'success', data, message: 'Property details' });
    },

    async update(req: Request, res: CResponse<Property>) {
        const { id: userId } = req.authUser;

        const chkProperty = await propertyService.getUserPropertyById(Number(req.params.id), userId);

        if (!chkProperty) {
            return res.status(NOT_FOUND).send({ status: 'error', message: 'Property not found' });
        }

        const data = await propertyService.update(Number(req.params.id), req.body);

        return res.status(OK).send({ status: 'success', data, message: 'Property updated successfully' });
    },

    async getMasters(req: Request, res: CResponse<unknown>) {
        const mastersData = await masterService.getAll();

        const propertyFor = mastersData.find((master) => master.name === PROPERTY_FOR)?.options;
        const agriculture = mastersData.find((master) => master.name === PROPERTY_TYPE_AGRICULTURE)?.options;
        const commercial = mastersData.find((master) => master.name === PROPERTY_TYPE_COMMERCIAL)?.options;
        const residential = mastersData.find((master) => master.name === PROPERTY_TYPE_RESIDENTIAL)?.options;

        const data = {
            propertyFor,
            propertyType: {
                agriculture,
                commercial,
                residential
            }
        };

        return res.status(OK).send({ status: 'success', data, message: 'Property master data' });
    }
};
