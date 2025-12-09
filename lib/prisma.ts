import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
    prisma?: PrismaClient;
};

// pool de conexões usando a DATABASE_URL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// adapter Prisma ↔ pg
const adapter = new PrismaPg(pool);

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        adapter, // resolve o erro do "engine type client"
    });

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
