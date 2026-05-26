import Parser from "rss-parser";
import { getNewsAPIData } from "./newsapi";

export type NewsItem = {
  title: string;
  link: string;
  image: string | null;
  excerpt: string;
  pubDate: string;
  source: string;
  category: string;
};

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

function extractImage(item: FeedItem | Record<string, any>): string | null {
  const anyItem = item as any;
  const html = anyItem.contentEncoded || anyItem.content || anyItem.description || "";

  // 1. <img src=""> (aspas duplas ou simples)
  const imgDq = html.match(/<img[^>]+src="([^">]+)"/);
  if (imgDq && !imgDq[1].includes('feedburner')) return imgDq[1].replace(/&amp;/g, '&');
  
  const imgSq = html.match(/<img[^>]+src='([^'>]+)'/);
  if (imgSq && !imgSq[1].includes('feedburner')) return imgSq[1].replace(/&amp;/g, '&');

  // 2. media:content como campo RSS (G1 e outros)
  if (item.mediaContent) {
    if (Array.isArray(item.mediaContent)) {
      const img = item.mediaContent.find((m: Record<string, any>) => m.$?.type?.includes('image') || m.$?.url);
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
  { url: 'https://rss.app/feeds/7ZNpqqsngFaNsVtF.xml', source: 'Facebook Rádio Cultura', category: 'Facebook' },
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
async function enrichWithOgImages(newsItems: NewsItem[]): Promise<NewsItem[]> {
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

async function fetchFacebookGraphAPI(): Promise<NewsItem[]> {
  const pageId = process.env.FACEBOOK_PAGE_ID;
  const token = process.env.FACEBOOK_ACCESS_TOKEN;

  if (!pageId || !token) return [];

  try {
    const url = `https://graph.facebook.com/v19.0/${pageId}/posts?fields=message,created_time,full_picture,permalink_url&access_token=${token}&limit=3`;
    const res = await fetch(url, { next: { revalidate: 1800 } });
    if (!res.ok) return [];
    
    const data = await res.json();
    if (!data || !data.data) return [];

    const items: NewsItem[] = data.data.map((post: Record<string, any>) => {
      const message = post.message || 'Acompanhe as novidades na página da Rádio Cultura FM 104.7!';
      const excerpt = message.length > 120 ? message.substring(0, 120) + '...' : message;
      // Define a title based on the first line or a default
      let title = message.split('\n')[0].trim();
      if (title.length > 80) title = title.substring(0, 80) + '...';

      return {
        title: title || 'Postagem da Rádio Cultura',
        link: post.permalink_url || `https://facebook.com/${pageId}`,
        image: post.full_picture || '/img/placeholder-news.jpg', // Replace with a default placeholder if needed
        excerpt: excerpt,
        pubDate: post.created_time || new Date().toISOString(),
        source: 'Facebook Rádio Cultura',
        category: 'Facebook'
      };
    });
    
    return items;
  } catch {
    return [];
  }
}

export async function getNews(): Promise<NewsItem[]> {
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
          ).filter((item): item is NewsItem => item !== null);
          // Append remaining items that weren't enriched
          return [...finalItems, ...items.slice(6)];
        }

        return items;
      } catch (e) {
        return [];
      }
    })
  );

  let allNews: NewsItem[] = [];
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

  let finalNewsList = [...enrichedTop, ...restSlice];

  // Fallback de imagem para itens sem foto
  const PLACEHOLDER_BY_CATEGORY: Record<string, string> = {
    Regional: "https://placehold.co/800x450/0066cc/ffffff?text=Regional",
    Brasil: "https://placehold.co/800x450/008000/ffffff?text=Brasil",
    Esportes: "https://placehold.co/800x450/00a000/ffffff?text=Esportes",
    Educação: "https://placehold.co/800x450/e67300/ffffff?text=Educação",
    Saúde: "https://placehold.co/800x450/cc0066/ffffff?text=Saúde",
    Justiça: "https://placehold.co/800x450/6600cc/ffffff?text=Justiça",
    Facebook: "https://placehold.co/800x450/1877F2/ffffff?text=Facebook",
  };
  for (const item of finalNewsList) {
    if (!item.image) {
      const fallback = PLACEHOLDER_BY_CATEGORY[item.category] || "https://placehold.co/800x450/003366/ffffff?text=Notícias";
      item.image = fallback;
    }
  }

  // Integrar NewsAPI (se configurada)
  const newsApiArticles = await getNewsAPIData();
  if (newsApiArticles.length > 0) {
    finalNewsList = [...newsApiArticles, ...finalNewsList];
  }

  // Integrar Facebook API nativa (Prioridade 1)
  let facebookPosts = await fetchFacebookGraphAPI();

  if (facebookPosts.length > 0) {
    // Se conseguiu ler do Facebook via API Oficial, substitui eventuais posts do RSS (se houver) e insere no topo
    finalNewsList = finalNewsList.filter(n => n.category !== 'Facebook');
    finalNewsList = [...facebookPosts, ...finalNewsList];
  }

  return finalNewsList;
}
