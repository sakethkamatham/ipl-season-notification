import { notFound } from 'next/navigation';
import { IPL_YEARS, IPL_TEAMS } from '@/lib/constants';
import { getIplSeriesId, getSeriesInfo } from '@/lib/cricapi/series';
import TeamHeader from '@/components/team/TeamHeader';
import RosterTable from '@/components/team/RosterTable';
import TeamStatsGrid from '@/components/team/TeamStatsGrid';
import SectionHeader from '@/components/ui/SectionHeader';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { slugToTeamName } from '@/lib/utils';

interface PageProps {
  params: { year: string; team: string };
}

export default async function TeamPage({ params }: PageProps) {
  const year = parseInt(params.year, 10);
  const teamSlug = params.team;

  if (!IPL_YEARS.includes(year as typeof IPL_YEARS[number])) {
    notFound();
  }

  const seriesId = await getIplSeriesId(year);
  if (!seriesId) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorMessage title="Series Not Found" message={`IPL ${year} series data not available.`} />
      </div>
    );
  }

  const seriesInfo = await getSeriesInfo(seriesId);
  const teamInfo = IPL_TEAMS[teamSlug];
  const teamName = teamInfo?.name ?? slugToTeamName(teamSlug);

  // Find squad
  const squad = seriesInfo?.squadList?.find((s) =>
    s.name.toLowerCase().includes(teamName.toLowerCase()) ||
    s.name.toLowerCase().includes(teamSlug.toLowerCase())
  );

  const players = (squad?.players ?? []).map((p) => ({
    id: p.id,
    name: p.name,
    role: p.role,
    country: p.country,
    img: p.playerImg,
  }));

  // Basic team stats from matches
  const matches = seriesInfo?.matchList ?? [];
  const teamMatches = matches.filter((m) =>
    m.teams.some((t) => t.toLowerCase().includes(teamName.toLowerCase()))
  );
  const won = teamMatches.filter((m) =>
    m.status.toLowerCase().includes('won') &&
    m.status.toLowerCase().includes(teamName.split(' ')[0].toLowerCase())
  ).length;

  const stats = [
    { label: 'Matches Played', value: teamMatches.length },
    { label: 'Wins', value: won },
    { label: 'Squad Size', value: players.length },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <TeamHeader teamName={teamName} teamInfo={teamInfo} year={year} img={squad?.img} />

      <div className="space-y-8">
        <section>
          <SectionHeader title="Season Overview" />
          <TeamStatsGrid stats={stats} />
        </section>

        <section>
          <SectionHeader title="Squad" subtitle={`IPL ${year} roster`} />
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <RosterTable players={players} year={year} />
          </div>
        </section>
      </div>
    </div>
  );
}
