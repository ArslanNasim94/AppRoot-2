import type { Metadata } from "next";
import { LegalPageContent } from "@/components/pages/LegalPageContent";
import { termsSections } from "@/data/legal";

export const metadata: Metadata = {
  title: "Terms of Service — AppRoots",
  description:
    "Read the terms and conditions governing your use of the AppRoots platform and services.",
};

export default function TermsPage() {
  return (
    <LegalPageContent
      tag="(Legal)"
      pageTitle="Terms of Service"
      effectiveDate="July 1, 2026"
      sections={termsSections}
      contactEmail="privacy@approots.net"
      contactPrompt="Questions about these terms? Contact us at"
    />
  );
}
