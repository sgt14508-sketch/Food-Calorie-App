"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import ProPlanModal from "./pro-plan-modal";

export default function PremiumFooter() {
  const [proOpen, setProOpen] = useState(false);

  return (
    <section id="science" className="bg-veggy-cream">
      {/* Premium split section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-6 max-w-[1400px] mx-auto">
        {/* Left: Photo with premium card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden min-h-[500px]"
        >
          <img
            src="https://images.unsplash.com/photo-1518843875459-f738682238a6?w=1000&q=80"
            alt="Vegetables"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Premium purple card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-veggy-purple/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 w-[75%] max-w-xs"
          >
            <h3 className="font-serif text-2xl text-veggy-dark mb-1">
              Pro Plan
            </h3>
            <p className="text-veggy-dark/70 text-sm mb-6">$6.99/mo</p>
            <ul className="space-y-2">
              {[
                "AI macro analysis",
                "Custom goal plans",
                "Smart meal planning",
              ].map((f) => (
                <li
                  key={f}
                  className="text-veggy-dark text-xs flex items-start gap-2"
                >
                  <span className="mt-1.5">•</span>
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Right: Dark panel */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-veggy-dark rounded-3xl p-8 md:p-16 flex flex-col items-center justify-center text-center min-h-[500px]"
        >
          <h2 className="font-serif text-3xl md:text-5xl text-white leading-[1.1] mb-10 max-w-md">
            Track Smarter.
            <br />
            Eat Better.
          </h2>

          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="mb-10"
          >
            <svg
              width="90"
              height="70"
              viewBox="0 0 90 70"
              className="text-veggy-purple"
            >
              <path
                fill="currentColor"
                d="M15 20h10v30H15V20zm-10-5h10v40H5V15zm50 5h10v30H55V20zm10-5h10v40H65V15zM30 32h30v6H30v-6z"
              />
            </svg>
          </motion.div>

          <p className="text-white/70 text-sm leading-relaxed mb-8 max-w-sm">
            Reach your goals with personalized insights, AI nutrition analysis,
            and smarter meal choices.
          </p>

          <motion.button
            onClick={() => setProOpen(true)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="bg-veggy-yellow text-veggy-dark font-medium text-sm px-6 py-3.5 rounded-full hover:bg-yellow-300 transition-colors"
          >
            Get started
          </motion.button>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="max-w-[1400px] mx-auto px-6 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-veggy-dark flex items-center justify-center">
                <span className="text-veggy-yellow text-sm">🌿</span>
              </div>
              <span className="font-serif text-2xl text-veggy-dark font-bold">
                AI Food Cal
              </span>
            </div>
          </div>

          {[
            { title: "Product", items: ["Features", "Analysis", "Science"] },
            { title: "Company", items: ["About", "Contact", "Careers"] },
            { title: "Resources", items: ["Blog", "Support", "Privacy"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-veggy-dark/50 text-xs font-medium mb-4 tracking-wider uppercase">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-veggy-dark text-sm hover:opacity-60 transition-opacity"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-veggy-dark/10">
          <p className="text-veggy-dark/50 text-xs">
            © 2026 AI Food Calorie Estimator. Powered by AI.
          </p>
          <div className="flex items-center gap-4">
            {["📷", "✕", "♪"].map((icon, i) => (
              <a
                key={i}
                href="#"
                className="w-8 h-8 rounded-full border border-veggy-dark/20 flex items-center justify-center text-veggy-dark/60 hover:bg-veggy-dark hover:text-white transition-all text-xs"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Pro Plan purchase modal */}
      <ProPlanModal open={proOpen} onClose={() => setProOpen(false)} />
    </section>
  );
}