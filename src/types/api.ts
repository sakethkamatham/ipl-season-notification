// Raw CricAPI response shapes

export interface CricApiResponse<T> {
  apikey: string;
  data: T;
  status: string;
  info: {
    hitsToday: number;
    hitsUsed: number;
    hitsLimit: number;
    credits: number;
    server: number;
    offsetRows: number;
    totalRows: number;
    queryTime: number;
    s: number;
    cache: number;
  };
}

export interface ApiSeries {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  odi: number;
  t20: number;
  test: number;
  squads: number;
  matches: number;
}

export interface ApiSeriesInfo {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  odi: number;
  t20: number;
  test: number;
  squads: number;
  matches: number;
  pointsTable?: ApiStandingsRow[];
  matchList?: ApiMatchSummary[];
  squadList?: ApiSquad[];
}

export interface ApiMatchSummary {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  teams: string[];
  teamInfo?: ApiTeamInfo[];
  score?: ApiScore[];
  series_id?: string;
  fantasyEnabled?: boolean;
  bbbEnabled?: boolean;
  hasSquad?: boolean;
  matchStarted?: boolean;
  matchEnded?: boolean;
}

export interface ApiTeamInfo {
  name: string;
  shortname: string;
  img: string;
}

export interface ApiScore {
  r: number;
  w: number;
  o: number;
  inning: string;
}

export interface ApiStandingsRow {
  teamId: string;
  teamName: string;
  teamSName: string;
  matchesPlayed: string;
  wins: string;
  loss: string;
  ties: string;
  noResult: string;
  points: string;
  nrrRaw: string;
  img: string;
  index: string;
}

export interface ApiSquad {
  id: string;
  name: string;
  img: string;
  players?: ApiPlayer[];
}

export interface ApiPlayer {
  id: string;
  name: string;
  role?: string;
  battingStyle?: string;
  bowlingStyle?: string;
  country?: string;
  playerImg?: string;
}

export interface ApiMatchScorecard {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  teams: string[];
  teamInfo?: ApiTeamInfo[];
  score?: ApiScore[];
  tossResults?: {
    tossWinner: string;
    tossDecision: string;
  };
  matchWinner?: string;
  series_id?: string;
  scorecard?: ApiInningsScorecard[];
}

export interface ApiInningsScorecard {
  batting: ApiBattingEntry[];
  bowling: ApiBowlingEntry[];
  extras: {
    r: number;
    b: number;
    lb: number;
    wd: number;
    nb: number;
    p: number;
  };
  inning: string;
  powerplay?: {
    id: string;
    o1: string;
    o2: string;
    r: string;
    w: string;
  }[];
}

export interface ApiBattingEntry {
  batsman: string;
  batsmanId: string;
  dismissal?: string;
  r: number;
  b: number;
  '4s': number;
  '6s': number;
  sr: string;
}

export interface ApiBowlingEntry {
  bowler: string;
  bowlerId: string;
  o: number;
  m: number;
  r: number;
  w: number;
  wd: number;
  nb: number;
  eco: string;
}

export interface ApiPlayerInfo {
  id: string;
  name: string;
  dateOfBirth?: string;
  role?: string;
  battingStyle?: string;
  bowlingStyle?: string;
  country?: string;
  playerImg?: string;
  stats?: ApiCareerStat[];
}

export interface ApiCareerStat {
  fn: string;
  exp: string;
  type: string;
  matchtype: string;
  stat: string;
  value: string;
}
