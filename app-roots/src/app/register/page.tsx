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
        <AnimatedHeading as="h1" className="text-heading-page">
          Let&apos;s Talk
        </AnimatedHeading>
        <p className="copy-lead">
          Tell us what you&apos;re building. Create your account to start a
          project, purchase products, or connect with our startup community.
        </p>

        <div className="mt-8">
          <AuthForm mode="register" />
        </div>
      </div>
    </div>
  );
}
