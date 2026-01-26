import nodemailer from "nodemailer";
import type { NextRequest } from "next/server";

// Basic in-memory rate limit (per instance)
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // per IP per window
const recentByIp = new Map<string, number[]>();

function rateLimit(ip: string): { ok: true } | { ok: false; retryAfter: number } {
  const now = Date.now();
  const arr = recentByIp.get(ip) || [];
  const fresh = arr.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (fresh.length >= RATE_LIMIT_MAX) {
    const oldest = Math.min(...fresh);
    const retryIn = Math.max(0, RATE_LIMIT_WINDOW_MS - (now - oldest));
    return { ok: false, retryAfter: Math.ceil(retryIn / 1000) };
  }
  fresh.push(now);
  recentByIp.set(ip, fresh);
  return { ok: true };
}

function getEnv(name: string, optional = false) {
  const v = process.env[name];
  if (!v && !optional) throw new Error(`Missing env ${name}`);
  return v || "";
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const rl = rateLimit(ip);
    if (!rl.ok) {
      return new Response(
        JSON.stringify({ error: `Too many requests. Please wait ${rl.retryAfter}s and try again.`, retryAfter: rl.retryAfter }),
        { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
      );
    }

    const formData = await req.formData();
    const intent = String(formData.get("_intent") || "contact").trim() || "contact";
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const ratingRaw = String(formData.get("rating") || "").trim();
    const page = String(formData.get("_page") || "").trim();
    const gotcha = String(formData.get("_gotcha") || "");

    if (gotcha) {
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    // Special case: rating submissions
    if (intent === "rating") {
      const rating = Number(ratingRaw);
      const isValid = Number.isFinite(rating) && rating >= 1 && rating <= 5;
      if (!isValid) {
        return new Response(JSON.stringify({ error: "Invalid rating" }), { status: 400 });
      }

      const payload = {
        intent,
        rating,
        page,
        ip,
        ua: req.headers.get("user-agent") || "",
        ts: new Date().toISOString(),
      };

      const webhook = process.env.CONTACT_WEBHOOK_URL;

      // Determine if SMTP is properly configured (and not placeholders)
      const smtpHost = process.env.SMTP_HOST?.trim();
      const smtpPort = process.env.SMTP_PORT?.trim();
      const smtpUser = process.env.SMTP_USER?.trim();
      const smtpPass = process.env.SMTP_PASS?.trim();
      const mailTo = process.env.CONTACT_TO_EMAIL?.trim();
      const normalize = (v?: string) => (v || "").toLowerCase().replace(/\s+/g, "");
      const looksPlaceholder = (v?: string) => {
        const n = normalize(v);
        return !n || n === "your_brevo_username" || n === "your_brevo_smtp_key";
      };
      const emailEnabled =
        !!(smtpHost && smtpPort && smtpUser && smtpPass && mailTo) && !looksPlaceholder(smtpUser) && !looksPlaceholder(smtpPass);

      async function postWebhookAwait(url: string, body: any): Promise<boolean> {
        try {
          const ctrl = new AbortController();
          const t = setTimeout(() => ctrl.abort(), 5000);
          const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
            signal: ctrl.signal,
          });
          clearTimeout(t);
          return res.ok;
        } catch {
          return false;
        }
      }

      const FORMSPREE_ENDPOINT = "https://formspree.io/f/xzzjjvjl"; // per user request
      async function postFormspreeAwait(body: any): Promise<boolean> {
        try {
          const ctrl = new AbortController();
          const t = setTimeout(() => ctrl.abort(), 5000);
          const res = await fetch(FORMSPREE_ENDPOINT, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: "Anonymous",
              email: "anonymous@mkportfolio.local",
              phone: "",
              message: `Portfolio rating: ${body.rating}/5\nPage: ${body.page || "unknown"}\nTime: ${body.ts}`,
              _source: "mk-portfolio-api",
              _intent: "rating",
            }),
            signal: ctrl.signal,
          });
          clearTimeout(t);
          return res.ok;
        } catch {
          return false;
        }
      }

      if (emailEnabled) {
        try {
          const host = smtpHost as string;
          const port = Number(smtpPort);
          const user = smtpUser as string;
          const pass = smtpPass as string;
          const to = mailTo as string;
          const from = ((process.env.CONTACT_FROM_EMAIL || user) as string).trim();

          const transporter = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
          const subject = `Portfolio rating: ${rating}/5`;
          const text = `Rating: ${rating}/5\nPage: ${page || "unknown"}\nIP: ${ip}`;
          const html = `
            <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial">
              <h2 style="margin:0 0 8px;color:#111">Portfolio rating</h2>
              <p><strong>Rating:</strong> ${rating}/5</p>
              <p><strong>Page:</strong> ${page || "unknown"}</p>
              <p><strong>IP:</strong> ${ip}</p>
            </div>
          `;
          await transporter.sendMail({ from, to, subject, text, html });

          if (webhook) fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }).catch(() => {});
          postFormspreeAwait(payload).catch(() => {});
          return new Response(JSON.stringify({ ok: true }), { status: 200 });
        } catch {
          if (webhook) {
            const logged = await postWebhookAwait(webhook, payload);
            if (logged) return new Response(JSON.stringify({ ok: true, note: "email_failed_logged_to_sheet" }), { status: 200 });
          }
          const fsOk = await postFormspreeAwait(payload);
          if (fsOk) return new Response(JSON.stringify({ ok: true, note: "sent_via_formspree" }), { status: 200 });
          return new Response(JSON.stringify({ error: "Rating submit failed" }), { status: 502 });
        }
      } else {
        if (webhook) {
          const ok = await postWebhookAwait(webhook, payload);
          if (ok) return new Response(JSON.stringify({ ok: true, note: "logged_to_sheet_only" }), { status: 200 });
        }
        const fsOk = await postFormspreeAwait(payload);
        if (fsOk) return new Response(JSON.stringify({ ok: true, note: "sent_via_formspree" }), { status: 200 });
        return new Response(JSON.stringify({ error: "Email service misconfigured and no webhook" }), { status: 500 });
      }
    }

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    // Build payload for email/webhook
    const payload = { intent, name, email, phone, message, ip, ua: req.headers.get("user-agent") || "", ts: new Date().toISOString() };
    const webhook = process.env.CONTACT_WEBHOOK_URL;

    // Determine if SMTP is properly configured (and not placeholders)
    const smtpHost = process.env.SMTP_HOST?.trim();
    const smtpPort = process.env.SMTP_PORT?.trim();
    const smtpUser = process.env.SMTP_USER?.trim();
    const smtpPass = process.env.SMTP_PASS?.trim();
    const mailTo = process.env.CONTACT_TO_EMAIL?.trim();
    const normalize = (v?: string) => (v || "").toLowerCase().replace(/\s+/g, "");
    const looksPlaceholder = (v?: string) => {
      const n = normalize(v);
      return !n || n === "your_brevo_username" || n === "your_brevo_smtp_key";
    };
    const emailEnabled = !!(smtpHost && smtpPort && smtpUser && smtpPass && mailTo) && !looksPlaceholder(smtpUser) && !looksPlaceholder(smtpPass);

    async function postWebhookAwait(url: string, body: any): Promise<boolean> {
      try {
        const ctrl = new AbortController();
        const t = setTimeout(() => ctrl.abort(), 5000);
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          signal: ctrl.signal,
        });
        clearTimeout(t);
        return res.ok;
      } catch {
        return false;
      }
    }

    // Formspree forwarding (email service)
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/xzzjjvjl"; // per user request
    async function postFormspreeAwait(body: any): Promise<boolean> {
      try {
        const ctrl = new AbortController();
        const t = setTimeout(() => ctrl.abort(), 5000);
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: body.name,
            email: body.email,
            phone: body.phone,
            message: body.message,
            _source: "mk-portfolio-api",
          }),
          signal: ctrl.signal,
        });
        clearTimeout(t);
        return res.ok;
      } catch {
        return false;
      }
    }

    if (emailEnabled) {
      try {
  const host = smtpHost as string;
  const port = Number(smtpPort);
  const user = smtpUser as string;
  const pass = smtpPass as string;
  const to = mailTo as string;
  const from = ((process.env.CONTACT_FROM_EMAIL || user) as string).trim();

        const transporter = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
        const subject = intent === "about_feedback" ? `Portfolio feedback from ${name}` : `New portfolio contact from ${name}`;
        const text = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`;
        const html = `
          <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial">
            <h2 style="margin:0 0 8px;color:#111">${intent === "about_feedback" ? "Portfolio feedback" : "New portfolio contact"}</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
            <hr style="border:none;height:1px;background:#eee;margin:16px 0" />
            <p style="white-space:pre-wrap">${message}</p>
          </div>
        `;
        await transporter.sendMail({ from, to, replyTo: email, subject, text, html });

        // fire-and-forget webhook (optional)
        if (webhook) fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }).catch(() => {});
        // fire-and-forget Formspree forwarding (optional)
        postFormspreeAwait(payload).catch(() => {});
        return new Response(JSON.stringify({ ok: true }), { status: 200 });
      } catch (err) {
        // email failed — try webhook as backup
        if (webhook) {
          const logged = await postWebhookAwait(webhook, payload);
          if (logged) return new Response(JSON.stringify({ ok: true, note: "email_failed_logged_to_sheet" }), { status: 200 });
        }
        // try Formspree as last resort
        const fsOk = await postFormspreeAwait(payload);
        if (fsOk) return new Response(JSON.stringify({ ok: true, note: "sent_via_formspree" }), { status: 200 });
        return new Response(JSON.stringify({ error: "Email failed" }), { status: 502 });
      }
    } else {
      // Email not configured — try webhook only
      if (webhook) {
        const ok = await postWebhookAwait(webhook, payload);
        if (ok) return new Response(JSON.stringify({ ok: true, note: "logged_to_sheet_only" }), { status: 200 });
      }
      // Try Formspree if SMTP disabled and webhook not available/failed
      const fsOk = await postFormspreeAwait(payload);
      if (fsOk) return new Response(JSON.stringify({ ok: true, note: "sent_via_formspree" }), { status: 200 });
      return new Response(JSON.stringify({ error: "Email service misconfigured and no webhook" }), { status: 500 });
    }
  } catch (err: any) {
    console.error("/api/contact error", err);
    return new Response(JSON.stringify({ error: "Email failed" }), { status: 502 });
  }
}
