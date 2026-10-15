"use client";

import React from "react";

/**
 * HeroWave — Faixa de destaque compacta da frequência 104.7 FM.
 *
 * Linha única, estilo barra editorial: tagline + frequência + status ao vivo
 * + botão de escuta. Substitui a antiga versão com SVG gigante que ocupava
 * várias telas de altura.
 */
export default function HeroWave() {
  return (
    <div
      className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6"
      role="img"
      aria-label="Rádio Cultura FM 104.7 — frequência 104.7 MHz"
    >
      <div className="flex items-center gap-3">
        <span
          className="font-montserrat text-3xl sm:text-4xl font-black tracking-tight"
          style={{ color: "var(--color-sintonia-azul)" }}
        >
          104.7
        </span>
        <span className="hidden sm:block text-sm text-text-muted">
          A voz que une Guaíra ao mundo
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span
          className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em]"
          style={{ color: "var(--color-vermelho-vivo)", border: "1px solid currentColor" }}
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: "currentColor" }} aria-hidden="true" />
          Ao vivo
        </span>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white transition-transform duration-150 active:scale-[0.98]"
          style={{ background: "var(--color-sintonia-azul)" }}
        >
          <span aria-hidden="true" className="inline-flex items-end h-3">
            <span className="player-equalizer-bar" />
            <span className="player-equalizer-bar" />
            <span className="player-equalizer-bar" />
          </span>
          Ouça agora
        </button>
      </div>
    </div>
  );
}
