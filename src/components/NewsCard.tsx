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
  compact?: boolean; // Permite layout de lista lateral
}

const NewsCard = ({ title, excerpt, image, link, source, category, pubDate, compact = false }: NewsCardProps) => {
  const formattedDate = new Date(pubDate).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Decide cor da categoria
  let catColor = "var(--color-primary)";
  const lowerCat = category.toLowerCase();
  if (lowerCat.includes("brasil")) catColor = "var(--color-cat-brasil)";
  if (lowerCat.includes("esporte")) catColor = "var(--color-cat-esportes)";
  if (lowerCat.includes("regi")) catColor = "var(--color-cat-regional)";

  if (compact) {
    return (
      <a href={link} target="_blank" rel="noopener" className="group flex gap-4 py-4 border-editorial">
        {image && (
          <div className="relative w-24 h-24 shrink-0 overflow-hidden bg-gray-100 rounded-sm">
            <Image src={image} alt={title} fill style={{ objectFit: "cover" }} className="transition-transform duration-500 group-hover:scale-110" />
          </div>
        )}
        <div className="flex flex-col flex-1">
          <span className="text-[10px] font-extrabold uppercase tracking-widest mb-1" style={{ color: catColor }}>
            {category}
          </span>
          <h3 className="font-montserrat text-[14px] font-bold leading-snug text-text group-hover:text-primary transition-colors line-clamp-3">
            {title}
          </h3>
          <span className="text-[10px] text-gray-400 mt-auto pt-2 font-medium">Há {formattedDate} • {source}</span>
        </div>
      </a>
    );
  }

  return (
    <a href={link} target="_blank" rel="noopener" className="group flex flex-col h-full pb-6">
      {image && (
        <div className="relative aspect-video w-full overflow-hidden bg-gray-100 mb-3 rounded-sm">
          <Image src={image} alt={title} fill style={{ objectFit: "cover" }} className="transition-transform duration-500 group-hover:scale-105" />
        </div>
      )}
      <div className="flex flex-col flex-1">
        <span className="text-[10px] font-extrabold uppercase tracking-widest mb-1.5" style={{ color: catColor }}>
          {category}
        </span>
        <h3 className="font-montserrat text-lg font-bold leading-tight text-text group-hover:text-primary transition-colors line-clamp-3">
          {title}
        </h3>
        <p className="text-[13px] text-text-muted line-clamp-2 leading-relaxed mt-2">
          {excerpt}
        </p>
        <span className="text-[11px] text-gray-400 mt-auto pt-3 font-medium uppercase tracking-wider">{source}</span>
      </div>
    </a>
  );
};

export default NewsCard;
