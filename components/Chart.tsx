"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data: { time: string; temperature: number; humidity: number }[] = [];

const startTime = new Date();

for (let i = 0; i < 15; i++) {
  const time = new Date(startTime.getTime() + i * 2 * 60 * 1000);

  data.push({
    time: time.getHours().toString() + ":" + time.getMinutes().toString(),
    temperature: Math.floor(Math.random() * (35 - 15 + 1)) + 15,
    humidity: Math.floor(Math.random() * (80 - 20 + 1)) + 20,
  });
}

console.log(data);

export default function Chart({ id }: { id: string }) {
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
