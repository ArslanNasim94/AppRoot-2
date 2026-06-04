"use client";

import { useRef } from "react";
import { SectionTag } from "@/components/ui/SectionTag";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useNizekHeading } from "@/components/animations/useNizekHeading";

// TODO: Replace with real data
const team = [
  { initials: "AR", name: "Alex Rivera" },
  { initials: "JK", name: "Jordan Kim" },
  { initials: "SM", name: "Sam Morgan" },
];

export function Team() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useNizekHeading(headingRef);

  return (
    <section id="team" className="section-padding bg-bg">
      <div className="container text-center">
        <SectionTag>(The Minds Behind It)</SectionTag>
        <h2
          ref={headingRef}
          className="font-satoshi text-[clamp(56px,7vw,100px)] font-black uppercase leading-[0.95] tracking-tight text-text-heading"
        >
          {["TALENT", "WITH", "ROOTS"].map((line) => (
            <span key={line} className="block overflow-hidden">
              <span data-line className="block">
                {line}
              </span>
            </span>
          ))}
        </h2>

        <p className="mx-auto mt-8 max-w-lg font-inter text-lg text-text-body">
          A senior team of engineers, designers, and strategists who&apos;ve shipped
          products at scale — and chose to build something better together.
        </p>

        <div className="mt-12 flex items-center justify-center">
          {team.map((member, i) => (
            <div
              key={member.initials}
              className="group relative -ml-4 first:ml-0 transition-transform hover:-translate-y-2"
              style={{ zIndex: team.length - i }}
            >
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-bg bg-gradient-to-br from-brand-purple to-brand-cyan font-satoshi text-lg font-bold text-white shadow-lg"
                title={member.name}
              >
                {member.initials}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <MagneticButton href="#contact" variant="secondary">
            Meet the Team →
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
