import { NextResponse } from "next/server";

interface Quote {
  name: string;
  price: number;
  formatted: string;
  variation: number;
  up: boolean;
  source: string;
}

const FALLBACK_QUOTES: Quote[] = [
  { name: "Dólar Americano", price: 5.15, formatted: "R$ 5,15", variation: 0.12, up: true, source: "BCB" },
  { name: "Euro", price: 5.48, formatted: "R$ 5,48", variation: -0.08, up: false, source: "BCB" },
  { name: "Ouro (grama)", price: 382.40, formatted: "R$ 382,40", variation: 0.35, up: true, source: "NY" },
  { name: "Petróleo Brent", price: 425.60, formatted: "R$ 425,60", variation: -1.20, up: false, source: "ICE" },
];

async function fetchFinancials(): Promise<Quote[]> {
  try {
    const res = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,XAU-BRL,BRENT-USD", {
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return FALLBACK_QUOTES;
    const data = await res.json();

    const usd = parseFloat(data.USDBRL?.bid || 5.15);
    const brentUsd = parseFloat(data.BRENTUSD?.bid || 82.50);
    const brentBrl = brentUsd * usd;

    return [
      {
        name: "Dólar Americano",
        price: usd,
        formatted: `R$ ${usd.toFixed(2).replace(".", ",")}`,
        variation: parseFloat(data.USDBRL?.pctChange || 0),
        up: parseFloat(data.USDBRL?.pctChange || 0) >= 0,
        source: "BCB",
      },
      {
        name: "Euro Comercial",
        price: parseFloat(data.EURBRL?.bid || 5.48),
        formatted: `R$ ${parseFloat(data.EURBRL?.bid || 5.48).toFixed(2).replace(".", ",")}`,
        variation: parseFloat(data.EURBRL?.pctChange || 0),
        up: parseFloat(data.EURBRL?.pctChange || 0) >= 0,
        source: "BCB",
      },
      {
        name: "Ouro (grama)",
        price: parseFloat(data.XAUBRL?.bid || 380),
        formatted: `R$ ${parseFloat(data.XAUBRL?.bid || 380).toFixed(2).replace(".", ",")}`,
        variation: parseFloat(data.XAUBRL?.pctChange || 0),
        up: parseFloat(data.XAUBRL?.pctChange || 0) >= 0,
        source: "NY",
      },
      {
        name: "Petróleo Brent",
        price: brentBrl,
        formatted: `R$ ${brentBrl.toFixed(2).replace(".", ",")}`,
        variation: parseFloat(data.BRENTUSD?.pctChange || 0),
        up: parseFloat(data.BRENTUSD?.pctChange || 0) >= 0,
        source: "ICE",
      },
    ];
  } catch {
    return FALLBACK_QUOTES;
  }
}

async function fetchCepeaIndicator(name: string, slug: string, fallbackVal: number): Promise<Quote | null> {
  try {
    const res = await fetch(`https://www.cepea.esalq.usp.br/br/indicador/${slug}.aspx`, {
      headers: { "User-Agent": "Mozilla/5.0" },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const html = await res.text();
    const tableRegex = /<tr[^>]*>\s*<td[^>]*>\d{2}\/\d{2}\/\d{4}<\/td>\s*<td[^>]*>([\d.,]+)<\/td>\s*<td[^>]*>([\d.,+-]+)<\/td>/i;
    const match = html.match(tableRegex);
    if (match) {
      const priceVal = parseFloat(match[1].replace(/\./g, "").replace(",", "."));
      const varVal = parseFloat(match[2].replace(",", "."));
      return {
        name,
        price: priceVal,
        formatted: `R$ ${priceVal.toFixed(2).replace(".", ",")}`,
        variation: isNaN(varVal) ? 0 : varVal,
        up: isNaN(varVal) ? true : varVal >= 0,
        source: "CEPEA",
      };
    }
    return null;
  } catch {
    return null;
  }
}

async function fetchCommodities(): Promise<Quote[]> {
  const indicators = [
    { name: "Soja (sc 60kg)", slug: "soja", fallback: 132.50 },
    { name: "Milho (sc 60kg)", slug: "milho", fallback: 62.80 },
    { name: "Boi Gordo (@)", slug: "boi-gordo", fallback: 232.40 },
  ];
  const results = await Promise.allSettled(indicators.map((ind) => fetchCepeaIndicator(ind.name, ind.slug, ind.fallback)));
  return results.map((r, i) => {
    if (r.status === "fulfilled" && r.value) return r.value;
    return {
      name: indicators[i].name,
      price: indicators[i].fallback,
      formatted: `R$ ${indicators[i].fallback.toFixed(2).replace(".", ",")}`,
      variation: 0,
      up: true,
      source: "CEPEA",
    };
  });
}

export async function GET() {
  try {
    const [financials, commodities] = await Promise.all([
      fetchFinancials(),
      fetchCommodities(),
    ]);
    return NextResponse.json([...financials, ...commodities]);
  } catch {
    return NextResponse.json(FALLBACK_QUOTES);
  }
}
