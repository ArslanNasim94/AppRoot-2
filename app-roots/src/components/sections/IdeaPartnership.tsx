import { Check, Code2, Rocket, User } from "lucide-react";

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
  {
    value: "3+",
    label: "Products running in production",
    serif: false,
  },
  {
    value: "1 team",
    label: "Dedicated squad per project",
    serif: false,
  },
  {
    value: "Weekly",
    label: "Demos & honest progress updates",
    serif: true,
  },
];

const processSteps = [
  { icon: User, label: "You" },
  { icon: Code2, label: "AppRoots", highlight: true },
  { icon: Rocket, label: "Launch" },
];

function FocusList({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2.5 font-inter text-sm text-text-body"
        >
          <Check
            className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan"
            aria-hidden
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function IdeaPartnership() {
  return (
    <div className="mt-10 space-y-8 lg:mt-12 lg:space-y-10">
      <div
        className="flex items-center justify-center gap-3 sm:gap-6"
        aria-label="You, AppRoots, Launch"
      >
        {processSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.label} className="flex items-center gap-3 sm:gap-6">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full border sm:h-12 sm:w-12 ${
                    step.highlight
                      ? "border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan"
                      : "border-white/[0.08] bg-bg-surface text-text-body"
                  }`}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.12em] text-text-body">
                  {step.label}
                </span>
              </div>
              {index < processSteps.length - 1 && (
                <div
                  className="mb-5 h-px w-8 bg-white/10 sm:w-14"
                  aria-hidden
                />
              )}
            </div>
          );
        })}
      </div>

      <article className="overflow-hidden rounded-2xl border border-white/[0.08] bg-bg-surface">
        <p className="border-b border-white/[0.06] px-6 py-4 text-center font-inter text-[11px] font-medium uppercase tracking-[0.14em] text-white/35">
          How we work together
        </p>

        <div className="grid md:grid-cols-2">
          <div className="border-b border-white/[0.06] p-6 md:border-b-0 md:border-r lg:p-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-bg-elevated font-satoshi text-sm font-black text-text-heading">
              You
            </div>
            <p className="mt-4 font-inter text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">
              Your focus
            </p>
            <p className="mt-1 font-inter text-sm text-text-body">
              Growth, customers, revenue
            </p>
            <FocusList items={yourFocus} />
          </div>

          <div className="bg-brand-cyan/[0.04] p-6 lg:p-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-purple to-brand-cyan font-satoshi text-sm font-black text-white">
              AR
            </div>
            <p className="mt-4 font-inter text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-cyan">
              Our focus
            </p>
            <p className="mt-1 font-inter text-sm text-text-body">
              Product, code, launch
            </p>
            <FocusList items={ourFocus} />
          </div>
        </div>

        <p className="border-t border-white/[0.06] px-6 py-4 text-center font-inter text-sm font-medium text-text-heading">
          One partnership. Clear roles. No overlap.
        </p>
      </article>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card-surface text-left">
          <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.12em] text-white/35">
            Core stacks
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {coreStacks.map((stack) => (
              <span
                key={stack}
                className="rounded-full border border-white/[0.08] px-2.5 py-1 font-inter text-[11px] text-text-body"
              >
                {stack}
              </span>
            ))}
          </div>
        </div>

        {stats.map((stat) => (
          <div key={stat.label} className="card-surface text-left">
            <p
              className={`font-black text-text-heading ${
                stat.serif
                  ? "font-serif text-3xl italic tracking-tight lg:text-4xl"
                  : "font-satoshi text-3xl uppercase leading-none lg:text-4xl"
              }`}
            >
              {stat.value}
            </p>
            <p className="mt-2 font-inter text-sm text-text-body">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
