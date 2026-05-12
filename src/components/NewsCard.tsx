import React from "react";
import Image from "next/image";

interface NewsCardProps {
  title: string;
  excerpt: string;
  image?: string | null;
  link: string;
  source: string;
  category: string;
  pubDate: string;
}

const NewsCard = ({ title, excerpt, image, link, source, category, pubDate }: NewsCardProps) => {
  const formattedDate = new Date(pubDate).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
  });

  return (
    <a 
      href={link} 
      target="_blank" 
      rel="noopener"
      className="group bg-card-bg border border-border rounded-xl overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-primary-light"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-[#f0ede6] shrink-0">
        {image ? (
          <Image 
            src={image} 
            alt={title}
            fill
            style={{ objectFit: "cover" }}
            className="transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-black/10 font-bold uppercase text-[10px] tracking-widest p-4 text-center">
            {title}
          </div>
        )}
        <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-extrabold px-2.5 py-1 rounded uppercase tracking-wider z-10 shadow-lg">
          {category}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1 gap-1.5">
        <h3 className="font-montserrat text-[15px] font-extrabold leading-snug text-text group-hover:text-primary transition-colors line-clamp-3">
          {title}
        </h3>
        <p className="text-[13px] text-text-muted line-clamp-2 leading-relaxed">
          {excerpt}
        </p>
        
        <div className="mt-auto pt-3 flex flex-col gap-0.5">
          <span className="text-[10px] font-extrabold text-primary uppercase tracking-wider">
            {source}
          </span>
          <time className="text-[11px] text-gray-500 italic">
            {formattedDate}
          </time>
        </div>
      </div>
    </a>
  );
};

export default NewsCard;
