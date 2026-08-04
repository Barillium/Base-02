"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";

import type { NavigationItem } from "@/data/navigation";

type NavigationProps = {
  items: ReadonlyArray<NavigationItem>;
  ariaLabel?: string;
  listClassName?: string;
};

function isActiveNavigationItem(pathname: string, href: string) {
  if (pathname === href || pathname.startsWith(`${href}/`)) {
    return true;
  }

  if (href === "/about" && pathname === "/mitmachen") {
    return true;
  }

  return false;
}

export function Navigation({ items, ariaLabel, listClassName }: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav aria-label={ariaLabel ?? "Hauptmenu"} className="editorial-fade flex min-w-0 justify-center">
      <div className="scrollbar-none flex w-full min-w-0 justify-center overflow-x-auto overscroll-x-contain">
        <ul
          className={`type-meta flex w-full min-w-0 flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center sm:w-max sm:flex-nowrap sm:gap-x-3.5 ${listClassName ?? ""}`}
        >
          {items.map((item) => {
            const isActive = isActiveNavigationItem(pathname, item.href);

            return (
              <li key={item.href} className="shrink-0">
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  data-active={isActive ? "true" : "false"}
                  className="inline-flex origin-center items-center px-0.5 py-0.5 text-[var(--nav-link-color)] transition-[color,transform] duration-200 hover:[--nav-link-color:var(--ink)] focus-visible:[--nav-link-color:var(--ink)] focus-visible:outline-none data-[active=true]:scale-[1.045]"
                  style={
                    {
                      "--nav-link-color": isActive ? "var(--ink)" : "var(--muted)",
                    } as CSSProperties
                  }
                >
                  <span className={isActive ? "font-semibold" : "font-medium"}>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
