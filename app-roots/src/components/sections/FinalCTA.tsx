"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionTag } from "@/components/ui/SectionTag";
import { useNizekHeading } from "@/components/animations/useNizekHeading";
import { SectionShell } from "@/components/layout/SectionLayout";

export function FinalCTA() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const reassuranceRef = useRef<HTMLParagraphElement>(null);
  useNizekHeading(headingRef, { fromX: 32 });

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
      className="site-section relative bg-bg"
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 800px 400px at 50% 50%, rgba(123,47,255,0.06) 0%, transparent 70%)",
        }}
      />

      <SectionShell className="relative z-10 py-4 text-center lg:py-6">
        <div className="mx-auto w-full max-w-5xl px-1 sm:px-2">
          <SectionTag>07 · Launch</SectionTag>
          <h2 ref={headingRef} className="text-heading-cta overflow-visible">
            {["STOP JUGGLING DEVELOPMENT.", "START BUILDING MOMENTUM."].map(
              (line) => (
                <span key={line} className="block overflow-visible">
                  <span
                    data-line
                    className="block overflow-visible whitespace-nowrap text-[clamp(16px,2.8vw,48px)] leading-[0.92] tracking-[-0.03em]"
                  >
                    {line}
                  </span>
                </span>
              )
            )}
          </h2>

          <p className="copy-lead mx-auto mt-4 max-w-none text-[clamp(12px,2.6vw,18px)] leading-snug whitespace-nowrap sm:text-base lg:text-lg">
            Tell us what you&apos;re building. We&apos;ll figure out the first step together.
          </p>

          <div className="btn-row-center">
            <MagneticButton href="/register">Let&apos;s talk →</MagneticButton>
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
            className="mt-8 font-inter text-[13px] text-white/25 opacity-0"
          >
            No commitment. No hard sell. Just an honest conversation about
            what&apos;s possible.
          </p>
        </div>
      </SectionShell>
    </section>
  );
}
