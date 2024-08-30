"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { useContext } from "react";
import { CategoryContext } from "../utils/CategoryContext";
import "./IncomeExpenseChart.css"; // Import your CSS file

export const IncomeExpenseChart = () => {
  const { categories } = useContext(CategoryContext);

  // Check if categories data is available and log it
  console.log(categories);

  // Define the minimum amount for filtering
  const minAmount = 500;

  // Aggregate data based on month and status
  const aggregateData = categories.reduce((acc, data) => {
    const month = new Date(data.date).toLocaleString("default", {
      month: "short",
    });

    if (!acc[month]) {
      acc[month] = { month, income: 0, expense: 0 };
    }

    if (data.status === "income") {
      acc[month].income += parseFloat(data.amount);
    } else if (data.status === "expense") {
      acc[month].expense += parseFloat(data.amount);
    }

    return acc;
  }, {});

  // Convert aggregated data to array format
  const chartData = Object.values(aggregateData);

  // Calculate sums for last month and this month (assuming 'categories' data has 'date' field for filtering)
  const now = new Date();
  const lastMonth = new Date(now.setMonth(now.getMonth() - 1)).toLocaleString(
    "default",
    { month: "short" }
  );
  const thisMonth = new Date().toLocaleString("default", { month: "short" });

  const incomeSumLastMonth = categories
    .filter(
      (data) =>
        new Date(data.date).toLocaleString("default", { month: "short" }) ===
          lastMonth && data.status === "income"
    )
    .reduce((acc, data) => acc + parseFloat(data.amount), 0);

  const expenseSumLastMonth = categories
    .filter(
      (data) =>
        new Date(data.date).toLocaleString("default", { month: "short" }) ===
          lastMonth && data.status === "expense"
    )
    .reduce((acc, data) => acc + parseFloat(data.amount), 0);

  const incomeSum = categories
    .filter(
      (data) =>
        new Date(data.date).toLocaleString("default", { month: "short" }) ===
          thisMonth && data.status === "income"
    )
    .reduce((acc, data) => acc + parseFloat(data.amount), 0);

  const expenseSum = categories
    .filter(
      (data) =>
        new Date(data.date).toLocaleString("default", { month: "short" }) ===
          thisMonth && data.status === "expense"
    )
    .reduce((acc, data) => acc + parseFloat(data.amount), 0);

  // Add data for last month and this month to chartData
  chartData.push(
    { month: "March", Income: 20000, Expense: 40000 },
    { month: "April", Income: 27300, Expense: 19000 },
    { month: "May", Income: 20000, Expense: 13000 },
    { month: "June", Income: 35000, Expense: 40000 },
    { month: "July", Income: 30000, Expense: 20000 },
    { month: "August", Income: incomeSum, Expense: expenseSum }
  );

  const chartConfig = {
    income: {
      label: "Income",
      color: "#22C55E",
    },
    expense: {
      label: "Expense",
      color: "#EF4444",
    },
  };

  return (
    <ChartContainer config={chartConfig} className="h-[240px] w-full py-8">
      <BarChart data={chartData} className="chart-container">
        <CartesianGrid vertical={false} className="chart-grid" />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
          className="chart-xaxis  "
        />
        <YAxis className="chart-yaxis" />
        <Tooltip className="chart-tooltip" />
        <Legend className="chart-legend" />
        <Bar
          dataKey="Income"
          name={chartConfig.income.label}
          fill={chartConfig.income.color}
          radius={[28, 28, 0, 0]}
          className="chart-bar"
        />
        <Bar
          dataKey="Expense"
          name={chartConfig.expense.label}
          fill={chartConfig.expense.color}
          radius={[28, 28, 0, 0]}
          className="chart-bar "
        />
      </BarChart>
    </ChartContainer>
  );
};
