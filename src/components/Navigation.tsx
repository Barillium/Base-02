"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { NavigationItem } from "@/data/navigation";

type NavigationProps = {
  items: ReadonlyArray<NavigationItem>;
  ariaLabel?: string;
  listClassName?: string;
};

export function Navigation({ items, ariaLabel, listClassName }: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav aria-label={ariaLabel ?? "Hauptmenu"} className="editorial-fade min-w-0">
      <div className="scrollbar-none overflow-x-auto">
        <ul className={`type-meta flex min-w-max flex-nowrap items-center gap-x-3 gap-y-2 whitespace-nowrap md:min-w-0 md:flex-wrap ${listClassName ?? ""}`}>
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`) ||
                  (item.href === "/about" && pathname === "/mitmachen")
                    ? "page"
                    : undefined
                }
                className="text-[var(--muted)] transition-colors duration-300 hover:text-[var(--ink)] focus-visible:text-[var(--ink)] focus-visible:outline-none aria-[current=page]:text-[var(--ink)]"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
