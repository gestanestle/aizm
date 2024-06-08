import { pgTable, real, timestamp, varchar } from "drizzle-orm/pg-core";

export const conditions = pgTable("conditions", {
  id: varchar("id").notNull(),
  time: timestamp("time", { precision: 4, withTimezone: true }).notNull(),
  temp: real("temp").notNull(),
  humidity: real("humidity").notNull(),
});
