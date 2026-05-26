import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import Link from "next/link";

export const metadata = {
  title: "Contato — Rádio Cultura FM 104.7",
  description: "Fale conosco. Endereço, telefone, WhatsApp e redes sociais da Rádio Cultura FM 104.7.",
};

export default function ContatoPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Header />

      <main className="container py-8 flex-1">
        <div className="text-[12px] text-gray-400 mb-6">
          <Link href="/" className="text-primary hover:underline">Início</Link> &rsaquo; <strong>Contato</strong>
        </div>

        <h1 className="font-montserrat text-3xl font-extrabold text-dark-bg uppercase tracking-wider mb-8 text-center">
          Fale Conosco
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <a href="https://maps.google.com/?q=Av+15+225+Guaira+SP" target="_blank" rel="noopener noreferrer" className="bg-card-bg border border-border p-8 rounded-lg text-center hover:shadow-lg transition-shadow group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📍</div>
            <h3 className="font-montserrat font-bold text-dark-bg mb-2">Endereço</h3>
            <p className="text-[13px] text-text-muted">Av. 15, nº 225<br/>Guaíra, SP</p>
          </a>

          <a href="tel:1733311177" className="bg-card-bg border border-border p-8 rounded-lg text-center hover:shadow-lg transition-shadow group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📞</div>
            <h3 className="font-montserrat font-bold text-dark-bg mb-2">Telefone</h3>
            <p className="text-[13px] text-text-muted">(17) 3331-1177<br/>(17) 3331-1155</p>
          </a>

          <a href="mailto:radioculturadeguaira@gmail.com" className="bg-card-bg border border-border p-8 rounded-lg text-center hover:shadow-lg transition-shadow group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">✉️</div>
            <h3 className="font-montserrat font-bold text-dark-bg mb-2">E-mail</h3>
            <p className="text-[13px] text-text-muted">radioculturadeguaira<br/>@gmail.com</p>
          </a>

          <a href="https://api.whatsapp.com/send?phone=551733311155" target="_blank" rel="noopener noreferrer" className="bg-card-bg border border-border p-8 rounded-lg text-center hover:shadow-lg transition-shadow group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📱</div>
            <h3 className="font-montserrat font-bold text-dark-bg mb-2">WhatsApp</h3>
            <p className="text-[13px] text-text-muted">(17) 3331-1155<br/>Mande sua mensagem</p>
          </a>
        </div>

        <div className="bg-white p-8 rounded-lg border border-border shadow-sm">
          <h2 className="font-montserrat text-xl font-bold text-dark-bg mb-6">Nossas Redes Sociais</h2>
          <div className="flex flex-wrap gap-4">
            <a href="https://www.facebook.com/radioculturadeguaira/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#1877f2] text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
              Facebook
            </a>
            <a href="https://www.instagram.com/culturafm104.7" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
              Instagram
            </a>
            <a href="https://youtube.com/@culturafmguaira-sp" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#ff0000] text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
              YouTube
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
