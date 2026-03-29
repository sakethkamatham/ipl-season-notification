import { cricApiFetch } from './client';
import { IPL_SERIES_MAP } from '../ipl-series-map';
import { ApiSeries, ApiSeriesInfo, ApiStandingsRow } from '@/types/api';
import { StandingsRow, MatchResult } from '@/types/domain';
import { teamNameToSlug, formatNRR, classifyMatchStatus } from '../utils';

export async function getIplSeriesId(year: number): Promise<string | null> {
  // Check static map first
  if (IPL_SERIES_MAP[year]) {
    return IPL_SERIES_MAP[year];
  }

  // Fall back to API search
  try {
    const series = await cricApiFetch<ApiSeries[]>('series', {
      search: 'Indian Premier League',
    }, { revalidate: 86400 });

    const match = series.find((s) => {
      const startYear = new Date(s.startDate).getFullYear();
      return startYear === year && s.name.toLowerCase().includes('indian premier league');
    });

    return match?.id ?? null;
  } catch {
    return null;
  }
}

export async function getSeriesInfo(seriesId: string): Promise<ApiSeriesInfo | null> {
  try {
    const data = await cricApiFetch<ApiSeriesInfo>('series_info', {
      id: seriesId,
    }, { revalidate: 3600, tags: [`series-${seriesId}`] });
    return data;
  } catch {
    return null;
  }
}

export async function getSeasonStandings(seriesId: string): Promise<StandingsRow[]> {
  const info = await getSeriesInfo(seriesId);
  if (!info?.pointsTable) return [];

  return info.pointsTable.map((row: ApiStandingsRow, index: number) => {
    const nrr = parseFloat(row.nrrRaw ?? '0') || 0;
    return {
      rank: index + 1,
      teamId: row.teamId,
      teamName: row.teamName,
      teamShortName: row.teamSName,
      teamImg: row.img,
      teamSlug: teamNameToSlug(row.teamName),
      played: parseInt(row.matchesPlayed ?? '0', 10),
      won: parseInt(row.wins ?? '0', 10),
      lost: parseInt(row.loss ?? '0', 10),
      tied: parseInt(row.ties ?? '0', 10),
      noResult: parseInt(row.noResult ?? '0', 10),
      points: parseInt(row.points ?? '0', 10),
      nrr,
      nrrFormatted: formatNRR(nrr),
      qualified: index < 4,
    };
  });
}

export async function getSeasonMatches(seriesId: string): Promise<MatchResult[]> {
  const info = await getSeriesInfo(seriesId);
  if (!info?.matchList) return [];

  return info.matchList.map((match) => ({
    id: match.id,
    name: match.name,
    status: match.status,
    venue: match.venue,
    date: match.date,
    dateTimeGMT: match.dateTimeGMT,
    teams: match.teams,
    teamInfo: (match.teamInfo ?? []).map((t) => ({
      name: t.name,
      shortname: t.shortname,
      img: t.img,
    })),
    scores: (match.score ?? []).map((s) => ({
      inning: s.inning,
      runs: s.r,
      wickets: s.w,
      overs: s.o,
    })),
    matchStatus: classifyMatchStatus(
      match.status,
      match.dateTimeGMT,
      match.matchStarted,
      match.matchEnded
    ),
    result: match.status,
  }));
}
