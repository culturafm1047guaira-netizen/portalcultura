"use client";

import React, { useState, useRef } from "react";

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Play failed", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="w-full bg-primary text-white shadow-md">
      <div className="container flex items-center justify-between gap-4 h-14">
        <div className="flex items-center gap-4">
          <button
            className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 bg-white text-primary hover:scale-105 active:scale-95 transition-all duration-300 shadow-md"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pausar rádio" : "Ouvir rádio ao vivo"}
          >
            {isPlaying ? (
              <svg className="w-5 h-5 fill-current animate-pulse" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            ) : (
              <svg className="w-6 h-6 fill-current translate-x-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>

          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider animate-pulse bg-dark-bg text-white">
                Ao Vivo
              </span>
              <strong className="font-montserrat text-sm font-bold uppercase tracking-tight">
                Cultura FM
              </strong>
            </div>
            <span className="text-[11px] font-medium text-white/70">
              {isPlaying ? "Sintonizado em Guaíra, SP" : "Clique no play para ouvir"}
            </span>
          </div>
        </div>

        {isPlaying && (
          <div className="flex items-center gap-1.5 h-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div
                key={i}
                className="w-1.5 rounded-full animate-[vis-anim_0.6s_infinite_alternate] bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                style={{
                  animationDelay: `${i * 0.12}s`,
                  height: `${Math.random() * 10 + 10}px`
                }}
              />
            ))}
          </div>
        )}
      </div>

      <audio
        ref={audioRef}
        src="https://ice.fabricahost.com.br/radioculturaguaira"
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <style jsx>{`
        @keyframes vis-anim {
          0% { height: 4px; }
          100% { height: 16px; }
        }
      `}</style>
    </div>
  );
};

export default Player;
