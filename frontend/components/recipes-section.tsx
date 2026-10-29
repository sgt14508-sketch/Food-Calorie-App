"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const recipes = [
  {
    name: "Grilled Salmon Bowl",
    protein: 42,
    carbs: 18,
    tag: "Omega-3 rich",
    time: "18 min",
    filters: ["High Protein", "Low Carb", "Post-Workout"],
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80",
  },
  {
    name: "Chicken Quinoa Salad",
    protein: 38,
    carbs: 32,
    tag: "Lean protein",
    time: "15 min",
    filters: ["High Protein", "Quick Meals"],
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600&q=80",
  },
  {
    name: "Avocado Egg Toast",
    protein: 22,
    carbs: 24,
    tag: "Healthy fats",
    time: "10 min",
    filters: ["Quick Meals", "Low Carb"],
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&q=80",
  },
  {
    name: "Lentil Power Soup",
    protein: 26,
    carbs: 40,
    tag: "Fiber boost",
    time: "25 min",
    filters: ["High Protein", "Post-Workout"],
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
  },
  {
    name: "Greek Yogurt Parfait",
    protein: 24,
    carbs: 22,
    tag: "Probiotics",
    time: "5 min",
    filters: ["High Protein", "Quick Meals"],
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80",
  },
  {
    name: "Zucchini Noodle Bowl",
    protein: 18,
    carbs: 12,
    tag: "Low-calorie",
    time: "12 min",
    filters: ["Low Carb", "Quick Meals"],
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80",
  },
];

const filters = ["High Protein", "Low Carb", "Quick Meals", "Post-Workout"];

export default function RecipesSection() {
  const [active, setActive] = useState<string | null>(null);

  const visible = active
    ? recipes.filter((r) => r.filters.includes(active))
    : recipes;

  return (
    <section id="recipes" className="bg-veggy-dark py-20 md:py-32 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl text-white text-center leading-[1.05] mb-12 md:mb-16"
        >
          Smarter{" "}
          <span className="inline-block text-veggy-purple text-5xl md:text-6xl align-middle">
            🌱
          </span>{" "}
          Recipes.
          <br />
          Stronger Results.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-10"
        >
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(active === f ? null : f)}
                className={`text-xs px-4 py-2 rounded-full border transition-all ${
                  active === f
                    ? "bg-veggy-yellow text-veggy-dark border-veggy-yellow"
                    : "bg-transparent text-white border-white/30 hover:bg-white/10"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <button className="bg-veggy-yellow text-veggy-dark text-xs font-medium px-5 py-2.5 rounded-full hover:bg-yellow-300 transition-colors">
            Explore Recipes
          </button>
        </motion.div>

        {active && (
          <p className="text-white/50 text-xs mb-6 tracking-wider">
            Showing {visible.length} recipe{visible.length !== 1 ? "s" : ""} ·{" "}
            <button
              onClick={() => setActive(null)}
              className="underline hover:text-white"
            >
              Clear filter
            </button>
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {visible.map((r) => (
              <motion.div
                key={r.name}
                layout
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
                className="bg-veggy-cream rounded-2xl overflow-hidden group cursor-pointer"
              >
                <div className="p-5">
                  <h3 className="font-serif text-lg text-veggy-dark leading-tight mb-2">
                    {r.name}
                  </h3>
                  <p className="text-[10px] tracking-[0.2em] text-veggy-dark/40 uppercase">
                    {r.tag}
                  </p>
                </div>
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={r.image}
                    alt={r.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-5 bg-white/50">
                  <ul className="space-y-1">
                    <li className="text-veggy-dark text-xs flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-veggy-dark" />
                      <strong>{r.protein}g protein</strong>
                    </li>
                    <li className="text-veggy-dark/70 text-xs flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-veggy-dark/40" />
                      {r.carbs}g carbs
                    </li>
                    <li className="text-veggy-dark/70 text-xs flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-veggy-dark/40" />
                      {r.time}
                    </li>
                  </ul>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {visible.length === 0 && (
          <p className="text-white/50 text-center py-12">
            No recipes match this filter.
          </p>
        )}
      </div>
    </section>
  );
}