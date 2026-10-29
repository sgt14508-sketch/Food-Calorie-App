"use client";

import { motion } from "framer-motion";

interface EditorialHeaderProps {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  description?: string;
  align?: "center" | "left";
}

export default function EditorialHeader({
  eyebrow,
  title,
  titleAccent,
  description,
  align = "center",
}: EditorialHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <motion.div
      className={`max-w-4xl ${alignClass} mb-20`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.span
        className="inline-block text-botanical-400 text-[10px] font-medium tracking-[0.4em] mb-6 border-b border-botanical-400/30 pb-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        {eyebrow}
      </motion.span>

      <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[0.95] tracking-tight mb-6">
        {title}
        {titleAccent && (
          <>
            {" "}
            <span className="text-botanical-400 italic">{titleAccent}</span>
          </>
        )}
      </h2>

      {description && (
        <p
          className={`text-white/60 text-base md:text-lg leading-relaxed max-w-2xl ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}