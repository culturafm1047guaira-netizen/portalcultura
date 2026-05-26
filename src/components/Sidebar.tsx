import React from "react";
import { getWeatherData } from "@/lib/weather";
import { getQuotesData } from "@/lib/quotes";
import { getBrasileiraoData } from "@/lib/brasileirao";
import { getCryptoData } from "@/lib/coingecko";
import { getApod } from "@/lib/nasa";
import { getJoke } from "@/lib/joke";
import Image from "next/image";

const Sidebar = async () => {
  const [weather, quotes, brasileirao, crypto, apod, joke] = await Promise.allSettled([
    getWeatherData(),
    getQuotesData(),
    getBrasileiraoData(),
    getCryptoData(),
    getApod(),
    getJoke(),
  ]);

  const resolved = {
    weather: weather.status === 'fulfilled' ? weather.value : null,
    quotes: quotes.status === 'fulfilled' ? quotes.value : null,
    brasileirao: brasileirao.status === 'fulfilled' ? brasileirao.value : null,
    crypto: crypto.status === 'fulfilled' ? crypto.value : null,
    apod: apod.status === 'fulfilled' ? apod.value : null,
    joke: joke.status === 'fulfilled' ? joke.value : null,
  };

  if (!resolved.weather) return null;

  return (
    <aside className="flex flex-col gap-8 w-full">
      {/* Weather Widget */}
      <div className="flex flex-col">
        <h3 className="font-montserrat font-black text-sm uppercase tracking-widest text-text mb-3 border-b-2 border-primary pb-1 inline-block w-fit">
          Clima em Guaíra
        </h3>
        <div className="bg-gradient-to-br from-blue-500 to-sky-400 p-5 rounded-lg text-white shadow-md hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-white/80">Guaíra, SP</span>
            <span className="text-[11px] uppercase text-yellow-200 font-extrabold tracking-widest">{resolved.weather.condition}</span>
          </div>
          <div className="flex items-center gap-4 drop-shadow-sm">
            <div className="text-[48px] font-black leading-none tracking-tighter">
              {resolved.weather.temp}°
            </div>
            <svg className="w-10 h-10 text-yellow-300 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 4.25a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V5a.75.75 0 01.75-.75zm0 12a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM5 12a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 12zm14 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM7.05 7.05a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06L7.05 8.11a.75.75 0 010-1.06zm9.9 9.9a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM7.05 16.95a.75.75 0 010-1.06l1.06-1.06a.75.75 0 111.06 1.06l-1.06 1.06a.75.75 0 01-1.06 0zm9.9-9.9a.75.75 0 010 1.06l-1.06 1.06a.75.75 0 11-1.06-1.06l1.06-1.06a.75.75 0 011.06 0z" />
              <path d="M12 8.5A3.5 3.5 0 1012 15a3.5 3.5 0 000-7z" />
            </svg>
          </div>
          <div className="flex gap-6 text-[13px] font-bold text-white/90 mt-4 pt-4 border-t border-white/20">
            <span className="flex items-center gap-1"><span className="text-red-200">↑</span> {resolved.weather.max}°</span>
            <span className="flex items-center gap-1"><span className="text-blue-200">↓</span> {resolved.weather.min}°</span>
            <span className="text-[10px] text-white/70 ml-auto self-center tracking-widest">UMID: {resolved.weather.humidity}</span>
          </div>
          {/* Previsão 7 dias */}
          {resolved.weather.daily.length > 0 && (
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="text-[10px] font-bold uppercase tracking-wider text-white/70 mb-2">Previsão 7 dias</div>
              <div className="flex justify-between gap-1">
                {resolved.weather.daily.map((day, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                    <span className={`text-[9px] font-bold ${i === 0 ? "text-yellow-200" : "text-white/70"}`}>
                      {day.weekday}
                    </span>
                    <span className="text-sm">{day.icon}</span>
                    <span className="text-[10px] font-bold text-white">{day.tempMax}°</span>
                    <span className="text-[8px] text-white/60">{day.tempMin}°</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Ad Banner */}
      <div className="w-full h-[200px] bg-gradient-to-br from-primary to-primary-dark border border-border flex flex-col items-center justify-center gap-2 rounded-lg shadow-sm">
        <span className="text-white text-lg font-black uppercase tracking-[0.2em]">
          ANUNCIE AQUI
        </span>
        <span className="text-white/80 text-sm font-bold tracking-wider">
          (17) 3331-1177
        </span>
      </div>

      {/* Cryptocurrencies */}
      {resolved.crypto && resolved.crypto.length > 0 && (
        <div className="flex flex-col">
          <h3 className="font-montserrat font-black text-sm uppercase tracking-widest text-text mb-3 border-b-2 border-purple-600 pb-1 inline-block w-fit">
            Criptomoedas
          </h3>
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            {resolved.crypto.map((item, i) => (
              <div key={i} className="flex justify-between items-center py-2.5 border-b border-purple-100/50 last:border-none text-[13px]">
                <div className="flex items-center gap-2">
                  <Image src={item.image} alt={item.name} width={16} height={16} className="w-4 h-4 rounded-full" unoptimized />
                  <span className="text-purple-800/70 font-bold">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-purple-900">{item.priceBRL}</span>
                  <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${item.trend === "up" ? "bg-emerald-200 text-emerald-800" : item.trend === "down" ? "bg-red-200 text-red-800" : "bg-purple-100 text-purple-600"}`}>
                    {item.change24h}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Financial Quotes */}
      <div className="flex flex-col">
        <h3 className="font-montserrat font-black text-sm uppercase tracking-widest text-text mb-3 border-b-2 border-green-600 pb-1 inline-block w-fit">
          Financeiro
        </h3>
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          {resolved.quotes?.financial.map((item, i) => (
            <div key={i} className="flex justify-between items-center py-2.5 border-b border-emerald-100/50 last:border-none text-[13px]">
              <span className="text-emerald-800/70 font-bold">{item.label}</span>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-emerald-900">{item.val}</span>
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${item.trend === "up" ? "bg-emerald-200 text-emerald-800" : item.trend === "down" ? "bg-red-200 text-red-800" : "bg-emerald-100 text-emerald-600"}`}>
                  {item.change}
                </span>
              </div>
            </div>
          ))}
          {(!resolved.quotes || resolved.quotes.financial.length === 0) && (
            <span className="text-[12px] text-emerald-600/50">Indisponível</span>
          )}
        </div>
      </div>

      {/* Ad Banner */}
      <div className="w-full h-[200px] bg-gradient-to-br from-primary to-primary-dark border border-border flex flex-col items-center justify-center gap-2 rounded-lg shadow-sm">
        <span className="text-white text-lg font-black uppercase tracking-[0.2em]">
          ANUNCIE AQUI
        </span>
        <span className="text-white/80 text-sm font-bold tracking-wider">
          (17) 3331-1177
        </span>
      </div>

      {/* Commodities Quotes */}
      <div className="flex flex-col">
        <h3 className="font-montserrat font-black text-sm uppercase tracking-widest text-text mb-3 border-b-2 border-amber-600 pb-1 inline-block w-fit">
          Commodities
        </h3>
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-amber-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          {resolved.quotes?.commodities.map((item, i) => (
            <div key={i} className="flex justify-between items-center py-2.5 border-b border-amber-200/40 last:border-none text-[13px]">
              <span className="text-amber-900/60 font-bold">{item.label}</span>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-amber-950">{item.val}</span>
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${item.trend === "up" ? "bg-emerald-200 text-emerald-800" : item.trend === "down" ? "bg-red-200 text-red-800" : "bg-amber-200 text-amber-800"}`}>
                  {item.change}
                </span>
              </div>
            </div>
          ))}
          {(!resolved.quotes || resolved.quotes.commodities.length === 0) && (
            <span className="text-[12px] text-amber-600/50">Indisponível</span>
          )}
        </div>
      </div>
      
      {/* Brasileirão Standings */}
      {resolved.brasileirao && resolved.brasileirao.entries.length > 0 && (
        <div className="flex flex-col">
          <h3 className="font-montserrat font-black text-sm uppercase tracking-widest text-text mb-3 border-b-2 border-blue-600 pb-1 inline-block w-fit">
            {resolved.brasileirao.competition.name}
          </h3>
          <div className="bg-white dark:bg-slate-800 border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className="max-h-[380px] overflow-y-auto">
              <table className="w-full text-[11px]">
                <thead className="sticky top-0 bg-gray-50 dark:bg-slate-700 border-b border-border">
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
                  {resolved.brasileirao.entries.map((entry) => (
                    <tr
                      key={entry.position}
                      className="border-b border-gray-100 dark:border-slate-700 last:border-none hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                    >
                      <td className="py-1.5 px-1.5 text-center font-bold text-gray-400 text-[10px]">
                        {entry.position}
                      </td>
                      <td className="py-1.5 px-1.5">
                        <div className="flex items-center gap-1.5">
                          {entry.team.badge && (
                            <Image
                              src={entry.team.badge}
                              alt={entry.team.shortName || ""}
                              width={16}
                              height={16}
                              className="w-4 h-4 object-contain"
                              unoptimized
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

      {/* NASA APOD */}
      {resolved.apod && (
        <div className="flex flex-col">
          <h3 className="font-montserrat font-black text-sm uppercase tracking-widest text-text mb-3 border-b-2 border-indigo-600 pb-1 inline-block w-fit">
            Astro do Dia 🚀
          </h3>
          <div className="bg-white dark:bg-slate-800 border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            {resolved.apod.url && (
              <div className="relative w-full aspect-video overflow-hidden">
                <Image
                  src={resolved.apod.url}
                  alt={resolved.apod.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}
            <div className="p-3">
              <h4 className="font-montserrat font-bold text-[12px] text-dark-bg dark:text-white mb-1 leading-tight">
                {resolved.apod.title}
              </h4>
              <p className="text-[10px] text-gray-500 leading-relaxed line-clamp-3">
                {resolved.apod.explanation}
              </p>
              {resolved.apod.copyright && (
                <span className="text-[8px] text-gray-400 mt-1 block">
                  © {resolved.apod.copyright}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Ad Banner */}
      <div className="w-full h-[200px] bg-gradient-to-br from-primary to-primary-dark border border-border flex flex-col items-center justify-center gap-2 rounded-lg shadow-sm">
        <span className="text-white text-lg font-black uppercase tracking-[0.2em]">
          ANUNCIE AQUI
        </span>
        <span className="text-white/80 text-sm font-bold tracking-wider">
          (17) 3331-1177
        </span>
      </div>

      {/* Piada do Dia */}
      {resolved.joke && (
        <div className="flex flex-col">
          <h3 className="font-montserrat font-black text-sm uppercase tracking-widest text-text mb-3 border-b-2 border-yellow-500 pb-1 inline-block w-fit">
            Piada do Dia 😄
          </h3>
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <p className="text-[13px] font-medium text-yellow-900 leading-relaxed">
              {resolved.joke.setup}
            </p>
            {resolved.joke.punchline && (
              <p className="text-[13px] font-extrabold text-yellow-800 mt-2 italic">
                {resolved.joke.punchline}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Ad Banner placeholder */}
      <div className="w-full h-[250px] bg-gradient-to-br from-primary to-primary-dark border border-border flex flex-col items-center justify-center gap-2 rounded-lg shadow-sm">
        <span className="text-white text-lg font-black uppercase tracking-[0.2em]">
          ANUNCIE AQUI
        </span>
        <span className="text-white/80 text-sm font-bold tracking-wider">
          (17) 3331-1177
        </span>
      </div>
    </aside>
  );
};

export default Sidebar;
