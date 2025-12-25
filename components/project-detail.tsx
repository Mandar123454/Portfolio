"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

export type Badge =
  | "Featured"
  | "Flagship"
  | "Capstone"
  | "Production-Grade"
  | "System-Level Project";

export type ProjectDetailProps = {
  title: string;
  badge?: Badge;
  subtitle?: string;
  video: { embedUrl?: string; fileSrc?: string; autoplay?: boolean; poster?: string };
  whatItIs: string[];
  features: string[];
  howItWorks: string[];
  howBuilt: {
    stack: string[];
    rationale?: string[];
    challenge?: string;
    designWin?: string;
  };
  links: { repo?: string; live?: string };
};

export default function ProjectDetail(props: ProjectDetailProps) {
  const { title, badge, subtitle, video, whatItIs, features, howItWorks, howBuilt, links } = props;
  const videoSrc = video.embedUrl
    ? (() => {
        const hasQuery = video.embedUrl!.includes("?");
        const base = video.embedUrl! + (hasQuery ? "&" : "?");
        const params = ["mute=1"]; // always mute
        if (video.autoplay) params.push("autoplay=1");
        return base + params.join("&");
      })()
    : undefined;
  const html5Ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = html5Ref.current;
    if (!v) return;
    const enforce = () => {
      try {
        v.muted = true;
        if (typeof v.volume === "number") v.volume = 0;
      } catch {}
    };
    enforce();
    const onVolume = () => enforce();
    const onPlay = () => enforce();
    const onLoaded = () => enforce();
    v.addEventListener("volumechange", onVolume);
    v.addEventListener("play", onPlay);
    v.addEventListener("loadedmetadata", onLoaded);
    return () => {
      v.removeEventListener("volumechange", onVolume);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("loadedmetadata", onLoaded);
    };
  }, [video.fileSrc]);

  return (
    <main className="container py-10 md:py-14">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">{title}</h1>
          {subtitle ? <p className="mt-3 max-w-2xl text-white/80 text-sm md:text-base">{subtitle}</p> : null}
        </div>
        {badge ? (
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
            {badge}
          </span>
        ) : null}
      </div>

      <nav className="mt-6 text-[12px] text-white/70">
        <ul className="flex flex-wrap gap-2">
          <li><a href="#video" className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 hover:bg-white/7">Video</a></li>
          <li><a href="#what" className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 hover:bg-white/7">What it is</a></li>
          <li><a href="#features" className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 hover:bg-white/7">Key Features</a></li>
          <li><a href="#flow" className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 hover:bg-white/7">How it works</a></li>
          <li><a href="#built" className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 hover:bg-white/7">How it was built</a></li>
          <li><a href="#proof" className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 hover:bg-white/7">Proof & Links</a></li>
        </ul>
      </nav>

      <section id="video" className="mt-8">
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-white/10 bg-white/[0.06] p-2">
          {videoSrc ? (
            <div className="aspect-video w-full overflow-hidden rounded-lg">
              <iframe
                src={videoSrc}
                title={`${title} — Demo`}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                style={{ pointerEvents: "none" }}
                allowFullScreen
              />
            </div>
          ) : video.fileSrc ? (
            <video
              src={video.fileSrc}
              className="aspect-video w-full overflow-hidden rounded-lg"
              controls
              playsInline
              muted
              autoPlay={Boolean(video.autoplay)}
              poster={video.poster}
              ref={html5Ref}
            />
          ) : (
            <div className="flex aspect-video w-full items-center justify-center text-white/70">
              <p className="text-sm">Demo video will appear here once linked.</p>
            </div>
          )}
        </motion.div>
      </section>

      <section id="what" className="mt-10">
        <h2 className="text-lg font-semibold text-white">What it is</h2>
        <div className="mt-2 space-y-2 text-sm text-white/80">
          {whatItIs.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </section>

      <section id="features" className="mt-10">
        <h2 className="text-lg font-semibold text-white">Key Features</h2>
        <ul className="mt-2 grid list-disc gap-2 pl-5 text-sm text-white/80 sm:grid-cols-2">
          {features.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      </section>

      <section id="flow" className="mt-10">
        <h2 className="text-lg font-semibold text-white">How it works</h2>
        <ol className="mt-2 grid list-decimal gap-2 pl-5 text-sm text-white/80 sm:grid-cols-2">
          {howItWorks.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </section>

      <section id="built" className="mt-10">
        <h2 className="text-lg font-semibold text-white">How it was built</h2>
        <div className="mt-2 grid gap-3 text-sm text-white/80 sm:grid-cols-2">
          <div>
            <h3 className="text-[13px] font-semibold text-white/90">Tech Stack</h3>
            <ul className="mt-1 list-disc pl-5">
              {howBuilt.stack.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            {howBuilt.rationale && (
              <>
                <h3 className="text-[13px] font-semibold text-white/90">Why these choices</h3>
                <ul className="mt-1 list-disc pl-5">
                  {howBuilt.rationale.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </>
            )}
            {howBuilt.challenge ? (
              <p className="mt-3"><span className="font-semibold">Challenge:</span> {howBuilt.challenge}</p>
            ) : null}
            {howBuilt.designWin ? (
              <p className="mt-1"><span className="font-semibold">Decision:</span> {howBuilt.designWin}</p>
            ) : null}
          </div>
        </div>
      </section>

      <section id="proof" className="mt-12">
        <h2 className="text-lg font-semibold text-white">Proof & Links</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {links.repo ? (
            <a
              href={links.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-[12px] text-white hover:bg-white/15"
              aria-label="View Source Code on GitHub"
            >
              <Github size={14} /> View Source Code
            </a>
          ) : null}
          {links.live ? (
            <a
              href={links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-[12px] text-white hover:bg-white/15"
              aria-label="Open Live Demo"
            >
              <ExternalLink size={14} /> Live Demo
            </a>
          ) : null}
        </div>
      </section>

      <div className="mt-12">
        <a href="/projects" className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[12px] text-white/80 hover:bg-white/7">
          ← Back to Projects
        </a>
      </div>
    </main>
  );
}
