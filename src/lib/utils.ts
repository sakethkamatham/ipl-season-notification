import { TEAM_NAME_TO_SLUG, IPL_TEAMS } from './constants';

export function formatNRR(nrr: number): string {
  const sign = nrr >= 0 ? '+' : '';
  return `${sign}${nrr.toFixed(3)}`;
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export function teamNameToSlug(name: string): string {
  if (!name) return 'unknown';
  const lower = name.toLowerCase().trim();
  return TEAM_NAME_TO_SLUG[lower] ?? lower.replace(/\s+/g, '-');
}

export function slugToTeamName(slug: string): string {
  return IPL_TEAMS[slug]?.name ?? slug;
}

export function classifyMatchStatus(
  status: string,
  dateTimeGMT: string,
  matchStarted?: boolean,
  matchEnded?: boolean
): 'upcoming' | 'live' | 'completed' {
  if (matchEnded) return 'completed';
  if (matchStarted && !matchEnded) return 'live';

  const now = new Date();
  const matchDate = dateTimeGMT ? new Date(dateTimeGMT) : null;

  const lowerStatus = status?.toLowerCase() ?? '';
  if (lowerStatus.includes('won') || lowerStatus.includes('tied') || lowerStatus.includes('no result') || lowerStatus === 'match over') {
    return 'completed';
  }
  if (lowerStatus.includes('live') || lowerStatus.includes('in progress')) {
    return 'live';
  }

  if (matchDate && matchDate > now) return 'upcoming';
  if (matchDate && matchDate <= now) return 'completed';

  return 'upcoming';
}

export function getTeamColor(teamName: string): string {
  const slug = teamNameToSlug(teamName);
  return IPL_TEAMS[slug]?.primaryColor ?? '#004BA0';
}
