"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

interface AuthFormProps {
  mode: "login" | "register";
}

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <label
        htmlFor={id}
        className="font-inter text-xs font-medium uppercase tracking-[0.1em] text-white/55"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export function AuthForm({ mode }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const isLogin = mode === "login";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass =
    "h-12 w-full rounded-xl border border-white/[0.08] bg-bg px-4 font-inter text-[15px] leading-none text-text-heading shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] placeholder:text-white/30 transition-[border-color,box-shadow] focus:border-brand-purple/45 focus:outline-none focus:ring-[3px] focus:ring-brand-purple/15";

  if (submitted) {
    return (
      <div className="rounded-2xl border border-white/[0.08] bg-bg-surface p-8 text-center sm:p-10">
        <p className="font-inter text-base text-text-heading">
          {isLogin ? "Thanks!" : "Welcome aboard!"}
        </p>
        <p className="mt-3 font-inter text-sm leading-relaxed text-text-body">
          Account access is launching soon. We&apos;ve noted your interest — in
          the meantime, tell us what you&apos;re building and we&apos;ll get
          back to you right away.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/#contact"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-purple to-brand-cyan px-7 text-[14px] font-semibold uppercase tracking-[0.06em] text-white transition-transform hover:scale-[1.02]"
          >
            Let&apos;s talk →
          </Link>
          <Link
            href="/#ai-chatbot"
            className="font-inter text-sm text-text-body transition-colors hover:text-text-heading"
          >
            Chat with AI Assistant
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/[0.08] bg-bg-surface p-8 sm:p-10"
    >
      <div className="flex flex-col gap-6">
        {!isLogin && (
          <Field id="name" label="Full Name">
            <input
              id="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
            />
          </Field>
        )}

        <Field id="email" label="Email">
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputClass}
          />
        </Field>

        <Field id="password" label="Password">
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              minLength={8}
              autoComplete={isLogin ? "current-password" : "new-password"}
              placeholder={isLogin ? "Your password" : "At least 8 characters"}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className={`${inputClass} pr-12`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-white/35 transition-colors hover:text-text-heading"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </Field>

        <button
          type="submit"
          className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-br from-brand-purple to-brand-cyan px-7 text-[14px] font-semibold uppercase tracking-[0.06em] text-white transition-all hover:scale-[1.01] hover:shadow-[0_0_24px_rgba(123,47,255,0.35)]"
        >
          {isLogin ? "Sign In →" : "Let's talk →"}
        </button>
      </div>

      <p className="mt-8 text-center font-inter text-sm leading-relaxed text-text-body">
        {isLogin ? (
          <>
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-text-heading underline decoration-white/20 underline-offset-4 transition-colors hover:decoration-brand-purple"
            >
              Create one
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-text-heading underline decoration-white/20 underline-offset-4 transition-colors hover:decoration-brand-purple"
            >
              Login
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
