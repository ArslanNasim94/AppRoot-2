import type { Metadata } from "next";
import { SectionTag } from "@/components/ui/SectionTag";
import { AuthForm } from "@/components/pages/AuthForm";

export const metadata: Metadata = {
  title: "Create Account — AppRoots",
  description:
    "Create your AppRoots account to purchase products, start custom projects, and join our startup community.",
};

export default function RegisterPage() {
  return (
    <div className="section-padding flex min-h-[80vh] items-center pt-32">
      <div className="container max-w-md">
        <SectionTag>(Get Started)</SectionTag>
        <h1 className="mb-4 font-satoshi text-[clamp(36px,5vw,56px)] font-black uppercase leading-[0.95] tracking-tight text-text-heading">
          Create Account
        </h1>
        <p className="mb-10 font-inter text-base text-text-body">
          Join AppRoots to purchase ready-made products, commission custom
          development, and connect with our startup community.
        </p>

        <AuthForm mode="register" />
      </div>
    </div>
  );
}
