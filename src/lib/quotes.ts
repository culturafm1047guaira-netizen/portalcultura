async function fetchFinancials() {
  try {
    const res = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,XAU-BRL,BRENT-USD', { 
      next: { revalidate: 1800 } // 30 min
    });
    if (!res.ok) return [];
    const data = await res.json();
    
    const usd = parseFloat(data.USDBRL?.bid || 0);
    const eur = parseFloat(data.EURBRL?.bid || 0);
    const xau = parseFloat(data.XAUBRL?.bid || 0);
    const brentUsd = parseFloat(data.BRENTUSD?.bid || 0);
    const brentBrl = brentUsd * usd;

    return [
      {
        label: 'Dólar Americano',
        val: `R$ ${usd.toFixed(2).replace('.', ',')}`,
        trend: parseFloat(data.USDBRL?.pctChange || 0) >= 0 ? 'up' : 'down',
        change: `${parseFloat(data.USDBRL?.pctChange || 0) > 0 ? '+' : ''}${data.USDBRL?.pctChange}%`
      },
      {
        label: 'Euro',
        val: `R$ ${eur.toFixed(2).replace('.', ',')}`,
        trend: parseFloat(data.EURBRL?.pctChange || 0) >= 0 ? 'up' : 'down',
        change: `${parseFloat(data.EURBRL?.pctChange || 0) > 0 ? '+' : ''}${data.EURBRL?.pctChange}%`
      },
      {
        label: 'Ouro (g)',
        val: `R$ ${xau.toFixed(2).replace('.', ',')}`,
        trend: parseFloat(data.XAUBRL?.pctChange || 0) >= 0 ? 'up' : 'down',
        change: `${parseFloat(data.XAUBRL?.pctChange || 0) > 0 ? '+' : ''}${data.XAUBRL?.pctChange}%`
      },
      {
        label: 'Petróleo Brent',
        val: `R$ ${brentBrl.toFixed(2).replace('.', ',')}`,
        trend: parseFloat(data.BRENTUSD?.pctChange || 0) >= 0 ? 'up' : 'down',
        change: `${parseFloat(data.BRENTUSD?.pctChange || 0) > 0 ? '+' : ''}${data.BRENTUSD?.pctChange}%`
      }
    ];
  } catch (e) {
    return [];
  }
}

async function fetchCepeaIndicator(name: string, slug: string) {
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

  const quotes = [...financials];
  if (soja) quotes.push(soja);
  if (milho) quotes.push(milho);

  // If empty, return placeholders but try to avoid
  if (quotes.length === 0) {
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
