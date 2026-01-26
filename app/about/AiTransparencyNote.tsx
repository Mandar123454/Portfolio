"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/cn";

const NOTE = `📬 A Note From Me — With Full Transparency & Heart 💡🤖❤️

Hi there 👋,

I’m Mandar Kajbaje — thinker, creator, builder. I believe ideas are everything.

Every project you see here? Born in my mind 💡.  
Every concept. Every direction. Every layout. Every vision. 100% mine.

And yes — I used AI tools to bring those ideas to life 🤖.  
Visuals? AI helped. Copy? AI touched it. Layouts, digital stamps, even this note? Yep — AI was in the room.

But here’s what matters:  
The soul? The spark? The strategy? The sweat? The edits? The judgment? That’s all me.

✅ I consent and confirm:
→ All content is accurate, intentional, and true to my vision.  
→ No false claims: if AI touched it, I say so — proudly.  
→ I don’t claim misleading copyright over raw AI outputs — only over what I shaped, directed, edited, improved, and transformed.  
→ My digital signature/stamp? AI-assisted — labeled honestly, never disguised.

This isn’t an excuse. It’s a declaration.  
Not hiding — it’s honesty.  
Not regret — it’s respect.  
For you. For the craft. For the future of creation.

Let me be crystal clear:  
Using AI ≠ pasting a prompt and hitting “generate.”  
AI makes mistakes. I catch them.  
AI gives rough drafts. I refine them.  
AI suggests paths. I choose the right one.  
AI delivers “ready-made.” I ask: “Where’s the gap? What’s missing? How can this be better?”

I researched. I tested. I broke things. I fixed them.  
I compared sources. I restructured. I redesigned. I rewrote.  
I didn’t just “use” AI — I collaborated with it.  
Guided it. Challenged it. Improved upon it.  
All with my human brain 🧠 — fully awake, fully in charge.

If that sounds like an excuse to you? Fine.  
I say it with pride. With confidence. With ownership.  
Because I know the basics of software. I understand systems. I grasp design logic. I speak code-adjacent.  
I didn’t outsource my brain — I amplified it.

Thank you for being here. Your time? Means the world 🙏.  
Let’s keep building — with heart, with tech, and with radical transparency.

With grit, gratitude & good vibes,  
— Mandar Kajbaje  
✨ Human Ideas × AI Execution ✨  
 (Digital Signature / Stamp: “AI-crafted with purpose — shaped by me”)  
path /public/signature and path /public/stamp
© 2025 — Built by Mandar, powered (not replaced) by AI 💖`;

export default function AiTransparencyNote() {
  const reduce = useReducedMotion();

  return (
    <section>
      <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">AI transparency note</h2>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 10 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55 }}
        className={cn(
          "relative mt-5 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-6 md:p-7",
          "shadow-[0_0_0_1px_rgba(124,58,237,0.18)]",
        )}
      >
        <div aria-hidden className="pointer-events-none absolute -inset-24 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.18),transparent_60%)]" />
        <div aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl border border-brand/25" />

        <div className="relative">
          <div className="rounded-xl border border-white/10 bg-black/25 p-4">
            <div className="whitespace-pre-wrap text-sm leading-relaxed text-white/80">{NOTE}</div>
          </div>

          <div className="mt-5 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <span className="text-xs text-white/55">(Digital Signature / Stamp files can be added later)</span>

            <span className="group relative inline-flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-3 py-2">
              <span className="text-xs text-white/70">Signature</span>
              <Image src="/signature.png" alt="Signature" width={140} height={44} className="h-7 w-auto opacity-85" />
              <Image src="/stamp.png" alt="Stamp" width={44} height={44} className="h-7 w-7 opacity-80" />

              <span
                role="tooltip"
                className={cn(
                  "pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-[18rem] -translate-x-1/2 rounded-lg",
                  "border border-white/10 bg-black/85 p-2 text-xs text-white/80 opacity-0",
                  "transition group-hover:opacity-100 group-focus-within:opacity-100",
                )}
              >
                📬 A Note From Me — With Full Transparency &amp; Heart 💡🤖❤️
              </span>
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
