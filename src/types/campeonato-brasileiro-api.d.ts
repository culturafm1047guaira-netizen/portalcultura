declare module "campeonato-brasileiro-api" {
  export interface Team {
    id: number;
    name: string;
    shortName: string;
    badge: string;
  }

  export interface Legend {
    id: number;
    name: string;
    color: string;
  }

  export interface StandingEntry {
    position: number;
    team: Team;
    points: number;
    matches: number;
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
    efficiency: number;
    movement: number;
    recentForm: string[];
    legend: Legend;
  }

  export interface TableGroup {
    id: string;
    name: string;
    round: { number: number; total: number; label: string };
    entries: StandingEntry[];
  }

  export interface StandingsResponse {
    competition: { code: string; name: string };
    grouped: boolean;
    legends: Legend[];
    tables: TableGroup[];
  }

  export function getStandings(
    serie: string,
    options?: Record<string, unknown>
  ): Promise<StandingsResponse>;

  export function listSeries(): { code: string; slug: string; name: string; grouped: boolean; url: string }[];
}
