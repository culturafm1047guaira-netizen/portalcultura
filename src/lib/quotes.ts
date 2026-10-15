interface QuoteItem {
  label: string; val: string; trend: 'up' | 'down' | 'stable'; change: string; unit?: string
}

interface CommoditiesData {
  items: QuoteItem[]
  updatedAt: string | null
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
      next: { revalidate: 300 },
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
    const res = await fetch('https://open.er-api.com/v6/latest/USD')
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
      next: { revalidate: 600 },
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

const COMMODITY_TARGETS = ['soja', 'milho', 'boi_gordo', 'cafe', 'acucar', 'trigo', 'algodao'] as const

function parseCommodities(data: any): CommoditiesData {
  if (!data || data.status !== 'ok' || !data.commodities) return { items: [], updatedAt: null }
  const items: QuoteItem[] = []
  for (const key of COMMODITY_TARGETS) {
    const item = data.commodities[key]
    if (item && item.valor > 0) {
      items.push({
        label: item.nome,
        val: formatBRL(Number(item.valor)),
        trend: fmtTrend(Number(item.variacao)),
        change: fmtChange(Number(item.variacao)),
        unit: item.unidade || undefined,
      })
    }
  }
  return { items, updatedAt: data.atualizacao || null }
}

async function fetchCommoditiesFrom(url: string, signal?: AbortSignal): Promise<any | null> {
  try {
    const res = await fetch(url, {
      signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
      next: { revalidate: 300 },
    })
    if (!res.ok) return null
    const text = await res.text()
    return JSON.parse(text)
  } catch {
    return null
  }
}

/**
 * Fonte principal: indicadores diários CEPEA/ESALQ (referência oficial do
 * mercado físico agro brasileiro), redistribuídos em JSON aberto pela
 * Cultivee (CC BY-NC 4.0, requer atribuição à CEPEA/ESALQ).
 * Atualiza uma vez por dia (fechamento do indicador), então var_pct/data_ref
 * só mudam quando o CEPEA publica um novo valor de referência.
 */
const CULTIVEE_LABELS: Record<string, string> = {
  'soja': 'Soja',
  'milho': 'Milho',
  'boi-gordo': 'Boi Gordo',
  'cafe-arabica': 'Café Arábica',
  'cafe-robusta': 'Café Robusta',
  'trigo': 'Trigo',
  'leite': 'Leite',
}
const CULTIVEE_ORDER = ['soja', 'milho', 'boi-gordo', 'cafe-arabica', 'cafe-robusta', 'trigo', 'leite']

function parseCultivee(data: any): CommoditiesData {
  if (!data || !Array.isArray(data.itens)) return { items: [], updatedAt: null }
  const byKey = new Map<string, any>(data.itens.map((it: any) => [it.key, it]))
  const items: QuoteItem[] = []
  let updatedAt: string | null = null
  for (const key of CULTIVEE_ORDER) {
    const item = byKey.get(key)
    if (!item || typeof item.valor !== 'number' || item.valor <= 0) continue
    items.push({
      label: CULTIVEE_LABELS[key],
      val: formatBRL(item.valor),
      trend: fmtTrend(item.var_pct),
      change: fmtChange(item.var_pct),
      unit: item.unidade || undefined,
    })
    if (!updatedAt && item.data_ref) updatedAt = `${item.data_ref} (CEPEA/ESALQ)`
  }
  return { items, updatedAt }
}

async function fetchCultivee(): Promise<CommoditiesData | null> {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)
    const res = await fetch('https://cultivee.com.br/dados/cotacoes/ultimo.json', {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
      next: { revalidate: 1800 },
    })
    clearTimeout(timeout)
    if (!res.ok) return null
    const data = await res.json()
    const parsed = parseCultivee(data)
    return parsed.items.length > 0 ? parsed : null
  } catch {
    return null
  }
}

/** Fonte secundária, usada apenas se a Cultivee estiver indisponível. */
async function fetchCommoditiesFallback(): Promise<CommoditiesData> {
  const PRIMARY = 'https://www.redacaoagro.com.br/api/cotacoes.php'
  const FALLBACK = 'https://www.redacaoagro.com.br/api/cotacoes.php?_='

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8000)

  try {
    let data = await fetchCommoditiesFrom(PRIMARY, controller.signal)
    let parsed = data ? parseCommodities(data) : null
    if (parsed && parsed.items.length > 0) {
      clearTimeout(timeout)
      return parsed
    }

    data = await fetchCommoditiesFrom(FALLBACK + Date.now())
    parsed = data ? parseCommodities(data) : null
    if (parsed && parsed.items.length > 0) {
      clearTimeout(timeout)
      return parsed
    }

    clearTimeout(timeout)
    return { items: [], updatedAt: null }
  } catch {
    clearTimeout(timeout)
    return { items: [], updatedAt: null }
  }
}

async function fetchCommodities(): Promise<CommoditiesData> {
  const cultivee = await fetchCultivee()
  if (cultivee) return cultivee
  return fetchCommoditiesFallback()
}

export async function getQuotesData() {
  const [financial, commoditiesData] = await Promise.all([
    fetchFinancials(),
    fetchCommodities(),
  ])
  return { financial, commodities: commoditiesData.items, commoditiesUpdatedAt: commoditiesData.updatedAt }
}
