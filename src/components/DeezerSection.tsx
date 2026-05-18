import React from "react";
import { getDeezerCharts } from "@/lib/deezer";

const DeezerSection = async () => {
  const { artists } = await getDeezerCharts();

  if (artists.length === 0) return null;

  return (
    <div className="pt-12 border-t border-border">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="font-montserrat text-2xl font-black uppercase tracking-tight text-dark-bg">
          🎵 Top Música
        </h2>
        <div className="flex-1 border-b border-border" />
      </div>

      {artists.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {artists.slice(0, 5).map((artist) => (
            <div
              key={artist.id}
              className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-slate-800 border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-square w-full overflow-hidden rounded-lg">
                <img
                  src={artist.picture}
                  alt={artist.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[12px] font-bold text-dark-bg dark:text-white text-center leading-tight">
                {artist.name}
              </p>
              <p className="text-[9px] text-text-muted font-semibold -mt-1">
                {artist.nb_fan.toLocaleString("pt-BR")} fãs
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeezerSection;
