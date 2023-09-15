import { Prisma } from '@prisma/client';
import { prisma } from '../db';

const selectFields: Prisma.RoleSelect = {
    id: true,
    roleName: true,
    roleText: true
};

export const roleService = {
    async getByRoleName(roleName: string) {
        return await prisma.role.findFirst({
            where: {
                roleName
            }
        });
    },

    async create(data: Prisma.RoleCreateInput) {
        return await prisma.role.create({ data });
    },

    async getAll() {
        return await prisma.role.findMany({
            select: selectFields
        });
    },

    async getById(id: number) {
        return await prisma.role.findFirst({
            where: { id },
            select: selectFields
        });
    },

    async update(id: number, data: Prisma.RoleUpdateInput) {
        return await prisma.role.update({
            where: { id },
            data
        });
    },

    async delete(id: number) {
        return await prisma.role.delete({
            where: { id }
        });
    },

    async getByRoleIdAndName(id: number, roleName: string) {
        return await prisma.role.findFirst({
            where: { roleName, NOT: { id } }
        });
    }
};
