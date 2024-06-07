import { pgTable, real, timestamp, varchar } from "drizzle-orm/pg-core";

export const machines = pgTable("Machine", {
  id: varchar("id").primaryKey(),
  time: timestamp("time", { precision: 4, withTimezone: true }),
  temp: real("temp"),
  humidity: real("humidity"),
});
