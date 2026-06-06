import Image from "next/image";
import Link from "next/link";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Navigation } from "@/components/Navigation";
import { getNavigation } from "@/data/navigation";
import { getLocale, text } from "@/lib/i18n";

export async function Header() {
  const locale = await getLocale();
  const navigation = getNavigation(locale);

  return (
    <header className="header-bar sticky top-0 z-50 bg-[var(--paper)]/95 backdrop-blur-sm">
      <div className="header-inner">
        {/* Logo + Title — left */}
        <Link href="/" className="header-brand">
          <Image
            src="/the-base-logo.svg"
            alt="The Base Logo"
            width={112}
            height={112}
            priority
            className="header-logo"
          />
          <span className="header-title">The Base e.V.</span>
        </Link>

        {/* Navigation — centered on desktop, second row on mobile */}
        <div className="header-nav">
          <Navigation
            items={navigation}
            ariaLabel={text(locale, {
              de: "Hauptmenü",
              en: "Main menu",
            })}
            listClassName="text-[0.69rem] font-medium tracking-[0.15em] gap-x-4 gap-y-2.5 md:text-[0.71rem] md:gap-x-4.5 xl:gap-x-5"
          />
        </div>

        {/* Language switcher — right */}
        <div className="header-lang">
          <LanguageSwitcher locale={locale} className="" />
        </div>
      </div>
    </header>
  );
}
