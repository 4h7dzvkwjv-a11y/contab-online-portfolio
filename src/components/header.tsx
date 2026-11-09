"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-provider";

const navigation = [
  { href: "/actualizari", label: "Actualizări" },
  { href: "/formulare", label: "Formulare" },
  { href: "/categorii", label: "Articole" },
  { href: "/calculator-taxe", label: "Calculator taxe" },
  { href: "/contact", label: "Consultanță" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Logo label="contab" terminalDot />
        <div className="header-actions">
          <nav
            id="main-navigation"
            className={"main-nav" + (open ? " is-open" : "")}
            aria-label="Navigare principală"
          >
            {navigation.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                aria-current={pathname.startsWith(href) ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
          </nav>
          <span className="header-divider" aria-hidden="true" />
          <ThemeToggle />
          <button
            type="button"
            className="icon-button mobile-menu"
            aria-label={open ? "Închide meniul" : "Deschide meniul"}
            aria-expanded={open}
            aria-controls="main-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
    </header>
  );
}
