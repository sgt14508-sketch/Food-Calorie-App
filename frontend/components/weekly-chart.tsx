"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Meal } from "./history";

export default function WeeklyChart({ meals }: { meals: Meal[] }) {
  // Group by day for last 7 days
  const days: { day: string; calories: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const label = d.toLocaleDateString("en-US", { weekday: "short" });

    const dayTotal = meals
      .filter((m) => {
        const mealDate = new Date(m.timestamp);
        return (
          mealDate.getFullYear() === d.getFullYear() &&
          mealDate.getMonth() === d.getMonth() &&
          mealDate.getDate() === d.getDate()
        );
      })
      .reduce((sum, m) => sum + m.calories, 0);

    days.push({ day: label, calories: dayTotal });
  }

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-green-100">
      <h2 className="text-2xl font-bold text-green-700 mb-6">
        📊 Weekly Calorie Intake
      </h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={days}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #d1fae5",
                backgroundColor: "#ffffff",
              }}
            />
            <Bar dataKey="calories" fill="#22c55e" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}