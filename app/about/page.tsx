const site = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
export const metadata = {
  title: "About — Mandar Kajbaje",
  alternates: { canonical: `${site}/about` },
};

import AboutClient from "./AboutClient";

export default function AboutPage() {
  return <AboutClient />;
}
