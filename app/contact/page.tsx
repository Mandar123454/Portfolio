import { Mail } from "lucide-react";
import ContactForm from "@/components/contact-form";
import SentimentWidget from "@/components/sentiment-widget";

const site = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
export const metadata = {
  title: "Contact — Mandar Kajbaje",
  description: "Get in touch via a secure SMTP-backed form.",
  alternates: { canonical: `${site}/contact` },
};

export default function ContactPage() {
  return (
  <main className="container py-12 md:py-16">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white/5">
            <Mail className="text-brand" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">Contact Me</h1>
        </div>

  <p className="mt-3 text-white/80">💌 Direct to inbox via secure SMTP with spam protection.</p>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
          <ContactForm />
          {/* Optional sentiment mini-demo (shown only if NEXT_PUBLIC_AZURE_SENTIMENT_URL is set) */}
          <SentimentWidget />
        </div>
      </div>
    </main>
  );
}
