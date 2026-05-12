import React from "react";

const Sidebar = () => {
  return (
    <aside className="flex flex-col gap-4">
      {/* Weather Widget */}
      <div className="bg-card-bg border border-border rounded-lg overflow-hidden shadow-sm">
        <div className="bg-dark-bg px-3.5 py-2.5 flex items-center gap-2 text-[10px] font-bold text-white/95 tracking-widest uppercase border-b border-white/5">
          <div className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
          🌤 Clima em Guaíra-SP
        </div>
        <div className="p-4 bg-gradient-to-br from-[#4facfe] to-[#00f2fe] text-white">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[13px] font-bold flex items-center gap-1">📍 Guaíra, SP</span>
            <span className="text-[11px] opacity-90 font-semibold uppercase">Ensolarado</span>
          </div>
          <div className="text-center mb-4">
            <div className="text-[52px] font-black leading-none relative inline-block drop-shadow-lg">
              28<span className="text-[24px] absolute top-1 -right-4 font-normal">°</span>
            </div>
          </div>
          <div className="bg-white/15 backdrop-blur-md rounded-xl p-3 border border-white/10">
            <div className="flex justify-center gap-5 text-sm font-bold mb-1">
              <span>↑ 31°</span>
              <span>↓ 19°</span>
            </div>
            <div className="text-[11px] text-center opacity-80">Sensação térmica: 30°C</div>
          </div>
        </div>
      </div>

      {/* Agro Quotes */}
      <div className="bg-card-bg border border-border rounded-lg overflow-hidden shadow-sm">
        <div className="bg-dark-bg px-3.5 py-2.5 flex items-center gap-2 text-[10px] font-bold text-white/95 tracking-widest uppercase border-b border-white/5">
          <div className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
          🌱 Cotações Agro
        </div>
        <div className="p-3 px-3.5">
          {[
            { label: "Boi Gordo (arroba)", val: "R$ 235,50", trend: "up", change: "+0.5%" },
            { label: "Milho (saca)", val: "R$ 62,30", trend: "down", change: "-1.2%" },
            { label: "Soja (saca)", val: "R$ 128,00", trend: "stable", change: "0.0%" },
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-center py-2 border-b border-[#f0ede6] last:border-none text-[13px]">
              <span className="text-gray-600 font-semibold">{item.label}</span>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-dark-bg">{item.val}</span>
                <span className={`text-[11px] font-bold ${item.trend === "up" ? "text-green-600" : item.trend === "down" ? "text-red-600" : "text-gray-400"}`}>
                  {item.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Widget */}
      <div className="bg-card-bg border border-border rounded-lg overflow-hidden shadow-sm">
        <div className="bg-dark-bg px-3.5 py-2.5 flex items-center gap-2 text-[10px] font-bold text-white/95 tracking-widest uppercase border-b border-white/5">
          <div className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
          🌐 Siga-nos
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-2">
            <a href="#" className="bg-[#1877f2] text-white p-2.5 rounded text-[12px] font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all">Facebook</a>
            <a href="#" className="bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888] text-white p-2.5 rounded text-[12px] font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all">Instagram</a>
            <a href="#" className="bg-[#ff0000] text-white p-2.5 rounded text-[12px] font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all">YouTube</a>
            <a href="#" className="bg-[#25d366] text-white p-2.5 rounded text-[12px] font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all">WhatsApp</a>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
