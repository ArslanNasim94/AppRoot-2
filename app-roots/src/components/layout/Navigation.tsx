"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { MagneticButton } from "@/components/ui/MagneticButton";

const navLinks = [
  { label: "Problems", href: "/#pain-points" },
  { label: "AI for Startups", href: "/#ai-for-startups" },
  { label: "Why Us", href: "/#why-different" },
  { label: "How it works", href: "/#steps" },
  { label: "Products", href: "/products" },
];

export function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    ScrollTrigger.create({
      start: "top -80px",
      onEnter: () => {
        setScrolled(true);
        gsap.to(nav, {
          borderBottom: "0.5px solid rgba(255,255,255,0.07)",
          boxShadow: "0 12px 40px rgba(10,10,15,0.55)",
          duration: 0.4,
          ease: "cubic-bezier(0.16,1,0.3,1)",
        });
      },
      onLeaveBack: () => {
        setScrolled(false);
        gsap.to(nav, {
          borderBottom: "0.5px solid rgba(255,255,255,0.06)",
          boxShadow: "0 4px 24px rgba(10,10,15,0.35)",
          duration: 0.4,
          ease: "cubic-bezier(0.16,1,0.3,1)",
        });
      },
    });
  }, []);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    if (menuOpen) {
      gsap.fromTo(
        menu,
        { x: "100%" },
        { x: "0%", duration: 0.5, ease: "power3.out" }
      );
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(menu, { x: "100%", duration: 0.4, ease: "power3.in" });
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 z-[500] w-full border-b bg-[#0A0A0F] transition-[border-color,box-shadow] ${
          scrolled
            ? "border-white/[0.07] shadow-[0_12px_40px_rgba(10,10,15,0.55)]"
            : "border-white/[0.06] shadow-[0_4px_24px_rgba(10,10,15,0.35)]"
        }`}
      >
        <div className="container flex h-20 items-center justify-between">
          <Link href="/" className="relative z-[201] flex shrink-0 items-center">
            <Image
              src="/images/App_Roots_Logo.jpeg"
              alt="AppRoots"
              width={180}
              height={48}
              className="h-12 w-auto object-contain transition-[filter] duration-300 hover:drop-shadow-[0_0_12px_rgba(0,200,255,0.4)]"
              priority
            />
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="link-underline font-inter text-[13px] font-medium tracking-[0.04em] text-white/55 transition-colors hover:text-text-heading"
                data-cursor="hover"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              className="link-underline font-inter text-[13px] font-medium tracking-[0.04em] text-white/55 transition-colors hover:text-text-heading"
              data-cursor="hover"
            >
              Login
            </Link>
            <MagneticButton href="/register">Let&apos;s talk →</MagneticButton>
          </div>

          <button
            type="button"
            className="relative z-[201] text-white lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <div
        ref={menuRef}
        className="fixed inset-0 z-[499] flex translate-x-full flex-col items-center justify-center gap-8 bg-bg backdrop-blur-xl lg:hidden"
      >
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="font-satoshi text-3xl font-black uppercase text-text-heading"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/login"
          onClick={() => setMenuOpen(false)}
          className="font-satoshi text-3xl font-black uppercase text-text-heading"
        >
          Login
        </Link>
        <MagneticButton href="/register" onClick={() => setMenuOpen(false)}>
          Let&apos;s talk →
        </MagneticButton>
      </div>
    </>
  );
}
