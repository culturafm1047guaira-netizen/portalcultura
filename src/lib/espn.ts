export type EspnMatch = {
  id: string;
  name: string;
  status: string;
  date: string;
  homeTeam: { name: string; logo: string; score?: number };
  awayTeam: { name: string; logo: string; score?: number };
};

function formatYyyyMmDd(date: Date): string {
  return date.toISOString().slice(0, 10).replace(/-/g, "");
}

function mapEvent(event: any): EspnMatch {
  const comp = event.competitions[0];
  const [away, home] = comp.competitors;
  return {
    id: event.id,
    name: event.name,
    status: comp.status?.type?.description || "",
    date: event.date,
    homeTeam: {
      name: home.team?.displayName || home.team?.shortDisplayName || "",
      logo: home.team?.logo || "",
      score: home.score ? parseInt(home.score) : undefined,
    },
    awayTeam: {
      name: away.team?.displayName || away.team?.shortDisplayName || "",
      logo: away.team?.logo || "",
      score: away.score ? parseInt(away.score) : undefined,
    },
  };
}

async function fetchScoreboard(dates?: string): Promise<any[]> {
  const url = dates
    ? `https://site.api.espn.com/apis/site/v2/sports/soccer/bra.1/scoreboard?dates=${dates}`
    : "https://site.api.espn.com/apis/site/v2/sports/soccer/bra.1/scoreboard";

  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) return [];

  const data = await res.json();
  return Array.isArray(data.events) ? data.events : [];
}

export async function getBrasileiraoScores(): Promise<EspnMatch[]> {
  try {
    // Sem parâmetro de data, a ESPN retorna só os jogos "de hoje" (muitas vezes
    // 1-2 partidas), já que a rodada do Brasileirão se espalha por vários dias.
    // Buscamos um dia de cada vez (formato de data única, bem suportado pela
    // API da ESPN) numa janela de alguns dias antes/depois, para sempre trazer
    // a rodada completa, independente de qual dia a página é gerada.
    const now = new Date();
    const offsets = [-3, -2, -1, 0, 1, 2, 3];
    const dateStrings = offsets.map((offset) => {
      const d = new Date(now);
      d.setDate(d.getDate() + offset);
      return formatYyyyMmDd(d);
    });

    const results = await Promise.allSettled(
      dateStrings.map((d) => fetchScoreboard(d))
    );

    const eventsById = new Map<string, any>();
    for (const result of results) {
      if (result.status === "fulfilled") {
        for (const event of result.value) {
          eventsById.set(event.id, event);
        }
      }
    }

    // Fallback: se a busca por data não trouxe nada (ex.: API mudou o
    // formato aceito), cai no comportamento original (jogos "de hoje").
    if (eventsById.size === 0) {
      const todayEvents = await fetchScoreboard();
      for (const event of todayEvents) {
        eventsById.set(event.id, event);
      }
    }

    const events = [...eventsById.values()].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return events.map(mapEvent);
  } catch {
    return [];
  }
}
