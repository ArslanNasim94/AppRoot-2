import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { AiChatbot } from "@/components/ui/AiChatbot";

export const metadata: Metadata = {
  title: "AppRoots — Your Development Partner for Startups",
  description:
    "AppRoots takes web, mobile, and backend development off your plate — so you can focus on marketing, sales, and customers. We also build AI solutions.",
  openGraph: {
    title: "AppRoots — Your Development Partner for Startups",
    description:
      "AppRoots takes web, mobile, and backend development off your plate — so you can focus on marketing, sales, and customers.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>
        <CustomCursor />
        <Navigation />
        <main className="relative z-0 pt-20">{children}</main>
        <Footer />
        <AiChatbot />
      </body>
    </html>
  );
}
