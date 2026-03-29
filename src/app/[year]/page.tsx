import { notFound } from 'next/navigation';
import { IPL_YEARS } from '@/lib/constants';
import { getIplSeriesId, getSeasonStandings, getSeasonMatches } from '@/lib/cricapi/series';
import PointsTable from '@/components/season/PointsTable';
import MatchList from '@/components/season/MatchList';
import FixtureList from '@/components/season/FixtureList';
import StatsLeaderboard from '@/components/season/StatsLeaderboard';
import SectionHeader from '@/components/ui/SectionHeader';
import ErrorMessage from '@/components/ui/ErrorMessage';

interface PageProps {
  params: { year: string };
}

export async function generateStaticParams() {
  return IPL_YEARS.map((year) => ({ year: String(year) }));
}

export const revalidate = 3600;

export default async function SeasonPage({ params }: PageProps) {
  const year = parseInt(params.year, 10);

  if (!IPL_YEARS.includes(year as typeof IPL_YEARS[number])) {
    notFound();
  }

  const seriesId = await getIplSeriesId(year);

  if (!seriesId) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">IPL {year}</h1>
        <ErrorMessage
          title="Series Not Found"
          message={`Could not find CricAPI series ID for IPL ${year}. Run the discovery script to populate ipl-series-map.ts.`}
        />
      </div>
    );
  }

  const [standings, matches] = await Promise.all([
    getSeasonStandings(seriesId),
    getSeasonMatches(seriesId),
  ]);

  const completedMatches = matches.filter((m) => m.matchStatus === 'completed');
  const upcomingMatches = matches.filter((m) => m.matchStatus === 'upcoming');
  const liveMatches = matches.filter((m) => m.matchStatus === 'live');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">IPL {year}</h1>
        {liveMatches.length > 0 && (
          <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
            {liveMatches.length} LIVE
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content — 2/3 */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <SectionHeader title="Points Table" subtitle="Top 4 qualify for playoffs" />
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <PointsTable standings={standings} year={year} />
            </div>
          </section>

          {liveMatches.length > 0 && (
            <section>
              <SectionHeader title="Live Matches" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {liveMatches.map((match) => (
                  <div key={match.id} className="border-2 border-red-400 rounded-xl">
                    <MatchList matches={[match]} title="" />
                  </div>
                ))}
              </div>
            </section>
          )}

          <section>
            <SectionHeader title="Recent Results" />
            <MatchList
              matches={completedMatches.slice(-10).reverse()}
              title=""
            />
          </section>

          {upcomingMatches.length > 0 && (
            <section>
              <FixtureList matches={upcomingMatches.slice(0, 10)} />
            </section>
          )}
        </div>

        {/* Sidebar — 1/3 */}
        <div className="space-y-6">
          <section>
            <SectionHeader title="Season Stats" subtitle="Top performers" />
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <StatsLeaderboard topScorers={[]} topWicketTakers={[]} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
