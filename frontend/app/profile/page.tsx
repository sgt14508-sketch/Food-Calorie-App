"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import FloatingLogo from "@/components/floating-logo";
import ProfileForm, { Profile } from "@/components/profile-form";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("userProfile");
    if (saved) setProfile(JSON.parse(saved));
    setMounted(true);
  }, []);

  const handleSave = (p: Profile) => {
    setProfile(p);
    localStorage.setItem("userProfile", JSON.stringify(p));
    router.push("/");
  };

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
          className="px-5 py-2 rounded-full text-[11px] font-medium tracking-[0.15em] uppercase text-veggy-dark/70 hover:text-veggy-dark hover:bg-veggy-dark/5"
        >
          History
        </Link>
        <Link
          href="/profile"
          prefetch={false}
          className="px-5 py-2 rounded-full text-[11px] font-medium tracking-[0.15em] uppercase bg-veggy-dark text-veggy-yellow shadow"
        >
          Target
        </Link>
      </nav>

      <main className="min-h-screen bg-veggy-cream px-6 py-24">
        <div className="max-w-xl mx-auto">
          <p className="text-veggy-purple text-[10px] font-medium tracking-[0.4em] text-center mb-4">
            YOUR PROFILE
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-veggy-dark text-center mb-12">
            Set Your Calorie Target
          </h1>
          {mounted && (
            <ProfileForm onSave={handleSave} initial={profile || undefined} />
          )}
        </div>
      </main>
    </>
  );
}