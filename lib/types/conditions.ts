import { z } from "zod";

export const conditions = z.object({
  id: z.string(),
  time: z.date(),
  temp: z.number(),
  humidity: z.number(),
});

export type Conditions = z.infer<typeof conditions>;
