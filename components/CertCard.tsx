"use client";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";

export type CertMeta = {
  title: string;
  provider: string;
  slug?: string;
  image?: string;
  href?: string;
  issuedOn?: string; // e.g., "June 27, 2024"
};

export default function CertCard({ item }: { item: CertMeta }) {
  const { title, provider, slug, image, href, issuedOn } = item;

  const inner = (
    <div className="group relative flex overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] p-4 transition duration-200 ease-out hover:-translate-y-[1px] hover:border-white/15 hover:bg-white/[0.06]">
      <div className="relative hidden h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-white/5 sm:block">
        {image ? (
          <Image src={image} alt={title} fill className="object-cover" sizes="96px" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-white/40">No image</div>
        )}
      </div>
      <div className="ml-0 flex min-w-0 flex-col sm:ml-4">
        <h3 className="line-clamp-1 font-semibold text-white text-[1.05rem] md:text-lg tracking-tight transition-transform duration-200 ease-out group-hover:-translate-y-[1px]">
          {title}
        </h3>
        <p className="mt-1 text-[0.78rem] text-white/70">Issued by: {provider}</p>
        {issuedOn && (
          <p className="mt-1 inline-flex items-center gap-1 text-[0.78rem] text-white/65">
            <Calendar className="h-3.5 w-3.5 text-brand" /> {issuedOn}
          </p>
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
    </div>
  );

  if (image && slug) {
    return (
      <Link href={{ pathname: "/certifications", query: { view: slug } }} scroll={false} className="block">
        {inner}
      </Link>
    );
  }
  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <a href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined}>
        {inner}
      </a>
    );
  }
  return <div>{inner}</div>;
}
