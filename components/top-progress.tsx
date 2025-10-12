"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function TopProgress() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Start, then finish shortly after path changes (simulates route fetch latency)
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="topbar"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="pointer-events-none fixed left-0 top-0 z-50 h-0.5 bg-brand shadow-[0_0_24px_rgba(124,58,237,0.6)]"
        />
      )}
    </AnimatePresence>
  );
}
