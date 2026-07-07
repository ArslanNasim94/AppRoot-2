"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  ContentPageHero,
  ContentPageLayout,
} from "@/components/pages/ContentPageLayout";
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
    <div
      className={`overflow-hidden rounded-2xl border bg-bg-surface/90 transition-[border-color,box-shadow] ${
        open
          ? "border-brand-purple/25 shadow-[0_0_32px_rgba(123,47,255,0.08)]"
          : "border-white/[0.08] hover:border-white/[0.12]"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left lg:px-7 lg:py-6"
        aria-expanded={open}
      >
        <span className="font-inter text-[15px] font-medium leading-snug text-text-heading lg:text-base">
          {question}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-brand-cyan transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="border-t border-white/[0.06] px-6 pb-6 pt-4 lg:px-7 lg:pb-7">
              <p className="font-inter text-sm leading-relaxed text-text-body lg:text-[15px]">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqContent() {
  return (
    <ContentPageLayout maxWidth="lg">
      <ContentPageHero
        tag="(FAQ)"
        title="Frequently Asked Questions"
        description="Find answers to common questions about AppRoots, our products, services, and how we can help you build your startup."
      />

      <div className="space-y-14">
        {faqCategories.map((category, index) => (
          <section key={category.title}>
            <div className="mb-6 flex items-end justify-between gap-4 border-b border-white/[0.06] pb-4">
              <div>
                <p className="mb-1 font-inter text-[11px] font-medium uppercase tracking-[0.14em] text-brand-cyan">
                  Category {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="font-satoshi text-xl font-black uppercase tracking-tight text-text-heading lg:text-2xl">
                  {category.title}
                </h2>
              </div>
              <span className="hidden font-inter text-xs text-white/30 sm:block">
                {category.items.length} questions
              </span>
            </div>

            <div className="space-y-3">
              {category.items.map((item) => (
                <FaqAccordion
                  key={item.question}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="relative mt-16 overflow-hidden rounded-2xl border border-white/[0.08] bg-bg-surface p-10 text-center lg:p-12">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 500px 200px at 50% 0%, rgba(123,47,255,0.15) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10">
          <h2 className="font-satoshi text-2xl font-black uppercase text-text-heading lg:text-3xl">
            Still have questions?
          </h2>
          <p className="mx-auto mt-4 max-w-md font-inter text-base leading-relaxed text-text-body">
            Can&apos;t find what you&apos;re looking for? Our team and AI assistant
            are here to help.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href="/#ai-chatbot">
              Chat with AI Assistant →
            </MagneticButton>
            <Link
              href="/register"
              className="link-underline font-inter text-sm font-semibold uppercase tracking-[0.06em] text-text-heading"
            >
              Let&apos;s talk
            </Link>
          </div>
        </div>
      </div>
    </ContentPageLayout>
  );
}
