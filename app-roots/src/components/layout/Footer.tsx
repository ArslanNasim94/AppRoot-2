import Image from "next/image";
import Link from "next/link";

const exploreLinks = [
  { label: "Why Us", href: "/#why-different" },
  { label: "AI for Startups", href: "/#ai-for-startups" },
  { label: "Problems", href: "/#pain-points" },
  { label: "How it works", href: "/#steps" },
  { label: "Products", href: "/products" },
];

const companyLinks = [
  { label: "FAQ", href: "/faq" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Contact", href: "/#contact" },
];

const coreStacks = [
  "React Native",
  "SwiftUI",
  "Kotlin",
  "Laravel",
  "Next.js",
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-bg">
      <div className="container section-padding !pb-16 !pt-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/images/App_Roots_Logo.jpeg"
              alt="AppRoots"
              width={180}
              height={48}
              className="h-12 w-auto object-contain transition-[filter] duration-300 hover:drop-shadow-[0_0_12px_rgba(0,200,255,0.4)]"
            />
            <p className="mt-4 max-w-xs font-inter text-sm text-text-body">
              AppRoots takes web, mobile, and backend development off your plate
              — so you can spend your time on marketing, sales, and customers.
            </p>
            <p className="mt-4 font-inter text-xs text-white/25">
              {coreStacks.join(" · ")}
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-inter text-[11px] font-medium uppercase tracking-[0.12em] text-white/25">
              Explore
            </h4>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="footer-link font-inter text-sm text-text-body transition-colors hover:text-text-heading"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-inter text-[11px] font-medium uppercase tracking-[0.12em] text-white/25">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="footer-link font-inter text-sm text-text-body transition-colors hover:text-text-heading"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-inter text-[11px] font-medium uppercase tracking-[0.12em] text-white/25">
              Get Started
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/register"
                  className="footer-link font-inter text-sm text-text-body transition-colors hover:text-text-heading"
                >
                  Create Account
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="footer-link font-inter text-sm text-text-body transition-colors hover:text-text-heading"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/#ai-chatbot"
                  className="footer-link font-inter text-sm text-text-body transition-colors hover:text-text-heading"
                >
                  Chat with AI Assistant
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/[0.07] pt-8">
          <p className="font-inter text-xs text-white/25">
            © 2026 AppRoots.net — All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
