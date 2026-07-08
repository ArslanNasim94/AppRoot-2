"use client";

import { useEffect, useRef } from "react";
import { Check, Code2, Rocket, User } from "lucide-react";
import { gsap } from "@/lib/gsap";

const yourFocus = [
  "Marketing & campaigns",
  "Sales & customers",
  "Growth strategy",
];

const ourFocus = ["Web & backend", "Mobile apps", "Launch & maintenance"];

const coreStacks = [
  "React Native",
  "SwiftUI",
  "Kotlin",
  "Laravel",
  "Next.js",
];

const stats = [
  { value: "3+", label: "Products running in production" },
  { value: "1 team", label: "Dedicated squad per project" },
  { value: "Weekly", label: "Demos & honest progress updates" },
];

const processSteps = [
  { icon: User, label: "You" },
  { icon: Code2, label: "AppRoots", highlight: true },
  { icon: Rocket, label: "Launch" },
];

function FocusColumn({
  badge,
  badgeClassName,
  label,
  labelClassName,
  subtitle,
  items,
  className = "",
}: {
  badge: React.ReactNode;
  badgeClassName?: string;
  label: string;
  labelClassName?: string;
  subtitle: string;
  items: string[];
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-start text-left ${className}`}>
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-satoshi text-xs font-black ${badgeClassName ?? ""}`}
      >
        {badge}
      </div>
      <p
        className={`mt-4 font-inter text-[10px] font-semibold uppercase tracking-[0.14em] ${labelClassName ?? "text-white/40"}`}
      >
        {label}
      </p>
      <p className="mt-1 font-inter text-[13px] font-medium leading-snug text-text-heading">
        {subtitle}
      </p>
      <ul className="mt-4 w-full space-y-2.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2 font-inter text-[13px] leading-snug text-text-body"
          >
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-cyan/10">
              <Check className="h-2.5 w-2.5 text-brand-cyan" aria-hidden />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function MetricCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[96px] flex-col rounded-xl border border-white/[0.07] bg-bg-surface px-4 py-3.5">
      {children}
    </div>
  );
}

export function IdeaPartnership() {
  const metricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = metricsRef.current;
    if (!grid || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;

    gsap.fromTo(
      grid.children,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: grid, start: "top 80%", once: true },
      }
    );
  }, []);

  return (
    <div className="mx-auto mt-10 max-w-3xl space-y-7 text-left lg:mt-12 lg:space-y-8">
      <div
        className="flex items-center justify-center gap-2.5 sm:gap-5"
        aria-label="You, AppRoots, Launch"
      >
        {processSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.label} className="flex items-center gap-2.5 sm:gap-5">
              <div className="group/step flex flex-col items-center gap-1.5">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 group-hover/step:scale-110 group-hover/step:border-brand-cyan/40 group-hover/step:shadow-[0_0_20px_rgba(0,200,255,0.18)] sm:h-11 sm:w-11 ${
                    step.highlight
                      ? "border-brand-cyan/25 bg-gradient-to-br from-brand-purple/20 to-brand-cyan/15 text-brand-cyan group-hover/step:from-brand-purple/30 group-hover/step:to-brand-cyan/25"
                      : "border-white/[0.08] bg-bg-surface text-text-body group-hover/step:bg-brand-cyan/10 group-hover/step:text-brand-cyan"
                  }`}
                >
                  <Icon className="h-4 w-4 transition-transform duration-300 group-hover/step:scale-110" aria-hidden />
                </div>
                <span className="font-inter text-[10px] font-semibold uppercase tracking-[0.12em] text-text-body transition-colors duration-300 group-hover/step:text-brand-cyan">
                  {step.label}
                </span>
              </div>
              {index < processSteps.length - 1 && (
                <div
                  className="mb-4 h-px w-6 bg-gradient-to-r from-white/10 to-white/5 sm:w-10"
                  aria-hidden
                />
              )}
            </div>
          );
        })}
      </div>

      <article className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-bg-surface shadow-[0_16px_48px_rgba(0,0,0,0.35)]">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/30 to-transparent"
          aria-hidden
        />

        <p className="border-b border-white/[0.06] px-5 py-3 text-center font-inter text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
          How we work together
        </p>

        <div className="grid md:grid-cols-2">
          <FocusColumn
            badge="You"
            badgeClassName="border border-white/[0.08] bg-bg-elevated text-text-heading"
            label="Your focus"
            subtitle="Growth, customers, revenue"
            items={yourFocus}
            className="border-b border-white/[0.06] px-5 py-5 md:border-b-0 md:border-r md:py-6 md:pl-6 md:pr-5"
          />

          <FocusColumn
            badge="AR"
            badgeClassName="bg-gradient-to-br from-brand-purple to-brand-cyan text-white shadow-[0_4px_16px_rgba(123,47,255,0.25)]"
            label="Our focus"
            labelClassName="text-brand-cyan"
            subtitle="Product, code, launch"
            items={ourFocus}
            className="bg-gradient-to-br from-brand-purple/[0.06] to-brand-cyan/[0.04] px-5 py-5 md:py-6 md:pl-5 md:pr-6"
          />
        </div>

        <p className="border-t border-white/[0.06] bg-bg-elevated/40 px-5 py-3 text-center font-inter text-[13px] font-medium text-text-heading">
          One partnership. Clear roles. No overlap.
        </p>
      </article>

      <div ref={metricsRef} className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard>
          <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">
            Core stacks
          </p>
          <div className="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-1 lg:grid-cols-2">
            {coreStacks.map((stack) => (
              <span
                key={stack}
                className="inline-flex items-center justify-center rounded-full border border-white/[0.08] bg-bg-elevated/50 px-2.5 py-1 font-inter text-[10px] leading-none text-text-body"
              >
                {stack}
              </span>
            ))}
          </div>
        </MetricCard>

        {stats.map((stat) => (
          <MetricCard key={stat.label}>
            <p className="font-satoshi text-[1.25rem] font-black leading-none tracking-tight text-text-heading">
              {stat.value}
            </p>
            <p className="mt-auto pt-2.5 font-inter text-[11px] leading-[1.45] text-text-body">
              {stat.label}
            </p>
          </MetricCard>
        ))}
      </div>
    </div>
  );
}
