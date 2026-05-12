import React from "react";

const Sidebar = () => {
  return (
    <aside className="flex flex-col gap-8 w-full">
      {/* Weather Widget */}
      <div className="flex flex-col">
        <h3 className="font-montserrat font-black text-sm uppercase tracking-widest text-text mb-3 border-b-2 border-primary pb-1 inline-block w-fit">
          Clima em Guaíra
        </h3>
        <div className="bg-gradient-to-br from-[#4facfe] to-[#00f2fe] p-5 rounded-lg text-white shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Guaíra, SP</span>
            <span className="text-[11px] uppercase opacity-90">Ensolarado</span>
          </div>
          <div className="text-[48px] font-black leading-none mb-4 text-center">
            28°
          </div>
          <div className="flex justify-center gap-6 text-sm font-bold bg-white/20 rounded py-2">
            <span>↑ 31°</span>
            <span>↓ 19°</span>
          </div>
        </div>
      </div>

      {/* Agro Quotes */}
      <div className="flex flex-col">
        <h3 className="font-montserrat font-black text-sm uppercase tracking-widest text-text mb-3 border-b-2 border-green-600 pb-1 inline-block w-fit">
          Cotações Agro
        </h3>
        <div className="bg-gray-50 border border-gray-100 p-4 rounded-lg">
          {[
            { label: "Boi Gordo", val: "R$ 235,50", trend: "up", change: "+0.5%" },
            { label: "Milho (sc)", val: "R$ 62,30", trend: "down", change: "-1.2%" },
            { label: "Soja (sc)", val: "R$ 128,00", trend: "stable", change: "0.0%" },
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-none text-[13px]">
              <span className="text-gray-600 font-bold">{item.label}</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-dark-bg">{item.val}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${item.trend === "up" ? "bg-green-100 text-green-700" : item.trend === "down" ? "bg-red-100 text-red-700" : "bg-gray-200 text-gray-600"}`}>
                  {item.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Ad Banner placeholder */}
      <div className="w-full h-[250px] bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 text-xs font-bold uppercase tracking-widest">
        Publicidade
      </div>
    </aside>
  );
};

export default Sidebar;
