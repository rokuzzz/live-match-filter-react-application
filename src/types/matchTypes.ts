export interface Country {
  id: number;
  name: string;
}

export interface Competition {
  id: number;
  name: string;
}

export interface Match {
  id: number;
  home: { name: string };
  away: { name: string };
  scores: { score: string };
  competition: Competition;
  country: Country;
  time: string;
}

export interface LiveMatchesResponse {
  success: boolean;
  data?: { match: Match[] };
  error?: string;
}
