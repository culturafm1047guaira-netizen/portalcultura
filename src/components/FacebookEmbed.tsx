import React from "react";
import Image from "next/image";

const PAGE_URL = "https://www.facebook.com/radioculturadeguaira/";
const PAGE_NAME = "Rádio Cultura FM 104.7";

const POSTS = [
  {
    message: "Acompanhe a programação da Rádio Cultura FM 104.7 e fique por dentro de tudo que acontece em Guaíra e região!",
    image: "https://placehold.co/800x450/1877F2/ffffff?text=R%C3%A1dio+Cultura+FM",
    url: PAGE_URL,
  },
  {
    message: "Notícias, música, esporte e entretenimento. A Rádio Cultura é a sua companhia de todos os dias!",
    image: "https://placehold.co/800x450/1877F2/ffffff?text=Cultura+FM",
    url: PAGE_URL,
  },
  {
    message: "Siga nosso Facebook e ative as notificações para não perder nenhum conteúdo especial!",
    image: "https://placehold.co/800x450/1877F2/ffffff?text=Siga+%F0%9F%91%8D",
    url: PAGE_URL,
  },
];

const FacebookEmbed = () => {
  return (
    <div className="w-full space-y-6">
      {/* Featured card */}
      <a
        href={PAGE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col h-full pb-6"
      >
        <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-slate-700 mb-3 rounded-sm">
          <Image
            src="https://placehold.co/800x450/1877F2/ffffff?text=Facebook+R%C3%A1dio+Cultura"
            alt="Facebook Rádio Cultura"
            fill
            style={{ objectFit: "cover" }}
            className="transition-transform duration-[700ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col flex-1">
          <span className="text-[10px] font-extrabold uppercase tracking-widest mb-1.5" style={{ color: "#1877F2" }}>
            Facebook Rádio Cultura
          </span>
          <h3 className="font-montserrat text-lg font-bold leading-tight text-text group-hover:text-[#1877F2] transition-colors line-clamp-3">
            {PAGE_NAME}
          </h3>
          <p className="text-[13px] text-text-muted line-clamp-2 leading-relaxed mt-2">
            Acompanhe a Rádio Cultura FM 104.7 no Facebook e fique por dentro de notícias, programação e eventos de Guaíra-SP e região.
          </p>
          <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50 dark:border-slate-700">
            <span className="flex items-center gap-1.5 text-[11px] font-bold tracking-wide text-[#1877F2] bg-[#1877F2]/10 dark:bg-[#1877F2]/20 px-3 py-1.5 rounded-full transition-all group-hover:bg-[#1877F2] group-hover:text-white">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Seguir página
            </span>
          </div>
        </div>
      </a>

      {/* Recent posts */}
      <div className="space-y-3">
        <h4 className="font-montserrat font-bold text-xs uppercase tracking-widest text-text-muted">
          Publicações recentes
        </h4>
        <div className="grid grid-cols-1 gap-3">
          {POSTS.map((post, i) => (
            <a
              key={i}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex gap-3 items-start p-3 rounded-lg border border-border hover:border-[#1877F2]/30 hover:bg-[#1877F2]/5 dark:hover:bg-[#1877F2]/10 transition-all"
            >
              <div className="relative w-14 h-14 shrink-0 overflow-hidden rounded-sm bg-gray-100 dark:bg-slate-700">
                <Image
                  src={post.image}
                  alt=""
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] leading-snug text-text line-clamp-2 group-hover:text-[#1877F2] transition-colors">
                  {post.message}
                </p>
                <span className="text-[10px] text-text-muted mt-1 block font-medium">
                  facebook.com/radioculturadeguaira
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacebookEmbed;
