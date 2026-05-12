import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-dark-bg pt-9 mt-2">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-7">
          <div className="flex flex-col gap-2.5">
            <h3 className="font-montserrat text-[17px] font-extrabold text-white uppercase tracking-wider">
              Rádio Cultura FM 104.7
            </h3>
            <p className="text-[13px] text-white/40 leading-[1.65]">
              A Rádio Cultura é mais do que uma simples emissora. É um canal de conexão, informação e entretenimento que transforma a maneira como você ouve o mundo.
            </p>
            <div className="mt-3.5 flex flex-col gap-1">
              <span className="text-[12px] text-white/40">
                <strong className="text-esportes-accent">AM 1470 KHz</strong> — desde 23/05/1957
              </span>
              <span className="text-[12px] text-white/40">
                <strong className="text-esportes-accent">FM 90,1 MHz</strong> — desde 16/06/1992
              </span>
              <span className="text-[12px] text-white/40">
                <strong className="text-esportes-accent">FM 104.7</strong> — Portal de Notícias
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <h4 className="text-[10px] font-bold tracking-[0.14em] uppercase text-white/35">
              Páginas
            </h4>
            <div className="flex flex-col gap-1.5">
              <Link href="/" className="text-[13px] text-white/55 hover:text-white transition-colors">Início</Link>
              <Link href="/programacao" className="text-[13px] text-white/55 hover:text-white transition-colors">Programação</Link>
              <Link href="/sobre" className="text-[13px] text-white/55 hover:text-white transition-colors">Sobre</Link>
              <Link href="/contato" className="text-[13px] text-white/55 hover:text-white transition-colors">Contato</Link>
              <Link href="/termos" className="text-[13px] text-white/55 hover:text-white transition-colors">Termos de Uso</Link>
              <Link href="/sobre/privacidade" className="text-[13px] text-white/55 hover:text-white transition-colors">Política de Privacidade</Link>
              <Link href="/transparencia" className="text-[13px] text-white/55 hover:text-white transition-colors">Transparência</Link>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <h4 className="text-[10px] font-bold tracking-[0.14em] uppercase text-white/35">
              Contato
            </h4>
            <div className="flex flex-col gap-1.5">
              <a href="https://maps.google.com/?q=Av+15+225+Guaira+SP" target="_blank" rel="noopener" className="text-[13px] text-white/55 hover:text-white transition-colors">
                Av. 15, nº 225, Guaíra-SP
              </a>
              <a href="tel:+551733311177" className="text-[13px] text-white/55 hover:text-white transition-colors">(17) 3331-1177</a>
              <a href="tel:+551733311155" className="text-[13px] text-white/55 hover:text-white transition-colors">(17) 3331-1155</a>
              <a href="mailto:radioculturadeguaira@gmail.com" className="text-[13px] text-white/55 hover:text-white transition-colors">radioculturadeguaira@gmail.com</a>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <h4 className="text-[10px] font-bold tracking-[0.14em] uppercase text-white/35">
              Redes Sociais
            </h4>
            <div className="flex flex-col gap-1.5">
              <a href="https://www.facebook.com/radioculturadeguaira/" target="_blank" rel="noopener" className="text-[13px] text-white/55 hover:text-white transition-colors">Facebook</a>
              <a href="https://www.instagram.com/culturafm104.7" target="_blank" rel="noopener" className="text-[13px] text-white/55 hover:text-white transition-colors">Instagram</a>
              <a href="https://youtube.com/@culturafmguaira-sp" target="_blank" rel="noopener" className="text-[13px] text-white/55 hover:text-white transition-colors">YouTube</a>
              <a href="https://api.whatsapp.com/send?phone=551733311155" target="_blank" rel="noopener" className="text-[13px] text-white/55 hover:text-white transition-colors">WhatsApp</a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-4 flex flex-col sm:flex-row justify-between gap-4 text-[11px] text-white/25">
          <span>© 2026 Rádio Cultura FM 104.7 — Guaíra, SP. Todos os direitos reservados.</span>
          <span className="sm:text-right max-w-md">
            As notícias são obtidas automaticamente de fontes públicas e são de responsabilidade dos respectivos veículos.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
