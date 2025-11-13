import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "turso",
  schema: "./db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.EXPO_PUBLIC_TURSO_DB_URL!,
    authToken: process.env.EXPO_PUBLIC_TURSO_DB_AUTH_TOKEN!,
  },
});
