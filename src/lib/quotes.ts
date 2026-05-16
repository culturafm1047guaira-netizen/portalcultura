interface QuoteItem {
  label: string; val: string; trend: 'up' | 'down' | 'stable'; change: string
}

function formatBRL(value: number): string {
  return `R$ ${value.toFixed(2).replace('.', ',')}`
}

function formatUSD(value: number): string {
  return `US$ ${value.toFixed(2).replace('.', ',')}`
}

function fmtChange(pct: number | undefined | null): string {
  if (pct == null || isNaN(pct)) return '0,00%'
  const prefix = pct > 0 ? '+' : ''
  return `${prefix}${pct.toFixed(2).replace('.', ',')}%`
}

function fmtTrend(val: number | undefined | null): 'up' | 'down' | 'stable' {
  if (val == null || val === 0) return 'stable'
  return val > 0 ? 'up' : 'down'
}

async function fetchAwesomeFinancials(): Promise<{ usd: number; eur: number; xau: number; usdPct: number | null; eurPct: number | null; xauPct: number | null } | null> {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)
    const res = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,XAU-BRL', {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
      next: { revalidate: 1800 }
    })
    clearTimeout(timeout)
    if (!res.ok) return null
    const data = await res.json()
    return {
      usd: parseFloat(data.USDBRL?.bid || '0'),
      eur: parseFloat(data.EURBRL?.bid || '0'),
      xau: parseFloat(data.XAUBRL?.bid || '0'),
      usdPct: parseFloat(data.USDBRL?.pctChange) || null,
      eurPct: parseFloat(data.EURBRL?.pctChange) || null,
      xauPct: parseFloat(data.XAUBRL?.pctChange) || null,
    }
  } catch { return null }
}

async function fetchFallbackFinancials(): Promise<{ usd: number; eur: number } | null> {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD', { next: { revalidate: 3600 } })
    if (res.ok) {
      const data = await res.json()
      if (data?.rates?.BRL) {
        const usd = data.rates.BRL
        const eur = data.rates.BRL / data.rates.EUR
        return { usd, eur }
      }
    }
    return null
  } catch { return null }
}

/** Fetch Brent Crude Oil price via OilPriceAPI (free demo endpoint, no key required) */
async function fetchOilPrice(): Promise<{ price: number; changePct: number | null } | null> {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)
    const res = await fetch('https://api.oilpriceapi.com/v1/demo/prices', {
      signal: controller.signal,
      next: { revalidate: 3600 },
    })
    clearTimeout(timeout)
    if (!res.ok) return null
    const data = await res.json()
    if (data?.status !== 'success') return null
    const brent = data.data?.prices?.find((p: any) => p.code === 'BRENT_CRUDE_USD')
    if (!brent) return null
    return {
      price: brent.price,
      changePct: brent.change_24h ?? null,
    }
  } catch { return null }
}

async function fetchFinancials(): Promise<QuoteItem[]> {
  let usd = 0, eur = 0, xau = 0
  let usdPct: number | null = null, eurPct: number | null = null, xauPct: number | null = null

  const awesome = await fetchAwesomeFinancials()
  if (awesome && awesome.usd > 0) {
    usd = awesome.usd; eur = awesome.eur; xau = awesome.xau
    usdPct = awesome.usdPct; eurPct = awesome.eurPct; xauPct = awesome.xauPct
  }

  if (usd === 0 || eur === 0) {
    const fallback = await fetchFallbackFinancials()
    if (fallback) {
      if (usd === 0) usd = fallback.usd
      if (eur === 0) eur = fallback.eur
    }
  }

  const xauGram = xau > 0 ? xau / 31.1035 : 0

  // Fetch oil price in parallel would be ideal but we already awaited above.
  // Fetch it here to keep the code simple.
  const oil = await fetchOilPrice()

  const items: QuoteItem[] = []
  if (usd > 0) items.push({ label: 'Dólar', val: formatBRL(usd), trend: fmtTrend(usdPct), change: fmtChange(usdPct) })
  if (eur > 0) items.push({ label: 'Euro', val: formatBRL(eur), trend: fmtTrend(eurPct), change: fmtChange(eurPct) })
  if (xauGram > 0) items.push({ label: 'Ouro (g)', val: formatBRL(xauGram), trend: fmtTrend(xauPct), change: fmtChange(xauPct) })
  if (oil && oil.price > 0) {
    // Convert oil price to BRL (using the USD exchange rate we already have)
    const oilBRL = usd > 0 ? oil.price * usd : 0
    items.push({
      label: 'Petróleo Brent',
      val: oilBRL > 0 ? formatBRL(oilBRL) : formatUSD(oil.price),
      trend: fmtTrend(oil.changePct),
      change: fmtChange(oil.changePct),
    })
  }

  return items
}

async function fetchCommodities(): Promise<QuoteItem[]> {
  try {
    const res = await fetch('https://www.redacaoagro.com.br/api/cotacoes.php', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
      next: { revalidate: 3600 }
    })
    if (!res.ok) return []
    const data = await res.json()
    if (data.status !== 'ok' || !data.commodities) return []

    const items: QuoteItem[] = []
    const targets = ['soja', 'milho', 'boi_gordo', 'cafe', 'acucar']
    
    for (const key of targets) {
      const item = data.commodities[key]
      if (item && item.valor > 0) {
        items.push({
          label: item.nome,
          val: formatBRL(parseFloat(item.valor)),
          trend: fmtTrend(parseFloat(item.variacao)),
          change: fmtChange(parseFloat(item.variacao))
        })
      }
    }
    return items
  } catch { return [] }
}

export async function getQuotesData() {
  const [financial, commodities] = await Promise.all([
    fetchFinancials(),
    fetchCommodities(),
  ])
  return { financial, commodities }
}
