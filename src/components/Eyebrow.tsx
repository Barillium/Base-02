import type { ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
};

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p className={`type-meta flex items-center gap-2 text-[var(--muted)] ${className ?? ""}`}>
      <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
      <span>{children}</span>
    </p>
  );
}
