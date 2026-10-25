"use client";

import React, { useState, useRef, useEffect } from "react";

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Tenta iniciar o streaming automaticamente ao carregar a página. A
  // maioria dos navegadores (principalmente em celular) bloqueia áudio
  // com som sem interação prévia do usuário — nesse caso o play() é
  // rejeitado e o usuário precisa tocar no botão manualmente.
  useEffect(() => {
    audioRef.current?.play().catch(() => setAutoplayBlocked(true));
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Play failed", e));
      }
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-primary-dark via-primary to-primary-dark text-white shadow-lg relative z-10">
      <div className="container flex items-center justify-between gap-4 h-20 sm:h-24">
        <div className="flex items-center gap-4 sm:gap-5">
          <button
            className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shrink-0 bg-white text-primary hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg ring-4 ring-white/20"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pausar rádio" : "Ouvir rádio ao vivo"}
          >
            {isPlaying && (
              <span className="absolute inset-0 rounded-full bg-white/40 animate-ping" aria-hidden="true" />
            )}
            {isPlaying ? (
              <svg className="relative w-6 h-6 sm:w-7 sm:h-7 fill-current animate-pulse" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            ) : (
              <svg className="relative w-7 h-7 sm:w-8 sm:h-8 fill-current translate-x-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>

          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-black px-2 py-1 rounded-full uppercase tracking-wider bg-white text-primary-dark shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-vermelho-vivo)] animate-pulse" aria-hidden="true" />
                Ao Vivo
              </span>
              <strong className="font-montserrat text-lg sm:text-2xl font-black uppercase tracking-tight">
                Cultura FM
              </strong>
            </div>
            <span className="text-xs sm:text-sm font-semibold text-white/80">
              {isPlaying
                ? "Sintonizado em Guaíra, SP"
                : autoplayBlocked
                  ? "Toque no play para ouvir"
                  : "Sintonizando..."}
            </span>
          </div>
        </div>

        {isPlaying && (
          <div className="flex items-center gap-1.5 sm:gap-2 h-8">
            {[1, 2, 3, 4, 5, 6].map((i, index) => (
              <div
                key={i}
                className="w-1.5 sm:w-2 rounded-full animate-[vis-anim_0.6s_infinite_alternate] bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                style={{
                  animationDelay: `${i * 0.12}s`,
                  height: `${[18, 24, 16, 22, 14, 20][index]}px`
                }}
              />
            ))}
          </div>
        )}
      </div>

      <audio
        ref={audioRef}
        src="https://ice.fabricahost.com.br/radioculturaguaira"
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />


    </div>
  );
};

export default Player;
