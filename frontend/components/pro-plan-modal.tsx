"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const plans = [
  {
    id: "monthly",
    name: "Monthly",
    price: 6.99,
    period: "/month",
    savings: null,
    features: ["AI macro analysis", "Custom goal plans", "Smart meal planning"],
  },
  {
    id: "quarterly",
    name: "Quarterly",
    price: 17.99,
    period: "/3 months",
    savings: "Save 14%",
    features: [
      "Everything in Monthly",
      "Priority AI processing",
      "Advanced analytics",
    ],
    popular: true,
  },
  {
    id: "yearly",
    name: "Yearly",
    price: 59.99,
    period: "/year",
    savings: "Save 28%",
    features: [
      "Everything in Quarterly",
      "1-on-1 nutrition coaching",
      "Early access to new features",
    ],
  },
];

export default function ProPlanModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState("quarterly");
  const [step, setStep] = useState<"plans" | "checkout" | "success">("plans");

  const [form, setForm] = useState({ name: "", email: "", card: "" });

  const current = plans.find((p) => p.id === selected)!;

  const handleCheckout = () => {
    if (!form.name || !form.email || !form.card) return;
    setStep("success");
  };

  const close = () => {
    onClose();
    setStep("plans");
    setForm({ name: "", email: "", card: "" });
  };

  const input =
    "w-full p-3 rounded-xl border border-veggy-dark/20 bg-white text-veggy-dark focus:outline-none focus:ring-2 focus:ring-veggy-purple";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-veggy-dark/70 backdrop-blur-lg overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <motion.div
            className="bg-veggy-cream rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl my-8"
            initial={{ scale: 0.9, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-veggy-dark p-6 flex items-center justify-between">
              <div>
                <p className="text-veggy-yellow text-[10px] tracking-[0.3em] mb-1">
                  GO PRO
                </p>
                <h2 className="font-serif text-white text-2xl">
                  {step === "plans" && "Choose Your Plan"}
                  {step === "checkout" && "Checkout"}
                  {step === "success" && "Welcome to Pro!"}
                </h2>
              </div>
              <button
                onClick={close}
                className="text-white/60 hover:text-white text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {/* STEP 1: Choose plan */}
              {step === "plans" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid md:grid-cols-3 gap-4"
                >
                  {plans.map((p) => (
                    <motion.button
                      key={p.id}
                      onClick={() => setSelected(p.id)}
                      whileHover={{ y: -6 }}
                      className={`relative text-left p-6 rounded-2xl border-2 transition-all ${
                        selected === p.id
                          ? "border-veggy-yellow bg-veggy-yellow/10"
                          : "border-veggy-dark/10 bg-white hover:border-veggy-purple/50"
                      }`}
                    >
                      {p.popular && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-veggy-purple text-veggy-dark text-[10px] font-bold tracking-wider px-3 py-1 rounded-full">
                          MOST POPULAR
                        </span>
                      )}
                      <p className="text-veggy-dark/60 text-xs tracking-wider mb-2">
                        {p.name.toUpperCase()}
                      </p>
                      <p className="font-serif text-3xl text-veggy-dark mb-1">
                        ${p.price}
                      </p>
                      <p className="text-veggy-dark/50 text-xs mb-3">
                        {p.period}
                      </p>
                      {p.savings && (
                        <p className="text-veggy-purple text-xs font-medium mb-4">
                          {p.savings}
                        </p>
                      )}
                      <ul className="space-y-2 mt-4">
                        {p.features.map((f) => (
                          <li
                            key={f}
                            className="text-veggy-dark/70 text-xs flex items-start gap-2"
                          >
                            <span className="text-veggy-yellow mt-0.5">●</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </motion.button>
                  ))}
                </motion.div>
              )}

              {/* STEP 2: Checkout */}
              {step === "checkout" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <div className="bg-veggy-yellow/20 border border-veggy-yellow/40 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                      <p className="text-veggy-dark/60 text-xs tracking-wider">
                        SELECTED PLAN
                      </p>
                      <p className="font-serif text-veggy-dark text-lg">
                        {current.name}
                      </p>
                    </div>
                    <p className="font-serif text-2xl text-veggy-dark">
                      ${current.price}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-veggy-dark/70 mb-1 block">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="John Doe"
                      className={input}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-veggy-dark/70 mb-1 block">
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="john@example.com"
                      className={input}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-veggy-dark/70 mb-1 block">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={form.card}
                      onChange={(e) =>
                        setForm({ ...form, card: e.target.value })
                      }
                      placeholder="4242 4242 4242 4242"
                      maxLength={19}
                      className={input}
                    />
                  </div>

                  <p className="text-[10px] text-veggy-dark/40 text-center pt-2">
                    🔒 Demo checkout — no real payment will be processed
                  </p>
                </motion.div>
              )}

              {/* STEP 3: Success */}
              {step === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 rounded-full bg-veggy-yellow flex items-center justify-center mx-auto mb-6"
                  >
                    <span className="text-4xl">✓</span>
                  </motion.div>
                  <h3 className="font-serif text-2xl text-veggy-dark mb-2">
                    You're all set!
                  </h3>
                  <p className="text-veggy-dark/60 text-sm mb-6 max-w-sm mx-auto">
                    Your <strong>{current.name}</strong> Pro Plan is now active.
                    Enjoy unlimited AI analysis, custom plans, and priority
                    support.
                  </p>
                  <div className="bg-veggy-dark/5 rounded-xl p-4 text-xs text-veggy-dark/70 inline-block">
                    Order ID: PRO-{Date.now().toString().slice(-8)}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 bg-veggy-dark/5 flex gap-3">
              {step === "plans" && (
                <button
                  onClick={() => setStep("checkout")}
                  className="flex-1 py-3 rounded-full bg-veggy-dark text-white font-medium text-sm hover:bg-veggy-green"
                >
                  Continue to Checkout
                </button>
              )}
              {step === "checkout" && (
                <>
                  <button
                    onClick={() => setStep("plans")}
                    className="py-3 px-6 rounded-full border border-veggy-dark/20 text-veggy-dark font-medium text-sm hover:bg-veggy-dark/5"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleCheckout}
                    disabled={!form.name || !form.email || !form.card}
                    className="flex-1 py-3 rounded-full bg-veggy-yellow text-veggy-dark font-semibold text-sm hover:bg-yellow-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Pay ${current.price}
                  </button>
                </>
              )}
              {step === "success" && (
                <button
                  onClick={close}
                  className="flex-1 py-3 rounded-full bg-veggy-dark text-white font-medium text-sm hover:bg-veggy-green"
                >
                  Start Tracking
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}