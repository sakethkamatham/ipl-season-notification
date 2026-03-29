// App-level domain types

export interface StandingsRow {
  rank: number;
  teamId: string;
  teamName: string;
  teamShortName: string;
  teamImg: string;
  teamSlug: string;
  played: number;
  won: number;
  lost: number;
  tied: number;
  noResult: number;
  points: number;
  nrr: number;
  nrrFormatted: string;
  qualified: boolean;
}

export interface MatchResult {
  id: string;
  name: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  teams: string[];
  teamInfo: {
    name: string;
    shortname: string;
    img: string;
  }[];
  scores: {
    inning: string;
    runs: number;
    wickets: number;
    overs: number;
  }[];
  matchStatus: 'upcoming' | 'live' | 'completed';
  result?: string;
}

export interface TeamDetail {
  id: string;
  name: string;
  shortName: string;
  img: string;
  slug: string;
  players: PlayerSummary[];
}

export interface PlayerSummary {
  id: string;
  name: string;
  role?: string;
  country?: string;
  img?: string;
}

export interface PlayerDetail {
  id: string;
  name: string;
  dateOfBirth?: string;
  role?: string;
  battingStyle?: string;
  bowlingStyle?: string;
  country?: string;
  img?: string;
  batting: BattingStats;
  bowling: BowlingStats;
  careerStats: CareerStatRow[];
}

export interface BattingStats {
  matches: number;
  innings: number;
  runs: number;
  highScore: string;
  average: string;
  strikeRate: string;
  centuries: number;
  halfCenturies: number;
  fours: number;
  sixes: number;
}

export interface BowlingStats {
  matches: number;
  innings: number;
  wickets: number;
  bestFigures: string;
  average: string;
  economy: string;
  strikeRate: string;
  fiveWickets: number;
}

export interface CareerStatRow {
  type: string;
  matchType: string;
  matches: string;
  innings: string;
  runs?: string;
  average?: string;
  strikeRate?: string;
  wickets?: string;
  economy?: string;
}

export interface LeaderboardEntry {
  playerId: string;
  playerName: string;
  teamName: string;
  value: number;
  secondary?: number;
  secondaryLabel?: string;
}

export interface ScoreboardData {
  matchId: string;
  matchName: string;
  batting: {
    playerId: string;
    playerName: string;
    team: string;
    runs: number;
    balls: number;
    fours: number;
    sixes: number;
    strikeRate: number;
  }[];
  bowling: {
    playerId: string;
    playerName: string;
    team: string;
    wickets: number;
    overs: number;
    runs: number;
    economy: number;
  }[];
}
