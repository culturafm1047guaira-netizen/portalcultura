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
  ];

  return (
    <header className="bg-white border-b border-border sticky top-0 z-40">
      <div className="container py-3">
        <div className="flex items-center justify-between gap-5 flex-wrap lg:flex-nowrap">
          
          <button 
            className="lg:hidden text-text p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <Link href="/" className="flex items-center shrink-0">
            <div className="relative h-12 w-24 sm:h-14 sm:w-28 md:h-16 md:w-32">
              <Image 
                src="/img/logo_oficial.png" 
                alt="Rádio Cultura" 
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
            <div className="hidden sm:flex flex-col ml-3 border-l border-gray-200 pl-3">
              <span className="font-montserrat text-lg md:text-xl font-black text-primary leading-none uppercase tracking-tight">
                Cultura FM
              </span>
              <span className="text-[10px] md:text-xs text-text-muted uppercase font-semibold tracking-wider">
                Guaíra, SP
              </span>
            </div>
          </Link>

          <nav className={`
            lg:flex flex-1 w-full lg:w-auto
            ${isMenuOpen ? "block absolute top-full left-0 w-full bg-white border-b border-border shadow-lg" : "hidden"}
          `}>
            <ul className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-6 p-4 lg:p-0">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="block py-2 lg:py-0 text-[13px] font-bold text-text hover:text-primary transition-colors uppercase tracking-wide"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <div className="relative">
              <input 
                type="search" 
                placeholder="Buscar" 
                className="w-48 bg-gray-50 border border-gray-200 rounded-full px-4 py-1.5 text-sm text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
