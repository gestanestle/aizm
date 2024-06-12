import { sql } from "drizzle-orm";
import { db } from "./db";

export const queryID = db.query.machines
  .findFirst({
    where: (machines, { eq }) => eq(machines.id, sql.placeholder("id")),
  })
  .prepare("queryID");

export const queryMachines = db.query.machines
  .findMany({
    where: (machines, { eq }) => eq(machines.admin, sql.placeholder("admin")),
    with: {
      settings: {
        columns: {
          id: false,
        },
      },
    },
  })
  .prepare("queryMachines");

export const queryConditions = db.query.conditions
  .findMany({
    where: (conditions, { eq }) => eq(conditions.id, sql.placeholder("id")),
    orderBy: (conditions, { desc }) => [desc(conditions.time)],
    limit: sql.placeholder("limit"),
  })
  .prepare("queryConditions");
