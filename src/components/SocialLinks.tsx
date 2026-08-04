import type { Locale } from "@/lib/i18n-shared";

type SocialLinksProps = {
  className?: string;
  locale?: Locale;
  size?: "sm" | "md" | "lg";
  tone?: "muted" | "accent";
};

const sizeClasses = {
  sm: {
    button: "h-8 w-8",
    icon: "h-[15px] w-[15px]",
  },
  md: {
    button: "h-9 w-9",
    icon: "h-[17px] w-[17px]",
  },
  lg: {
    button: "h-14 w-14",
    icon: "h-[24px] w-[24px]",
  },
} as const;

type IconProps = {
  className: string;
};

function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <rect
        x="3.4"
        y="3.4"
        width="17.2"
        height="17.2"
        rx="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.2" cy="6.8" r="1.15" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <circle cx="12" cy="12" r="8.8" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M13.4 19.3v-5.2h1.8l.3-2h-2.1v-1.3c0-.9.3-1.5 1.5-1.5h.8V7.6c-.4-.1-.9-.2-1.6-.2-2.4 0-3.7 1.3-3.7 3.8v1H8.8v2h1.6v5.2h3Z"
        fill="currentColor"
      />
    </svg>
  );
}

const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/the.base.ev/",
    icon: InstagramIcon,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/thebase.ev/",
    icon: FacebookIcon,
  },
] as const;

export function SocialLinks({ className, locale = "de", size = "md", tone = "muted" }: SocialLinksProps) {
  const classes = sizeClasses[size];
  const toneClass =
    tone === "accent"
      ? "text-[var(--accent)] hover:border-[var(--ink)] hover:bg-[var(--paper)] hover:text-[var(--accent)]"
      : "text-[var(--muted)] hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)]";

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className ?? ""}`}>
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={
            locale === "de"
              ? `${social.name} von The Base e.V. (öffnet in neuem Tab)`
              : `The Base e.V. on ${social.name} (opens in a new tab)`
          }
          className={`inline-flex ${classes.button} items-center justify-center rounded-full border border-[var(--line)] bg-[var(--paper)] transition-all duration-300 hover:-translate-y-[1px] ${toneClass}`}
        >
          <social.icon className={classes.icon} />
        </a>
      ))}
    </div>
  );
}
