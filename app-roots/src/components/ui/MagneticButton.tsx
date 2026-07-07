"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";

interface MagneticButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function MagneticButton({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const rafRef = useRef(0);
  const offsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;

    const handleMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        offsetRef.current = {
          x: Math.max(Math.min(x * 0.12, 10), -10),
          y: Math.max(Math.min(y * 0.12, 10), -10),
        };
        btn.style.transform = `translate3d(${offsetRef.current.x}px, ${offsetRef.current.y}px, 0)`;
      });
    };

    const handleLeave = () => {
      cancelAnimationFrame(rafRef.current);
      offsetRef.current = { x: 0, y: 0 };
      btn.style.transform = "translate3d(0, 0, 0)";
    };

    btn.addEventListener("mousemove", handleMove, { passive: true });
    btn.addEventListener("mouseleave", handleLeave, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      btn.removeEventListener("mousemove", handleMove);
      btn.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const base =
    "relative inline-flex items-center justify-center rounded-lg text-[14px] font-semibold uppercase tracking-[0.06em] transition-shadow duration-300 will-change-transform";
  const variants = {
    primary:
      "bg-gradient-to-br from-brand-purple to-brand-cyan px-7 py-3.5 text-white hover:shadow-[0_0_24px_rgba(123,47,255,0.35)] hover:scale-[1.03]",
    secondary:
      "border border-white/10 bg-transparent px-7 py-3.5 text-text-heading hover:border-brand-purple/30",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link ref={btnRef} href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button ref={btnRef} type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
