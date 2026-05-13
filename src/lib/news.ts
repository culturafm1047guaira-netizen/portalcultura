import Parser from "rss-parser";

type FeedItem = {
  title?: string;
  link?: string;
  pubDate?: string;
  description?: string;
  content?: string;
  enclosure?: { link?: string; type?: string };
  mediaContent?: { $?: { url?: string } };
  mediaThumbnail?: { $?: { url?: string } };
};

const parser = new Parser<Record<string, unknown>, FeedItem>({
  timeout: 10000,
  customFields: {
    item: [
      ["media:content", "mediaContent"],
      ["media:thumbnail", "mediaThumbnail"],
      ["content:encoded", "contentEncoded"],
    ],
  },
});

function extractImage(item: any): string | null {
  const html = item.contentEncoded || item.content || item.description || "";

  // 1. <img src=""> (aspas duplas ou simples)
  const imgDq = html.match(/<img[^>]+src="([^">?]+)/);
  if (imgDq && !imgDq[1].includes('feedburner')) return imgDq[1];
  
  const imgSq = html.match(/<img[^>]+src='([^'>?]+)/);
  if (imgSq && !imgSq[1].includes('feedburner')) return imgSq[1];

  // 2. media:content como campo RSS (G1 e outros)
  if (item.mediaContent) {
    if (Array.isArray(item.mediaContent)) {
      const img = item.mediaContent.find((m: any) => m.$?.type?.includes('image') || m.$?.url);
      if (img?.$?.url) return img.$.url;
    } else if (item.mediaContent?.$?.url) {
      return item.mediaContent.$.url;
    }
  }

  // 3. media:thumbnail como campo RSS
  if (item.mediaThumbnail?.$?.url) return item.mediaThumbnail.$.url;

  // 4. enclosure
  if (item.enclosure?.link) return item.enclosure.link;

  // 5. Tenta extrair de padrões específicos dentro do HTML
  const mediaUrl = html.match(/url="([^">]+)"/);
  if (mediaUrl && mediaUrl[1].match(/\.(jpg|jpeg|png|webp|gif)/i)) return mediaUrl[1];

  return null;
}

const FEEDS = [
  { url: 'https://g1.globo.com/rss/g1/sp/ribeirao-preto-franca/', source: 'G1 Ribeirão', category: 'Regional' },
  { url: 'https://g1.globo.com/rss/g1/', source: 'G1', category: 'Brasil' },
  { url: 'https://agenciabrasil.ebc.com.br/rss/educacao/feed.xml', source: 'Agência Brasil', category: 'Educação' },
  { url: 'https://agenciabrasil.ebc.com.br/rss/esportes/feed.xml', source: 'Agência Brasil', category: 'Esportes' },
  { url: 'https://agenciabrasil.ebc.com.br/rss/justica/feed.xml', source: 'Agência Brasil', category: 'Justiça' },
  { url: 'https://agenciabrasil.ebc.com.br/rss/saude/feed.xml', source: 'Agência Brasil', category: 'Saúde' },
  { url: 'https://www.acidadeon.com/ribeiraopreto/feed/', source: 'ACidade ON', category: 'Regional' },
  { url: 'https://jovempan.com.br/feed/', source: 'Jovem Pan', category: 'Brasil' },
  { url: 'https://www.jornaldebarretos.com.br/feed', source: 'Jornal de Barretos', category: 'Regional' },
  { url: 'https://www.odiarioonline.com.br/feed', source: 'O Diário Online', category: 'Regional' },
  { url: 'https://www.guairanews.com/feed/', source: 'Guaira News', category: 'Regional' },
];

export async function getNews() {
  const results = await Promise.allSettled(
    FEEDS.map(async (feed) => {
      try {
        const data = await parser.parseURL(feed.url);
        return (data.items || []).slice(0, 6).map(item => {
          return {
            title: item.title || "",
            link: item.link || "#",
            image: extractImage(item),
            excerpt: (item.description || "").replace(/<[^>]*>/g, "").substring(0, 160),
            pubDate: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
            source: feed.source,
            category: feed.category
          };
        });
      } catch (e) {
        return [];
      }
    })
  );

  let allNews: any[] = [];
  results.forEach(r => {
    if (r.status === "fulfilled") {
      allNews = allNews.concat(r.value);
    }
  });
  
  return allNews.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
}
