import { cricApiFetch } from './client';
import { ApiPlayerInfo } from '@/types/api';
import { PlayerDetail } from '@/types/domain';

export async function searchPlayers(name: string): Promise<{ id: string; name: string }[]> {
  try {
    const data = await cricApiFetch<{ id: string; name: string }[]>('players', {
      search: name,
    }, { revalidate: 86400 });
    return data;
  } catch {
    return [];
  }
}

export async function getPlayerInfo(id: string): Promise<ApiPlayerInfo | null> {
  try {
    const data = await cricApiFetch<ApiPlayerInfo>('player_info', { id }, {
      revalidate: 86400,
      tags: [`player-${id}`],
    });
    return data;
  } catch {
    return null;
  }
}

export function transformPlayerStats(raw: ApiPlayerInfo): PlayerDetail {
  const stats = raw.stats ?? [];

  const getBattingStat = (fn: string, matchtype = 'T20') => {
    return stats.find((s) => s.fn === fn && s.matchtype === matchtype)?.value ?? '0';
  };

  const getBowlingStat = (fn: string, matchtype = 'T20') => {
    return stats.find((s) => s.fn === fn && s.matchtype === matchtype)?.value ?? '0';
  };

  return {
    id: raw.id,
    name: raw.name,
    dateOfBirth: raw.dateOfBirth,
    role: raw.role,
    battingStyle: raw.battingStyle,
    bowlingStyle: raw.bowlingStyle,
    country: raw.country,
    img: raw.playerImg,
    batting: {
      matches: parseInt(getBattingStat('Matches'), 10) || 0,
      innings: parseInt(getBattingStat('Innings'), 10) || 0,
      runs: parseInt(getBattingStat('Runs'), 10) || 0,
      highScore: getBattingStat('Highest Score'),
      average: getBattingStat('Batting Average'),
      strikeRate: getBattingStat('Batting Strike Rate'),
      centuries: parseInt(getBattingStat('Centuries'), 10) || 0,
      halfCenturies: parseInt(getBattingStat('Half Centuries'), 10) || 0,
      fours: parseInt(getBattingStat('Fours'), 10) || 0,
      sixes: parseInt(getBattingStat('Sixes'), 10) || 0,
    },
    bowling: {
      matches: parseInt(getBowlingStat('Matches'), 10) || 0,
      innings: parseInt(getBowlingStat('Innings', 'T20'), 10) || 0,
      wickets: parseInt(getBowlingStat('Wickets'), 10) || 0,
      bestFigures: getBowlingStat('Best Bowling'),
      average: getBowlingStat('Bowling Average'),
      economy: getBowlingStat('Economy Rate'),
      strikeRate: getBowlingStat('Bowling Strike Rate'),
      fiveWickets: parseInt(getBowlingStat('Five Wicket Hauls'), 10) || 0,
    },
    careerStats: stats.reduce<PlayerDetail['careerStats']>((acc, s) => {
      const existing = acc.find((r) => r.matchType === s.matchtype);
      if (!existing) {
        acc.push({
          type: s.type,
          matchType: s.matchtype,
          matches: s.fn === 'Matches' ? s.value : '-',
          innings: s.fn === 'Innings' ? s.value : '-',
          runs: s.fn === 'Runs' ? s.value : undefined,
          average: s.fn === 'Batting Average' ? s.value : undefined,
          strikeRate: s.fn === 'Batting Strike Rate' ? s.value : undefined,
          wickets: s.fn === 'Wickets' ? s.value : undefined,
          economy: s.fn === 'Economy Rate' ? s.value : undefined,
        });
      }
      return acc;
    }, []),
  };
}
