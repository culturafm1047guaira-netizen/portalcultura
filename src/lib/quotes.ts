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

async function fetchFinancials(): Promise<QuoteItem[]> {
  let usd = 0, eur = 0, xau = 0
  let usdPct: number | null = null, eurPct: number | null = null, xauPct: number | null = null

  try {
    const res = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,XAU-BRL', {
      next: { revalidate: 1800 }
    })
    if (res.ok) {
      const data = await res.json()
      usd = parseFloat(data.USDBRL?.bid || '0')
      eur = parseFloat(data.EURBRL?.bid || '0')
      xau = parseFloat(data.XAUBRL?.bid || '0')
      usdPct = parseFloat(data.USDBRL?.pctChange) || null
      eurPct = parseFloat(data.EURBRL?.pctChange) || null
      xauPct = parseFloat(data.XAUBRL?.pctChange) || null
    }
  } catch {}

  if (usd === 0 || eur === 0) {
    try {
      const now = new Date()
      const day = String(now.getDate()).padStart(2, '0')
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const year = now.getFullYear()

      for (const code of ['USD', 'EUR']) {
        const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda='${code}'&@dataCotacao='${month}-${day}-${year}'&$format=json&$top=1`
        const r = await fetch(url, { next: { revalidate: 3600 } })
        if (r.ok) {
          const j = await r.json()
          if (j.value?.length > 0) {
            const v = parseFloat(j.value[0].cotacaoCompra)
            if (code === 'USD' && usd === 0) usd = v
            if (code === 'EUR' && eur === 0) eur = v
          }
        }
      }
    } catch {}
  }

  const xauGram = xau > 0 ? xau / 31.1035 : 0

  const items: QuoteItem[] = []
  if (usd > 0) items.push({ label: 'Dólar Americano', val: formatBRL(usd), trend: fmtTrend(usdPct), change: fmtChange(usdPct) })
  if (eur > 0) items.push({ label: 'Euro', val: formatBRL(eur), trend: fmtTrend(eurPct), change: fmtChange(eurPct) })
  if (xauGram > 0) items.push({ label: 'Ouro (g)', val: formatBRL(xauGram), trend: fmtTrend(xauPct), change: fmtChange(xauPct) })

  return items
}

interface AgroItem {
  nome: string
  valor: number
  variacao: number
  unidade: string
}

async function fetchCommodities(): Promise<QuoteItem[]> {
  try {
    const res = await fetch('https://www.redacaoagro.com.br/api/cotacoes.php', {
      next: { revalidate: 3600 }
    })
    if (!res.ok) return []
    const data = await res.json()
    if (data?.status !== 'ok') return []

    const map: Record<string, { label: string; key: string; unit: string }> = {
      soja: { label: 'Soja', key: 'soja', unit: 'sc 60kg' },
      milho: { label: 'Milho', key: 'milho', unit: 'sc 60kg' },
      boi_gordo: { label: 'Boi Gordo', key: 'boi_gordo', unit: '@' },
      cafe: { label: 'Café Arábica', key: 'cafe', unit: 'sc 60kg' },
      acucar: { label: 'Açúcar (Cana)', key: 'acucar', unit: 'sc 50kg' },
    }

    const items: QuoteItem[] = []
    for (const [slug, cfg] of Object.entries(map)) {
      const raw = data.commodities?.[slug] as AgroItem | undefined
      if (raw && raw.valor > 0) {
        items.push({
          label: `${raw.nome}`,
          val: `R$ ${raw.valor.toFixed(2).replace('.', ',')}`,
          trend: fmtTrend(raw.variacao),
          change: fmtChange(raw.variacao),
        })
      }
    }
    return items
  } catch {
    return []
  }
}

export async function getQuotesData() {
  const [financial, commodities] = await Promise.all([
    fetchFinancials(),
    fetchCommodities(),
  ])
  return { financial, commodities }
}
