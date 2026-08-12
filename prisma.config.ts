import { defineConfig } from "prisma/config";

process.env.DATABASE_URL ??=
  "postgresql://rabelo:rabelo@localhost:5432/rabelorochadv?schema=public";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
