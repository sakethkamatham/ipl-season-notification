import { MatchResult } from '@/types/domain';
import MatchCard from './MatchCard';

interface MatchListProps {
  matches: MatchResult[];
  title?: string;
}

export default function MatchList({ matches, title = 'Recent Matches' }: MatchListProps) {
  if (!matches.length) {
    return <p className="text-gray-500 text-sm">No matches found.</p>;
  }

  return (
    <div>
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>}
      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
}
