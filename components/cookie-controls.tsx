"use client";

import { useEffect, useMemo, useState } from "react";

type Consent = "granted" | "denied" | null;

function readConsent(): Consent {
  try {
    return (localStorage.getItem("consent:analytics") as Consent) || null;
  } catch {
    return null;
  }
}

function writeConsent(value: Consent) {
  try {
    if (value === null) localStorage.removeItem("consent:analytics");
    else localStorage.setItem("consent:analytics", value);
  } catch {}
  window.dispatchEvent(new Event("consent:changed"));
}

export default function CookieControls() {
  const [consent, setConsent] = useState<Consent>(null);
  useEffect(() => {
    setConsent(readConsent());
    const onChange = () => setConsent(readConsent());
    window.addEventListener("consent:changed", onChange as any);
    return () => window.removeEventListener("consent:changed", onChange as any);
  }, []);

  const label = useMemo(() => {
    if (consent === "granted") return "Allowed";
    if (consent === "denied") return "Declined";
    return "Not set";
  }, [consent]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7">
      <h2 className="text-lg font-semibold text-white">Cookie preferences</h2>
      <p className="mt-2 text-sm text-white/70">
        Analytics is optional. Your choice is stored locally in your browser.
      </p>

      <div className="mt-4 rounded-xl border border-white/10 bg-black/25 p-4">
        <p className="text-sm text-white/80">
          Analytics consent: <span className="font-semibold text-white">{label}</span>
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => writeConsent("granted")}
          className="rounded-md bg-brand px-3 py-2 text-sm font-semibold text-white"
        >
          Allow analytics
        </button>
        <button
          onClick={() => writeConsent("denied")}
          className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90"
        >
          Decline analytics
        </button>
        <button
          onClick={() => writeConsent(null)}
          className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90"
        >
          Reset choice
        </button>
      </div>
    </div>
  );
}
