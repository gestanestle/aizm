import { db } from "./db";
import { conditions, machines, users } from "./schema";
import { Conditions, Machine, User } from "./types";

export const insertUser = (u: User) => db.insert(users).values(u);

export const insertMachine = (m: Machine) => db.insert(machines).values(m);

export const insertConditions = (c: Conditions) =>
  db.insert(conditions).values(c);
