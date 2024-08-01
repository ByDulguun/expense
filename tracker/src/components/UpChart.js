"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const chartData = [
  { month: "January", desktop: 3000, mobile: 2000 },
  { month: "February", desktop: 3000, mobile: 2000 },
  { month: "March", desktop: 3000, mobile: 2000 },
  { month: "April", desktop: 3000, mobile: 2000 },
  { month: "May", desktop: 3000, mobile: 2000 },
  { month: "June", desktop: 3000, mobile: 2000 },
  { month: "July", desktop: 3000, mobile: 2000 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#84CC16",
  },
  mobile: {
    label: "Mobile",
    color: "#F97316",
  },
};

export const UpChart = () => {
  return (
    <ChartContainer config={chartConfig} className="h-[240px] w-full py-8  ">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <Bar
          dataKey="desktop"
          fill="var(--color-desktop)"
          radius={[28, 28, 0, 0]}
        />
        <Bar
          dataKey="mobile"
          fill="var(--color-mobile)"
          radius={[28, 28, 0, 0]}
        />
      </BarChart>
    </ChartContainer>
  );
};
