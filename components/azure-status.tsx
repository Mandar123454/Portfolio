"use client";

import { useEffect, useState } from "react";

export default function AzureStatus() {
  const url = process.env.NEXT_PUBLIC_AZURE_FUNCTION_PING_URL;
  const [ok, setOk] = useState<boolean | null>(null);
  useEffect(() => {
    if (!url) return;
    let mounted = true;
    const ctrl = new AbortController();
    fetch(url, { signal: ctrl.signal, cache: "no-store" })
      .then((r) => r.ok)
      .then((v) => mounted && setOk(!!v))
      .catch(() => mounted && setOk(false));
    return () => { mounted = false; ctrl.abort(); };
  }, [url]);
  if (!url) return null;
  const color = ok === null ? "bg-white/40" : ok ? "bg-emerald-400" : "bg-white/40";
  const title = ok === null ? "Checking Azure" : ok ? "Azure: Online" : "Azure: Offline";
  return (
    <div className="flex items-center gap-1 text-xs text-white/70" title={title}>
      <span className={`inline-block h-2 w-2 rounded-full ${color}`} />
      <span>Azure</span>
    </div>
  );
}
