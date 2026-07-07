"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { SectionTag } from "@/components/ui/SectionTag";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { faqCategories } from "@/data/faq";

function FaqAccordion({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-bg-surface">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 p-6 text-left"
      >
        <span className="font-inter text-base font-medium text-text-heading">
          {question}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-white/40 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="border-t border-white/[0.07] px-6 pb-6">
          <p className="font-inter text-sm leading-relaxed text-text-body">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

export function FaqContent() {
  return (
    <div className="section-padding pt-32">
      <div className="container max-w-3xl">
        <SectionTag>(FAQ)</SectionTag>
        <h1 className="mb-4 font-satoshi text-[clamp(40px,6vw,72px)] font-black uppercase leading-[0.95] tracking-tight text-text-heading">
          Frequently Asked Questions
        </h1>
        <p className="mb-16 font-inter text-lg text-text-body">
          Find answers to common questions about AppRoots, our products,
          services, and how we can help you build your startup.
        </p>

        <div className="space-y-12">
          {faqCategories.map((category) => (
            <div key={category.title}>
              <h2 className="mb-6 font-satoshi text-xl font-black uppercase text-text-heading">
                {category.title}
              </h2>
              <div className="space-y-3">
                {category.items.map((item) => (
                  <FaqAccordion
                    key={item.question}
                    question={item.question}
                    answer={item.answer}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 rounded-2xl border border-white/[0.07] bg-bg-surface p-10 text-center">
          <h2 className="font-satoshi text-2xl font-black uppercase text-text-heading">
            Still have questions?
          </h2>
          <p className="mt-4 font-inter text-base text-text-body">
            Can&apos;t find what you&apos;re looking for? Our support team is here
            to help!
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <MagneticButton href="/#ai-chatbot">
              Chat with AI Assistant →
            </MagneticButton>
            <Link
              href="/register"
              className="link-underline font-inter text-sm font-semibold uppercase tracking-[0.06em] text-text-heading"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
