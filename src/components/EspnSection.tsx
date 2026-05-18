import React from "react";
import { getBrasileiraoScores } from "@/lib/espn";

const statusLabels: Record<string, string> = {
  Scheduled: "Agendado",
  "In Progress": "Ao Vivo",
  Halftime: "Intervalo",
  "Full Time": "Finalizado",
  Final: "Finalizado",
  Ended: "Encerrado",
  Postponed: "Adiado",
  Cancelled: "Cancelado",
  Delayed: "Atrasado",
  Rain: "Suspenso (Chuva)",
};

const EspnSection = async () => {
  const matches = await getBrasileiraoScores();

  if (matches.length === 0) return null;

  return (
    <div className="pt-12 border-t border-border">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="font-montserrat text-2xl font-black uppercase tracking-tight text-dark-bg">
          ⚽ Jogos do Brasileirão
        </h2>
        <div className="flex-1 border-b border-border" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {matches.map((match) => {
          const hasScore =
            match.homeTeam.score !== undefined &&
            match.awayTeam.score !== undefined;

          return (
            <div
              key={match.id}
              className="bg-white dark:bg-slate-800 border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                  {statusLabels[match.status] || match.status}
                </span>
                <span className="text-[9px] text-gray-400">
                  {new Date(match.date).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                  })}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                {/* Away Team */}
                <div className="flex flex-col items-center flex-1 min-w-0">
                  {match.awayTeam.logo && (
                    <img
                      src={match.awayTeam.logo}
                      alt={match.awayTeam.name}
                      className="w-8 h-8 object-contain mb-1"
                    />
                  )}
                  <span className="text-[11px] font-bold text-dark-bg dark:text-white text-center truncate w-full">
                    {match.awayTeam.name}
                  </span>
                </div>

                {/* Score */}
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`text-xl font-black ${
                      hasScore
                        ? "text-dark-bg dark:text-white"
                        : "text-gray-300"
                    }`}
                  >
                    {hasScore ? match.awayTeam.score : "-"}
                  </span>
                  <span className="text-lg font-black text-gray-300">×</span>
                  <span
                    className={`text-xl font-black ${
                      hasScore
                        ? "text-dark-bg dark:text-white"
                        : "text-gray-300"
                    }`}
                  >
                    {hasScore ? match.homeTeam.score : "-"}
                  </span>
                </div>

                {/* Home Team */}
                <div className="flex flex-col items-center flex-1 min-w-0">
                  {match.homeTeam.logo && (
                    <img
                      src={match.homeTeam.logo}
                      alt={match.homeTeam.name}
                      className="w-8 h-8 object-contain mb-1"
                    />
                  )}
                  <span className="text-[11px] font-bold text-dark-bg dark:text-white text-center truncate w-full">
                    {match.homeTeam.name}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EspnSection;
