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
      flex items-center gap-4 bg-white/5 px-4 py-2 rounded-lg border border-white/10 transition-all relative
      ${isPlaying ? "border-green-500/50 bg-green-500/5 shadow-[0_0_15px_rgba(34,197,94,0.1)]" : ""}
    `}>
      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#ff4757] text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase shadow-[0_0_10px_rgba(255,71,87,0.5)] z-10">
        Ao Vivo
      </div>

      <button 
        className="w-11 h-11 rounded-full bg-primary flex items-center justify-center shrink-0 hover:bg-primary-light transition-all shadow-[0_4px_10px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95"
        onClick={togglePlay}
        aria-label={isPlaying ? "Pausar rádio" : "Ouvir rádio ao vivo"}
      >
        {isPlaying ? (
          <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
        ) : (
          <svg className="w-5 h-5 fill-white translate-x-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        )}
      </button>

      <div className="flex flex-col gap-0.5">
        <strong className="font-montserrat text-[13px] text-white uppercase tracking-wider">
          Cultura FM 104.7
        </strong>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-primary-light font-bold uppercase tracking-widest">
            {isPlaying ? "Sintonizado" : "Clique para ouvir"}
          </span>
          {isPlaying && (
            <div className="flex items-center gap-0.5 h-[15px]">
              {[1, 2, 3, 4, 5].map(i => (
                <div 
                  key={i}
                  className="w-0.5 bg-primary-light animate-[vis-anim_0.5s_infinite_alternate]"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          )}
        </div>
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
          0% { height: 2px; opacity: 0.3; }
          100% { height: 15px; opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Player;
