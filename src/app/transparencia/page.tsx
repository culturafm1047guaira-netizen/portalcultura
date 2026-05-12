import type { Metadata } from "next";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Transparência — Rádio Cultura FM 104.7 | Guaíra, SP",
  description: "Transparência da Rádio Cultura FM 104.7. Conheça nossos compromissos com informação confiável, ética e responsabilidade social.",
  openGraph: {
    title: "Transparência — Rádio Cultura FM 104.7",
    description: "Compromissos da Rádio Cultura FM 104.7 com informação confiável, ética e responsabilidade social.",
    url: "https://radioculturaguaira.com.br/transparencia/",
  },
};

export default function TransparenciaPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Header />
      <div className="container flex-1">
        <main className="page-content">
          <div className="breadcrumb"><Link href="/">Início</Link> &rsaquo; <strong>Transparência</strong></div>

          <h1>Transparência</h1>

          <div className="highlight-box">
            <p>Na Rádio Cultura FM 104.7, acreditamos que a confiança e o compromisso com nossos ouvintes são fundamentais. Por isso, mantemos uma postura transparente em todas as nossas atividades, desde a gestão interna até a programação e veiculação de conteúdo.</p>
          </div>

          <p>Abaixo, apresentamos nossos principais compromissos e práticas que refletem nosso respeito pelo público, patrocinadores e parceiros:</p>

          <h2>Compromisso com a Informação Confiável</h2>
          <p>Todos os conteúdos transmitidos pela Rádio Cultura FM 104.7 passam por critérios rigorosos de qualidade e responsabilidade. Nossas informações são baseadas em fontes confiáveis, garantindo a precisão das notícias e a imparcialidade nos comentários e entrevistas.</p>

          <h2>Ética e Responsabilidade Social</h2>
          <p>Somos comprometidos com uma programação ética, respeitando a diversidade e promovendo a inclusão. Em nossos programas e anúncios, buscamos sempre atuar de forma respeitosa e consciente, seguindo os princípios éticos da comunicação.</p>

          <h2>Política de Anúncios e Patrocínios</h2>
          <p>Transparência também é essencial no que diz respeito a anúncios e patrocínios. Em nossa programação, identificamos claramente os conteúdos patrocinados, assegurando que nossos ouvintes estejam sempre cientes da origem dos anunciantes da rádio.</p>

          <h2>Abertura para Feedback</h2>
          <p>A Rádio Cultura FM 104.7 valoriza a opinião do público. Mantemos canais de comunicação abertos para receber sugestões, críticas e dúvidas dos nossos ouvintes, buscando sempre aprimorar nossa atuação e nos alinhar às expectativas da comunidade.</p>

          <div className="highlight-box">
            <p>Nossa missão é ser mais do que uma rádio: queremos ser uma plataforma de comunicação que serve à sociedade com honestidade e compromisso.</p>
          </div>

          <h2>Entre em Contato</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="number">📞</span>
              <span className="label">Administração</span>
              <p style={{ fontSize: "16px", marginTop: "8px", color: "var(--text)" }}>(17) 3331-1177</p>
            </div>
            <div className="stat-card">
              <span className="number">💬</span>
              <span className="label">WhatsApp Programação</span>
              <p style={{ fontSize: "16px", marginTop: "8px", color: "var(--text)" }}>(17) 3331-1155</p>
            </div>
            <div className="stat-card">
              <span className="number">✉️</span>
              <span className="label">E-mail</span>
              <p style={{ fontSize: "14px", marginTop: "8px", color: "var(--text)" }}>radioculturadeguaira@gmail.com</p>
            </div>
            <div className="stat-card">
              <span className="number">📍</span>
              <span className="label">Endereço</span>
              <p style={{ fontSize: "14px", marginTop: "8px", color: "var(--text)" }}>Av. 15, nº 225, Guaíra-SP</p>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
