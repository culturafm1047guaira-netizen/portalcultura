export type CryptoItem = {
  name: string;
  symbol: string;
  image: string;
  priceBRL: string;
  change24h: string;
  trend: "up" | "down" | "stable";
};

export async function getCryptoData(): Promise<CryptoItem[]> {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,cardano,polkadot&vs_currencies=brl&include_24hr_change=true",
      {
        next: { revalidate: 600 },
        headers: { "User-Agent": "Mozilla/5.0" },
      }
    );
    if (!res.ok) return [];

    const data = await res.json();
    const items: CryptoItem[] = [];

    const map: Record<string, { name: string; symbol: string; image: string }> = {
      bitcoin: { name: "Bitcoin", symbol: "BTC", image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png" },
      ethereum: { name: "Ethereum", symbol: "ETH", image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png" },
      solana: { name: "Solana", symbol: "SOL", image: "https://assets.coingecko.com/coins/images/4128/large/solana.png" },
      cardano: { name: "Cardano", symbol: "ADA", image: "https://assets.coingecko.com/coins/images/975/large/cardano.png" },
      polkadot: { name: "Polkadot", symbol: "DOT", image: "https://assets.coingecko.com/coins/images/12171/large/polkadot.png" },
    };

    for (const [id, meta] of Object.entries(map)) {
      const coin = data[id];
      if (coin?.brl) {
        const change = coin.brl_24h_change ?? 0;
        const prefix = change > 0 ? "+" : "";
        items.push({
          name: meta.name,
          symbol: meta.symbol,
          image: meta.image,
          priceBRL: `R$ ${coin.brl.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          change24h: `${prefix}${change.toFixed(2)}%`,
          trend: change > 0 ? "up" : change < 0 ? "down" : "stable",
        });
      }
    }

    return items;
  } catch {
    return [];
  }
}
