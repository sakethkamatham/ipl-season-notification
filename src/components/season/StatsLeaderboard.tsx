import { LeaderboardEntry } from '@/types/domain';

interface StatsLeaderboardProps {
  topScorers: LeaderboardEntry[];
  topWicketTakers: LeaderboardEntry[];
}

function LeaderboardTable({ entries, valueLabel, secondaryLabel }: {
  entries: LeaderboardEntry[];
  valueLabel: string;
  secondaryLabel?: string;
}) {
  return (
    <table className="min-w-full text-sm">
      <thead>
        <tr className="border-b border-gray-200">
          <th className="py-2 text-left font-medium text-gray-600">#</th>
          <th className="py-2 text-left font-medium text-gray-600">Player</th>
          <th className="py-2 text-right font-medium text-gray-600">{valueLabel}</th>
          {secondaryLabel && (
            <th className="py-2 text-right font-medium text-gray-600">{secondaryLabel}</th>
          )}
        </tr>
      </thead>
      <tbody>
        {entries.map((entry, i) => (
          <tr key={entry.playerId} className="border-b border-gray-50 hover:bg-gray-50">
            <td className="py-2 text-gray-400">{i + 1}</td>
            <td className="py-2">
              <p className="font-medium text-gray-900">{entry.playerName}</p>
              <p className="text-xs text-gray-500">{entry.teamName}</p>
            </td>
            <td className="py-2 text-right font-bold text-ipl-blue">{entry.value}</td>
            {secondaryLabel && (
              <td className="py-2 text-right text-gray-500">{entry.secondary ?? '-'}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function StatsLeaderboard({ topScorers, topWicketTakers }: StatsLeaderboardProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-3">Top Run Scorers</h3>
        {topScorers.length > 0 ? (
          <LeaderboardTable entries={topScorers} valueLabel="Runs" secondaryLabel="SR" />
        ) : (
          <p className="text-gray-500 text-sm">Stats not available yet.</p>
        )}
      </div>
      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-3">Top Wicket Takers</h3>
        {topWicketTakers.length > 0 ? (
          <LeaderboardTable entries={topWicketTakers} valueLabel="Wickets" secondaryLabel="Eco" />
        ) : (
          <p className="text-gray-500 text-sm">Stats not available yet.</p>
        )}
      </div>
    </div>
  );
}
