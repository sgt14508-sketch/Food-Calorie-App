"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import CountUp from "@/components/count-up";
import MacroBars from "@/components/macro-bars";
import FloatingLogo from "@/components/floating-logo";
import { getResult, Result } from "@/lib/result-store";
import { saveMeal } from "@/components/history";

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<Result | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const { result, image } = getResult();
    if (!result) {
      router.push("/");
      return;
    }
    setResult(result);
    setImage(image);

    // Auto-save to history
    saveMeal({
      id: Date.now(),
      food: result.food,
      calories: result.calories,
      protein: result.protein,
      carbs: result.carbs,
      fat: result.fat,
      confidence: result.confidence,
      timestamp: new Date().toISOString(),
    });
    setSaved(true);
  }, [router]);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.p
          className="text-green-600 font-medium"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading...
        </motion.p>
      </div>
    );
  }

  return (
    <>
      <FloatingLogo />

      {/* Top navigation */}
      <nav className="fixed top-4 right-4 z-40 flex gap-2">
        {[
          { href: "/", label: "🏠 Home" },
          { href: "/history", label: "📜 History" },
          { href: "/profile", label: "🎯 Target" },
        ].map((item) => (
          <button
            key={item.href}
            onClick={() => router.push(item.href)}
            className="px-4 py-2 rounded-xl text-sm font-medium transition-all bg-white text-slate-700 hover:bg-green-50 shadow"
          >
            {item.label}
          </button>
        ))}
      </nav>

      <main className="min-h-screen bg-gradient-to-b from-white via-green-50 to-white px-6 py-20">
        <div className="max-w-3xl mx-auto">

          {/* Back button */}
          <motion.button
            onClick={() => router.push("/")}
            className="mb-6 text-green-600 hover:text-green-700 font-medium flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            ← Analyze another meal
          </motion.button>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-green-600 mb-2">
              🍽️ Analysis Complete
            </h1>
            {saved && (
              <motion.p
                className="text-sm text-slate-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                ✅ Saved to your history
              </motion.p>
            )}
          </motion.div>

          {/* Uploaded image */}
          {image && (
            <motion.div
              className="mb-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={image}
                alt="Analyzed food"
                className="mx-auto rounded-3xl shadow-2xl max-h-96 object-cover"
              />
            </motion.div>
          )}

          {/* Food name */}
          <motion.div
            className="bg-white rounded-3xl p-8 shadow-2xl border border-green-100 mb-6 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-sm text-slate-500 mb-1">Detected food</p>
            <h2 className="text-4xl font-bold text-green-700 mb-2">
              {result.food}
            </h2>
            <div className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium">
              {result.confidence}% confidence
            </div>
          </motion.div>

          {/* Calories big card */}
          <motion.div
            className="bg-gradient-to-br from-green-500 to-green-600 rounded-3xl p-10 shadow-2xl text-white text-center mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-white/80 mb-2">Total Calories</p>
            <p className="text-6xl md:text-7xl font-bold">
              <CountUp end={result.calories} duration={2} />
            </p>
            <p className="text-white/80 mt-1">kcal</p>
          </motion.div>

          {/* Macros grid */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: "Protein", value: result.protein, color: "from-orange-100 to-orange-50", text: "text-orange-500" },
              { label: "Carbs", value: result.carbs, color: "from-blue-100 to-blue-50", text: "text-blue-500" },
              { label: "Fat", value: result.fat, color: "from-pink-100 to-pink-50", text: "text-pink-500" },
            ].map((m, i) => (
              <motion.div
                key={m.label}
                className={`bg-gradient-to-br ${m.color} rounded-2xl p-5 text-center shadow-sm`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.15 }}
              >
                <p className="text-sm text-slate-500 mb-1">{m.label}</p>
                <p className={`text-3xl font-bold ${m.text}`}>
                  <CountUp end={m.value} /> g
                </p>
              </motion.div>
            ))}
          </div>

          {/* Macro bars */}
          <motion.div
            className="bg-white rounded-3xl p-6 shadow-xl border border-green-100 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <MacroBars data={result} />
          </motion.div>

          {/* Actions */}
          <motion.div
            className="flex gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            <button
              onClick={() => router.push("/")}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-2xl shadow-lg transition-all hover:scale-[1.02]"
            >
              📸 Analyze Another
            </button>
            <button
              onClick={() => router.push("/history")}
              className="flex-1 bg-white hover:bg-green-50 text-green-700 font-semibold py-4 rounded-2xl shadow-lg border border-green-200 transition-all hover:scale-[1.02]"
            >
              📜 View History
            </button>
          </motion.div>
        </div>
      </main>
    </>
  );
}