"use client";

import { motion } from "framer-motion";

const bars = [
  { label: "Protein", key: "protein", color: "from-orange-400 to-orange-500", max: 50 },
  { label: "Carbs",   key: "carbs",   color: "from-blue-400 to-blue-500",     max: 80 },
  { label: "Fat",     key: "fat",     color: "from-pink-400 to-pink-500",     max: 40 },
];

export default function MacroBars({ data }: { data: any }) {
  return (
    <div className="space-y-4 mt-6">
      {bars.map((b, i) => {
        const val = data[b.key] || 0;
        const pct = Math.min((val / b.max) * 100, 100);
        return (
          <div key={b.key}>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-slate-700">{b.label}</span>
              <span className="text-slate-500">{val} g</span>
            </div>
            <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${b.color} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 1.2, delay: i * 0.15, ease: "easeOut" }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}