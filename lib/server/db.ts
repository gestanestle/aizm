import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import postgres from "postgres";

const connString = process.env.DB_URL || "";
const client = postgres(connString);
export const db = drizzle(client, { schema });
