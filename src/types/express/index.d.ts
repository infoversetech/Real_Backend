export {};

export interface AuthUser {
    id: number;
    firstName: string | null;
    lastName: string | null;
    email: string;
    mobile: string | null;
    role: string | null;
}

declare global {
    namespace Express {
        export interface Request {
            authUser: AuthUser;
        }
    }
}
