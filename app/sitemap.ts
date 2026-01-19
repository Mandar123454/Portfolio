import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

function scanPages(appDir: string): string[] {
  const results: string[] = [];
  function walk(dir: string, rel: string) {
    // Skip APIs and special/route group folders
    if (rel.includes("/api/") || path.basename(dir).startsWith("(") || path.basename(dir).startsWith("_") ) return;
    // If this folder contains page.tsx, it's a route
    const pageTsx = path.join(dir, "page.tsx");
    if (fs.existsSync(pageTsx)) {
      const route = "/" + rel.replace(/\\/g, "/");
      results.push(route === "/" ? "" : route);
    }
    // Recurse
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name), path.join(rel, entry.name));
      }
    }
  }
  walk(appDir, "");
  // Ensure unique & sorted; fallback to known pages if detection failed
  const set = new Set(results);
  if (!set.has("")) set.add("");
  // Remove duplicates and sort for stability
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const now = new Date();
  let pages: string[] = [];
  try {
    pages = scanPages(path.join(process.cwd(), "app"));
  } catch {
    pages = ["", "/about", "/certifications", "/contact", "/experience", "/projects"]; // safe fallback
  }
  pages = pages.filter((p) => p !== "/internships");
  return pages.map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.7,
  }));
}
