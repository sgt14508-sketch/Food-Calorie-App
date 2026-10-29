"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) =>
      setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 w-96 h-96 rounded-full z-[100] mix-blend-screen"
      style={{
        background:
          "radial-gradient(circle, rgba(34,197,94,0.18) 0%, transparent 70%)",
      }}
      animate={{ x: pos.x - 192, y: pos.y - 192 }}
      transition={{ type: "spring", stiffness: 80, damping: 20 }}
    />
  );
}