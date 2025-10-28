"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Errors = Partial<Record<"name" | "email" | "phone" | "message", string>>;

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Errors>({});
  const [hasTyped, setHasTyped] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState<number>(0);
  const firstInputAt = useRef<number | null>(null);
  const lastSaved = useRef<FormData | null>(null);

  useEffect(() => {
    // Load pending form if any
    try {
      const raw = localStorage.getItem("contactForm:pending");
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, string>;
        const formEl = document.querySelector<HTMLFormElement>("form[data-contact-form]");
        if (formEl) {
          Object.entries(parsed).forEach(([k, v]) => {
            const el = formEl.elements.namedItem(k) as HTMLInputElement | HTMLTextAreaElement | null;
            if (el) el.value = v;
          });
        }
      }
    } catch {}
  }, []);

  function validate(form: HTMLFormElement): Errors {
    const data = new FormData(form);
    const name = (data.get("name") as string)?.trim();
    const email = (data.get("email") as string)?.trim();
    const phone = (data.get("phone") as string)?.trim();
    const message = (data.get("message") as string)?.trim();
    const errs: Errors = {};

    if (!name) errs.name = "Please enter your name.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Enter a valid email address.";
    if (phone && !/^\+?[0-9\-()\s]{7,20}$/.test(phone)) errs.phone = "Phone looks invalid.";
  if (!message || message.length < 10) errs.message = "Message must be at least 10 characters.";
    return errs;
  }

  async function send(formData: FormData) {
    const azureUrl = process.env.NEXT_PUBLIC_AZURE_FUNCTION_CONTACT_URL;
    // helper to apply cooldown handling for Next API fallback responses
    const handleRateLimit = async (res: Response) => {
      const json = await res.json().catch(() => ({} as any));
      if (res.status === 429 && typeof json?.retryAfter === "number") {
        const seconds = Math.max(1, Math.floor(json.retryAfter));
        setCooldown(seconds);
        const id = setInterval(() => {
          setCooldown((s) => {
            if (s <= 1) { clearInterval(id); return 0; }
            return s - 1;
          });
        }, 1000);
        throw new Error(`Too many requests. Wait ${seconds}s and try again.`);
      }
      if (!res.ok) throw new Error(json?.error || "Submission failed.");
      return json as { ok?: boolean; note?: string };
    };

    // Try Azure Function first (JSON payload)
    if (azureUrl) {
      try {
        const obj: Record<string, string> = {};
        formData.forEach((v, k) => { if (k !== "_gotcha") obj[k] = String(v); });
        const res = await fetch(azureUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(obj),
        });
        if (res.ok) {
          // return note that function handled it
          return { ok: true, note: "handled_by_azure_function" };
        }
        // if function returns error, fall through to Next API
      } catch {
        // network/CORS error — fall back
      }
    }

    // Fallback to local Next.js API with FormData
    const res2 = await fetch("/api/contact", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData,
    });
    return handleRateLimit(res2);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;

    // Anti-spam: relaxed time heuristic (allow autofill/no typing)
    const now = Date.now();
    if (firstInputAt.current && now - firstInputAt.current < 800) {
      setError("Just a sec — please wait a moment and try again.");
      return;
    }

    const errs = validate(form);
    setFieldErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0] as keyof Errors;
      const el = form.elements.namedItem(first as string) as HTMLElement | null;
      el?.focus();
      return;
    }

    setStatus("submitting");
    const data = new FormData(form);
    if ((data.get("_gotcha") as string)?.length) {
      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Offline fallback: save and show retry
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      persistPending(data);
      setStatus("error");
      setError("You appear to be offline. Saved your message. Try again when online.");
      return;
    }

    try {
      const result = await send(data);
      // analytics event
      try {
        window.dispatchEvent(new CustomEvent("contact:submitted"));
        // Google Analytics (if present)
        // @ts-expect-error optional global
        if (window.gtag) window.gtag("event", "contact_submit", {});
      } catch {}

      localStorage.removeItem("contactForm:pending");
      setStatus("success");
      if (result?.note === "logged_to_sheet_only") {
        setToast("Received! Logged to Sheet. Email will be enabled after SMTP setup.");
      } else if (result?.note === "email_failed_logged_to_sheet") {
        setToast("We received your message (logged to Sheet). Email send failed.");
      } else if (result?.note === "sent_via_formspree") {
        setToast("Sent successfully via Formspree. We'll reply within 24–48 hours.");
      } else {
        setToast("Thanks! We usually reply within 24–48 hours.");
      }
      form.reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      persistPending(data);
      setStatus("error");
      setError(err?.message || "Network error. Saved your message—try again.");
      lastSaved.current = data;
    }
  }

  function persistPending(data: FormData) {
    const obj: Record<string, string> = {};
    data.forEach((v, k) => {
      if (k !== "_gotcha") obj[k] = String(v);
    });
    try {
      localStorage.setItem("contactForm:pending", JSON.stringify(obj));
    } catch {}
  }

  const onAnyInput = () => {
    if (!firstInputAt.current) firstInputAt.current = Date.now();
    setHasTyped(true);
  };

  const isDisabled = useMemo(() => status === "submitting" || cooldown > 0, [status, cooldown]);

  async function retrySend() {
    try {
      const raw = localStorage.getItem("contactForm:pending");
      if (!raw) throw new Error("No saved message to retry.");
      const parsed = JSON.parse(raw) as Record<string, string>;
      const fd = new FormData();
      Object.entries(parsed).forEach(([k, v]) => fd.append(k, v));
      setStatus("submitting");
      await send(fd);
      localStorage.removeItem("contactForm:pending");
      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "Retry failed. Please try again later.");
    }
  }

  return (
    <AnimatePresence mode="wait">
      {/* Toast */}
      <div aria-live="polite" className="fixed right-4 top-4 z-50">
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="rounded-md bg-white/10 px-3 py-2 text-sm text-white/90 backdrop-blur-sm border border-white/10 shadow-lg"
              onAnimationComplete={() => {
                // Auto-dismiss after 3.5s
                setTimeout(() => setToast(null), 3500);
              }}
            >
              {toast}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col items-center gap-2 text-center"
        >
          <div className="h-24 w-full rounded-xl bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.25),transparent_60%)]" />
          <h2 className="text-xl font-semibold">Thank you! Message received.</h2>
          <p className="text-white/70">We’ll reply within 24–48 hours.</p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-4 inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 hover:bg-white/10"
          >
            Send another
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          data-contact-form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="space-y-4"
          onInput={onAnyInput}
          onFocusCapture={onAnyInput}
        >
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              aria-invalid={!!fieldErrors.name}
              aria-describedby={fieldErrors.name ? "name-error" : undefined}
              className="w-full rounded-lg border border-white/10 bg-[#111214] px-4 py-3 text-sm text-white/90 placeholder-white/40 outline-none ring-brand/30 focus:ring-2 shadow-inner/5"
            />
            {fieldErrors.name && <p id="name-error" className="mt-1 text-xs text-red-400">{fieldErrors.name}</p>}
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              aria-invalid={!!fieldErrors.email}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
              className="w-full rounded-lg border border-white/10 bg-[#111214] px-4 py-3 text-sm text-white/90 placeholder-white/40 outline-none ring-brand/30 focus:ring-2 shadow-inner/5"
            />
            {fieldErrors.email && <p id="email-error" className="mt-1 text-xs text-red-400">{fieldErrors.email}</p>}
          </div>
          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone Number (optional)"
              pattern="^\+?[0-9\-()\s]{7,20}$"
              aria-invalid={!!fieldErrors.phone}
              aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
              className="w-full rounded-lg border border-white/10 bg-[#111214] px-4 py-3 text-sm text-white/90 placeholder-white/40 outline-none ring-brand/30 focus:ring-2 shadow-inner/5"
            />
            {fieldErrors.phone && <p id="phone-error" className="mt-1 text-xs text-red-400">{fieldErrors.phone}</p>}
          </div>
          <div>
            <textarea
              name="message"
              placeholder="Your Message (min 10 characters)"
              rows={5}
              required
              aria-invalid={!!fieldErrors.message}
              aria-describedby={fieldErrors.message ? "message-error" : undefined}
              className="w-full rounded-lg border border-white/10 bg-[#111214] px-4 py-3 text-sm text-white/90 placeholder-white/40 outline-none ring-brand/30 focus:ring-2 shadow-inner/5"
            />
            {fieldErrors.message && <p id="message-error" className="mt-1 text-xs text-red-400">{fieldErrors.message}</p>}
          </div>
          {/* Honeypot */}
          <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
          <div aria-live="polite" className="min-h-5">
            {error && (
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-red-400">{error}</p>
                <button type="button" onClick={retrySend} className="text-xs text-white/70 underline hover:text-white">Try again</button>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isDisabled}
            className="group relative w-full overflow-hidden rounded-lg px-4 py-3 text-sm font-semibold text-black transition disabled:opacity-70"
            style={{
              background: "linear-gradient(90deg, #ff6ad5 0%, #ffd36a 50%, #b4fa72 100%)",
            }}
          >
            <span className="relative z-10 inline-flex items-center justify-center gap-2">
              {status === "submitting"
                ? "Sending..."
                : cooldown > 0
                ? `Wait ${cooldown}s`
                : "Send Message"}
              <Send size={16} />
            </span>
            {/* sheen */}
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(115deg,transparent,rgba(255,255,255,0.35),transparent)] transition-transform duration-700 ease-out group-hover:translate-x-full" />
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
