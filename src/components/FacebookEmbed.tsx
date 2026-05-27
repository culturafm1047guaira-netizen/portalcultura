import React from "react";

const PAGE_URL = encodeURIComponent("https://www.facebook.com/radioculturadeguaira/");

const FacebookEmbed = () => {
  return (
    <div className="bg-white dark:bg-slate-800 border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-gradient-to-r from-blue-50 to-sky-50 dark:from-slate-700 dark:to-slate-700">
        <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white text-sm font-bold shrink-0">
          f
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-montserrat font-bold text-sm text-dark-bg dark:text-white truncate">
            Facebook Rádio Cultura
          </h3>
          <p className="text-[11px] text-text-muted truncate">
            @radioculturadeguaira
          </p>
        </div>
        <a
          href="https://www.facebook.com/radioculturadeguaira/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] font-bold text-blue-600 hover:text-blue-700 hover:underline whitespace-nowrap shrink-0"
        >
          Seguir →
        </a>
      </div>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/80 dark:to-slate-800/80 pointer-events-none z-10" />
        <iframe
          src={`https://www.facebook.com/plugins/page.php?href=${PAGE_URL}&tabs=timeline&width=340&height=600&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true`}
          width="100%"
          height="600"
          style={{ border: "none", overflow: "hidden" }}
          scrolling="no"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          title="Facebook Rádio Cultura"
          className="w-full"
        />
      </div>
      <div className="px-5 py-3 border-t border-border bg-gray-50 dark:bg-slate-700/50 text-center">
        <a
          href="https://www.facebook.com/radioculturadeguaira/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[12px] font-bold text-blue-600 hover:text-blue-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Acompanhe a Rádio Cultura no Facebook
        </a>
      </div>
    </div>
  );
};

export default FacebookEmbed;
