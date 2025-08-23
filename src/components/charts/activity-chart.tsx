"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  {
    time: "00:00",
    devices: 45,
    content: 32,
  },
  {
    time: "02:00",
    devices: 52,
    content: 38,
  },
  {
    time: "04:00",
    devices: 48,
    content: 35,
  },
  {
    time: "06:00",
    devices: 61,
    content: 42,
  },
  {
    time: "08:00",
    devices: 75,
    content: 58,
  },
  {
    time: "10:00",
    devices: 89,
    content: 67,
  },
  {
    time: "12:00",
    devices: 95,
    content: 78,
  },
  {
    time: "14:00",
    devices: 92,
    content: 82,
  },
  {
    time: "16:00",
    devices: 87,
    content: 75,
  },
  {
    time: "18:00",
    devices: 78,
    content: 68,
  },
  {
    time: "20:00",
    devices: 65,
    content: 55,
  },
  {
    time: "22:00",
    devices: 56,
    content: 48,
  },
];

export function ActivityChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data} style={{ backgroundColor: 'transparent' }}>
        <XAxis
          dataKey="time"
          stroke="var(--muted-foreground)"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="var(--muted-foreground)"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          labelStyle={{ color: "var(--popover-foreground)" }}
          contentStyle={{
            backgroundColor: "var(--popover)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            color: "var(--popover-foreground)",
            boxShadow: "var(--shadow-sm)",
          }}
        />
        <Line
          type="monotone"
          dataKey="devices"
          strokeWidth={2}
          stroke="var(--primary)"
          name="Dispositivos Activos"
          dot={{ fill: "var(--primary)", strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: "var(--primary)", strokeWidth: 2 }}
        />
        <Line
          type="monotone"
          dataKey="content"
          strokeWidth={2}
          stroke="oklch(0.858 0.145 162.5)" // Verde más claro de Figma (example.300)
          name="Contenido Mostrado"
          dot={{ fill: "oklch(0.858 0.145 162.5)", strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: "oklch(0.858 0.145 162.5)", strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
