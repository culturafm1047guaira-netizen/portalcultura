import type { Metadata } from "next";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Programação — Rádio Cultura FM 104.7 | Guaíra, SP",
  description: "Programação da Rádio Cultura FM 104.7. Confira nossa grade de programação com programas informativos, musicais e de entretenimento.",
  openGraph: {
    title: "Programação — Rádio Cultura FM 104.7",
    description: "Confira a grade completa da Rádio Cultura FM 104.7.",
    url: "https://radioculturaguaira.com.br/programacao/",
  },
};

export default function ProgramacaoPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Header />
      <div className="container flex-1">
        <main className="page-content">
          <div className="breadcrumb"><Link href="/">Início</Link> &rsaquo; <strong>Programação</strong></div>
          <h1>Programação</h1>
          <div className="highlight-box">
            <p>Confira nossa grade de programação completa. Entre informativos e musicais, oferecemos conteúdo para todos os momentos do seu dia.</p>
          </div>

          <h2>Dias Úteis (Segunda a Sexta)</h2>
          <div className="schedule-grid">
            <div className="schedule-block">
              <h3>🎵 Sertanejo Bom Demais — 05h às 08h</h3>
              <p className="program-desc">Programa matutino com musical sertanejo selecionado com clássicos nacionais voltado para o público adulto.</p>
            </div>
            <div className="schedule-block">
              <h3>🎶 Manhã 104 — 08h às 11h</h3>
              <p className="program-desc">Programa musical moderno e diversificado com locução dinâmica dando ritmo às manhãs dos ouvintes.</p>
            </div>
            <div className="schedule-block">
              <h3>📰 Jornal Cultura — 11h às 12h</h3>
              <p className="program-desc">Portal para o conhecimento e a informação de qualidade. Levando as principais notícias do dia, análises profundas e entrevistas dos acontecimentos local, regional, nacional e internacional. Transmitido ao vivo também pelo Facebook.</p>
            </div>
            <div className="schedule-block">
              <h3>🎻 Passatempo — 12h às 13h</h3>
              <p className="program-desc">Tradicional programa de flashback trazendo os grandes sucessos dos anos 80, 90 e 2000, tanto da música nacional como internacional.</p>
            </div>
            <div className="schedule-block">
              <h3>🤠 Só Modão — 16h às 19h</h3>
              <p className="program-desc">Programa voltado para o musical clássico com o melhor da música sertaneja.</p>
            </div>
          </div>

          <h2>Sábado</h2>
          <div className="schedule-grid">
            <div className="schedule-block">
              <h3>🎵 Sertanejo Bom Demais — 05h às 08h</h3>
              <p className="program-desc">Programa matutino com musical sertanejo selecionado com clássicos nacionais voltado para o público adulto.</p>
            </div>
            <div className="schedule-block">
              <h3>🎶 As 30 Mais da Semana — 08h às 11h</h3>
              <p className="program-desc">Playlist com as 30 músicas mais pedidas pelos ouvintes durante a semana.</p>
            </div>
            <div className="schedule-block">
              <h3>🎸 Viola Sublime Viola — 14h às 17h</h3>
              <p className="program-desc">Programa voltado ao musical sertanejo raíz trazendo os grandes clássicos do cancioneiro nacional.</p>
            </div>
          </div>

          <h2>Domingo</h2>
          <div className="schedule-grid">
            <div className="schedule-block">
              <h3>🌿 Raízes Sertanejas — 08h às 12h</h3>
              <p className="program-desc">Explore as músicas que definem a alma do campo e a essência do povo brasileiro. Seleção cuidadosa de clássicos atemporais e novos sucessos.</p>
            </div>
          </div>

          <div className="highlight-box">
            <p>Ouça a Rádio Cultura FM 104.7 ao vivo! Nossa programação pode sofrer alterações. Para mais informações, entre em contato.</p>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
