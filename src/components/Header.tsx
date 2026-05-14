"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Início", href: "/" },
    { name: "Programação", href: "/programacao" },
    { name: "Sobre", href: "/sobre" },
    { name: "Contato", href: "/contato" },
    { name: "Termos", href: "/termos" },
    { name: "Privacidade", href: "/sobre/privacidade" },
    { name: "Transparência", href: "/transparencia" },
  ];

  return (
    <header className="bg-white/90 backdrop-blur-md support-[backdrop-filter]:bg-white/80 border-b border-border sticky top-0 z-40 transition-colors duration-300">
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
            <div className="relative h-24 w-48 sm:h-28 sm:w-56 md:h-32 md:w-64 transition-transform duration-300 group-hover:scale-105">
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
            lg:flex flex-1 w-full lg:w-auto
            ${isMenuOpen ? "block absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-border shadow-lg" : "hidden"}
          `}>
            <ul className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-8 p-4 lg:p-0">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="group relative block py-2 lg:py-0 text-[13px] font-bold text-text hover:text-primary transition-colors uppercase tracking-wide"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                    {/* Linha animada sob o link */}
                    <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden md:flex items-center gap-2">
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
                className="w-48 bg-gray-50 border border-gray-200 rounded-full px-4 py-1.5 text-sm text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 group-hover:border-gray-300"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-primary transition-colors duration-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
