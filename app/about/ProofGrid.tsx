"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type ProofItem = {
  label: string;
  value: number | string;
  suffix?: string;
  prefix?: string;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function useInViewport<T extends Element>(opts?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) setInView(true);
      },
      { root: null, threshold: 0.25, ...(opts || {}) },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [opts]);

  return { ref, inView };
}

function CountUpNumber({ start, end, durationMs, inView }: { start: number; end: number; durationMs: number; inView: boolean }) {
  const [value, setValue] = useState(start);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const t0 = performance.now();
    const delta = end - start;

    const tick = (t: number) => {
      const p = clamp((t - t0) / durationMs, 0, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(start + delta * eased));
      if (p < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [durationMs, end, inView, start]);

  return <>{value}</>;
}

export default function ProofGrid() {
  const display = useMemo<ProofItem[]>(
    () => [
      { label: "shipped projects", value: 20, suffix: "+" },
      { label: "CTF Rank", value: "Top 113 / 3,235" },
      { label: "CEH", value: "v13 Certified" },
      { label: "Multi-domain", value: "Cybersecurity + ML + Full-Stack" },
      { label: "Evidence-driven", value: "demos + repos + certificates" },
    ],
    [],
  );

  const { ref, inView } = useInViewport<HTMLDivElement>({ threshold: 0.35 });

  return (
    <div ref={ref} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {display.map((it) => (
        <div key={it.label} className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <div className="text-2xl font-semibold tracking-tight text-white">
            {it.prefix || ""}
            {typeof it.value === "number" ? (
              <CountUpNumber start={0} end={it.value} durationMs={750} inView={inView} />
            ) : (
              <span className="text-base font-semibold text-white/90">{it.value}</span>
            )}
            {it.suffix || ""}
          </div>
          <p className="mt-1 text-xs text-white/60">{it.label}</p>
        </div>
      ))}
    </div>
  );
}
