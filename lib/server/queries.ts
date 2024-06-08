import { sql } from "drizzle-orm";
import { db } from "./db";

export const queryConditions = db.query.conditions
  .findMany({
    where: (conditions, { eq }) => eq(conditions.id, sql.placeholder("id")),
    orderBy: (conditions, { desc }) => [desc(conditions.time)],
    limit: sql.placeholder("limit"),
  })
  .prepare("queryConditions");
