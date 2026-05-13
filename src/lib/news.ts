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
    ],
  },
});

function extractImage(item: FeedItem): string | null {
  const html = item.content || item.description || "";

  // 1. <img src=""> (aspas duplas ou simples)
  const imgDq = html.match(/<img[^>]+src="([^">]+)"/);
  if (imgDq) return imgDq[1];
  const imgSq = html.match(/<img[^>]+src='([^'>]+)'/);
  if (imgSq) return imgSq[1];

  // 2. <media:content url=""> ou <media:thumbnailOrig url=""> dentro do HTML (ACidade ON, etc.)
  const mediaUrl = html.match(/<media:content[^>]+url="([^">]+)"/);
  if (mediaUrl) return mediaUrl[1];
  const thumbUrl = html.match(/<media:thumbnail[^>]+url="([^">]+)"/);
  if (thumbUrl) return thumbUrl[1];

  // 3. media:content como campo RSS (G1 e outros)
  if (item.mediaContent?.$?.url) return item.mediaContent.$.url;

  // 4. media:thumbnail como campo RSS
  if (item.mediaThumbnail?.$?.url) return item.mediaThumbnail.$.url;

  // 5. enclosure
  if (item.enclosure?.link) return item.enclosure.link;

  // 6. Tenta extrair do <figure> ou <picture>
  const figureImg = html.match(/<figure[^>]*>[\s\S]*?<img[^>]+src="([^">]+)"/);
  if (figureImg) return figureImg[1];

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
