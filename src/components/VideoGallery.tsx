import React from "react";
import { getLatestVideos } from "@/lib/youtube";

const VideoGallery = async () => {
  const videos = await getLatestVideos();

  return (
    <div className="w-full mb-16 min-w-0">
      <div className="flex items-end justify-between gap-4 mb-6">
        <h2 className="section-heading font-montserrat text-2xl font-black uppercase tracking-tight text-primary">
          Vídeos da Rádio
        </h2>
        <a
          href="https://youtube.com/@culturafmguaira-sp"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] font-bold text-red-600 hover:text-red-700 transition-all uppercase tracking-wider whitespace-nowrap"
        >
          Ver canal no YouTube →
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div key={video.id} className="group flex flex-col gap-3 min-w-0">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 border border-border shadow-sm group-hover:shadow-md transition-all duration-300">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${video.id}?rel=0`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>
            <h3 className="font-montserrat text-sm font-bold text-dark-bg line-clamp-2 leading-snug group-hover:text-primary transition-colors">
              {video.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGallery;
