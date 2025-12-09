// import path from "node:path";
// import "dotenv/config";
// import { defineConfig, env } from "prisma/config";

// export default defineConfig({
//     // engine "classic" (compatível com generator prisma-client-js)
//     // engine: "classic",

//     // schema
//     schema: path.join("prisma", "schema.prisma"),

//     // migration
//     migrations: {
//         path: path.join("prisma", "migrations"),
//     },


//     datasource: {
//         url: env("DATABASE_URL"),
//         // directUrl: env("POSTGRES_URL_NON_POOLING"),
//     },
// });

import path from "node:path";
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
    // engine: "classic",

    schema: path.join("prisma", "schema.prisma"),

    migrations: {
        path: path.join("prisma", "migrations"),
    },

    datasource: {
        // Prisma vai usar essa URL principal
        url: env("DATABASE_URL"),
        // Opcional: shadow DB para migrações (aqui uso tua URL non-pooling)
        shadowDatabaseUrl: env("POSTGRES_URL_NON_POOLING"),
    },
});
