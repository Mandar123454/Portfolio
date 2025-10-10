import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });

export const metadata: Metadata = {
  title: "Mandar Kajbaje — Portfolio",
  description: "Full‑Spectrum Technologist & Certified Builder. B.Sc CS ’26 | CEH v12 | Azure Fundamentals | 20+ Projects.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Mandar Kajbaje — Portfolio",
    description: "Full‑Spectrum Technologist & Certified Builder.",
    url: "https://example.com",
    siteName: "Mandar Kajbaje",
    images: [
      { url: "/og.png", width: 1200, height: 630, alt: "Mandar Kajbaje" }
    ],
    locale: "en_US",
    type: "website"
  },
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
