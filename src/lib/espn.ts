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

export async function getBrasileiraoScores(): Promise<EspnMatch[]> {
  try {
    // Sem parâmetro de data, a ESPN retorna só os jogos "de hoje" (muitas vezes
    // 1-2 partidas), já que a rodada do Brasileirão se espalha por vários dias.
    // Buscamos uma janela de alguns dias antes/depois para sempre trazer a
    // rodada completa, independente de qual dia a página é gerada.
    const now = new Date();
    const start = new Date(now);
    start.setDate(start.getDate() - 4);
    const end = new Date(now);
    end.setDate(end.getDate() + 4);
    const dates = `${formatYyyyMmDd(start)}-${formatYyyyMmDd(end)}`;

    const res = await fetch(
      `https://site.api.espn.com/apis/site/v2/sports/soccer/bra.1/scoreboard?dates=${dates}`,
      { next: { revalidate: 300 } }
    );

    if (!res.ok) return [];

    const data = await res.json();
    if (!data.events) return [];

    const events = [...data.events].sort(
      (a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return events.map((event: any) => {
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
    });
  } catch {
    return [];
  }
}
