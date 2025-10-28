"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    appInsights?: any;
  }
}

export default function AppInsightsClient() {
  const conn = process.env.NEXT_PUBLIC_APPINSIGHTS_CONNECTION_STRING;
  useEffect(() => {
    if (!conn) return;
    try {
      const consent = localStorage.getItem("consent:analytics");
      if (consent !== "granted") return;
    } catch {
      return;
    }
    let dispose: (() => void) | null = null;
    const script = document.createElement("script");
    script.src = "https://js.monitor.azure.com/scripts/b/ai.2.min.js";
    script.async = true;
    script.onload = () => {
      try {
        // Minimal SDK init via snippet API
        const cfg: any = { connectionString: conn, enableAutoRouteTracking: true, samplingPercentage: 50 };
        // global SDK factory available after script load
        // @ts-ignore
        window.appInsights = window.appInsights || new (window as any).ApplicationInsights({ config: cfg });
        window.appInsights.loadAppInsights();
        window.appInsights.trackPageView();
        const handler = () => window.appInsights?.trackEvent({ name: "contact_submit" });
        window.addEventListener("contact:submitted", handler as any);
        dispose = () => window.removeEventListener("contact:submitted", handler as any);
      } catch {}
    };
    document.head.appendChild(script);
    return () => { try { dispose?.(); document.head.removeChild(script); } catch {} };
  }, [conn]);
  return null;
}
