import path from "node:path";
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
    // caminho do schema
    schema: path.join("prisma", "schema.prisma"),

    // caminho das migrations (opcional, mas bom deixar explícito)
    migrations: {
        path: path.join("prisma", "migrations"),
    },

    // datasource principal (url vem do .env)
    datasource: {
        url: env("DATABASE_URL"),
        // se um dia quiser shadow DB:
        // shadowDatabaseUrl: env("POSTGRES_URL_NON_POOLING"),
    },
});
