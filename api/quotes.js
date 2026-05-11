const cache = new Map();
const CACHE_TIME = 1000 * 60 * 30; // 30 min

// Fallback data in case everything fails
const FALLBACK_QUOTES = [
  { name: 'Dólar', price: 5.12, formatted: 'R$ 5,12', variation: 0.15, up: true, source: 'Mercado' },
  { name: 'Euro', price: 5.48, formatted: 'R$ 5,48', variation: -0.05, up: false, source: 'Mercado' },
  { name: 'Soja (sc 60kg)', price: 132.50, formatted: 'R$ 132,50', variation: 0.45, up: true, source: 'Estimativa' },
  { name: 'Milho (sc 60kg)', price: 62.80, formatted: 'R$ 62,80', variation: -0.12, up: false, source: 'Estimativa' },
  { name: 'Boi Gordo (@)', price: 232.40, formatted: 'R$ 232,40', variation: 0.05, up: true, source: 'Estimativa' }
];

async function fetchCurrencies() {
  try {
    const res = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL', { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return [];
    const data = await res.json();
    return [
      {
        name: 'Dólar',
        price: parseFloat(data.USDBRL?.bid || 5.10),
        formatted: `R$ ${parseFloat(data.USDBRL?.bid || 5.10).toFixed(2).replace('.', ',')}`,
        variation: parseFloat(data.USDBRL?.pctChange || 0),
        up: parseFloat(data.USDBRL?.pctChange || 0) >= 0,
        source: 'BCB'
      },
      {
        name: 'Euro',
        price: parseFloat(data.EURBRL?.bid || 5.45),
        formatted: `R$ ${parseFloat(data.EURBRL?.bid || 5.45).toFixed(2).replace('.', ',')}`,
        variation: parseFloat(data.EURBRL?.pctChange || 0),
        up: parseFloat(data.EURBRL?.pctChange || 0) >= 0,
        source: 'BCB'
      }
    ];
  } catch (e) {
    return FALLBACK_QUOTES.slice(0, 2);
  }
}

async function fetchCepeaIndicator(name, slug) {
  try {
    const res = await fetch(`https://www.cepea.esalq.usp.br/br/indicador/${slug}.aspx`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8'
      },
      signal: AbortSignal.timeout(8000)
    });
    if (!res.ok) return null;
    const html = await res.text();
    
    // Improved regex to find price and variation in CEPEA's latest row
    const tableRegex = /<tr[^>]*>\s*<td[^>]*>\d{2}\/\d{2}\/\d{4}<\/td>\s*<td[^>]*>([\d.,]+)<\/td>\s*<td[^>]*>([\d.,+-]+)<\/td>/i;
    const match = html.match(tableRegex);
    
    if (match) {
      const priceVal = parseFloat(match[1].replace(/\./g, '').replace(',', '.'));
      const varVal = parseFloat(match[2].replace(',', '.'));
      return {
        name,
        price: priceVal,
        formatted: `R$ ${priceVal.toFixed(2).replace('.', ',')}`,
        variation: isNaN(varVal) ? 0 : varVal,
        up: isNaN(varVal) ? true : varVal >= 0,
        source: 'CEPEA/ESALQ'
      };
    }
    return null;
  } catch (e) {
    return null;
  }
}

async function fetchCommodities() {
  const indicators = [
    { name: 'Soja (sc 60kg)', slug: 'soja', fallback: FALLBACK_QUOTES[2] },
    { name: 'Milho (sc 60kg)', slug: 'milho', fallback: FALLBACK_QUOTES[3] },
    { name: 'Boi Gordo (@)', slug: 'boi-gordo', fallback: FALLBACK_QUOTES[4] }
  ];

  const results = await Promise.allSettled(indicators.map(ind => fetchCepeaIndicator(ind.name, ind.slug)));
  
  return results.map((r, i) => {
    if (r.status === 'fulfilled' && r.value) return r.value;
    return indicators[i].fallback;
  });
}

export default async function handler(req, res) {
  try {
    const cached = cache.get('quotes');
    if (cached && (Date.now() - cached.timestamp < CACHE_TIME)) {
      return res.status(200).json(cached.data);
    }

    const [currencies, commodities] = await Promise.all([
      fetchCurrencies(),
      fetchCommodities()
    ]);

    const all = [...currencies, ...commodities];
    cache.set('quotes', { data: all, timestamp: Date.now() });
    res.status(200).json(all);
  } catch (e) {
    res.status(200).json(FALLBACK_QUOTES);
  }
}
