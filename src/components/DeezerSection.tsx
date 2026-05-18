import React from "react";
import { getDeezerCharts } from "@/lib/deezer";

const DeezerSection = async () => {
  const { artists } = await getDeezerCharts();

  if (artists.length === 0) return null;

  return (
    <div className="mt-16 pt-12 border-t border-border">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="font-montserrat text-2xl font-black uppercase tracking-tight text-dark-bg">
          🎵 Top Música
        </h2>
        <div className="flex-1 border-b border-border" />
      </div>

      <div className="max-w-xl">
        {/* Artists */}
        {artists.length > 0 && (
          <div>
            <h3 className="font-montserrat font-black text-xs uppercase tracking-widest text-text mb-4 border-b-2 border-primary pb-1 inline-block w-fit">
              Artistas em Alta
            </h3>
            <div className="flex flex-col gap-3">
              {artists.slice(0, 5).map((artist) => (
                <div
                  key={artist.id}
                  className="flex items-center gap-3 p-2.5 bg-white dark:bg-slate-800 border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <img
                    src={artist.picture}
                    alt={artist.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-bold text-dark-bg dark:text-white truncate">
                      {artist.name}
                    </p>
                    <p className="text-[10px] text-text-muted">
                      {artist.nb_fan.toLocaleString("pt-BR")} fãs
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeezerSection;
