import { prisma } from '../db';

export const propertyService = {
    async create(data: any) {
        return await prisma.property.create({ data });
    },

    async getAll(userId: number) {
        return await prisma.property.findMany({
            where: {
                userId
            }
        });
    },

    async getAllForAdmin() {
        return await prisma.property.findMany();
    },

    async getUserPropertyById(id: number, userId: number) {
        return await prisma.property.findFirst({
            where: { id, userId }
        });
    },

    async getById(id: number) {
        return await prisma.property.findFirst({
            where: { id }
        });
    },

    async update(id: number, data: any) {
        return await prisma.property.update({
            where: { id },
            data
        });
    }
};
