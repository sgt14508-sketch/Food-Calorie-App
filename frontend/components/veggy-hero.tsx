"use client";

import { motion } from "framer-motion";

const aminoAcids = [
  { label: "LEUCINE", x: "18%", y: "12%" },
  { label: "ISOLEUCINE", x: "60%", y: "10%" },
  { label: "VALINE", x: "6%", y: "38%" },
  { label: "HISTIDINE", x: "78%", y: "30%" },
  { label: "LYSINE", x: "4%", y: "58%" },
  { label: "THREONINE", x: "82%", y: "58%" },
  { label: "METHIONINE", x: "16%", y: "78%" },
  { label: "TRYPTOPHAN", x: "72%", y: "76%" },
  { label: "PHENYLALANINE", x: "42%", y: "88%" },
];

export default function VeggyHero({
  onUpload,
  loading,
}: {
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
}) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen bg-veggy-cream p-4 md:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full min-h-[calc(100vh-3rem)]">

        {/* LEFT: Dark green panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-veggy-dark rounded-3xl p-8 md:p-12 flex flex-col justify-between overflow-hidden"
        >
          {/* Top nav */}
          <div className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-8">
              <div className="w-7 h-7 rounded-full bg-veggy-yellow flex items-center justify-center">
                <span className="text-veggy-dark text-xs">🌿</span>
              </div>
              <nav className="hidden md:flex gap-6 text-xs text-white/70">
                <button
                  onClick={() => scrollTo("features")}
                  className="hover:text-white transition-colors"
                >
                  Features
                </button>
                <button
                  onClick={() => scrollTo("recipes")}
                  className="hover:text-white transition-colors"
                >
                  Recipes
                </button>
                <button
                  onClick={() => scrollTo("science")}
                  className="hover:text-white transition-colors"
                >
                  Science
                </button>
              </nav>
            </div>
            <button
              onClick={() => scrollTo("features")}
              className="bg-veggy-purple-light text-veggy-dark text-xs font-medium px-4 py-2 rounded-full hover:bg-veggy-purple transition-colors"
            >
              Get Started
            </button>
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col justify-center max-w-md">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] mb-10"
            >
              Engineered for results.
              <br />
              Powered by AI.
            </motion.h1>

            {/* Big icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mb-10"
            >
              <svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                className="text-veggy-purple"
              >
                <path
                  fill="currentColor"
                  d="M50 15c-15 0-27 12-27 27 0 8 3 15 9 20l-6 20h12l4-14c2 1 5 2 8 2s6-1 8-2l4 14h12l-6-20c6-5 9-12 9-20 0-15-12-27-27-27zm0 8c10 0 19 9 19 19s-9 19-19 19-19-9-19-19 9-19 19-19z"
                />
              </svg>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="text-white/70 text-sm leading-relaxed mb-10 max-w-xs"
            >
              Our AI analyzes every meal — calories, macros, and nutrition — to
              help you eat smarter, recover faster, and hit your goals.
            </motion.p>

            <motion.label
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="cursor-pointer self-start"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="bg-veggy-yellow text-veggy-dark font-medium text-sm px-6 py-3.5 rounded-full inline-flex items-center gap-2">
                {loading ? "⏳ Analyzing..." : "📸 Upload Food Image"}
              </div>
              <input
                id="upload-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onUpload}
                disabled={loading}
              />
            </motion.label>
          </div>
        </motion.div>

        {/* RIGHT: Food photo with amino labels */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative bg-gradient-to-br from-[#E8DCC4] to-[#D9C9A8] rounded-3xl overflow-hidden min-h-[500px]"
        >
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80"
            alt="Healthy food bowl"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-veggy-dark/20" />

          {/* Amino acid labels */}
          {aminoAcids.map((acid, i) => (
            <motion.div
              key={acid.label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 1.5 + i * 0.12,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute bg-white/95 backdrop-blur-sm text-veggy-dark text-[9px] md:text-[10px] font-semibold tracking-wider px-2.5 py-1.5 rounded-full shadow-sm"
              style={{ left: acid.x, top: acid.y }}
            >
              {acid.label}
            </motion.div>
          ))}

          {/* Center protein badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, duration: 0.7, type: "spring" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md rounded-full w-32 h-32 md:w-40 md:h-40 flex flex-col items-center justify-center shadow-xl"
          >
            <span className="font-serif text-2xl md:text-3xl font-bold text-veggy-dark">
              72g <span className="text-veggy-dark/50">/ 95g</span>
            </span>
            <span className="text-veggy-dark/60 text-xs font-medium tracking-wide">
              Protein
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}