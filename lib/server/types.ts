import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { conditions, machines, settings, users } from "./schema";

export type SelectUser = InferSelectModel<typeof users>;
export type SelectMachine = InferSelectModel<typeof machines>;
export type SelectConditions = InferSelectModel<typeof conditions>;

export type InsertUser = InferInsertModel<typeof users>;
export type InsertMachine = InferInsertModel<typeof machines>;
export type InsertSettings = InferInsertModel<typeof settings>;
export type InsertConditions = InferInsertModel<typeof conditions>;

export enum Status {
  HEALTHY,
  UNHEALTHY,
  UNSET,
}
