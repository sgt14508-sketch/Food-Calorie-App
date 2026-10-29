"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function AnalyzingOverlay({
  visible,
  imageUrl,
}: {
  visible: boolean;
  imageUrl: string | null;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-veggy-dark/95 backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="text-center px-6">
            {/* Preview of the uploaded image */}
            {imageUrl && (
              <motion.div
                className="relative mx-auto mb-8 rounded-3xl overflow-hidden shadow-2xl"
                style={{ maxWidth: 320 }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  className="w-full h-auto"
                />

                {/* Scanning line - yellow */}
                <motion.div
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-veggy-yellow to-transparent shadow-lg"
                  style={{ boxShadow: "0 0 20px 4px rgba(239,255,59,0.9)" }}
                  initial={{ top: 0 }}
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Subtle yellow tint during scan */}
                <div className="absolute inset-0 bg-veggy-yellow/10 pointer-events-none" />
              </motion.div>
            )}

            {/* Status */}
            <motion.div
              className="flex items-center justify-center gap-3 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="w-3 h-3 bg-veggy-yellow rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <p className="text-2xl font-serif font-bold">
                Analyzing your meal...
              </p>
            </motion.div>

            {/* Subtext */}
            <motion.p
              className="text-white/60 text-sm mt-3 tracking-wider"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Detecting food · Matching nutrition · Calculating macros
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}