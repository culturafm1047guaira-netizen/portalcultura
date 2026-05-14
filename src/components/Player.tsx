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
    <div className={`
      w-full bottom-0 left-0 fixed z-50
      md:w-auto md:bottom-6 md:right-6 md:left-auto md:max-w-sm
    `}>
      <div className={`
        bg-primary md:bg-white/95 md:backdrop-blur-xl md:border md:border-gray-200 
        text-white md:text-text 
        shadow-[0_-4px_20px_rgba(0,0,0,0.15)] md:shadow-2xl 
        h-16 md:h-auto md:p-3 md:rounded-2xl 
        flex items-center transition-all duration-500 ease-out
      `}>
        <div className="container md:w-full md:px-2 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <button 
              className={`
                w-12 h-12 rounded-full flex items-center justify-center shrink-0 
                bg-white text-primary md:bg-primary md:text-white
                hover:scale-105 active:scale-95 transition-all duration-300 shadow-md 
                hover:shadow-lg
              `}
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
                <span className={`
                  text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider animate-pulse
                  bg-dark-bg text-white md:bg-primary-soft md:text-primary
                `}>
                  Ao Vivo
                </span>
                <strong className="font-montserrat text-sm md:text-[15px] font-bold uppercase tracking-tight truncate max-w-[150px] sm:max-w-xs">
                  Cultura FM
                </strong>
              </div>
              <span className="text-[11px] font-medium md:text-gray-500">
                {isPlaying ? "Sintonizado em Guaíra, SP" : "Clique no play para ouvir"}
              </span>
            </div>
          </div>

          {isPlaying && (
            <div className="hidden sm:flex items-center gap-1 h-5 opacity-80 md:opacity-100">
              {[1, 2, 3, 4, 5].map(i => (
                <div 
                  key={i}
                  className="w-1 rounded-full animate-[vis-anim_0.5s_infinite_alternate] bg-white md:bg-primary"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          )}
        </div>
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
