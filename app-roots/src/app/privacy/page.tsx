import type { Metadata } from "next";
import { SectionTag } from "@/components/ui/SectionTag";
import { privacySections } from "@/data/legal";

export const metadata: Metadata = {
  title: "Privacy Policy — AppRoots",
  description:
    "Learn how AppRoots collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="section-padding pt-32">
      <div className="container max-w-3xl">
        <SectionTag>(Legal)</SectionTag>
        <h1 className="mb-2 font-satoshi text-[clamp(36px,5vw,56px)] font-black uppercase leading-[0.95] tracking-tight text-text-heading">
          Privacy Policy
        </h1>
        <p className="mb-12 font-inter text-sm text-white/40">
          Effective date: July 1, 2026
        </p>

        <div className="space-y-10">
          {privacySections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-4 font-satoshi text-xl font-black uppercase text-text-heading">
                {section.title}
              </h2>
              <p className="font-inter text-base leading-relaxed text-text-body">
                {section.content}
              </p>
            </section>
          ))}
        </div>

        <p className="mt-16 border-t border-white/[0.07] pt-8 font-inter text-sm text-text-body">
          Questions about this policy? Contact us at{" "}
          <a
            href="mailto:privacy@approots.net"
            className="text-brand-cyan transition-colors hover:text-text-heading"
          >
            privacy@approots.net
          </a>
        </p>
      </div>
    </div>
  );
}
