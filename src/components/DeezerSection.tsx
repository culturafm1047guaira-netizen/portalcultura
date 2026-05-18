import React from "react";
import { getDeezerCharts } from "@/lib/deezer";

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const DeezerSection = async () => {
  const { tracks, artists } = await getDeezerCharts();

  if (tracks.length === 0 && artists.length === 0) return null;

  return (
    <div className="mt-16 pt-12 border-t border-border">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="font-montserrat text-2xl font-black uppercase tracking-tight text-dark-bg">
          🎵 Top Música
        </h2>
        <div className="flex-1 border-b border-border" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tracks List */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-800 border border-border rounded-lg shadow-sm overflow-hidden">
            {tracks.map((track, i) => (
              <div
                key={track.id}
                className="flex items-center gap-3 p-3 border-b border-border last:border-none hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <span className="w-6 text-center text-[11px] font-black text-gray-400">
                  {i + 1}
                </span>
                <img
                  src={track.album.cover}
                  alt={track.album.title}
                  className="w-10 h-10 rounded object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-bold text-dark-bg dark:text-white truncate">
                    {track.title}
                  </p>
                  <p className="text-[11px] text-text-muted truncate">
                    {track.artist.name}
                  </p>
                </div>
                <span className="text-[10px] text-gray-400 font-mono">
                  {formatDuration(track.duration)}
                </span>
                {track.preview && (
                  <audio
                    controls
                    className="w-28 h-8"
                    preload="none"
                    controlsList="nodownload noplaybackrate"
                  >
                    <source src={track.preview} type="audio/mpeg" />
                  </audio>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Artists Sidebar */}
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
