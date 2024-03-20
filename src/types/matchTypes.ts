interface Competition {
  id: number;
  name: string;
}

interface Match {
  id: number;
  home: { name: string };
  away: { name: string };
  competition: Competition;
  time: string;
}

export interface LiveMatchesResponse {
  success: boolean;
  data?: { match: Match[] };
  error?: string;
}
