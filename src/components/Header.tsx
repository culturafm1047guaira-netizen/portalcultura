"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CATEGORIES, type CategoryKey } from "@/lib/categories";

interface HeaderProps {
  activeCategory?: CategoryKey;
}

const INSTITUTIONAL_LINKS = [
  { name: "Início", href: "/" },
  { name: "Programação", href: "/programacao" },
  { name: "Serviços Públicos", href: "/servicos-publicos" },
  { name: "Sobre", href: "/sobre" },
  { name: "Contato", href: "/contato" },
  { name: "Transparência", href: "/transparencia" },
];

const Header = ({ activeCategory }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header ref={headerRef} className="sticky top-0 z-40 border-b border-border/70 bg-white/80 backdrop-blur-xl dark:bg-slate-900/80 transition-colors duration-300 shadow-[0_1px_0_0_rgba(15,23,42,0.02)]">
      <div className="container py-3">
        <div className="flex items-center justify-between gap-5 flex-wrap lg:flex-nowrap">
          <button
            className="lg:hidden text-text p-2 hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <Link href="/" className="flex items-center shrink-0 group">
            <div className="relative h-24 w-48 sm:h-28 sm:w-56 md:h-32 md:w-64 rounded-2xl border border-white/50 bg-white/60 p-2 shadow-[0_8px_24px_-18px_rgba(11,79,122,0.9)] transition-transform duration-300 group-hover:scale-[1.02] dark:bg-slate-900/60 dark:border-slate-700/40">
              <Image
                src="/img/logo_oficial.png"
                alt="Rádio Cultura"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </Link>

          <nav className={`
            lg:flex flex-1 w-full lg:w-auto min-w-0
            ${isMenuOpen ? "block absolute top-full left-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-border shadow-lg" : "hidden"}
          `}>
            <ul className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-7 p-4 lg:p-0">
              {INSTITUTIONAL_LINKS.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="group relative block py-2 lg:py-0 text-[13px] font-bold text-text hover:text-primary transition-colors uppercase tracking-wide whitespace-nowrap"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 ease-out group-hover:w-full group-hover:left-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden md:flex items-center gap-2 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const q = (e.currentTarget.elements.namedItem("q") as HTMLInputElement).value;
                if (q.trim()) window.location.href = `/busca?q=${encodeURIComponent(q)}`;
              }}
              className="relative group"
            >
              <input
                name="q"
                type="search"
                placeholder="Buscar"
                className="w-48 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-full px-4 py-1.5 text-sm text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 group-hover:border-gray-300"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-primary transition-colors duration-300" aria-label="Buscar">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Mega-menu de editorias — fonte única: src/lib/categories.ts (antes
          duplicado entre page.tsx, CategoryNav.tsx e globals.css, e com
          links /categoria/* que não existiam) */}
      <nav aria-label="Editorias" className="border-b border-[#E8ECEF] dark:border-slate-700 bg-[#F5F0E8] dark:bg-slate-800">
        <ul className="container flex gap-4 sm:gap-6 overflow-x-auto py-3 scrollbar-thin">
          {CATEGORIES.map((cat) => {
            const isActive = cat.key === activeCategory;
            return (
              <li key={cat.key} className="shrink-0">
                <Link
                  href={cat.href}
                  className="nav-link"
                  aria-current={isActive ? "page" : undefined}
                  style={{ color: cat.color }}
                >
                  {cat.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
