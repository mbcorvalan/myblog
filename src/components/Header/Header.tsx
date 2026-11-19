import Link from "next/link";
import { siteConfig } from "@/config/site";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo} aria-label="Inicio">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          {/* cabeza con orejas */}
          <path d="M6 13 5 4l7 5a12 12 0 0 1 8 0l7-5-1 9c1.3 1.8 2 3.9 2 6 0 5.5-5.4 9-12 9S4 24.5 4 19c0-2.1.7-4.2 2-6Z" />
          {/* ojos */}
          <circle cx="11.5" cy="17" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="20.5" cy="17" r="1.2" fill="currentColor" stroke="none" />
          {/* nariz y boca */}
          <path d="M15 20.5h2l-1 1.2-1-1.2ZM16 21.7c0 1.3-1 2-2.2 1.8M16 21.7c0 1.3 1 2 2.2 1.8" strokeWidth="1.5" />
          {/* bigotes */}
          <path d="M3 18.5l5 .8M3 22l5-.9M29 18.5l-5 .8M29 22l-5-.9" strokeWidth="1.3" />
        </svg>
      </Link>
      <nav className={styles.nav} aria-label="Principal">
        {siteConfig.socials.map((s) => (
          <a key={s.label} href={s.href} className={styles.social} aria-label={s.label} target="_blank" rel="noreferrer">
            {s.short}
          </a>
        ))}
      </nav>
    </header>
  );
}
