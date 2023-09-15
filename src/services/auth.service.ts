import { prisma } from "../db";

export const authService = {
    async getAdminByEmail (email: string) {
        return await prisma.admin.findFirst({
            where: {
                email
            }
        });
    },    
    async getUserByEmail (email: string) {
        return await prisma.user.findFirst({
            where: {
                email
            }
        });
    },
};