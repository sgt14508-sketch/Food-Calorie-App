"use client";

import { motion } from "framer-motion";
import CountUp from "./count-up";

export interface Meal {
  id: number;
  food: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  confidence: number;
  timestamp: string;
}

export function loadHistory(): Meal[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem("mealHistory");
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveMeal(meal: Meal) {
  const history = loadHistory();
  // Guarantee a unique ID even when two meals share the same millisecond
  const uniqueId = Date.now() + Math.floor(Math.random() * 1000);
  history.unshift({ ...meal, id: uniqueId });
  localStorage.setItem("mealHistory", JSON.stringify(history.slice(0, 50)));
}

export function clearHistory() {
  localStorage.removeItem("mealHistory");
}

export default function History({ meals }: { meals: Meal[] }) {
  if (meals.length === 0) {
    return (
      <div className="bg-veggy-cream rounded-3xl p-8 shadow-xl text-center text-veggy-dark/60 border border-veggy-dark/10">
        No meals logged yet. Upload your first meal above. 🍽️
      </div>
    );
  }

  const total = meals.reduce((sum, m) => sum + m.calories, 0);

  // Deduplicate by id in case of legacy duplicated data
  const seen = new Set<number>();
  const uniqueMeals = meals.filter((m) => {
    if (seen.has(m.id)) return false;
    seen.add(m.id);
    return true;
  });

  return (
    <div className="bg-veggy-cream rounded-3xl p-8 shadow-xl border border-veggy-dark/10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-serif text-2xl text-veggy-dark">
          Meal History ({uniqueMeals.length})
        </h2>
        <div className="text-right">
          <p className="text-xs text-veggy-dark/50">Total calories</p>
          <p className="font-serif text-2xl text-veggy-purple">
            <CountUp end={total} /> kcal
          </p>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {uniqueMeals.map((meal, i) => (
          <motion.div
            key={meal.id}
            className="bg-white rounded-2xl p-4 flex items-center justify-between border border-veggy-dark/10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <div>
              <p className="font-semibold text-veggy-dark">{meal.food}</p>
              <p className="text-xs text-veggy-dark/50">
                {new Date(meal.timestamp).toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold text-veggy-purple">
                {meal.calories} kcal
              </p>
              <p className="text-xs text-veggy-dark/60">
                P {meal.protein}g · C {meal.carbs}g · F {meal.fat}g
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}