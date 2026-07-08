import { cn } from "@/lib/utils";

export function SectionShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("container", className)}>{children}</div>;
}

export function SectionSplit({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("section-split", className)}>{children}</div>;
}

export function SectionHeadingCol({
  children,
  className,
  sticky = "default",
}: {
  children: React.ReactNode;
  className?: string;
  sticky?: "default" | "center" | "none";
}) {
  return (
    <div
      className={cn(
        "section-heading-col",
        sticky === "default" && "section-heading-col--sticky",
        sticky === "center" && "section-heading-col--sticky-center",
        className
      )}
    >
      {children}
    </div>
  );
}

export function SectionBodyCol({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("section-body-col min-w-0", className)}>{children}</div>
  );
}
