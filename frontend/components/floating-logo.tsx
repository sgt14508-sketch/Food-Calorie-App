"use client";

import { motion } from "framer-motion";

export default function FloatingLogo() {
  return (
    <motion.div
      className="fixed top-6 left-6 z-40 text-3xl select-none"
      animate={{ y: [0, -10, 0], rotate: [0, 3, -3, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      🥗
    </motion.div>
  );
}