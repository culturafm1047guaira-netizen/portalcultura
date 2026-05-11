const cache = new Map();
const CACHE_TIME = 1000 * 60 * 60;

async function fetchCurrencies() {
  const res = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL');
  if (!res.ok) throw new Error(`Currency API: ${res.status}`);
  const data = await res.json();

  return [
    {
      name: 'Dólar',
      price: parseFloat(data.USDBRL?.bid || 0),
      formatted: `R$ ${parseFloat(data.USDBRL?.bid || 0).toFixed(2).replace('.', ',')}`,
      variation: parseFloat(data.USDBRL?.pctChange || 0),
      up: parseFloat(data.USDBRL?.pctChange || 0) >= 0,
      source: 'BCB'
    },
    {
      name: 'Euro',
      price: parseFloat(data.EURBRL?.bid || 0),
      formatted: `R$ ${parseFloat(data.EURBRL?.bid || 0).toFixed(2).replace('.', ',')}`,
      variation: parseFloat(data.EURBRL?.pctChange || 0),
      up: parseFloat(data.EURBRL?.pctChange || 0) >= 0,
      source: 'BCB'
    }
  ];
}

async function fetchCepeaIndicator(name, slug) {
  try {
    const res = await fetch(`https://www.cepea.esalq.usp.br/br/indicador/${slug}.aspx`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'pt-BR,pt;q=0.9'
      },
      signal: AbortSignal.timeout(8000)
    });
    if (!res.ok) return null;

    const html = await res.text();

    // CEPEA uses a table with recent prices. Find the latest row.
    // Pattern: <td>DD/MM/YYYY</td><td>VALUE</td><td>VAR%</td>
    const rows = html.match(/<tr>\s*<td[^>]*>\d{2}\/\d{2}\/\d{4}<\/td>[\s\S]*?<\/tr>/gi);
    if (rows && rows.length > 0) {
      const latest = rows[0];
      const cells = latest.match(/<td[^>]*>([\s\S]*?)<\/td>/gi);
      if (cells && cells.length >= 3) {
        const priceText = cells[1].replace(/<[^>]*>/g, '').trim();
        const varText = cells[2].replace(/<[^>]*>/g, '').trim();
        const price = parseFloat(priceText.replace(/\./g, '').replace(',', '.'));
        const variation = parseFloat(varText.replace(',', '.'));
        if (!isNaN(price)) {
          return {
            name,
            price,
            formatted: `R$ ${price.toFixed(2).replace('.', ',')}`,
            variation: isNaN(variation) ? null : variation,
            up: isNaN(variation) ? null : variation >= 0,
            source: 'CEPEA/ESALQ'
          };
        }
      }
    }

    // Fallback regex: look for any price pattern near the indicator name
    const pricePattern = /(\d{1,3}(?:\.\d{3})*,\d{2})/g;
    const prices = [...html.matchAll(pricePattern)].map(m => parseFloat(m[1].replace(/\./g, '').replace(',', '.')));
    if (prices.length > 0) {
      const price = prices[0];
      return {
        name,
        price,
        formatted: `R$ ${price.toFixed(2).replace('.', ',')}`,
        variation: null,
        up: null,
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
    { name: 'Soja (sc 60kg)', slug: 'soja' },
    { name: 'Milho (sc 60kg)', slug: 'milho' },
    { name: 'Boi Gordo (@)', slug: 'boi-gordo' }
  ];

  const results = await Promise.allSettled(
    indicators.map(ind => fetchCepeaIndicator(ind.name, ind.slug))
  );

  return results
    .map((r, i) => {
      if (r.status === 'fulfilled' && r.value) return r.value;
      return {
        name: indicators[i].name,
        price: null,
        formatted: 'N/D',
        variation: null,
        up: null,
        source: 'CEPEA/ESALQ'
      };
    });
}

export default async function handler(req, res) {
  const cacheKey = 'quotes';
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TIME) {
    return res.status(200).json(cached.data);
  }

  try {
    const [currencies, commodities] = await Promise.all([
      fetchCurrencies().catch(() => []),
      fetchCommodities()
    ]);

    const all = [...currencies, ...commodities];
    if (all.length > 0) {
      cache.set(cacheKey, { data: all, timestamp: Date.now() });
    }
    res.status(200).json(all);
  } catch (e) {
    if (cached) return res.status(200).json(cached.data);
    res.status(200).json([]);
  }
}
