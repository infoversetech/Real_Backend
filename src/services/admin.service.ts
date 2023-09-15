import { prisma } from '../db';

export const adminService = {
    async getByEmail(email: string) {
        return await prisma.admin.findFirst({
            where: {
                email
            }
        });
    },

    async create(data: any) {
        return await prisma.admin.create({ data });
    },

    async getAll() {
        return await prisma.admin.findMany({
            where: {
                isDeleted: 0,
                isActive: 1
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                mobile: true
            }
        });
    },

    async getById(id: number) {
        return await prisma.admin.findFirst({
            where: { id }
        });
    },

    async update(id: number, data: any) {
        return await prisma.admin.update({
            where: { id },
            data: data
        });
    },

    async delete(id: number) {
        return await prisma.admin.update({
            where: { id },
            data: { isActive: 0, isDeleted: 1 }
        });
    },

    async getByAdminIdAndEmail(id: number, email: string) {
        return await prisma.admin.findFirst({
            where: { email, NOT: { id } }
        });
    }
};
