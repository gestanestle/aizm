import { z } from "zod";

export const machine = z.object({
  id: z.string(),
  time: z.date(),
  temp: z.number(),
  humidity: z.number(),
});

export type Machine = z.infer<typeof machine>;
