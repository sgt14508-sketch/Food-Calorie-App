"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsVisible(false), 1800);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-veggy-dark"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Leaf logo */}
          <motion.svg
            width="96"
            height="96"
            viewBox="0 0 88 88"
            fill="none"
            className="text-veggy-yellow mb-8"
          >
            <motion.path
              d="M44 73C44 73 44 54 57 40C64.5 32 72.5 28.5 79 27C78.5 36.5 74 47.5 65.5 54.5C57.5 61 49.5 62 44 62M44 73C44 73 43.5 54.5 31 41C24 33.5 15.5 29.5 9 28C9.5 38 14.5 48.5 23 55C31 61 38.5 62 44 62"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.3, ease: "easeInOut" }}
            />
            <motion.path
              d="M44 73V49"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            />
          </motion.svg>

          <motion.p
            className="text-veggy-yellow text-[10px] font-medium tracking-[0.5em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ANALYZING
          </motion.p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}