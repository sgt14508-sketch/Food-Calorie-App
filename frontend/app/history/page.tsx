"use client";

import { useEffect, useState, lazy, Suspense } from "react";
import Link from "next/link";
import FloatingLogo from "@/components/floating-logo";
import History, { Meal, loadHistory } from "@/components/history";

// Lazy-load chart so it only renders in the browser (not during SSR)
const WeeklyChart = lazy(() => import("@/components/weekly-chart"));

export default function HistoryPage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMeals(loadHistory());
    setMounted(true);
  }, []);

  return (
    <>
      <FloatingLogo />

      <nav
        data-lenis-prevent
        className="fixed top-5 right-5 z-40 flex gap-2 bg-veggy-cream/95 backdrop-blur-xl border border-veggy-dark/10 rounded-full p-1.5 shadow-lg"
      >
        <Link
          href="/"
          prefetch={false}
          className="px-5 py-2 rounded-full text-[11px] font-medium tracking-[0.15em] uppercase text-veggy-dark/70 hover:text-veggy-dark hover:bg-veggy-dark/5"
        >
          Home
        </Link>
        <Link
          href="/history"
          prefetch={false}
          className="px-5 py-2 rounded-full text-[11px] font-medium tracking-[0.15em] uppercase bg-veggy-dark text-veggy-yellow shadow"
        >
          History
        </Link>
        <Link
          href="/profile"
          prefetch={false}
          className="px-5 py-2 rounded-full text-[11px] font-medium tracking-[0.15em] uppercase text-veggy-dark/70 hover:text-veggy-dark hover:bg-veggy-dark/5"
        >
          Target
        </Link>
      </nav>

      <main className="min-h-screen bg-veggy-cream px-6 py-24">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center mb-12">
            <p className="text-veggy-purple text-[10px] font-medium tracking-[0.4em] mb-4">
              YOUR LOG
            </p>
            <h1 className="font-serif text-4xl md:text-5xl text-veggy-dark">
              Meal History
            </h1>
          </div>

          {/* Only render chart after mount to avoid SSR issues */}
          {mounted && (
            <Suspense fallback={<div className="text-center text-veggy-dark/40 py-12">Loading chart...</div>}>
              <WeeklyChart meals={meals} />
            </Suspense>
          )}

          <History meals={meals} />
        </div>
      </main>
    </>
  );
}