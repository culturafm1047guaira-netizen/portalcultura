import React from "react";
import { getWeatherData } from "@/lib/weather";
import { getQuotesData } from "@/lib/quotes";
import { getBrasileiraoData } from "@/lib/brasileirao";

const Sidebar = async () => {
  const weather = await getWeatherData();
  const quotes = await getQuotesData();
  const brasileirao = await getBrasileiraoData();

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
            <span className="text-[11px] uppercase text-primary font-bold">{weather.condition}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-[48px] font-black leading-none tracking-tighter">
              {weather.temp}°
            </div>
            <svg className="w-10 h-10 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 4.25a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V5a.75.75 0 01.75-.75zm0 12a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM5 12a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 12zm14 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM7.05 7.05a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06L7.05 8.11a.75.75 0 010-1.06zm9.9 9.9a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM7.05 16.95a.75.75 0 010-1.06l1.06-1.06a.75.75 0 111.06 1.06l-1.06 1.06a.75.75 0 01-1.06 0zm9.9-9.9a.75.75 0 010 1.06l-1.06 1.06a.75.75 0 11-1.06-1.06l1.06-1.06a.75.75 0 011.06 0z" />
              <path d="M12 8.5A3.5 3.5 0 1012 15a3.5 3.5 0 000-7z" />
            </svg>
          </div>
          <div className="flex gap-6 text-[13px] font-bold text-gray-400 mt-4 pt-4 border-t border-gray-100">
            <span className="flex items-center gap-1"><span className="text-primary">↑</span> {weather.max}°</span>
            <span className="flex items-center gap-1"><span className="text-blue-500">↓</span> {weather.min}°</span>
            <span className="text-[10px] text-gray-300 ml-auto self-center">UMID: {weather.humidity}</span>
          </div>
        </div>
      </div>

      {/* Financial & Agro Quotes */}
      <div className="flex flex-col">
        <h3 className="font-montserrat font-black text-sm uppercase tracking-widest text-text mb-3 border-b-2 border-green-600 pb-1 inline-block w-fit">
          Cotações em Tempo Real
        </h3>
        <div className="bg-white border border-border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          {quotes.map((item, i) => (
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
      
      {/* Brasileirão Standings */}
      {brasileirao.entries.length > 0 && (
        <div className="flex flex-col">
          <h3 className="font-montserrat font-black text-sm uppercase tracking-widest text-text mb-3 border-b-2 border-blue-600 pb-1 inline-block w-fit">
            {brasileirao.competition.name}
          </h3>
          <div className="bg-white border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className="max-h-[380px] overflow-y-auto">
              <table className="w-full text-[11px]">
                <thead className="sticky top-0 bg-gray-50 border-b border-border">
                  <tr className="text-[9px] uppercase tracking-wider text-gray-500 font-bold">
                    <th className="py-2 px-1.5 text-center">#</th>
                    <th className="py-2 px-1.5 text-left">Time</th>
                    <th className="py-2 px-1.5 text-center">P</th>
                    <th className="py-2 px-1.5 text-center">V</th>
                    <th className="py-2 px-1.5 text-center">E</th>
                    <th className="py-2 px-1.5 text-center">D</th>
                    <th className="py-2 px-1.5 text-center hidden sm:table-cell">SG</th>
                    <th className="py-2 px-1.5 text-center">Últ.</th>
                  </tr>
                </thead>
                <tbody>
                  {brasileirao.entries.map((entry) => (
                    <tr
                      key={entry.position}
                      className="border-b border-gray-100 last:border-none hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-1.5 px-1.5 text-center font-bold text-gray-400 text-[10px]">
                        {entry.position}
                      </td>
                      <td className="py-1.5 px-1.5">
                        <div className="flex items-center gap-1.5">
                          {entry.team.badge && (
                            <img
                              src={entry.team.badge}
                              alt=""
                              className="w-4 h-4 object-contain"
                            />
                          )}
                          <span className="font-semibold text-dark-bg truncate max-w-[80px]">
                            {entry.team.shortName}
                          </span>
                        </div>
                      </td>
                      <td className="py-1.5 px-1.5 text-center font-extrabold text-dark-bg">
                        {entry.points}
                      </td>
                      <td className="py-1.5 px-1.5 text-center text-gray-500">
                        {entry.wins}
                      </td>
                      <td className="py-1.5 px-1.5 text-center text-gray-500">
                        {entry.draws}
                      </td>
                      <td className="py-1.5 px-1.5 text-center text-gray-500">
                        {entry.losses}
                      </td>
                      <td className="py-1.5 px-1.5 text-center font-medium hidden sm:table-cell">
                        {entry.goalDifference > 0
                          ? `+${entry.goalDifference}`
                          : entry.goalDifference}
                      </td>
                      <td className="py-1.5 px-1.5">
                        <div className="flex gap-0.5 justify-center">
                          {entry.recentForm.slice(0, 3).map((f, i) => (
                            <span
                              key={i}
                              className={`inline-block w-3 h-3 rounded-[2px] text-[6px] font-bold flex items-center justify-center ${
                                f === "W"
                                  ? "bg-green-500 text-white"
                                  : f === "D"
                                    ? "bg-gray-300 text-gray-600"
                                    : "bg-red-500 text-white"
                              }`}
                            >
                              {f === "W" ? "V" : f === "D" ? "E" : "D"}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Ad Banner placeholder */}
      <div className="w-full h-[250px] bg-gray-50 border border-border flex items-center justify-center text-gray-300 text-xs font-bold uppercase tracking-widest">
        Publicidade
      </div>
    </aside>
  );
};

export default Sidebar;
