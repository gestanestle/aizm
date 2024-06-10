import { InferSelectModel } from "drizzle-orm";
import { conditions, machines, users } from "./schema";

export type User = typeof users.$inferInsert;
export type Machine = typeof machines.$inferInsert;
export type Conditions = typeof conditions.$inferInsert;

type SelectUser = InferSelectModel<typeof users>;
