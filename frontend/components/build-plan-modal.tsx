"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function BuildPlanModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    goal: "",
    weight: 70,
    height: 170,
    age: 25,
    sex: "male",
    activity: "moderate",
  });

  const [result, setResult] = useState<null | {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    plan: string;
  }>(null);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const calculate = () => {
    const bmr =
      answers.sex === "male"
        ? 10 * answers.weight + 6.25 * answers.height - 5 * answers.age + 5
        : 10 * answers.weight + 6.25 * answers.height - 5 * answers.age - 161;

    const mult: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
    };
    const tdee = bmr * mult[answers.activity];
    const adj = answers.goal === "lose" ? -500 : answers.goal === "gain" ? 300 : 0;
    const calories = Math.round(tdee + adj);

    const protein = Math.round((calories * 0.3) / 4);
    const carbs = Math.round((calories * 0.4) / 4);
    const fat = Math.round((calories * 0.3) / 9);

    const plan =
      answers.goal === "lose"
        ? "Cutting Plan"
        : answers.goal === "gain"
        ? "Bulking Plan"
        : "Maintenance Plan";

    setResult({ calories, protein, carbs, fat, plan });
    setStep(4);
  };

  const close = () => {
    onClose();
    setStep(1);
    setResult(null);
    setAnswers({
      goal: "",
      weight: 70,
      height: 170,
      age: 25,
      sex: "male",
      activity: "moderate",
    });
  };

  const input =
    "w-full p-3 rounded-xl border border-veggy-dark/20 bg-white text-veggy-dark focus:outline-none focus:ring-2 focus:ring-veggy-purple";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-veggy-dark/70 backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <motion.div
            className="bg-veggy-cream rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl"
            initial={{ scale: 0.9, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-veggy-dark p-6 flex items-center justify-between">
              <div>
                <p className="text-veggy-yellow text-[10px] tracking-[0.3em] mb-1">
                  BUILD YOUR PLAN
                </p>
                <h2 className="font-serif text-white text-2xl">
                  {step === 4 ? "Your Custom Plan" : `Step ${step} of 3`}
                </h2>
              </div>
              <button
                onClick={close}
                className="text-white/60 hover:text-white text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Progress bar */}
            <div className="h-1 bg-veggy-dark/10">
              <motion.div
                className="h-full bg-veggy-yellow"
                initial={{ width: "0%" }}
                animate={{ width: `${(step / 4) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {/* Body */}
            <div className="p-6">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <p className="text-veggy-dark/70 text-sm mb-2">
                    What's your primary goal?
                  </p>
                  {[
                    { id: "lose", label: "Lose weight", icon: "🔥" },
                    { id: "maintain", label: "Maintain weight", icon: "⚖️" },
                    { id: "gain", label: "Gain muscle", icon: "💪" },
                  ].map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setAnswers({ ...answers, goal: g.id })}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                        answers.goal === g.id
                          ? "border-veggy-yellow bg-veggy-yellow/10"
                          : "border-veggy-dark/10 hover:border-veggy-purple/50"
                      }`}
                    >
                      <span className="text-2xl">{g.icon}</span>
                      <span className="font-medium text-veggy-dark">
                        {g.label}
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-veggy-dark/70 mb-1 block">
                        Age
                      </label>
                      <input
                        type="number"
                        value={answers.age}
                        onChange={(e) =>
                          setAnswers({ ...answers, age: +e.target.value })
                        }
                        className={input}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-veggy-dark/70 mb-1 block">
                        Sex
                      </label>
                      <select
                        value={answers.sex}
                        onChange={(e) =>
                          setAnswers({ ...answers, sex: e.target.value })
                        }
                        className={input}
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-veggy-dark/70 mb-1 block">
                        Weight (kg)
                      </label>
                      <input
                        type="number"
                        value={answers.weight}
                        onChange={(e) =>
                          setAnswers({ ...answers, weight: +e.target.value })
                        }
                        className={input}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-veggy-dark/70 mb-1 block">
                        Height (cm)
                      </label>
                      <input
                        type="number"
                        value={answers.height}
                        onChange={(e) =>
                          setAnswers({ ...answers, height: +e.target.value })
                        }
                        className={input}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-3"
                >
                  <p className="text-veggy-dark/70 text-sm mb-2">
                    How active are you?
                  </p>
                  {[
                    { id: "sedentary", label: "Sedentary", desc: "Little or no exercise" },
                    { id: "light", label: "Lightly active", desc: "1-3 days/week" },
                    { id: "moderate", label: "Moderately active", desc: "3-5 days/week" },
                    { id: "active", label: "Very active", desc: "6-7 days/week" },
                  ].map((a) => (
                    <button
                      key={a.id}
                      onClick={() => setAnswers({ ...answers, activity: a.id })}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        answers.activity === a.id
                          ? "border-veggy-yellow bg-veggy-yellow/10"
                          : "border-veggy-dark/10 hover:border-veggy-purple/50"
                      }`}
                    >
                      <p className="font-medium text-veggy-dark">{a.label}</p>
                      <p className="text-xs text-veggy-dark/50">{a.desc}</p>
                    </button>
                  ))}
                </motion.div>
              )}

              {step === 4 && result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                >
                  <div className="bg-veggy-yellow rounded-2xl p-6 text-center">
                    <p className="text-veggy-dark/70 text-xs tracking-wider mb-1">
                      {result.plan.toUpperCase()}
                    </p>
                    <p className="font-serif text-5xl text-veggy-dark font-bold">
                      {result.calories}
                    </p>
                    <p className="text-veggy-dark/60 text-sm mt-1">
                      kcal / day
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Protein", value: result.protein, color: "bg-orange-100 text-orange-600" },
                      { label: "Carbs", value: result.carbs, color: "bg-blue-100 text-blue-600" },
                      { label: "Fat", value: result.fat, color: "bg-pink-100 text-pink-600" },
                    ].map((m) => (
                      <div
                        key={m.label}
                        className={`${m.color} rounded-xl p-3 text-center`}
                      >
                        <p className="text-[10px] font-medium tracking-wider mb-1">
                          {m.label.toUpperCase()}
                        </p>
                        <p className="font-serif text-2xl font-bold">
                          {m.value}g
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-veggy-dark/5 rounded-xl p-4 text-xs text-veggy-dark/70 leading-relaxed">
                    💡 This plan targets{" "}
                    <strong className="text-veggy-dark">
                      {answers.goal === "lose"
                        ? "fat loss"
                        : answers.goal === "gain"
                        ? "muscle growth"
                        : "maintenance"}
                    </strong>
                    . Eat these macros consistently and log your meals
                    to stay on track.
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer buttons */}
            <div className="p-6 bg-veggy-dark/5 flex gap-3">
              {step > 1 && step < 4 && (
                <button
                  onClick={handleBack}
                  className="flex-1 py-3 rounded-full border border-veggy-dark/20 text-veggy-dark font-medium text-sm hover:bg-veggy-dark/5"
                >
                  Back
                </button>
              )}

              {step < 3 && (
                <button
                  onClick={handleNext}
                  disabled={step === 1 && !answers.goal}
                  className="flex-1 py-3 rounded-full bg-veggy-dark text-white font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-veggy-green"
                >
                  Next
                </button>
              )}

              {step === 3 && (
                <button
                  onClick={calculate}
                  className="flex-1 py-3 rounded-full bg-veggy-yellow text-veggy-dark font-semibold text-sm hover:bg-yellow-300"
                >
                  Generate My Plan
                </button>
              )}

              {step === 4 && (
                <button
                  onClick={close}
                  className="flex-1 py-3 rounded-full bg-veggy-dark text-white font-medium text-sm hover:bg-veggy-green"
                >
                  Save & Close
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}