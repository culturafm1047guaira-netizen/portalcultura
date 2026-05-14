"use client";

import React, { useEffect, useState } from "react";

const TopBar = () => {
  const [dateTime, setDateTime] = useState("carregando...");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setDateTime(now.toLocaleString("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }));
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-darker-bg py-2 border-b border-white/5 text-[12px]">
      <div className="container flex justify-between items-center">
        <div className="flex gap-5 items-center text-white">
          <span className="flex items-center gap-1.5">
            ✉ <a href="mailto:radioculturadeguaira@gmail.com" className="hover:text-white transition-colors">radioculturadeguaira@gmail.com</a>
          </span>
          <span className="flex items-center gap-1.5">
            ✆ <a href="tel:1733311177" className="hover:text-white transition-colors">(17) 3331-1177</a>
          </span>
          <span className="hidden md:inline">{dateTime}</span>
        </div>
        <div className="flex gap-5 items-center text-white">
          <button className="bg-none border border-white/20 px-2 py-1 rounded text-[10px] hover:bg-white/10 transition-colors">
            Modo Noturno
          </button>
          <span className="text-white font-bold animate-pulse">● AO VIVO</span>
          <div className="hidden sm:flex gap-4">
            <a href="https://www.facebook.com/radioculturadeguaira/" target="_blank" rel="noopener" className="hover:text-white transition-colors">Facebook</a>
            <a href="https://www.instagram.com/culturafm104.7" target="_blank" rel="noopener" className="hover:text-white transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
