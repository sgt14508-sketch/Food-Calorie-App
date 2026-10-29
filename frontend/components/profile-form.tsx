"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export interface Profile {
  sex: "male" | "female";
  age: number;
  weight: number;
  height: number;
  activity: "sedentary" | "light" | "moderate" | "active";
  goal: "lose" | "maintain" | "gain";
}

export function calculateTarget(p: Profile): number {
  const bmr =
    p.sex === "male"
      ? 10 * p.weight + 6.25 * p.height - 5 * p.age + 5
      : 10 * p.weight + 6.25 * p.height - 5 * p.age - 161;

  const mult = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725 }[
    p.activity
  ];
  const tdee = bmr * mult;
  const adj = { lose: -500, maintain: 0, gain: 300 }[p.goal];

  return Math.round(tdee + adj);
}

export default function ProfileForm({
  onSave,
  initial,
}: {
  onSave: (p: Profile) => void;
  initial?: Profile;
}) {
  const [p, setP] = useState<Profile>(
    initial || {
      sex: "male",
      age: 21,
      weight: 65,
      height: 170,
      activity: "moderate",
      goal: "maintain",
    }
  );

  const inputClass =
    "w-full mt-1 p-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-8 shadow-2xl border border-green-100"
    >
      <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
        🎯 Your Daily Calorie Target
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-slate-600">Sex</label>
          <select
            value={p.sex}
            onChange={(e) => setP({ ...p, sex: e.target.value as any })}
            className={inputClass}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-600">Age</label>
          <input
            type="number"
            value={p.age}
            onChange={(e) => setP({ ...p, age: Number(e.target.value) || 0 })}
            className={inputClass}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-600">
            Weight (kg)
          </label>
          <input
            type="number"
            value={p.weight}
            onChange={(e) => setP({ ...p, weight: Number(e.target.value) || 0 })}
            className={inputClass}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-600">
            Height (cm)
          </label>
          <input
            type="number"
            value={p.height}
            onChange={(e) => setP({ ...p, height: Number(e.target.value) || 0 })}
            className={inputClass}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-600">Activity</label>
          <select
            value={p.activity}
            onChange={(e) => setP({ ...p, activity: e.target.value as any })}
            className={inputClass}
          >
            <option value="sedentary">Sedentary</option>
            <option value="light">Light</option>
            <option value="moderate">Moderate</option>
            <option value="active">Active</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-600">Goal</label>
          <select
            value={p.goal}
            onChange={(e) => setP({ ...p, goal: e.target.value as any })}
            className={inputClass}
          >
            <option value="lose">Lose Weight</option>
            <option value="maintain">Maintain</option>
            <option value="gain">Gain Weight</option>
          </select>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-slate-500 mb-2">Your daily target</p>
        <p className="text-4xl font-bold text-green-600">
          {calculateTarget(p)} kcal
        </p>
      </div>

      <motion.button
        onClick={() => onSave(p)}
        className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-2xl"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
      >
        Save Target
      </motion.button>
    </motion.div>
  );
}