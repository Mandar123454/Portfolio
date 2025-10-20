"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

function GTagInner() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}

export function Analytics() {
  const [consent, setConsent] = useState<string | null>(null);
  useEffect(() => {
    try {
      setConsent(localStorage.getItem("consent:analytics"));
    } catch {}
    const onChange = () => {
      try {
        setConsent(localStorage.getItem("consent:analytics"));
      } catch {}
    };
    window.addEventListener("consent:changed", onChange as any);
    return () => window.removeEventListener("consent:changed", onChange as any);
  }, []);
  if (consent !== "granted") return null;
  return <GTagInner />;
}

export function AnalyticsConsent() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    try {
      const v = localStorage.getItem("consent:analytics");
      if (!v) setVisible(true);
    } catch { setVisible(true); }
  }, []);

  function setAndNotify(value: "granted" | "denied") {
    try { localStorage.setItem("consent:analytics", value); } catch {}
    setVisible(false);
    window.dispatchEvent(new Event("consent:changed"));
  }

  if (!visible) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-[10002] mx-auto w-full max-w-3xl p-3">
      <div className="rounded-xl border border-white/10 bg-white/10 backdrop-blur p-3 text-sm text-white/90 shadow-lg">
        <p className="mb-2">We use minimal analytics to improve this site. Do you consent to anonymous usage measurement?</p>
        <div className="flex gap-2">
          <button onClick={() => setAndNotify("granted")} className="rounded-md bg-brand px-3 py-1.5 text-sm font-semibold text-white">Allow</button>
          <button onClick={() => setAndNotify("denied")} className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/90">Decline</button>
        </div>
      </div>
    </div>
  );
}
