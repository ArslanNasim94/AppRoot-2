import Image from "next/image";
import Link from "next/link";

const companyLinks = [
  { label: "About", href: "#team" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#services" },
  { label: "Careers", href: "#" },
];

const serviceLinks = [
  { label: "AI Engineering", href: "#services" },
  { label: "3D Web", href: "#services" },
  { label: "SaaS Platforms", href: "#services" },
  { label: "Mobile Apps", href: "#services" },
];

const connectLinks = [
  { label: "LinkedIn", href: "#" },
  { label: "Twitter / X", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "Privacy Policy", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-bg">
      <div className="container section-padding !pb-16 !pt-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/images/App_Roots_Logo.jpeg"
              alt="App Roots"
              width={180}
              height={48}
              className="h-12 w-auto object-contain transition-[filter] duration-300 hover:drop-shadow-[0_0_12px_rgba(0,200,255,0.4)]"
            />
            <p className="mt-4 max-w-xs font-inter text-sm text-text-body">
              We build what others can&apos;t imagine.
            </p>
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
              Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
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
              Connect
            </h4>
            <ul className="space-y-3">
              {connectLinks.map((link) => (
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
        </div>

        <div className="mt-16 border-t border-white/[0.07] pt-8">
          <p className="font-inter text-xs text-white/25">
            © 2025 App Roots. All rights reserved. · Built by the people who
            wrote the guarantee.
          </p>
        </div>
      </div>
    </footer>
  );
}
