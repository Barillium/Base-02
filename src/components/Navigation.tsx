import Link from "next/link";

import type { NavigationItem } from "@/data/navigation";

type NavigationProps = {
  items: ReadonlyArray<NavigationItem>;
  ariaLabel?: string;
  listClassName?: string;
};

export function Navigation({ items, ariaLabel, listClassName }: NavigationProps) {
  return (
    <nav aria-label={ariaLabel ?? "Hauptmenu"} className="editorial-fade">
      <ul className={`type-meta flex flex-wrap items-center gap-x-3 gap-y-2 ${listClassName ?? ""}`}>
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-[var(--muted)] transition-colors duration-300 hover:text-[var(--ink)] focus-visible:text-[var(--ink)] focus-visible:outline-none"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
