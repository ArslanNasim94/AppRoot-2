import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
}

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-lg text-[14px] font-semibold uppercase tracking-[0.06em] transition-all duration-300";
  const variants = {
    primary:
      "bg-gradient-to-br from-brand-purple to-brand-cyan px-7 py-3.5 text-white hover:scale-[1.03] hover:shadow-[0_0_24px_rgba(123,47,255,0.35)]",
    secondary:
      "border border-white/10 bg-transparent px-7 py-3.5 text-text-heading hover:border-brand-purple/30",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
