import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  real,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  fname: varchar("fname"),
  lname: varchar("lname"),
});

export const machines = pgTable("machines", {
  id: varchar("id").primaryKey(),
  admin: varchar("admin").references(() => users.id),
});

export const settings = pgTable("settings", {
  id: varchar("id")
    .primaryKey()
    .references(() => machines.id),
  temp: real("temp").notNull(),
  humidity: real("humidity").notNull(),
  tRange: integer("trange").notNull(),
  hRange: integer("hrange").notNull(),
});

export const conditions = pgTable("conditions", {
  id: varchar("id")
    .references(() => machines.id)
    .notNull(),
  time: timestamp("time", { withTimezone: false }).notNull().unique(),
  temp: real("temp").notNull(),
  humidity: real("humidity").notNull(),
});

// Users to Machines = one-to-many
export const usersToMachines = relations(users, ({ many }) => ({
  machines: many(machines),
}));

// Machines to Users = many-to-one
export const machinesToUsers = relations(machines, ({ one }) => ({
  admin: one(users, {
    fields: [machines.admin],
    references: [users.id],
  }),
}));

// Machines to Settings = one-to-one
export const machinesToSettings = relations(machines, ({ one }) => ({
  settings: one(settings),
}));

// Settings to Machines = one-to-one
export const settingsToMachines = relations(settings, ({ one }) => ({
  admin: one(machines, {
    fields: [settings.id],
    references: [machines.id],
  }),
}));

// Machines to Conditions = one-to-many
export const machinesToConditions = relations(machines, ({ many }) => ({
  conditions: many(conditions),
}));

// Conditions to Machines = many-to-one
export const conditionsToMachines = relations(conditions, ({ one }) => ({
  machineID: one(machines, {
    fields: [conditions.id],
    references: [machines.id],
  }),
}));
