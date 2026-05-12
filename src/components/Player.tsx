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
    <div className="bg-primary border-t border-primary-dark text-white shadow-[0_-4px_20px_rgba(0,0,0,0.15)] h-16 flex items-center transition-all">
      <div className="container flex items-center justify-between">
        
        <div className="flex items-center gap-4">
          <button 
            className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-transform shadow-md"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pausar rádio" : "Ouvir rádio ao vivo"}
          >
            {isPlaying ? (
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            ) : (
              <svg className="w-6 h-6 fill-current translate-x-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="bg-dark-bg text-white text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider animate-pulse">
                Ao Vivo
              </span>
              <strong className="font-montserrat text-sm md:text-base font-bold uppercase tracking-wide truncate max-w-[150px] sm:max-w-xs">
                Rádio Cultura FM
              </strong>
            </div>
            <span className="text-[11px] text-white/80 font-medium">
              {isPlaying ? "Sintonizado em Guaíra, SP" : "Clique no play para ouvir"}
            </span>
          </div>
        </div>

        {isPlaying && (
          <div className="hidden sm:flex items-center gap-1 h-5 opacity-80">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div 
                key={i}
                className="w-1 bg-white rounded-full animate-[vis-anim_0.5s_infinite_alternate]"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        )}

      </div>

      <audio 
        ref={audioRef} 
        src="https://servidor31.brlogic.com:8032/live" 
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <style jsx>{`
        @keyframes vis-anim {
          0% { height: 4px; }
          100% { height: 20px; }
        }
      `}</style>
    </div>
  );
};

export default Player;
