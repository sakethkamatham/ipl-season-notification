import Link from 'next/link';
import { PlayerSummary } from '@/types/domain';

interface RosterTableProps {
  players: PlayerSummary[];
  year: number;
}

export default function RosterTable({ players, year }: RosterTableProps) {
  if (!players.length) {
    return <p className="text-gray-500 text-sm">Squad information not available.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Player</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Country</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {players.map((player) => (
            <tr key={player.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">
                <Link href={`/${year}/players/${player.id}`} className="flex items-center space-x-3 hover:text-ipl-blue">
                  {player.img && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={player.img} alt={player.name} className="w-8 h-8 rounded-full object-cover" />
                  )}
                  <span className="font-medium text-sm">{player.name}</span>
                </Link>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">{player.role ?? '-'}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{player.country ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
