import React from "react";

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "BroadcastService"],
    name: "Rádio Cultura FM 104.7",
    alternateName: "Rádio Cultura de Guaíra",
    url: "https://radioculturaguaira.com.br/",
    logo: "https://radioculturaguaira.com.br/img/logo_oficial.png",
    image: "https://radioculturaguaira.com.br/img/og-image.png",
    sameAs: [
      "https://www.facebook.com/radioculturadeguaira/",
      "https://www.instagram.com/radioculturafm1047/",
    ],
    broadcastFrequency: { "@type": "BroadcastFrequencySpecification", frequency: "104.7", broadcastFrequencyValue: "104.7" },
    areaServed: { "@type": "City", name: "Guaíra", state: "SP" },
    address: { "@type": "PostalAddress", addressLocality: "Guaíra", addressRegion: "SP" },
    phone: "+551733311177",
    email: "contato@radioculturaguaira.com.br",
    foundingDate: "2000",
    description: "Rádio Cultura FM 104.7 — Portal de Notícias de Guaíra, SP. Últimas notícias de Regional, Brasil, Esportes, Saúde, Educação e Justiça. Ouça ao vivo!",
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://radioculturaguaira.com.br/",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://radioculturaguaira.com.br/busca?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function NewsArticleSchema({ news }: { news: { title: string; excerpt: string; image: string | null; pubDate: string; link: string; category: string; source: string } }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: news.title,
    description: news.excerpt,
    datePublished: news.pubDate,
    dateModified: news.pubDate,
    image: news.image || "https://radioculturaguaira.com.br/img/og-image.png",
    author: { "@type": "Organization", name: news.source },
    publisher: { "@type": "Organization", name: "Rádio Cultura FM 104.7", logo: { "@type": "ImageObject", url: "https://radioculturaguaira.com.br/img/logo_oficial.png" } },
    mainEntityOfPage: { "@type": "WebPage", "@id": news.link },
    articleSection: news.category,
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
