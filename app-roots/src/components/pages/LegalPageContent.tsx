"use client";

import Link from "next/link";
import {
  ContentPageHero,
  ContentPageLayout,
} from "@/components/pages/ContentPageLayout";

export type LegalSection = {
  title: string;
  content: string;
};

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/^\d+\.\s*/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseSectionTitle(title: string) {
  const match = title.match(/^(\d+)\.\s*(.+)$/);
  if (!match) return { number: "", label: title };
  return { number: match[1].padStart(2, "0"), label: match[2] };
}

interface LegalPageContentProps {
  tag: string;
  pageTitle: string;
  effectiveDate: string;
  sections: LegalSection[];
  contactEmail: string;
  contactPrompt: string;
}

export function LegalPageContent({
  tag,
  pageTitle,
  effectiveDate,
  sections,
  contactEmail,
  contactPrompt,
}: LegalPageContentProps) {
  return (
    <ContentPageLayout maxWidth="xl">
      <ContentPageHero
        tag={tag}
        title={pageTitle}
        meta={`Effective date: ${effectiveDate}`}
      />

      <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[260px_minmax(0,1fr)] xl:gap-16">
        <aside className="mb-10 hidden lg:block">
          <nav
            aria-label="Table of contents"
            className="sticky top-28 rounded-2xl border border-white/[0.08] bg-bg-surface/80 p-5 backdrop-blur-sm"
          >
            <p className="mb-4 font-inter text-[11px] font-medium uppercase tracking-[0.12em] text-white/40">
              On this page
            </p>
            <ul className="max-h-[calc(100svh-10rem)] space-y-1 overflow-y-auto pr-1">
              {sections.map((section) => {
                const { label } = parseSectionTitle(section.title);
                const id = slugify(section.title);
                return (
                  <li key={section.title}>
                    <a
                      href={`#${id}`}
                      className="block rounded-lg px-3 py-2 font-inter text-[13px] leading-snug text-white/45 transition-colors hover:bg-white/[0.04] hover:text-text-heading"
                    >
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        <div className="space-y-5">
          {sections.map((section) => {
            const { number, label } = parseSectionTitle(section.title);
            const id = slugify(section.title);

            return (
              <article
                key={section.title}
                id={id}
                className="group scroll-mt-28 rounded-2xl border border-white/[0.08] bg-bg-surface/80 p-8 backdrop-blur-sm transition-[border-color,box-shadow] hover:border-white/[0.12] lg:p-10"
              >
                <div className="mb-5 flex items-start gap-4">
                  {number && (
                    <span className="font-satoshi text-[40px] font-black leading-none text-white/[0.07] transition-colors group-hover:text-brand-purple/30">
                      {number}
                    </span>
                  )}
                  <h2 className="pt-1 font-satoshi text-lg font-black uppercase leading-tight tracking-tight text-text-heading lg:text-xl">
                    {label}
                  </h2>
                </div>
                <p className="font-inter text-[15px] leading-[1.75] text-text-body">
                  {section.content}
                </p>
              </article>
            );
          })}

          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-bg-surface p-8 lg:p-10">
            <div
              className="pointer-events-none absolute inset-0 opacity-50"
              style={{
                background:
                  "radial-gradient(ellipse 400px 180px at 0% 100%, rgba(0,200,255,0.1) 0%, transparent 70%)",
              }}
            />
            <p className="relative z-10 font-inter text-sm leading-relaxed text-text-body">
              {contactPrompt}{" "}
              <a
                href={`mailto:${contactEmail}`}
                className="font-medium text-brand-cyan transition-colors hover:text-text-heading"
              >
                {contactEmail}
              </a>
            </p>
            <div className="relative z-10 mt-6 flex flex-wrap gap-4">
              <Link
                href="/faq"
                className="link-underline font-inter text-sm font-semibold uppercase tracking-[0.06em] text-text-heading"
              >
                View FAQ
              </Link>
              <Link
                href="/register"
                className="link-underline font-inter text-sm font-semibold uppercase tracking-[0.06em] text-text-heading"
              >
                Let&apos;s talk
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ContentPageLayout>
  );
}
