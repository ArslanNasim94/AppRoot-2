import type { Metadata } from "next";
import { SectionTag } from "@/components/ui/SectionTag";
import { AuthForm } from "@/components/pages/AuthForm";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";

export const metadata: Metadata = {
  title: "Login — AppRoots",
  description: "Sign in to your AppRoots account.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100svh-5rem)] items-center justify-center px-6 py-16 lg:py-24">
      <div className="w-full max-w-[440px]">
        <SectionTag>(Account)</SectionTag>
        <AnimatedHeading
          as="h1"
          className="mb-3 font-satoshi text-[clamp(36px,5vw,56px)] font-black uppercase leading-[0.95] tracking-tight text-text-heading"
        >
          Login
        </AnimatedHeading>
        <p className="mb-8 font-inter text-base leading-relaxed text-text-body">
          Sign in to your AppRoots account to manage projects, track progress,
          and access your dashboard.
        </p>

        <AuthForm mode="login" />
      </div>
    </div>
  );
}
