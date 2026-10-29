"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import BuildPlanModal from "./build-plan-modal";

export default function PurpleCTA() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="bg-veggy-dark">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-veggy-purple-light rounded-3xl py-20 md:py-28 px-6 text-center"
          >
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-veggy-dark leading-[1.1] max-w-3xl mx-auto mb-10">
              Everything you need to hit your calorie goals — in one app.
            </h2>
            <motion.button
              onClick={() => setOpen(true)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="bg-veggy-yellow text-veggy-dark font-medium text-sm px-6 py-3.5 rounded-full hover:bg-yellow-300 transition-colors"
            >
              Build Your Plan
            </motion.button>
          </motion.div>
        </div>
      </section>

      <BuildPlanModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}