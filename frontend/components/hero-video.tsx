"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface HeroVideoProps {
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
}

export default function HeroVideo({ onUpload, loading }: HeroVideoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.5, 0]);

  return (
    <div
      ref={ref}
      className="relative w-full h-screen overflow-hidden bg-veggy-dark"
    >
      {/* Full-screen 1080p video */}
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ scale }}
      >
        <source src="/hero.mp4" type="video/mp4" />
      </motion.video>

      {/* Cinematic overlays — lighter so video stays visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-veggy-dark/60 via-veggy-dark/25 to-veggy-dark/90 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(31,58,31,0.65) 100%)",
        }}
      />

      {/* Content overlay */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <motion.div
          className="mb-8 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-6 py-2 rounded-full text-[10px] font-medium tracking-[0.35em]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          AI · POWERED · NUTRITION
        </motion.div>

        <motion.h1
          className="font-serif text-[3.5rem] md:text-[7rem] lg:text-[9rem] font-bold text-white mb-8 max-w-6xl leading-[0.92]"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            textShadow:
              "0 4px 30px rgba(0,0,0,0.7), 0 8px 60px rgba(0,0,0,0.5)",
          }}
        >
          Snap.
          <br />
          Analyze.
          <br />
          <span className="text-veggy-yellow italic">Eat&nbsp;Smart.</span>
        </motion.h1>

        <motion.p
          className="text-white/85 text-base md:text-xl mb-14 max-w-xl leading-relaxed font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.8)" }}
        >
          Upload a photo of your meal.
          <br />
          Instant calories, macros, and insights.
        </motion.p>

        <motion.label
          className="relative cursor-pointer group z-30"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-veggy-yellow/40 blur-3xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3.5, repeat: Infinity }}
          />
          <div className="relative bg-veggy-yellow text-veggy-dark font-semibold text-base px-12 py-5 rounded-full shadow-2xl inline-flex items-center gap-3 tracking-wide">
            {loading ? (
              <>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  ⏳
                </motion.span>
                Analyzing...
              </>
            ) : (
              <>📸 Upload Food Image</>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onUpload}
              disabled={loading}
            />
          </div>
        </motion.label>

        <motion.p
          className="text-white/50 text-[10px] tracking-[0.4em] mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2 }}
        >
          JPG · PNG · UP TO 10 MB
        </motion.p>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/60 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <p className="text-[9px] tracking-[0.4em]">SCROLL</p>
        <div className="w-px h-16 bg-gradient-to-b from-veggy-yellow/60 to-transparent" />
      </motion.div>
    </div>
  );
}