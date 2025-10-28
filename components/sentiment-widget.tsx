"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const EMOJI: Record<string, string> = { positive: "😊", neutral: "😐", negative: "😞" };

export default function SentimentWidget() {
  const endpoint = process.env.NEXT_PUBLIC_AZURE_SENTIMENT_URL;
  const [text, setText] = useState("");
  const [res, setRes] = useState<{ sentiment?: string; score?: number; error?: string } | null>(null);
  const [loading, setLoading] = useState(false);
  if (!endpoint) return null;

  async function analyze() {
    setLoading(true);
    setRes(null);
    try {
      const r = await fetch(endpoint!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j?.error || "Failed");
      setRes(j);
      // bubble up analytics as well
      try { window.dispatchEvent(new CustomEvent("contact:submitted")); } catch {}
    } catch (e: any) {
      setRes({ error: e?.message || "Failed" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4">
      <h3 className="text-sm font-semibold">Feedback sentiment</h3>
      <p className="text-xs text-white/70">How did this project make you feel?</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        placeholder="Write a sentence…"
        className="mt-3 w-full rounded-md border border-white/10 bg-[#111214] px-3 py-2 text-sm text-white/90 placeholder-white/40 outline-none focus:ring-2 ring-brand/30"
      />
      <motion.button
        whileHover={{ y: -1 }}
        whileTap={{ y: 0 }}
        disabled={!text || loading}
        onClick={analyze}
        className="mt-2 inline-flex items-center rounded-md bg-brand px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
      >
        {loading ? "Analyzing…" : "Analyze"}
      </motion.button>
      {res && (
        <div className="mt-3 text-sm">
          {res.error ? (
            <span className="text-red-400">{res.error}</span>
          ) : (
            <span>
              {EMOJI[res.sentiment || "neutral"]} {res.sentiment} {res.score ? `(${(res.score * 100).toFixed(0)}%)` : ""}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
