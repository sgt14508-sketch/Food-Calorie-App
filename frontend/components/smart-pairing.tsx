"use client";

import { motion } from "framer-motion";

export default function SmartPairing() {
  return (
    <section className="bg-veggy-purple-light py-6 px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-[1400px] mx-auto">
        {/* Bowl photo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="md:col-span-1 rounded-2xl overflow-hidden aspect-square"
        >
          <img
            src="https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80"
            alt="Bowl"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Greens tall photo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="md:col-span-1 md:row-span-2 rounded-2xl overflow-hidden min-h-[400px]"
        >
          <img
            src="https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=600&q=80"
            alt="Greens"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Fitness photo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="md:col-span-1 rounded-2xl overflow-hidden aspect-square"
        >
          <img
            src="https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&q=80"
            alt="Fitness"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* One-Tap Delivery card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="md:col-span-1 bg-veggy-cream rounded-2xl p-6 flex flex-col justify-between min-h-[240px]"
        >
          <h3 className="font-serif text-2xl text-veggy-dark leading-tight">
            One-Tap
            <br />
            Delivery
          </h3>
          <div>
            <p className="text-veggy-dark/60 text-xs leading-relaxed mb-4">
              Order every ingredient through your favorite delivery service
              without leaving the app.
            </p>
            <a href="#" className="text-veggy-dark text-xs font-medium underline">
              More information
            </a>
          </div>
        </motion.div>

        {/* Smart Pairing yellow card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="md:col-span-1 bg-veggy-yellow rounded-2xl p-6 flex flex-col justify-between min-h-[240px]"
        >
          <h3 className="font-serif text-2xl text-veggy-dark leading-tight">
            Smart
            <br />
            Pairing
          </h3>
          <div>
            <p className="text-veggy-dark/70 text-xs leading-relaxed mb-4">
              AI combines complementary plant proteins to create a complete
              amino acid profile for every meal.
            </p>
            <a href="#" className="text-veggy-dark text-xs font-medium underline">
              More information
            </a>
          </div>
        </motion.div>

        {/* Protein Booster dark green card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="md:col-span-1 bg-veggy-green rounded-2xl p-6 flex flex-col justify-between min-h-[240px]"
        >
          <h3 className="font-serif text-2xl text-white leading-tight">
            Protein
            <br />
            Booster
          </h3>
          <div>
            <p className="text-white/70 text-xs leading-relaxed mb-4">
              Get personalized protein recommendations to help you reach your
              daily and weekly nutrition goals.
            </p>
            <a href="#" className="text-white text-xs font-medium underline">
              More information
            </a>
          </div>
        </motion.div>

        {/* Grocery bag photo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="md:col-span-1 rounded-2xl overflow-hidden aspect-square"
        >
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80"
            alt="Groceries"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}