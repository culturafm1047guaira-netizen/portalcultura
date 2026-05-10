const Parser = require('rss-parser');

const parser = new Parser({ timeout: 10000 });
const cache = new Map();
const CACHE_TIME = 1000 * 60 * 30;

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
  { url: 'https://rss.app/feeds/2LAuSQwLtjvj9B5C.xml', source: 'Facebook', category: 'Facebook' }
];

export default async function handler(req, res) {
  const cacheKey = 'news';
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_TIME) {
    return res.status(200).json(cached.data);
  }

  try {
    const results = await Promise.allSettled(
      FEEDS.map(async (feed) => {
        try {
          const data = await parser.parseURL(feed.url);
          return (data.items || []).slice(0, 6).map(item => {
            let img = null;
            const html = item.content || item.description || '';
            const match = html.match(/<img[^>]+src="([^">]+)"/);
            if (match) img = match[1];
            if (!img && item.enclosure?.type?.startsWith('image/')) img = item.enclosure.link;
            
            return {
              title: item.title || '',
              link: item.link || '#',
              image: img,
              excerpt: (item.description || '').replace(/<[^>]*>/g, '').substring(0, 160),
              pubDate: new Date(item.pubDate).toISOString(),
              source: feed.source,
              category: feed.category
            };
          });
        } catch (e) {
          return [];
        }
      })
    );

    let allNews = [];
    results.forEach(r => {
      if (r.status === 'fulfilled') allNews = allNews.concat(r.value);
    });
    allNews.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

    cache.set(cacheKey, { data: allNews, timestamp: Date.now() });
    res.status(200).json(allNews);
  } catch (e) {
    res.status(500).json({ error: 'Erro ao carregar notícias' });
  }
}