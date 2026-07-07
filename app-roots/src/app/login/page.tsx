import type { Metadata } from "next";
import { SectionTag } from "@/components/ui/SectionTag";
import { AuthForm } from "@/components/pages/AuthForm";

export const metadata: Metadata = {
  title: "Login — AppRoots",
  description: "Sign in to your AppRoots account.",
};

export default function LoginPage() {
  return (
    <div className="section-padding flex min-h-[80vh] items-center pt-32">
      <div className="container max-w-md">
        <SectionTag>(Account)</SectionTag>
        <h1 className="mb-4 font-satoshi text-[clamp(36px,5vw,56px)] font-black uppercase leading-[0.95] tracking-tight text-text-heading">
          Login
        </h1>
        <p className="mb-10 font-inter text-base text-text-body">
          Sign in to your AppRoots account to manage projects, track progress,
          and access your dashboard.
        </p>

        <AuthForm mode="login" />
      </div>
    </div>
  );
}
