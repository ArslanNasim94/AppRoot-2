import type { Metadata } from "next";
import { FaqContent } from "@/components/pages/FaqContent";

export const metadata: Metadata = {
  title: "FAQ — AppRoots",
  description:
    "Find answers to common questions about AppRoots, our products, services, and how we can help you build your startup.",
};

export default function FaqPage() {
  return <FaqContent />;
}
