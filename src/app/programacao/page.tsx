import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import Link from "next/link";

export const metadata = {
  title: "Programação — Rádio Cultura FM 104.7",
  description: "Confira a grade de programação da Rádio Cultura FM 104.7. Jornalismo, música, esportes e muito mais.",
};

export default function ProgramacaoPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Header />

      <main className="container py-8 flex-1">
        <div className="text-[12px] text-gray-400 mb-6">
          <Link href="/" className="text-primary hover:underline">Início</Link> &rsaquo; <strong>Programação</strong>
        </div>

        <h1 className="font-montserrat text-3xl font-extrabold text-dark-bg uppercase tracking-wider mb-8 text-center">
          Grade de Programação
        </h1>

        <div className="space-y-12 mb-12">
          {/* Segunda a Sexta */}
          <section>
            <h2 className="font-montserrat text-2xl font-black text-primary uppercase tracking-tight mb-6 border-b border-border pb-2">
              Segunda a Sexta
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ScheduleItem 
                time="05h às 08h" 
                title="🎵 Sertanejo Bom Demais" 
                desc="Programa matutino com musical sertanejo selecionado com clássicos nacionais voltado para o público adulto."
              />
              <ScheduleItem 
                time="08h às 11h" 
                title="🎶 Manhã 104" 
                desc="Programa musical moderno e diversificado com locução dinâmica dando ritmo às manhãs dos ouvintes."
              />
              <ScheduleItem 
                time="11h às 12h" 
                title="📰 Jornal Cultura" 
                desc="Portal para o conhecimento e a informação de qualidade. Levando as principais notícias do dia, análises profundas e entrevistas dos acontecimentos local, regional, nacional e internacional. Transmitido ao vivo também pelo Facebook."
              />
              <ScheduleItem 
                time="12h às 13h" 
                title="🎻 Passatempo" 
                desc="Tradicional programa de flashback trazendo os grandes sucessos dos anos 80, 90 e 2000, tanto da música nacional como internacional."
              />
              <ScheduleItem 
                time="16h às 19h" 
                title="🤠 Só Modão" 
                desc="Programa voltado para o musical clássico com o melhor da música sertaneja."
              />
            </div>
          </section>

          {/* Sábado */}
          <section>
            <h2 className="font-montserrat text-2xl font-black text-primary uppercase tracking-tight mb-6 border-b border-border pb-2">
              Sábado
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ScheduleItem 
                time="05h às 08h" 
                title="🎵 Sertanejo Bom Demais" 
                desc="Programa matutino com musical sertanejo selecionado com clássicos nacionais voltado para o público adulto."
              />
              <ScheduleItem 
                time="08h às 11h" 
                title="🎶 As 30 Mais da Semana" 
                desc="Playlist com as 30 músicas mais pedidas pelos ouvintes durante a semana."
              />
              <ScheduleItem 
                time="14h às 17h" 
                title="🎸 Viola Sublime Viola" 
                desc="Programa voltado ao musical sertanejo raíz trazendo os grandes clássicos do cancioneiro nacional."
              />
            </div>
          </section>

          {/* Domingo */}
          <section>
            <h2 className="font-montserrat text-2xl font-black text-primary uppercase tracking-tight mb-6 border-b border-border pb-2">
              Domingo
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ScheduleItem 
                time="08h às 12h" 
                title="🌿 Raízes Sertanejas" 
                desc="Explore as músicas que definem a alma do campo e a essência do povo brasileiro. Seleção cuidadosa de clássicos atemporais e novos sucessos."
              />
            </div>
          </section>
        </div>

        <div className="bg-primary/5 p-6 rounded-lg border border-primary/20 text-center text-sm text-text-muted">
          <p>Ouça a Rádio Cultura FM 104.7 ao vivo! Nossa programação pode sofrer alterações sem aviso prévio.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function ScheduleItem({ time, title, desc }: { time: string, title: string, desc: string }) {
  return (
    <div className="bg-white border border-border p-6 rounded-lg hover:shadow-md transition-shadow">
      <div className="text-primary font-black text-lg mb-2">{time}</div>
      <h3 className="font-montserrat text-lg font-bold text-dark-bg mb-2">{title}</h3>
      <p className="text-[13px] text-text-muted leading-relaxed">{desc}</p>
    </div>
  );
}
