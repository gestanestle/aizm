import { relations } from "drizzle-orm";
import { pgTable, real, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  fname: varchar("fname"),
  lname: varchar("lname"),
});

export const machines = pgTable("machines", {
  id: varchar("id").primaryKey(),
  admin: varchar("admin").references(() => users.id),
});

export const conditions = pgTable("conditions", {
  id: varchar("id").references(() => machines.id),
  time: timestamp("time", { precision: 4, withTimezone: true }).notNull(),
  temp: real("temp").notNull(),
  humidity: real("humidity").notNull(),
});

export const usersToMachines = relations(users, ({ many }) => ({
  machines: many(machines),
}));

export const machinesToUsers = relations(machines, ({ one }) => ({
  admin: one(users, {
    fields: [machines.admin],
    references: [users.id],
  }),
}));

export const machinesToConditions = relations(machines, ({ many }) => ({
  conditions: many(conditions),
}));

export const conditionsToMachines = relations(conditions, ({ one }) => ({
  machineID: one(machines, {
    fields: [conditions.id],
    references: [machines.id],
  }),
}));
