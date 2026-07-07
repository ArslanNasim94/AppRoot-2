"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionTag } from "@/components/ui/SectionTag";
import { useNizekHeading } from "@/components/animations/useNizekHeading";

export function FinalCTA() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const reassuranceRef = useRef<HTMLParagraphElement>(null);
  useNizekHeading(headingRef);

  useEffect(() => {
    const glow = glowRef.current;
    const reassurance = reassuranceRef.current;
    if (!glow || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;

    gsap.to(glow, {
      opacity: 0.6,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    if (reassurance) {
      gsap.fromTo(
        reassurance,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          delay: 1.2,
          scrollTrigger: { trigger: reassurance, start: "top 90%", once: true },
        }
      );
    }
  }, []);

  return (
    <section
      id="contact"
      className="relative flex min-h-screen items-center justify-center bg-bg section-padding"
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 800px 400px at 50% 50%, rgba(123,47,255,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="container relative z-10 text-center">
        <SectionTag>07 · Launch</SectionTag>
        <h2
          ref={headingRef}
          className="font-satoshi text-[clamp(48px,8vw,120px)] font-black uppercase leading-[0.92] tracking-tighter text-text-heading"
        >
          {["STOP JUGGLING", "DEVELOPMENT.", "START BUILDING", "MOMENTUM."].map(
            (line) => (
              <span key={line} className="block overflow-hidden">
                <span data-line className="block">
                  {line}
                </span>
              </span>
            )
          )}
        </h2>

        <p className="mx-auto mt-8 max-w-[520px] font-inter text-lg text-text-body">
          Tell us what you&apos;re building. We&apos;ll figure out the first step
          together.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row">
          <MagneticButton href="/register" className="px-8 py-4">
            Let&apos;s talk →
          </MagneticButton>
          <a
            href="#ai-chatbot"
            className="link-underline font-inter text-sm font-semibold uppercase tracking-[0.06em] text-text-heading"
            data-cursor="hover"
          >
            Talk to us
          </a>
        </div>

        <p
          ref={reassuranceRef}
          className="mt-10 font-inter text-[13px] text-white/25 opacity-0"
        >
          No commitment. No hard sell. Just an honest conversation about
          what&apos;s possible.
        </p>
      </div>
    </section>
  );
}
