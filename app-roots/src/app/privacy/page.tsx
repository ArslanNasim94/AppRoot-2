import type { Metadata } from "next";
import { LegalPageContent } from "@/components/pages/LegalPageContent";
import { privacySections } from "@/data/legal";

export const metadata: Metadata = {
  title: "Privacy Policy — AppRoots",
  description:
    "Learn how AppRoots collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <LegalPageContent
      tag="(Legal)"
      pageTitle="Privacy Policy"
      effectiveDate="July 1, 2026"
      sections={privacySections}
      contactEmail="privacy@approots.net"
      contactPrompt="Questions about this policy? Contact us at"
    />
  );
}
