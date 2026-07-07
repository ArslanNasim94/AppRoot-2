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
        <AnimatedHeading as="h1" className="text-heading-page">
          Login
        </AnimatedHeading>
        <p className="copy-lead">
          Sign in to your AppRoots account to manage projects, track progress,
          and access your dashboard.
        </p>

        <div className="mt-8">
          <AuthForm mode="login" />
        </div>
      </div>
    </div>
  );
}
