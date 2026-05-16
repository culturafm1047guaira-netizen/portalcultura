"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * FacebookFeed — Embeds the Radio Cultura Facebook page timeline
 * using the official Facebook Page Plugin (iframe approach).
 * This is the only free, reliable method since RSS.app trial expired.
 */
const FacebookFeed = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(320);

  useEffect(() => {
    // Measure container width for responsive iframe
    const updateWidth = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        // Facebook plugin min=180, max=500
        setWidth(Math.min(500, Math.max(180, w - 2)));
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const pageUrl = encodeURIComponent("https://www.facebook.com/radioculturadeguaira/");

  return (
    <div className="flex flex-col" id="facebook-feed-section">
      <h3 className="font-montserrat font-black text-sm uppercase tracking-widest text-text mb-3 border-b-2 border-[#1877F2] pb-1 inline-block w-fit">
        Facebook
      </h3>
      <div
        ref={containerRef}
        className="bg-white border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
      >
        <iframe
          src={`https://www.facebook.com/plugins/page.php?href=${pageUrl}&tabs=timeline&width=${width}&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`}
          width={width}
          height={500}
          style={{ border: "none", overflow: "hidden", maxWidth: "100%" }}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          title="Facebook Rádio Cultura FM 104.7"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default FacebookFeed;
