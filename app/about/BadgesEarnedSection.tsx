"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type { EarnedBadge } from "@/lib/badges";
import ProofModal, { ProofItem } from "@/components/ProofModal";

type BadgesApiResponse = {
  badges: EarnedBadge[];
};

export default function BadgesEarnedSection() {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const [badges, setBadges] = useState<EarnedBadge[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/badges");
        if (!res.ok) throw new Error("Bad response");
        const data = (await res.json()) as BadgesApiResponse;
        if (!cancelled) setBadges(Array.isArray(data.badges) ? data.badges : []);
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const count = useMemo(() => badges?.length ?? 0, [badges]);

  const proofItems = useMemo<ProofItem[]>(
    () =>
      (badges ?? [])
        .filter((b) => Boolean(b.lightboxSrc))
        .map((b) => ({ slug: `badge-${b.id}`, title: b.title, image: b.lightboxSrc })),
    [badges],
  );

  const openLightbox = (badgeId: string) => {
    const sp = new URLSearchParams(params.toString());
    sp.set("proof", `badge-${badgeId}`);
    const qs = sp.toString();
    router.push((qs ? `${pathname}?${qs}` : pathname) as any, { scroll: false });
  };

  return (
    <section className="mt-12 md:mt-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">Badges earned</h2>
            <p className="mt-2 max-w-2xl text-sm text-white/75">
              Verifiable learning milestones. Tap a badge to open the source.
            </p>
          </div>
          <div className="hidden text-xs text-white/55 md:block">{count} total</div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
          {failed ? (
            <p className="text-sm text-white/70">Couldn’t load badges right now.</p>
          ) : badges === null ? (
            <p className="text-sm text-white/70">Loading badges…</p>
          ) : badges.length === 0 ? (
            <p className="text-sm text-white/70">No badges added yet.</p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {badges.map((b) => (
                b.href ? (
                  <a
                    key={b.id}
                    href={b.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group rounded-xl border border-white/10 bg-black/25 p-3 transition hover:bg-white/5"
                    aria-label={`Open badge: ${b.title}`}
                  >
                    <div className="flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-white/5">
                      <img
                        src={b.imageSrc}
                        alt={b.title}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-contain p-2"
                      />
                    </div>
                    <div className="mt-2 line-clamp-2 text-xs text-white/80">{b.title}</div>
                  </a>
                ) : (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => openLightbox(b.id)}
                    className="group rounded-xl border border-white/10 bg-black/25 p-3 text-left transition hover:bg-white/5"
                    aria-label={`View badge: ${b.title}`}
                  >
                    <div className="flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-white/5">
                      <img
                        src={b.imageSrc}
                        alt={b.title}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-contain p-2"
                      />
                    </div>
                    <div className="mt-2 line-clamp-2 text-xs text-white/80">{b.title}</div>
                  </button>
                )
              ))}
            </div>
          )}
        </div>

        {/* Lightviewer for image-only badges (e.g., CEH badge) */}
        <ProofModal items={proofItems} />
      </div>
    </section>
  );
}
