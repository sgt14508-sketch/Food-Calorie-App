"use client";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

export default function CountUp({
  end,
  duration = 1.5,
  suffix = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}
export function CinematicTitle({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const letters = text.split("");
  return (
    <span className={className}>
      {letters.map((l, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: i * 0.03,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {l === " " ? "\u00A0" : l}
        </motion.span>
      ))}
    </span>
  );
}