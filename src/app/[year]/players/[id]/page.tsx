import { notFound } from 'next/navigation';
import { IPL_YEARS } from '@/lib/constants';
import { getPlayerInfo, transformPlayerStats } from '@/lib/cricapi/players';
import PlayerHeader from '@/components/player/PlayerHeader';
import StatCard from '@/components/player/StatCard';
import CareerStatsTable from '@/components/player/CareerStatsTable';
import RunsChart from '@/components/player/RunsChart';
import WicketsChart from '@/components/player/WicketsChart';
import SectionHeader from '@/components/ui/SectionHeader';
import ErrorMessage from '@/components/ui/ErrorMessage';

interface PageProps {
  params: { year: string; id: string };
}

export default async function PlayerPage({ params }: PageProps) {
  const year = parseInt(params.year, 10);

  if (!IPL_YEARS.includes(year as typeof IPL_YEARS[number])) {
    notFound();
  }

  const raw = await getPlayerInfo(params.id);
  if (!raw) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorMessage title="Player Not Found" message={`Player with ID ${params.id} not found.`} />
      </div>
    );
  }

  const player = transformPlayerStats(raw);

  const battingCards = [
    { label: 'Matches', value: player.batting.matches },
    { label: 'Runs', value: player.batting.runs },
    { label: 'High Score', value: player.batting.highScore },
    { label: 'Average', value: player.batting.average },
    { label: 'Strike Rate', value: player.batting.strikeRate },
    { label: 'Centuries', value: player.batting.centuries },
    { label: 'Half Centuries', value: player.batting.halfCenturies },
    { label: 'Sixes', value: player.batting.sixes },
  ];

  const bowlingCards = [
    { label: 'Wickets', value: player.bowling.wickets },
    { label: 'Best', value: player.bowling.bestFigures },
    { label: 'Average', value: player.bowling.average },
    { label: 'Economy', value: player.bowling.economy },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PlayerHeader player={player} />

      <div className="space-y-8">
        {player.batting.runs > 0 && (
          <section>
            <SectionHeader title="Batting" subtitle="T20 career statistics" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {battingCards.map((c) => (
                <StatCard key={c.label} label={c.label} value={c.value} />
              ))}
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <p className="text-sm font-medium text-gray-700 mb-3">Career Runs (sample)</p>
              <RunsChart data={[]} />
            </div>
          </section>
        )}

        {player.bowling.wickets > 0 && (
          <section>
            <SectionHeader title="Bowling" subtitle="T20 career statistics" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {bowlingCards.map((c) => (
                <StatCard key={c.label} label={c.label} value={c.value} />
              ))}
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <p className="text-sm font-medium text-gray-700 mb-3">Career Wickets (sample)</p>
              <WicketsChart data={[]} />
            </div>
          </section>
        )}

        <section>
          <SectionHeader title="Career Statistics" />
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <CareerStatsTable stats={player.careerStats} />
          </div>
        </section>
      </div>
    </div>
  );
}
