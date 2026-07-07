import type { Metadata } from "next";
import { SectionTag } from "@/components/ui/SectionTag";
import { AuthForm } from "@/components/pages/AuthForm";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";

export const metadata: Metadata = {
  title: "Let's Talk — AppRoots",
  description:
    "Tell us what you're building. Create your AppRoots account to start a project, purchase products, or join our startup community.",
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-[calc(100svh-5rem)] items-center justify-center px-6 py-16 lg:py-24">
      <div className="w-full max-w-[440px]">
        <SectionTag>(Get Started)</SectionTag>
        <AnimatedHeading
          as="h1"
          className="mb-3 font-satoshi text-[clamp(36px,5vw,56px)] font-black uppercase leading-[0.95] tracking-tight text-text-heading"
        >
          Let&apos;s Talk
        </AnimatedHeading>
        <p className="mb-8 font-inter text-base leading-relaxed text-text-body">
          Tell us what you&apos;re building. Create your account to start a
          project, purchase products, or connect with our startup community.
        </p>

        <AuthForm mode="register" />
      </div>
    </div>
  );
}
