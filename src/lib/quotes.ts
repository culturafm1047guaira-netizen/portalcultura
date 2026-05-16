interface QuoteItem {
  label: string; val: string; trend: 'up' | 'down' | 'stable'; change: string
}

function formatBRL(value: number): string {
  return `R$ ${value.toFixed(2).replace('.', ',')}`
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
    const res = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,XAU-BRL', {
      next: { revalidate: 1800 }
    })
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

async function fetchBCBFinancials(): Promise<{ usd: number; eur: number } | null> {
  try {
    const now = new Date()
    const day = String(now.getDate()).padStart(2, '0')
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const year = now.getFullYear()
    let usd = 0, eur = 0
    for (const code of ['USD', 'EUR']) {
      const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda='${code}'&@dataCotacao='${month}-${day}-${year}'&$format=json&$top=1`
      const r = await fetch(url, { next: { revalidate: 3600 } })
      if (r.ok) {
        const j = await r.json()
        if (j.value?.length > 0) {
          const v = parseFloat(j.value[0].cotacaoCompra)
          if (code === 'USD') usd = v
          if (code === 'EUR') eur = v
        }
      }
    }
    if (usd > 0 || eur > 0) return { usd, eur }
    return null
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
    const bcb = await fetchBCBFinancials()
    if (bcb) {
      if (usd === 0) usd = bcb.usd
      if (eur === 0) eur = bcb.eur
    }
  }

  const xauGram = xau > 0 ? xau / 31.1035 : 0

  const items: QuoteItem[] = []
  if (usd > 0) items.push({ label: 'Dólar Americano', val: formatBRL(usd), trend: fmtTrend(usdPct), change: fmtChange(usdPct) })
  if (eur > 0) items.push({ label: 'Euro', val: formatBRL(eur), trend: fmtTrend(eurPct), change: fmtChange(eurPct) })
  if (xauGram > 0) items.push({ label: 'Ouro (g)', val: formatBRL(xauGram), trend: fmtTrend(xauPct), change: fmtChange(xauPct) })

  return items
}

interface AgroItem {
  nome: string; valor: number; variacao: number
}

async function fetchCommodities(): Promise<QuoteItem[]> {
  try {
    const res = await fetch('https://www.redacaoagro.com.br/api/cotacoes.php', {
      next: { revalidate: 3600 }
    })
    if (!res.ok) return []
    const data = await res.json()
    if (data?.status !== 'ok') return []

    const slugs = ['soja', 'milho', 'boi_gordo', 'cafe']
    const items: QuoteItem[] = []

    for (const slug of slugs) {
      const raw = data.commodities?.[slug] as AgroItem | undefined
      if (raw && raw.valor > 0) {
        items.push({
          label: raw.nome,
          val: `R$ ${raw.valor.toFixed(2).replace('.', ',')}`,
          trend: fmtTrend(raw.variacao),
          change: fmtChange(raw.variacao),
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
