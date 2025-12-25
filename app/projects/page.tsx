const site = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
export const metadata = {
  title: "Projects — Mandar Kajbaje",
  description: "A growing collection of hands-on work across cybersecurity, machine learning, full-stack systems, and foundational engineering.",
  alternates: { canonical: `${site}/projects` },
};
import SectionsClient from "./SectionsClient";

export default function ProjectsPage() {
  return <SectionsClient />;
}
