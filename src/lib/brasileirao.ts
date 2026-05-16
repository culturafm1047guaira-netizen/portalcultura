import { getStandings } from "campeonato-brasileiro-api";

export interface BrasileiraoEntry {
  position: number;
  team: { name: string; shortName: string; badge: string };
  points: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  recentForm: string[];
}

export interface BrasileiraoData {
  competition: { code: string; name: string };
  entries: BrasileiraoEntry[];
}

export async function getBrasileiraoData(): Promise<BrasileiraoData> {
  try {
    const standings = await getStandings("a");
    return {
      competition: {
        code: standings.competition.code,
        name: standings.competition.name,
      },
      entries: standings.tables[0].entries.map((e: any) => ({
        position: e.position,
        team: {
          name: e.team.name,
          shortName: e.team.shortName,
          badge: e.team.badge,
        },
        points: e.points,
        wins: e.wins,
        draws: e.draws,
        losses: e.losses,
        goalsFor: e.goalsFor,
        goalsAgainst: e.goalsAgainst,
        goalDifference: e.goalDifference,
        recentForm: e.recentForm,
      })),
    };
  } catch (error) {
    console.error("Erro ao buscar classificação do Brasileirão:", error);
    return { competition: { code: "a", name: "Brasileirão Série A" }, entries: [] };
  }
}
