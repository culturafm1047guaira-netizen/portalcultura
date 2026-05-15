function formatChange(pctChange: string | undefined): string {
  if (!pctChange) return '0,00%'
  const num = parseFloat(pctChange)
  const prefix = num > 0 ? '+' : ''
  const formatted = num === 0 ? '0,00' : pctChange.replace('.', ',')
  return `${prefix}${formatted}%`
}

function formatTrend(pctChange: string | undefined): 'up' | 'down' {
  return parseFloat(pctChange || '0') >= 0 ? 'up' : 'down'
}

function formatBRL(value: number): string {
  return `R$ ${value.toFixed(2).replace('.', ',')}`
}

async function fetchBcbRate(currencyCode: string): Promise<number | null> {
  try {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const dateStr = `${month}-${day}-${year}`;

    const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda='${currencyCode}'&@dataCotacao='${dateStr}'&$format=json&$top=1`;

    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.value?.length > 0) {
      return parseFloat(data.value[0].cotacaoCompra);
    }
    return null;
  } catch {
    return null;
  }
}

interface QuoteItem {
  label: string; val: string; trend: 'up' | 'down' | 'stable'; change: string
}

async function fetchFinancials(): Promise<QuoteItem[]> {
  let usd = 0, eur = 0, xau = 0, brentUsd = 0;
  let usdPct: string | undefined, eurPct: string | undefined, xauPct: string | undefined, brentPct: string | undefined;

  try {
    const res = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,XAU-BRL,XBR-USD', { 
      next: { revalidate: 1800 }
    });
    if (res.ok) {
      const data = await res.json();
      usd = parseFloat(data.USDBRL?.bid || '0');
      eur = parseFloat(data.EURBRL?.bid || '0');
      xau = parseFloat(data.XAUBRL?.bid || '0');
      brentUsd = parseFloat(data.XBRUSD?.bid || '0');
      usdPct = data.USDBRL?.pctChange;
      eurPct = data.EURBRL?.pctChange;
      xauPct = data.XAUBRL?.pctChange;
      brentPct = data.XBRUSD?.pctChange;
    }
  } catch {}

  if (!usd || !eur) {
    const [bcbUsd, bcbEur] = await Promise.all([
      !usd ? fetchBcbRate('USD') : Promise.resolve(null),
      !eur ? fetchBcbRate('EUR') : Promise.resolve(null)
    ]);
    if (bcbUsd) { usd = bcbUsd; usdPct = undefined; }
    if (bcbEur) { eur = bcbEur; eurPct = undefined; }
  }

  if (!usd && !eur && !xau && !brentUsd) return [];

  const brentBrl = brentUsd * usd;

  return [
    {
      label: 'Dólar Americano',
      val: formatBRL(usd),
      trend: formatTrend(usdPct),
      change: formatChange(usdPct)
    },
    {
      label: 'Euro',
      val: formatBRL(eur),
      trend: formatTrend(eurPct),
      change: formatChange(eurPct)
    },
    {
      label: 'Ouro (g)',
      val: formatBRL(xau),
      trend: formatTrend(xauPct),
      change: formatChange(xauPct)
    },
    {
      label: 'Petróleo Brent',
      val: formatBRL(brentBrl),
      trend: formatTrend(brentPct),
      change: formatChange(brentPct)
    }
  ];
}

async function fetchCepeaIndicator(name: string, slug: string): Promise<QuoteItem | null> {
  try {
    const res = await fetch(`https://www.cepea.esalq.usp.br/br/indicador/${slug}.aspx`, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      next: { revalidate: 3600 }
    });
    if (!res.ok) return null;
    const html = await res.text();
    const tableRegex = /<tr[^>]*>\s*<td[^>]*>\d{2}\/\d{2}\/\d{4}<\/td>\s*<td[^>]*>([\d.,]+)<\/td>\s*<td[^>]*>([\d.,+-]+)<\/td>/i;
    const match = html.match(tableRegex);
    if (match) {
      const priceVal = parseFloat(match[1].replace(/\./g, '').replace(',', '.'));
      const varVal = parseFloat(match[2].replace(',', '.'));
      return {
        label: name,
        val: `R$ ${priceVal.toFixed(2).replace('.', ',')}`,
        trend: isNaN(varVal) ? 'stable' : varVal >= 0 ? 'up' : 'down',
        change: isNaN(varVal) ? '0,00%' : `${varVal > 0 ? '+' : ''}${varVal.toFixed(2).replace('.', ',')}%`
      };
    }
    return null;
  } catch (e) { return null; }
}

export async function getQuotesData() {
  const [financials, soja, milho] = await Promise.all([
    fetchFinancials(),
    fetchCepeaIndicator('Soja (sc)', 'soja'),
    fetchCepeaIndicator('Milho (sc)', 'milho')
  ]);

  const quotes: QuoteItem[] = [...financials];
  if (soja) quotes.push(soja);
  if (milho) quotes.push(milho);

  if (quotes.length === 0 || quotes.every(q => q.val === 'R$ 0,00')) {
    return [
        { label: "Dólar Americano", val: "R$ 5,15", trend: "up", change: "+0.12%" },
        { label: "Euro", val: "R$ 5,48", trend: "down", change: "-0.08%" },
        { label: "Soja (sc)", val: "R$ 128,00", trend: "stable", change: "0.0%" },
        { label: "Milho (sc)", val: "R$ 62,30", trend: "down", change: "-1.2%" },
        { label: "Ouro (g)", val: "R$ 382,40", trend: "up", change: "+0.35%" },
        { label: "Petróleo Brent", val: "R$ 425,60", trend: "down", change: "-1.20%" }
    ];
  }

  return quotes;
}
