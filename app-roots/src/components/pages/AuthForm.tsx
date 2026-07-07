"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

interface AuthFormProps {
  mode: "login" | "register";
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
    "w-full rounded-xl border border-white/[0.07] bg-bg px-4 py-3 font-inter text-sm text-text-heading placeholder:text-white/25 transition-colors focus:border-brand-purple/50 focus:outline-none";

  if (submitted) {
    return (
      <div className="rounded-2xl border border-white/[0.07] bg-bg-surface p-8 text-center">
        <p className="font-inter text-base text-text-heading">
          {isLogin ? "Thanks!" : "Welcome aboard!"}
        </p>
        <p className="mt-3 font-inter text-sm leading-relaxed text-text-body">
          Account access is launching soon. We&apos;ve noted your interest — in
          the meantime, tell us what you&apos;re building and we&apos;ll get
          back to you right away.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-brand-purple to-brand-cyan px-7 py-3.5 text-[14px] font-semibold uppercase tracking-[0.06em] text-white transition-transform hover:scale-[1.02]"
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
      className="rounded-2xl border border-white/[0.07] bg-bg-surface p-8"
    >
      <div className="flex flex-col gap-5">
        {!isLogin && (
          <div>
            <label
              htmlFor="name"
              className="mb-2 block font-inter text-[11px] font-medium uppercase tracking-[0.12em] text-white/40"
            >
              Full Name
            </label>
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
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="mb-2 block font-inter text-[11px] font-medium uppercase tracking-[0.12em] text-white/40"
          >
            Email
          </label>
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
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block font-inter text-[11px] font-medium uppercase tracking-[0.12em] text-white/40"
          >
            Password
          </label>
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
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 transition-colors hover:text-text-heading"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-brand-purple to-brand-cyan px-7 py-3.5 text-[14px] font-semibold uppercase tracking-[0.06em] text-white transition-all hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(123,47,255,0.35)]"
        >
          {isLogin ? "Sign In →" : "Create Account →"}
        </button>
      </div>

      <p className="mt-6 text-center font-inter text-sm text-text-body">
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
