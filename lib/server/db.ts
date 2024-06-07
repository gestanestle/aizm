import { drizzle } from "drizzle-orm/better-sqlite3";
import postgres from "postgres";

const connString = process.env.DB_URL || "";
const client = postgres(connString);
export const db = drizzle(client);
