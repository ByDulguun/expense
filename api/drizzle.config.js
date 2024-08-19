import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/database/schema.ts",
  dialect: "postgresql",
  out: "./drizzle",
  verbose: true,
});
