import { MatchResult } from '@/types/domain';
import Badge from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';

interface MatchCardProps {
  match: MatchResult;
}

function StatusBadge({ status }: { status: MatchResult['matchStatus'] }) {
  if (status === 'live') return <Badge variant="danger">LIVE</Badge>;
  if (status === 'upcoming') return <Badge variant="info">Upcoming</Badge>;
  return <Badge variant="default">Completed</Badge>;
}

export default function MatchCard({ match }: MatchCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <p className="text-xs text-gray-500">{formatDate(match.date)}</p>
        <StatusBadge status={match.matchStatus} />
      </div>
      <div className="space-y-2">
        {match.teams.map((team, i) => {
          const score = match.scores.find((s) => s.inning.startsWith(team));
          const teamInfo = match.teamInfo.find((t) => t.name === team);
          return (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {teamInfo?.img && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={teamInfo.img} alt={teamInfo.shortname} className="w-5 h-5 object-contain" />
                )}
                <span className="text-sm font-medium">{teamInfo?.shortname ?? team}</span>
              </div>
              {score && (
                <span className="text-sm font-mono">
                  {score.runs}/{score.wickets} <span className="text-gray-400">({score.overs})</span>
                </span>
              )}
            </div>
          );
        })}
      </div>
      {match.matchStatus === 'completed' && (
        <p className="text-xs text-gray-600 mt-2 border-t pt-2">{match.result}</p>
      )}
      {match.venue && (
        <p className="text-xs text-gray-400 mt-1 truncate">{match.venue}</p>
      )}
    </div>
  );
}
