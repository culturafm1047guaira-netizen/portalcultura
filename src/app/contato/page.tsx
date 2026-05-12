import type { Metadata } from "next";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contato — Rádio Cultura FM 104.7 | Guaíra, SP",
  description: "Entre em contato com a Rádio Cultura FM 104.7. Telefone, WhatsApp, e-mail e endereço para solicitação de músicas, entrevistas e parcerias.",
  openGraph: {
    title: "Contato — Rádio Cultura FM 104.7",
    description: "Entre em contato com a Rádio Cultura FM 104.7.",
    url: "https://radioculturaguaira.com.br/contato/",
  },
};

export default function ContatoPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Header />
      <div className="container flex-1">
        <main className="page-content">
          <div className="breadcrumb"><Link href="/">Início</Link> &rsaquo; <strong>Contato</strong></div>

          <h1>Contato</h1>

          <div className="highlight-box">
            <p>Fale conosco! Estamos prontos para atendê-lo. Entre em contato para solicitações de músicas, entrevistas, parcerias ou simplesmente para deixar sua mensagem.</p>
          </div>

          <h2>Informações de Contato</h2>

          <div className="contact-grid">
            <div className="contact-card">
              <span className="contact-icon">📍</span>
              <h3>Endereço</h3>
              <p>Av. 15, nº 225<br />Guaíra - SP<br />CEP: 14790-000</p>
            </div>

            <div className="contact-card">
              <span className="contact-icon">📞</span>
              <h3>Telefone</h3>
              <p><strong>(17) 3331-1177</strong><br />Administração</p>
            </div>

            <div className="contact-card">
              <span className="contact-icon">💬</span>
              <h3>WhatsApp</h3>
              <p><strong>(17) 3331-1155</strong><br />Programação</p>
              <a href="https://api.whatsapp.com/send?phone=551733311155" target="_blank" rel="noopener" className="contact-btn">Enviar Mensagem</a>
            </div>

            <div className="contact-card">
              <span className="contact-icon">✉️</span>
              <h3>E-mail</h3>
              <p><strong>radioculturadeguaira@gmail.com</strong></p>
              <a href="mailto:radioculturadeguaira@gmail.com" className="contact-btn">Enviar E-mail</a>
            </div>
          </div>

          <h2>Horário de Atendimento</h2>
          <div className="schedule-grid">
            <div className="schedule-block">
              <h3>🕐 Funcionamento</h3>
              <p className="program-desc">Segunda a Sexta: 06h às 20h<br />Sábado: 06h às 18h<br />Domingo: 08h às 16h</p>
            </div>
            <div className="schedule-block">
              <h3>📻 Transmissão</h3>
              <p className="program-desc">A Rádio Cultura FM 104.7 está no ar <strong>24 horas</strong>, todos os dias do ano.</p>
            </div>
          </div>

          <h2>Siga-nos nas Redes Sociais</h2>
          <div className="social-full">
            <a href="https://www.facebook.com/radioculturadeguaira/" target="_blank" rel="noopener" className="social-item social-fb"><span>📘</span> Facebook</a>
            <a href="https://www.instagram.com/culturafm104.7" target="_blank" rel="noopener" className="social-item social-ig"><span>📸</span> Instagram</a>
            <a href="https://youtube.com/@culturafmguaira-sp" target="_blank" rel="noopener" className="social-item social-yt"><span>🎬</span> YouTube</a>
            <a href="https://api.whatsapp.com/send?phone=551733311155" target="_blank" rel="noopener" className="social-item social-wa"><span>💬</span> WhatsApp</a>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
