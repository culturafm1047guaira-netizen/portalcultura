import React from "react";

const Sidebar = () => {
  return (
    <aside className="flex flex-col gap-8 w-full">
      {/* Weather Widget */}
      <div className="flex flex-col">
        <h3 className="font-montserrat font-black text-sm uppercase tracking-widest text-text mb-3 border-b-2 border-primary pb-1 inline-block w-fit">
          Clima em Guaíra
        </h3>
        <div className="bg-white border border-border p-5 rounded-lg text-text shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Guaíra, SP</span>
            <span className="text-[11px] uppercase text-primary font-bold">Ensolarado</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-[48px] font-black leading-none tracking-tighter">
              28°
            </div>
            <svg className="w-10 h-10 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 4.25a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V5a.75.75 0 01.75-.75zm0 12a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM5 12a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 12zm14 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM7.05 7.05a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06L7.05 8.11a.75.75 0 010-1.06zm9.9 9.9a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM7.05 16.95a.75.75 0 010-1.06l1.06-1.06a.75.75 0 111.06 1.06l-1.06 1.06a.75.75 0 01-1.06 0zm9.9-9.9a.75.75 0 010 1.06l-1.06 1.06a.75.75 0 11-1.06-1.06l1.06-1.06a.75.75 0 011.06 0z" />
              <path d="M12 8.5A3.5 3.5 0 1012 15a3.5 3.5 0 000-7z" />
            </svg>
          </div>
          <div className="flex gap-6 text-[13px] font-bold text-gray-400 mt-4 pt-4 border-t border-gray-100">
            <span className="flex items-center gap-1"><span className="text-primary">↑</span> 31°</span>
            <span className="flex items-center gap-1"><span className="text-blue-500">↓</span> 19°</span>
          </div>
        </div>
      </div>

      {/* Agro Quotes */}
      <div className="flex flex-col">
        <h3 className="font-montserrat font-black text-sm uppercase tracking-widest text-text mb-3 border-b-2 border-green-600 pb-1 inline-block w-fit">
          Cotações Agro
        </h3>
        <div className="bg-white border border-border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          {[
            { label: "Boi Gordo", val: "R$ 235,50", trend: "up", change: "+0.5%" },
            { label: "Milho (sc)", val: "R$ 62,30", trend: "down", change: "-1.2%" },
            { label: "Soja (sc)", val: "R$ 128,00", trend: "stable", change: "0.0%" },
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-center py-2.5 border-b border-gray-100 last:border-none text-[13px]">
              <span className="text-gray-500 font-bold">{item.label}</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-dark-bg">{item.val}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${item.trend === "up" ? "bg-green-100 text-green-700" : item.trend === "down" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-500"}`}>
                  {item.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Ad Banner placeholder */}
      <div className="w-full h-[250px] bg-gray-50 border border-border flex items-center justify-center text-gray-300 text-xs font-bold uppercase tracking-widest">
        Publicidade
      </div>
    </aside>
  );
};

export default Sidebar;
