import { eq } from "drizzle-orm";
import {
  InsertConditions,
  InsertMachine,
  InsertSettings,
  InsertUser,
} from "./types";
import { db } from "./db";
import { conditions, machines, settings, users } from "./schema";

export const insertUser = (u: InsertUser) => db.insert(users).values(u).returning({ id: users.id });

export const insertMachine = (m: InsertMachine) =>
  db.insert(machines).values(m);

export const insertSettings = (s: InsertSettings) =>
  db.insert(settings).values(s);

export const updateSettings = (s: InsertSettings) =>
  db
    .update(settings)
    .set({
      temp: s.temp,
      humidity: s.humidity,
      tRange: s.tRange,
      hRange: s.hRange,
    })
    .where(eq(settings.id, s.id));

export const insertConditions = (c: InsertConditions) =>
  db.insert(conditions).values(c).onConflictDoNothing();
