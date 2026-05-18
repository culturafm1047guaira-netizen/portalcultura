export type EspnMatch = {
  id: string;
  name: string;
  status: string;
  date: string;
  homeTeam: { name: string; logo: string; score?: number };
  awayTeam: { name: string; logo: string; score?: number };
};

export async function getBrasileiraoScores(): Promise<EspnMatch[]> {
  try {
    const res = await fetch(
      "https://site.api.espn.com/apis/site/v2/sports/soccer/bra.1/scoreboard",
      { next: { revalidate: 300 } }
    );

    if (!res.ok) return [];

    const data = await res.json();
    if (!data.events) return [];

    return data.events.map((event: any) => {
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
