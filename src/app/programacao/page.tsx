import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";

export const metadata = {
  title: "Programação — Rádio Cultura FM 104.7",
  description: "Confira a grade de programação da Rádio Cultura FM 104.7. Jornalismo, música, esportes e muito mais.",
};

export default function ProgramacaoPage() {
  const schedule = [
    { time: "05:00 - 08:00", program: "Ronda Policial", host: "Jornalismo Rádio Cultura", desc: "As primeiras notícias do dia com foco em segurança pública e ocorrências da região." },
    { time: "08:00 - 10:00", program: "Jornal da Cultura", host: "Equipe de Jornalismo", desc: "O principal noticiário da manhã, com entrevistas, debates e os destaques da política e economia local." },
    { time: "10:00 - 12:00", program: "Manhã 104", host: "Locutores Variados", desc: "Música, entretenimento e interatividade para alegrar a sua manhã." },
    { time: "12:00 - 13:00", program: "Esporte em Foco", host: "Equipe de Esportes", desc: "Resumo esportivo do dia, com foco nos times da região e campeonatos nacionais." },
    { time: "13:00 - 16:00", program: "Tarde Sertaneja", host: "Apresentação Especial", desc: "Os maiores sucessos da música sertaneja, de clássicos aos lançamentos." },
    { time: "16:00 - 18:00", program: "Expresso 104", host: "Equipe Cultura", desc: "Notícias de última hora, trânsito e muita música para o seu fim de tarde." },
    { time: "18:00 - 19:00", program: "A Voz do Brasil", host: "Governo Federal", desc: "Noticiário oficial dos poderes Executivo, Legislativo e Judiciário." },
    { time: "19:00 - 22:00", program: "Noite de Sucessos", host: "Locutores Variados", desc: "As músicas mais pedidas pelos ouvintes e interação ao vivo." },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Header />

      <main className="container py-8 flex-1">
        <div className="text-[12px] text-gray-400 mb-6">
          <a href="/" className="text-primary hover:underline">Início</a> &rsaquo; <strong>Programação</strong>
        </div>

        <h1 className="font-montserrat text-3xl font-extrabold text-dark-bg uppercase tracking-wider mb-8 text-center">
          Grade de Programação
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {schedule.map((item, i) => (
            <div key={i} className="bg-card-bg border border-border p-6 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-primary font-black text-xl mb-2">{item.time}</div>
              <h3 className="font-montserrat text-lg font-bold text-dark-bg mb-1">{item.program}</h3>
              <div className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">Apresentação: {item.host}</div>
              <p className="text-[13px] text-text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
