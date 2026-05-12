"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Player from "./Player";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Início", href: "/" },
    { name: "Programação", href: "/programacao" },
    { name: "Sobre", href: "/sobre" },
    { name: "Contato", href: "/contato" },
    { name: "Termos de Uso", href: "/termos" },
    { name: "Privacidade", href: "/sobre/privacidade" },
    { name: "Transparência", href: "/transparencia" },
  ];

  return (
    <header className="bg-dark-bg">
      <div className="container">
        <div className="flex items-center justify-between py-4 gap-5 flex-wrap">
          <Link href="/" className="flex items-center gap-6">
            <div className="relative h-[120px] w-[240px]">
              <Image 
                src="/img/logo_oficial.png" 
                alt="Logo Rádio Cultura FM 104.7" 
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-montserrat text-[clamp(24px,5vw,40px)] font-black text-white leading-none tracking-[-0.03em] uppercase">
                Rádio Cultura FM 104.7
              </span>
              <p className="text-[13px] text-white/40 tracking-[0.12em] uppercase mt-1">
                Portal de Notícias — Guaíra, SP
              </p>
            </div>
          </Link>

          <Player />

          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir menu"
          >
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 7.5H25M5 15H25M5 22.5H25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="py-0">
          <div className="flex gap-2 max-w-lg mb-3">
            <input 
              type="search" 
              placeholder="Buscar notícias..." 
              className="flex-1 bg-white/10 border border-white/20 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-white/40 transition-all"
            />
            <button className="bg-primary hover:bg-primary-light text-white font-bold px-4 py-2 rounded text-sm transition-all transform hover:-translate-y-px">
              Buscar
            </button>
          </div>
        </div>
      </div>

      <nav className="bg-darker-bg border-t border-white/5 py-3 overflow-hidden">
        <div className="container">
          <ul className={`
            flex gap-3 items-center overflow-x-auto scrollbar-none
            md:static md:flex-row md:h-auto md:p-0 md:bg-transparent md:shadow-none
            ${isMenuOpen ? "fixed inset-0 h-screen w-[280px] bg-darker-bg flex-col p-20 z-[1000] right-0 left-auto shadow-[-10px_0_30px_rgba(0,0,0,0.5)]" : "hidden md:flex"}
          `}>
            {navItems.map((item) => (
              <li key={item.name} className="w-full md:w-auto">
                <Link 
                  href={item.href}
                  className="block px-4 py-2 text-[11px] font-bold text-white/70 tracking-[0.08em] uppercase whitespace-nowrap rounded bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white hover:border-primary transition-all md:text-center"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
