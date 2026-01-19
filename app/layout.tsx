import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
// Removed header top progress and Suspense fallback to keep only first-load overlay
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";
import { Analytics, AnalyticsConsent } from "../components/analytics";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata: Metadata = {
  title: "Mandar Kajbaje — Portfolio",
  description: "Full‑Spectrum Technologist & Certified Builder. B.Sc CS ’26 | CEH v12 | Azure Fundamentals | 20+ Projects.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mandar Kajbaje — Portfolio",
    description: "Full‑Spectrum Technologist & Certified Builder.",
    url: siteUrl,
    siteName: "Mandar Kajbaje",
    images: [
      { url: "/og.png", width: 1200, height: 630, alt: "Mandar Kajbaje" }
    ],
    locale: "en_US",
    type: "website"
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.svg", type: "image/svg+xml" },
    ],
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable}`}>
      <body>
        {/* Skip to content for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10001] focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>
        {/* First-load preloader overlay */}
        <div id="preloader">
          <div className="preloader-inner">
            <div className="spinner-ring" />
            <div className="tagline">MK</div>
          </div>
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                if (window.sessionStorage.getItem('preloader:hidden')) return document.getElementById('preloader')?.classList.add('hidden');
                var start = Date.now();
                window.addEventListener('load', function(){
                  var el = document.getElementById('preloader');
                  if(!el) return;
                  var elapsed = Date.now() - start;
                  var minVisible = 600; // ms
                  var delay = elapsed < minVisible ? (minVisible - elapsed) : 0;
                  setTimeout(function(){
                    el.classList.add('hidden');
                    window.sessionStorage.setItem('preloader:hidden','1');
                    setTimeout(function(){ if(el && el.parentNode){ el.parentNode.removeChild(el); } }, 350);
                  }, delay);
                });
              })();
            `,
          }}
        />
        {/* Defensive auto-reload on rare stale chunk error (local dev or after deploy) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                function shouldReload(err){
                  if(!err) return false;
                  var msg = '' + (err.message || err.reason || '');
                  return msg.indexOf('ChunkLoadError') !== -1 || msg.indexOf('Loading chunk') !== -1;
                }
                window.addEventListener('error', function(e){ if(shouldReload(e)){ location.reload(); } }, true);
                window.addEventListener('unhandledrejection', function(e){ if(shouldReload(e && e.reason)){ location.reload(); } });
              })();
            `,
          }}
        />
        {/* Custom cursor for pointer devices */}
        <div className="cursor-ring" aria-hidden="true"><div className="cursor-outline"></div><div className="cursor-dot"></div></div>
        <script
          dangerouslySetInnerHTML={{
            __html: `(
              function(){
                if (window.matchMedia('(pointer: coarse)').matches) return; // skip on touch
                var dot = document.querySelector('.cursor-dot');
                var outline = document.querySelector('.cursor-outline');
                var x = window.innerWidth/2, y = window.innerHeight/2, tx=x, ty=y;
                function move(e){ tx = e.clientX; ty = e.clientY; if(dot){ dot.style.transform='translate(' + tx + 'px,' + ty + 'px)'; } }
                window.addEventListener('mousemove', move, { passive: true });
                function tick(){ x += (tx - x) * 0.18; y += (ty - y) * 0.18; if(outline){ outline.style.transform='translate(' + x + 'px,' + y + 'px)'; } requestAnimationFrame(tick); }
                requestAnimationFrame(tick);
              }
            )();`,
          }}
        />
  {/* Analytics gated by consent */}
  <Analytics />
  <AnalyticsConsent />
        <HeaderNav />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
