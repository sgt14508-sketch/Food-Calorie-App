"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroVideo({ onComplete }: { onComplete: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showSkip, setShowSkip] = useState(false);
  const [exiting, setExiting] = useState(false);

  // Show the skip button after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowSkip(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleComplete = () => {
    if (exiting) return;
    setExiting(true);
    setTimeout(() => onComplete(), 700);
  };

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          className="fixed inset-0 z-[300] bg-black overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Intro video */}
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            onEnded={handleComplete}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>

          {/* Cinematic dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90 pointer-events-none" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.75) 100%)",
            }}
          />

          {/* Centered text overlay — matches your WhatsApp screenshot */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
            <motion.h1
              className="font-serif text-white text-[3rem] md:text-[6rem] lg:text-[8rem] font-bold leading-[0.95] mb-6 max-w-5xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                textShadow: "0 4px 30px rgba(0,0,0,0.8), 0 8px 60px rgba(0,0,0,0.6)",
              }}
            >
              Snap. Analyze.
              <br />
              <span className="text-veggy-yellow italic">Eat Smart.</span>
            </motion.h1>

            <motion.p
              className="text-white/85 text-base md:text-xl max-w-xl leading-relaxed font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}
            >
              Upload a photo of your meal.
              <br />
              Get instant nutrition insights powered by AI.
            </motion.p>
          </div>

          {/* Skip button (bottom-right) */}
          <AnimatePresence>
            {showSkip && (
              <motion.button
                onClick={handleComplete}
                className="absolute bottom-8 right-8 z-10 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-white/20 transition-all flex items-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                Skip Intro
                <span className="text-veggy-yellow">→</span>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Bottom progress bar — visual hint that video is playing */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-veggy-yellow"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 15, ease: "linear" }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}