import { prisma } from '../db';

export const masterService = {
    async getAll() {
        return await prisma.master.findMany();
    }
};
