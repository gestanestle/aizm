"use client";

import { FormattedState } from "@/lib/server/types";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Chart({ data }: { data: FormattedState[] }) {
  return (
    <ResponsiveContainer width={"100%"} height={250}>
      <AreaChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="oklch(var(--p))" stopOpacity={1.0} />
            <stop offset="95%" stopColor="oklch(var(--p))" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="oklch(var(--s))" stopOpacity={1.0} />
            <stop offset="95%" stopColor="oklch(var(--s))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="time"
          style={{
            fontSize: "0.8rem",
          }}
          reversed={true}
        />
        <YAxis
          style={{
            fontSize: "0.8rem",
          }}
        />
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          horizontal={false}
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="temperature"
          stroke="oklch(var(--p))"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Area
          type="monotone"
          dataKey="humidity"
          stroke="oklch(var(--s))"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
