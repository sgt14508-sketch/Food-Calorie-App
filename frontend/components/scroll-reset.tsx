"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top instantly on every route change
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
}