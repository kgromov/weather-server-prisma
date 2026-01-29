import "dotenv/config";
import {PrismaMariaDb} from '@prisma/adapter-mariadb';
import {PrismaClient} from "@prisma/client";

const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectionLimit: 5
});

const prisma = new PrismaClient({adapter});
prisma.$on('query', (e) => {
    console.log('Query: ' + e.query)
    console.log('Params: ' + e.params)
    console.log('Duration: ' + e.duration + 'ms')
});
prisma.$on('warn', (e) => {
    console.log(e);
});
prisma.$on('info', (e) => {
    console.log(e);
});
prisma.$on('error', (e) => {
    console.log(e);
});

export {prisma}