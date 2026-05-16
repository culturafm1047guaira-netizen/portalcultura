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

// Sources that are known to NOT include images in their RSS feed
const SOURCES_NEEDING_OG_IMAGE = ['O Diário Online', 'Guaira News'];

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

async function fetchOpenGraphImage(url: string): Promise<string | null> {
  if (!url || url === "#") return null;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
    });
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

/** Enrich news items that are missing images by fetching og:image from article page.
 *  Processes items in batches to avoid overwhelming servers. */
async function enrichWithOgImages(newsItems: any[]): Promise<any[]> {
  const BATCH_SIZE = 5;
  const enriched = [...newsItems];

  // Collect indices of items that need enrichment
  const needsEnrichment: number[] = [];
  for (let i = 0; i < enriched.length; i++) {
    if (!enriched[i].image) {
      needsEnrichment.push(i);
    }
  }

  // Process in batches
  for (let batchStart = 0; batchStart < needsEnrichment.length; batchStart += BATCH_SIZE) {
    const batch = needsEnrichment.slice(batchStart, batchStart + BATCH_SIZE);
    const results = await Promise.allSettled(
      batch.map(idx => fetchOpenGraphImage(enriched[idx].link))
    );
    results.forEach((result, j) => {
      if (result.status === 'fulfilled' && result.value) {
        enriched[batch[j]].image = result.value;
      }
    });
  }

  return enriched;
}

export async function getNews() {
  const results = await Promise.allSettled(
    FEEDS.map(async (feed) => {
      try {
        const data = await parser.parseURL(feed.url);
        const items = (data.items || []).slice(0, 10).map(item => {
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

        // For sources that never include images in RSS, immediately try og:image
        if (SOURCES_NEEDING_OG_IMAGE.includes(feed.source)) {
          const enrichedItems = await Promise.allSettled(
            items.slice(0, 6).map(async (news) => {
              if (!news.image) {
                const ogImg = await fetchOpenGraphImage(news.link);
                if (ogImg) news.image = ogImg;
              }
              return news;
            })
          );
          const finalItems = enrichedItems.map(r =>
            r.status === 'fulfilled' ? r.value : null
          ).filter(Boolean);
          // Append remaining items that weren't enriched
          return [...finalItems, ...items.slice(6)];
        }

        return items;
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

  // Enrich remaining top news that still have no image (catches any source)
  const topSlice = sortedNews.slice(0, 20);
  const restSlice = sortedNews.slice(20);
  const enrichedTop = await enrichWithOgImages(topSlice);

  return [...enrichedTop, ...restSlice];
}
