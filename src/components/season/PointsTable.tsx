import Link from 'next/link';
import { StandingsRow } from '@/types/domain';

interface PointsTableProps {
  standings: StandingsRow[];
  year: number;
}

export default function PointsTable({ standings, year }: PointsTableProps) {
  if (!standings.length) {
    return <p className="text-gray-500 text-sm">Standings not available for this season.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="bg-ipl-blue text-white text-sm">
            <th className="px-3 py-3 text-left">#</th>
            <th className="px-3 py-3 text-left">Team</th>
            <th className="px-3 py-3 text-center">P</th>
            <th className="px-3 py-3 text-center">W</th>
            <th className="px-3 py-3 text-center">L</th>
            <th className="px-3 py-3 text-center">Pts</th>
            <th className="px-3 py-3 text-center">NRR</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((row) => (
            <tr
              key={row.teamId}
              className={`border-b border-gray-100 hover:bg-gray-50 ${
                row.qualified ? 'border-l-4 border-l-green-500' : ''
              }`}
            >
              <td className="px-3 py-3 text-sm text-gray-500">{row.rank}</td>
              <td className="px-3 py-3">
                <Link
                  href={`/${year}/teams/${row.teamSlug}`}
                  className="flex items-center space-x-2 hover:text-ipl-blue"
                >
                  {row.teamImg && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={row.teamImg} alt={row.teamShortName} className="w-6 h-6 object-contain" />
                  )}
                  <span className="font-medium text-sm">{row.teamName}</span>
                </Link>
              </td>
              <td className="px-3 py-3 text-center text-sm">{row.played}</td>
              <td className="px-3 py-3 text-center text-sm text-green-600 font-medium">{row.won}</td>
              <td className="px-3 py-3 text-center text-sm text-red-500">{row.lost}</td>
              <td className="px-3 py-3 text-center text-sm font-bold">{row.points}</td>
              <td className={`px-3 py-3 text-center text-sm font-mono ${row.nrr >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                {row.nrrFormatted}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-gray-400 mt-2 px-3">Green border = qualified for playoffs (top 4)</p>
    </div>
  );
}
