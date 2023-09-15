import { config } from 'dotenv';

config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const ROUNDS = process.env.SALT_ROUNDS ? Number(process.env.SALT_ROUNDS) : 12;

export const Config = {
    env: {
        name: process.env.NODE_ENV!
    },
    postgres: {
        url: process.env.DATABASE_URL!
    },
    server: {
        port: PORT,
        host: process.env.HOST!
    },
    admin_jwt: {
        secret: process.env.ADMIN_TOKEN_SECRET!,
        expiry: process.env.TOKEN_EXPIRY!,
        issuer: process.env.TOKEN_ISSUER!
    },
    user_jwt: {
        secret: process.env.ACCESS_TOKEN_SECRET!,
        expiry: process.env.TOKEN_EXPIRY!,
        issuer: process.env.TOKEN_ISSUER!
    },
    salt: {
        rounds: ROUNDS
    }
};
