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
  const imgDq = html.match(/<img[^>]+src="([^">]+)"/);
  if (imgDq && !imgDq[1].includes('feedburner')) return imgDq[1].replace(/&amp;/g, '&');
  
  const imgSq = html.match(/<img[^>]+src='([^'>]+)'/);
  if (imgSq && !imgSq[1].includes('feedburner')) return imgSq[1].replace(/&amp;/g, '&');

  // 2. media:content como campo RSS (G1 e outros)
  if (item.mediaContent) {
    if (Array.isArray(item.mediaContent)) {
      const img = item.mediaContent.find((m: any) => m.$?.type?.includes('image') || m.$?.url);
      if (img?.$?.url) return img.$.url.replace(/&amp;/g, '&');
    } else if (item.mediaContent?.$?.url) {
      return item.mediaContent.$.url.replace(/&amp;/g, '&');
    }
  }

  // 3. media:thumbnail como campo RSS
  if (item.mediaThumbnail?.$?.url) return item.mediaThumbnail.$.url.replace(/&amp;/g, '&');

  // 4. enclosure
  if (item.enclosure?.link) return item.enclosure.link.replace(/&amp;/g, '&');

  // 5. Tenta extrair de padrões específicos do rss.app / facebook
  const rssAppImg = html.match(/<img[^>]+src="([^">]+rss\.app[^">]+)"/);
  if (rssAppImg) return rssAppImg[1].replace(/&amp;/g, '&');

  // 6. Tenta extrair qualquer imagem que não seja de rastreamento
  const anyImg = html.match(/<img[^>]+src="([^">]+\.(jpg|jpeg|png|webp|gif)[^">]*)"/i);
  if (anyImg && !anyImg[1].includes('analytics') && !anyImg[1].includes('tracking')) return anyImg[1].replace(/&amp;/g, '&');

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
  { url: 'https://rss.app/feeds/2LAuSQwLtjvj9B5C.xml', source: 'Facebook', category: 'Facebook' },
];

async function fetchOpenGraphImage(url: string): Promise<string | null> {
  if (!url || url === "#") return null;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000); // 20s timeout
    const response = await fetch(url, { signal: controller.signal });
    const html = await response.text();
    clearTimeout(timeout);
    
    const ogImage = html.match(/<meta[^>]+property="og:image"[^>]+content="([^">]+)"/i) ||
                    html.match(/<meta[^>]+content="([^">]+)"[^>]+property="og:image"/i);
    
    if (ogImage && ogImage[1]) {
      // Decode entities if any
      return ogImage[1].replace(/&amp;/g, '&');
    }
    return null;
  } catch (e) {
    return null;
  }
}

export async function getNews() {
  const results = await Promise.allSettled(
    FEEDS.map(async (feed) => {
      try {
        const data = await parser.parseURL(feed.url);
        return (data.items || []).slice(0, 10).map(item => {
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
  
  const sortedNews = allNews.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  // Enrich top news that are missing images (limit to top 15 to avoid slow loading)
  const enrichedNews = await Promise.all(
    sortedNews.slice(0, 15).map(async (news) => {
      if (!news.image) {
        const ogImg = await fetchOpenGraphImage(news.link);
        if (ogImg) news.image = ogImg;
      }
      return news;
    })
  );

  // Return enriched top news + rest of news
  return [...enrichedNews, ...sortedNews.slice(15)];
}
