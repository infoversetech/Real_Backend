import { prisma } from '../db';

export const userService = {
    async getByEmail(email: string) {
        return await prisma.user.findFirst({
            where: {
                email
            }
        });
    },

    async create(data: any) {
        return await prisma.user.create({ data });
    },

    async getAll() {
        return await prisma.user.findMany({
            where: {
                isDeleted: 0,
                isActive: 1
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                mobile: true,
                roleId: true
            }
        });
    },

    async getById(id: number) {
        return await prisma.user.findFirst({
            where: { id }
        });
    },

    async update(id: number, data: any) {
        return await prisma.user.update({
            where: { id },
            data: data
        });
    },

    async delete(id: number) {
        return await prisma.user.update({
            where: { id },
            data: { isActive: 0, isDeleted: 1 }
        });
    },

    async getByUserIdAndEmail(id: number, email: string) {
        return await prisma.user.findFirst({
            where: { email, NOT: { id } }
        });
    }
};
