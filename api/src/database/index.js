const { neon } = require("@neondatabase/serverless");
const { drizzle } = require("drizzle-orm/neon-http");
const schema = require("./schema.js");
const { config } = require("dotenv");

config();

const sql = neon(process.env.DRIZZlE_DATABASE_URL);

const db = drizzle(sql, { schema });

module.exports = { db };
