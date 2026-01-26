"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

export default function PortfolioRating() {
  const [rating, setRating] = React.useState<number>(0);
  const [hover, setHover] = React.useState<number>(0);
  const [status, setStatus] = React.useState<Status>("idle");
  const [error, setError] = React.useState<string | null>(null);
  const [toast, setToast] = React.useState<string | null>(null);
  const [cooldown, setCooldown] = React.useState<number>(0);

  const isDisabled = status === "submitting" || cooldown > 0;

  async function submit() {
    if (rating < 1 || rating > 5) {
      setError("Select a rating from 1 to 5.");
      return;
    }

    setStatus("submitting");
    setError(null);

    const fd = new FormData();
    fd.append("_intent", "rating");
    fd.append("rating", String(rating));
    fd.append("_page", "about");
    fd.append("_gotcha", "");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: fd,
    });

    const json = await res.json().catch(() => ({} as any));

    if (res.status === 429 && typeof json?.retryAfter === "number") {
      const seconds = Math.max(1, Math.floor(json.retryAfter));
      setCooldown(seconds);
      const id = window.setInterval(() => {
        setCooldown((s) => {
          if (s <= 1) {
            window.clearInterval(id);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
      setStatus("error");
      setError(`Too many requests. Wait ${seconds}s and try again.`);
      return;
    }

    if (!res.ok) {
      setStatus("error");
      setError(json?.error || "Rating submit failed.");
      return;
    }

    setStatus("success");
    setToast("Thanks for rating!");
    window.setTimeout(() => setToast(null), 2800);
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">Rate my portfolio</h3>
          <p className="mt-2 text-sm text-white/70">Tap a star — it helps me improve.</p>
        </div>
        {toast ? (
          <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/80">{toast}</span>
        ) : null}
      </div>

      <div className="mt-5 flex items-center gap-2">
        {Array.from({ length: 5 }).map((_, i) => {
          const n = i + 1;
          const active = (hover || rating) >= n;
          return (
            <button
              key={n}
              type="button"
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
              onFocus={() => setHover(n)}
              onBlur={() => setHover(0)}
              onClick={() => {
                setRating(n);
                setError(null);
              }}
              className="rounded-md p-1.5 outline-none ring-brand/40 focus:ring-2"
              aria-label={`${n} star${n === 1 ? "" : "s"}`}
            >
              <Star
                className={
                  active
                    ? "h-7 w-7 fill-yellow-400 text-yellow-300"
                    : "h-7 w-7 text-white/35"
                }
              />
            </button>
          );
        })}
      </div>

      {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}

      {status === "success" ? (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-4 text-sm text-white/80"
        >
          Thanks for rating!
        </motion.p>
      ) : (
        <button
          type="button"
          onClick={() => void submit()}
          disabled={isDisabled}
          className="mt-5 inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 hover:bg-white/10 disabled:opacity-70"
        >
          {status === "submitting" ? "Submitting…" : cooldown > 0 ? `Wait ${cooldown}s` : "Submit rating"}
        </button>
      )}
    </div>
  );
}
