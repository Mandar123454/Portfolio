import { Github, Linkedin, Mail } from "lucide-react";
import ContactForm from "@/components/contact-form";

const site = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
export const metadata = {
  title: "Contact — Mandar Kajbaje",
  description: "Get in touch via a secure SMTP-backed form.",
  alternates: { canonical: `${site}/contact` },
};

export default function ContactPage() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "mandar@example.com";
  const linkedin = "https://www.linkedin.com/in/mandar-kajbaje";
  const github = "https://github.com/Mandar123454";

  return (
    <main className="container py-12 md:py-16">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white/5">
            <Mail className="text-brand" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">Contact Me</h1>
        </div>

        <p className="mt-3 text-white/80">Direct to inbox via secure delivery with spam protection.</p>
        <p className="mt-1 text-sm text-white/60">I usually reply within 24–48 hours.</p>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand/80 to-fuchsia-500/60 px-3 py-1.5 text-xs font-medium text-white shadow-sm ring-1 ring-white/15 hover:brightness-110"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" aria-hidden />
            Email
          </a>
          <a
            href={linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500/80 to-violet-500/60 px-3 py-1.5 text-xs font-medium text-white shadow-sm ring-1 ring-white/15 hover:brightness-110"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" aria-hidden />
            LinkedIn
          </a>
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500/80 to-teal-500/60 px-3 py-1.5 text-xs font-medium text-white shadow-sm ring-1 ring-white/15 hover:brightness-110"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" aria-hidden />
            GitHub
          </a>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
          <ContactForm />
          <p className="mt-4 text-xs text-white/50">Your details are only used to respond. No spam.</p>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-5">
          <p className="text-sm text-white/75">
            For the fastest response, include your goal (internship, project, or collaboration) and any helpful links (resume, GitHub, portfolio). I’ll get back within 24–48 hours.
          </p>
        </div>
      </div>
    </main>
  );
}
