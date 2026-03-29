import { cricApiFetch } from './client';
import { ApiMatchScorecard } from '@/types/api';
import { ScoreboardData } from '@/types/domain';

export async function getMatchInfo(id: string): Promise<ApiMatchScorecard | null> {
  try {
    const data = await cricApiFetch<ApiMatchScorecard>('match_info', { id }, {
      revalidate: 60,
      tags: [`match-${id}`],
    });
    return data;
  } catch {
    return null;
  }
}

export async function getMatchScorecard(id: string): Promise<ScoreboardData | null> {
  try {
    const data = await cricApiFetch<ApiMatchScorecard>('match_scorecard', { id }, {
      revalidate: 3600,
      tags: [`scorecard-${id}`],
    });

    if (!data.scorecard) return null;

    const batting: ScoreboardData['batting'] = [];
    const bowling: ScoreboardData['bowling'] = [];

    for (const innings of data.scorecard) {
      const team = innings.inning;
      for (const b of innings.batting) {
        batting.push({
          playerId: b.batsmanId,
          playerName: b.batsman,
          team,
          runs: b.r,
          balls: b.b,
          fours: b['4s'],
          sixes: b['6s'],
          strikeRate: parseFloat(b.sr) || 0,
        });
      }
      for (const bwl of innings.bowling) {
        bowling.push({
          playerId: bwl.bowlerId,
          playerName: bwl.bowler,
          team,
          wickets: bwl.w,
          overs: bwl.o,
          runs: bwl.r,
          economy: parseFloat(bwl.eco) || 0,
        });
      }
    }

    return {
      matchId: id,
      matchName: data.name,
      batting,
      bowling,
    };
  } catch {
    return null;
  }
}
