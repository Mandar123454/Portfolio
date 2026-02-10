import fs from "node:fs";

const txt = fs.readFileSync(new URL("../lib/badges.ts", import.meta.url), "utf8");
const urls = [...txt.matchAll(/href:\s*\"(https:\/\/www\.futureskillsprime\.in\/[^\"]+)\"/g)].map((m) => m[1]);

function normalizeImageSrc(raw) {
  if (!raw) return null;
  if (raw.startsWith("//")) return `https:${raw}`;
  if (raw.startsWith("/")) return `https://www.futureskillsprime.in${raw}`;
  return raw;
}

async function main() {
  const out = [];
  for (const u of urls) {
    const res = await fetch(u);
    const html = await res.text();
    const m = html.match(/[\"']([^\"']*badge_logo\.png)[\"']/);
    out.push({ href: u, imageSrc: normalizeImageSrc(m?.[1] ?? null) });
  }

  fs.writeFileSync(
    new URL("../.tmp-fsp-badge-images.json", import.meta.url),
    JSON.stringify(out, null, 2),
    "utf8",
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
