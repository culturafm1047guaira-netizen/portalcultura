"use client";

import React from "react";

/**
 * HeroWave — A assinatura "Onda Viva"
 *
 * Visualização de frequência animada (104.7 FM) que simula uma sintonia de rádio.
 * - Entrada: dígitos "1-0-4-.-7" se formam via stroke-dashoffset.
 * - Idle: respiração suave (hero-wave-pulse).
 * - Acessível: aria-label descritivo; respeita prefers-reduced-motion via CSS.
 */
export default function HeroWave() {
  return (
    <div
      className="relative w-full overflow-hidden"
      role="img"
      aria-label="Rádio Cultura FM 104.7 — frequência 104.7 MHz"
    >
      {/* Tagline */}
      <p className="hero-tagline mb-2 text-center md:text-left">
        A voz que une Guaíra ao mundo
      </p>

      {/* Frequency display */}
      <div className="relative flex h-32 sm:h-40 md:h-48 items-center justify-center md:justify-start">
        <svg
          viewBox="0 0 600 160"
          className="hero-wave-pulse h-full w-full max-w-[640px]"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0B4F7A" />
              <stop offset="55%" stopColor="#2D6A4F" />
              <stop offset="100%" stopColor="#E88D2A" />
            </linearGradient>
          </defs>

          {/* Ambient noise line (ruído de fundo) */}
          <path
            d="M 10 80 Q 100 60, 200 80 T 400 80 T 590 80"
            stroke="#E8ECEF"
            strokeWidth="2"
            fill="none"
          />

          {/* Frequency digits "104.7" */}
          <text
            x="300"
            y="105"
            textAnchor="middle"
            fontFamily="var(--font-display), 'Arial Narrow', sans-serif"
            fontSize="120"
            fontWeight="700"
            fill="url(#wave-gradient)"
            letterSpacing="-2"
            className="hero-wave-digit"
          >
            104.7
          </text>
        </svg>
      </div>

      {/* Action bar (Live + Listen) */}
      <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <span
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.25em]"
          style={{
            color: "#E88D2A",
            border: "1px solid currentColor",
          }}
        >
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: "currentColor" }}
            aria-hidden="true"
          />
          Ao vivo agora
        </span>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-3 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-[0.15em] text-white transition-transform duration-150 active:scale-[0.98]"
          style={{ background: "#0B4F7A" }}
        >
          <span aria-hidden="true" className="inline-flex items-end h-4">
            <span className="player-equalizer-bar" />
            <span className="player-equalizer-bar" />
            <span className="player-equalizer-bar" />
            <span className="player-equalizer-bar" />
          </span>
          Ouça agora
          <span className="ml-1" aria-hidden="true">▶</span>
        </button>

        <span
          className="ml-0 sm:ml-auto inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold tracking-widest"
          style={{
            color: "#4B5563",
            background: "#E8ECEF",
          }}
        >
          104.7&nbsp;FM
        </span>
      </div>
    </div>
  );
}
