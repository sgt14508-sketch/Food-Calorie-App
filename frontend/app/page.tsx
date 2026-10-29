"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Preloader from "@/components/preloader";
import CursorGlow from "@/components/cursor-glow";
import AnalyzingOverlay from "@/components/analyzing-overlay";
import IntroVideo from "@/components/intro-video";
import VeggyHero from "@/components/veggy-hero";
import SmartPairing from "@/components/smart-pairing";
import PurpleCTA from "@/components/purple-cta";
import RecipesSection from "@/components/recipes-section";
import PremiumFooter from "@/components/premium-footer";
import { setResult } from "@/lib/result-store";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showIntro, setShowIntro] = useState(true);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      setPreviewImage(dataUrl);

      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await fetch("http://localhost:5000/predict", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        setResult(data, dataUrl);
        router.push("/result");
      } catch (err) {
        alert(
          "Error analyzing image. Make sure Flask server is running on port 5000."
        );
        console.error(err);
        setLoading(false);
        setPreviewImage(null);
      }
    };
    reader.readAsDataURL(file);
  };

  if (showIntro) {
    return <IntroVideo onComplete={() => setShowIntro(false)} />;
  }

  return (
    <>
      <Preloader />
      <CursorGlow />
      <AnalyzingOverlay visible={loading} imageUrl={previewImage} />

      {/* Floating nav pill */}
      <nav className="fixed top-5 right-5 z-40 flex gap-2 bg-veggy-cream/95 backdrop-blur-xl border border-veggy-dark/10 rounded-full p-1.5 shadow-lg">
        <Link
          href="/"
          className="px-5 py-2 rounded-full text-[11px] font-medium tracking-[0.15em] uppercase transition-all bg-veggy-dark text-veggy-yellow shadow"
        >
          Home
        </Link>
        <Link
          href="/history"
          className="px-5 py-2 rounded-full text-[11px] font-medium tracking-[0.15em] uppercase transition-all text-veggy-dark/70 hover:text-veggy-dark hover:bg-veggy-dark/5"
        >
          History
        </Link>
        <Link
          href="/profile"
          className="px-5 py-2 rounded-full text-[11px] font-medium tracking-[0.15em] uppercase transition-all text-veggy-dark/70 hover:text-veggy-dark hover:bg-veggy-dark/5"
        >
          Target
        </Link>
      </nav>

      <VeggyHero onUpload={handleUpload} loading={loading} />
      <SmartPairing />
      <PurpleCTA />
      <RecipesSection />
      <PremiumFooter />
    </>
  );
}