"use client";

import { useRef, useState } from "react";
import { SignoWithData } from "@/lib/horoscopo";

// ─── Cor por signo ────────────────────────────────────────────────────────────
const SIGNO_COLORS: Record<string, { from: string; to: string; accent: string }> = {
  aries:       { from: "#FF6B6B", to: "#FF4D4D", accent: "#FF1A1A" },
  touro:       { from: "#51CF66", to: "#2F9E44", accent: "#1B7A2E" },
  gemeos:      { from: "#FFD43B", to: "#FAB005", accent: "#E67700" },
  cancer:      { from: "#74C0FC", to: "#339AF0", accent: "#1971C2" },
  leao:        { from: "#FF922B", to: "#F76707", accent: "#D9480F" },
  virgem:      { from: "#8CE99A", to: "#40C057", accent: "#2B8A3E" },
  libra:       { from: "#DA77F2", to: "#AE3EC9", accent: "#862E9C" },
  escorpiao:   { from: "#F03E3E", to: "#C92A2A", accent: "#962020" },
  sagitario:   { from: "#9775FA", to: "#7048E8", accent: "#5F3DC4" },
  capricornio: { from: "#A8996E", to: "#7D6843", accent: "#5C4A2C" },
  aquario:     { from: "#22D3EE", to: "#0891B2", accent: "#0E7490" },
  peixes:      { from: "#818CF8", to: "#4F46E5", accent: "#3730A3" },
};

// ─── Modal de detalhe ─────────────────────────────────────────────────────────
function SignoModal({
  signo,
  onClose,
}: {
  signo: SignoWithData;
  onClose: () => void;
}) {
  const color = SIGNO_COLORS[signo.id] ?? SIGNO_COLORS.aries;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="relative max-w-md w-full rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: `linear-gradient(145deg, ${color.from}22, #0f172a)`,
          border: `1px solid ${color.from}50`,
        }}
      >
        {/* Decoração de brilho */}
        <div
          className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{ background: color.from }}
        />

        {/* Cabeçalho do modal */}
        <div
          className="px-6 pt-6 pb-4 flex items-center gap-4"
          style={{
            background: `linear-gradient(90deg, ${color.from}30, transparent)`,
            borderBottom: `1px solid ${color.from}30`,
          }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-lg shrink-0"
            style={{
              background: `linear-gradient(135deg, ${color.from}, ${color.to})`,
              boxShadow: `0 8px 24px ${color.from}60`,
            }}
          >
            {signo.emoji}
          </div>
          <div>
            <h3
              className="font-montserrat font-black text-2xl"
              style={{ color: color.from }}
            >
              {signo.label}
            </h3>
            <p className="text-xs text-slate-400">{signo.periodo}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-auto w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            ✕
          </button>
        </div>

        {/* Texto da previsão */}
        <div className="px-6 py-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: color.from }}>
              ✦ Horóscopo do Dia
            </span>
          </div>
          <p className="text-sm leading-relaxed text-slate-300">{signo.texto}</p>
        </div>

        {/* Rodapé */}
        <div className="px-6 pb-5 text-center">
          <button
            onClick={onClose}
            className="text-xs font-bold uppercase tracking-wider px-6 py-2 rounded-xl transition-all hover:opacity-80 active:scale-95"
            style={{
              background: `linear-gradient(90deg, ${color.from}, ${color.to})`,
              color: "#fff",
            }}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Card individual do carrossel ─────────────────────────────────────────────
function SignoCard({
  signo,
  onClick,
}: {
  signo: SignoWithData;
  onClick: () => void;
}) {
  const color = SIGNO_COLORS[signo.id] ?? SIGNO_COLORS.aries;
  const preview = signo.texto.length > 100 ? signo.texto.slice(0, 100).trimEnd() + "…" : signo.texto;

  return (
    <article
      onClick={onClick}
      className="shrink-0 w-[240px] cursor-pointer rounded-2xl overflow-hidden transition-transform duration-200 hover:scale-[1.03] hover:shadow-2xl group"
      style={{
        background: `linear-gradient(145deg, #1e293b, #0f172a)`,
        border: `1px solid ${color.from}40`,
      }}
    >
      {/* Topo colorido com gradiente */}
      <div
        className="relative px-4 pt-4 pb-3 flex items-center gap-3"
        style={{
          background: `linear-gradient(135deg, ${color.from}30, ${color.from}08)`,
          borderBottom: `1px solid ${color.from}25`,
        }}
      >
        {/* Glow de fundo */}
        <div
          className="absolute -top-6 -right-6 w-20 h-20 rounded-full blur-2xl opacity-25 pointer-events-none"
          style={{ background: color.from }}
        />
        {/* Emoji com badge */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-md"
          style={{
            background: `linear-gradient(135deg, ${color.from}, ${color.to})`,
            boxShadow: `0 4px 12px ${color.from}50`,
          }}
        >
          {signo.emoji}
        </div>
        <div className="min-w-0">
          <h3
            className="font-montserrat font-black text-sm leading-tight truncate"
            style={{ color: color.from }}
          >
            {signo.label}
          </h3>
          <p className="text-[10px] text-slate-500 leading-tight">{signo.periodo}</p>
        </div>
      </div>

      {/* Texto do horóscopo */}
      <div className="px-4 py-3">
        <p className="text-[12px] leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors">
          {preview}
        </p>
      </div>

      {/* Rodapé "Leia mais" */}
      <div
        className="px-4 pb-3 flex items-center gap-1"
        style={{ color: color.from }}
      >
        <span className="text-[10px] font-bold uppercase tracking-wider opacity-70 group-hover:opacity-100 transition-opacity">
          Leia mais
        </span>
        <svg className="w-3 h-3 opacity-70 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </article>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function HoroscopoCarousel({ signos }: { signos: SignoWithData[] }) {
  const [paused, setPaused] = useState(false);
  const [modal, setModal] = useState<SignoWithData | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Duplicamos 3× para garantir loop visual suave independente da largura da tela
  const items = [...signos, ...signos, ...signos];

  return (
    <section className="w-full">
      {/* Cabeçalho */}
      <div className="flex items-center gap-4 mb-6">
        <h2
          className="font-montserrat text-2xl font-black uppercase tracking-tight"
          style={{ color: "var(--color-primary, #D94B4B)" }}
        >
          ✨ Horóscopo
        </h2>
        <div className="flex-1 border-b border-border" />
        <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase whitespace-nowrap">
          {new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
        </span>
      </div>

      {/* Trilha do carrossel */}
      <div
        className="relative overflow-hidden rounded-2xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        {/* Gradientes de fade nas bordas */}
        <div className="absolute left-0 top-0 h-full w-16 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, var(--color-light-bg, #fff), transparent)" }} />
        <div className="absolute right-0 top-0 h-full w-16 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, var(--color-light-bg, #fff), transparent)" }} />

        {/* Pista animada */}
        <div
          ref={trackRef}
          className="flex gap-4 py-2 px-2"
          style={{
            animation: `horoscopo-scroll 36s linear infinite`,
            animationPlayState: paused ? "paused" : "running",
            width: "max-content",
          }}
        >
          {items.map((signo, i) => (
            <SignoCard
              key={`${signo.id}-${i}`}
              signo={signo}
              onClick={() => setModal(signo)}
            />
          ))}
        </div>

        {/* Definição da animação CSS embutida */}
        <style>{`
          @keyframes horoscopo-scroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(calc(-240px * 12 - 16px * 12)); }
          }
        `}</style>
      </div>

      {/* Dica de interação */}
      <p className="mt-3 text-center text-[11px] text-slate-400 dark:text-slate-500">
        Passe o mouse para pausar · Clique em um signo para ver a previsão completa
      </p>

      {/* Modal de detalhe */}
      {modal && <SignoModal signo={modal} onClose={() => setModal(null)} />}
    </section>
  );
}
