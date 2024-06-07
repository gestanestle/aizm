import { eq } from "drizzle-orm";
import { db } from "./db";
import { machines } from "./schema";

export const queryLastHour = (id: string) =>
  db.select().from(machines).where(eq(machines.id, id)).limit(30);

export const queryLast6Hours = (id: string) =>
  db.select().from(machines).where(eq(machines.id, id)).limit(180);

export const queryLast12Hours = (id: string) =>
  db.select().from(machines).where(eq(machines.id, id)).limit(360);
