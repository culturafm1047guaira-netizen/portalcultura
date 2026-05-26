import React from "react";

const PAGE_URL = encodeURIComponent("https://www.facebook.com/radioculturadeguaira/");

const FacebookEmbed = () => {
  return (
    <div className="w-full overflow-hidden rounded-sm border border-border">
      <iframe
        src={`https://www.facebook.com/plugins/page.php?href=${PAGE_URL}&tabs=timeline&width=340&height=700&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`}
        width="100%"
        height="700"
        style={{ border: "none", overflow: "hidden" }}
        scrolling="no"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        title="Facebook Rádio Cultura"
      />
    </div>
  );
};

export default FacebookEmbed;
