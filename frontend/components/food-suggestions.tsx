"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface Suggestion {
  id: string;
  title: string;
  swap: string;
  savedCal: number;
  detail: string;
  tip: string;
  image: string;
  accent: string;
  protein: number;
  carbs: number;
  fat: number;
}

const suggestions: Suggestion[] = [
  {
    id: "salad",
    title: "Swap fries → salad",
    swap: "Side salad with vinaigrette",
    savedCal: 220,
    detail: "Fries 312 kcal → Salad 92 kcal",
    tip: "Save 220 kcal + gain 4g fiber per meal.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80",
    accent: "from-emerald-950/95 via-emerald-900/70 to-transparent",
    protein: 4,
    carbs: 12,
    fat: 6,
  },
  {
    id: "grill",
    title: "Grill instead of fry",
    swap: "Grilled chicken breast",
    savedCal: 180,
    detail: "Fried 340 kcal → Grilled 160 kcal",
    tip: "Same protein, half the fat.",
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=1200&q=80",
    accent: "from-orange-950/95 via-orange-900/70 to-transparent",
    protein: 31,
    carbs: 0,
    fat: 4,
  },
  {
    id: "sparkling",
    title: "Sparkling water",
    swap: "Instead of soda",
    savedCal: 150,
    detail: "Cola 150 kcal → Sparkling 0 kcal",
    tip: "Zero sugar, zero calories. Add lemon.",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=1200&q=80",
    accent: "from-cyan-950/95 via-blue-900/70 to-transparent",
    protein: 0,
    carbs: 0,
    fat: 0,
  },
  {
    id: "brownrice",
    title: "Brown rice swap",
    swap: "Instead of white rice",
    savedCal: 40,
    detail: "White 200 kcal → Brown 160 kcal",
    tip: "More fiber, slower carbs, longer full.",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=1200&q=80",
    accent: "from-amber-950/95 via-yellow-900/70 to-transparent",
    protein: 4,
    carbs: 34,
    fat: 1.5,
  },
  {
    id: "avocado",
    title: "Avocado toast",
    swap: "Instead of buttered toast",
    savedCal: 90,
    detail: "Buttered 210 kcal → Avocado 120 kcal",
    tip: "Healthy fats instead of saturated.",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=1200&q=80",
    accent: "from-lime-950/95 via-green-900/70 to-transparent",
    protein: 3,
    carbs: 12,
    fat: 10,
  },
  {
    id: "darkchoc",
    title: "Dark chocolate",
    swap: "Instead of milk chocolate",
    savedCal: 60,
    detail: "Milk 250 kcal → Dark 190 kcal",
    tip: "Less sugar, more antioxidants.",
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=1200&q=80",
    accent: "from-rose-950/95 via-pink-900/70 to-transparent",
    protein: 3,
    carbs: 13,
    fat: 15,
  },
];

function SuggestionCard({ s, index }: { s: Suggestion; index: number }) {
  const [panel, setPanel] = useState(0);
  const [hovered, setHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (hovered) {
      intervalRef.current = setInterval(() => {
        setPanel((p) => (p + 1) % 3);
      }, 1800);
    } else {
      setPanel(0);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [hovered]);

  const panels = [
    // Panel 0 — Comparison
    <div key="p0" className="space-y-2">
      <p className="text-[10px] tracking-[0.3em] text-green-400 mb-2">
        COMPARISON
      </p>
      <p className="text-white font-semibold text-sm">{s.detail}</p>
      <div className="flex gap-1 pt-2">
        <div className="h-1.5 flex-1 bg-red-400/60 rounded-full" />
        <div className="h-1.5 flex-1 bg-green-400 rounded-full" />
      </div>
    </div>,

    // Panel 1 — Nutrition
    <div key="p1">
      <p className="text-[10px] tracking-[0.3em] text-green-400 mb-3">
        NUTRITION
      </p>
      <div className="flex gap-4">
        <div>
          <p className="text-[10px] text-white/60">Protein</p>
          <p className="text-lg font-bold text-white">{s.protein}g</p>
        </div>
        <div>
          <p className="text-[10px] text-white/60">Carbs</p>
          <p className="text-lg font-bold text-white">{s.carbs}g</p>
        </div>
        <div>
          <p className="text-[10px] text-white/60">Fat</p>
          <p className="text-lg font-bold text-white">{s.fat}g</p>
        </div>
      </div>
    </div>,

    // Panel 2 — Tip
    <div key="p2">
      <p className="text-[10px] tracking-[0.3em] text-green-400 mb-2">TIP</p>
      <p className="text-white/90 text-sm leading-relaxed">💡 {s.tip}</p>
    </div>,
  ];

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative h-[460px] rounded-3xl overflow-hidden cursor-pointer bg-black select-none"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      {/* Ken-Burns background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: `url(${s.image})` }}
        animate={{ scale: [1.05, 1.15, 1.05] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.5,
        }}
      />

      <div className={`absolute inset-0 bg-gradient-to-t ${s.accent} pointer-events-none`} />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      {/* Calorie badge */}
      <div className="absolute top-5 right-5 z-10 bg-black/60 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold pointer-events-none">
        −{s.savedCal} kcal
      </div>

      {/* Progress dots */}
      <div className="absolute top-6 left-6 z-10 flex gap-1.5 pointer-events-none">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-1 rounded-full"
            animate={{
              width: hovered && panel === i ? 20 : 6,
              backgroundColor:
                hovered && panel === i ? "#4ade80" : "rgba(255,255,255,0.4)",
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white pointer-events-none">
        <p className="text-[10px] tracking-[0.3em] text-white/60 mb-3">
          SUGGESTED SWAP
        </p>

        <h3 className="text-2xl font-bold mb-2 leading-tight drop-shadow-xl">
          {s.title}
        </h3>

        <p className="text-white/75 text-sm mb-4">{s.swap}</p>

        {/* Rotating info panel */}
        <div className="pt-4 border-t border-white/20 h-24 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={panel}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {panels[panel]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Hover glow line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
}

export default function FoodSuggestions() {
  return (
    <section className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <span className="inline-block bg-green-500/10 border border-green-500/30 text-green-400 px-5 py-2 rounded-full text-xs font-medium tracking-[0.2em] mb-6">
            SMART SWAPS
          </span>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Eat smarter,
            <br />
            <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
              not less.
            </span>
          </h2>

          <p className="text-white/60 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            Simple food swaps that cut hundreds of calories while keeping meals
            satisfying. Hover any card to cycle through the details.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suggestions.map((s, i) => (
            <SuggestionCard key={s.id} s={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}