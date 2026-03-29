import { MatchResult } from '@/types/domain';
import MatchCard from './MatchCard';

interface FixtureListProps {
  matches: MatchResult[];
}

export default function FixtureList({ matches }: FixtureListProps) {
  const fixtures = matches.filter((m) => m.matchStatus === 'upcoming');

  if (!fixtures.length) {
    return <p className="text-gray-500 text-sm">No upcoming fixtures.</p>;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Upcoming Fixtures</h3>
      <div className="space-y-3">
        {fixtures.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
}
