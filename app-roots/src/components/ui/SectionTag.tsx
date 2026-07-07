export function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="section-tag mb-4 block font-inter text-[11px] font-medium uppercase tracking-[0.12em] text-white/30">
      {children}
    </span>
  );
}
