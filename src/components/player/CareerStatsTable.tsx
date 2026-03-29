import { CareerStatRow } from '@/types/domain';

interface CareerStatsTableProps {
  stats: CareerStatRow[];
}

export default function CareerStatsTable({ stats }: CareerStatsTableProps) {
  if (!stats.length) {
    return <p className="text-gray-500 text-sm">Career stats not available.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Format</th>
            <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">M</th>
            <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Inn</th>
            <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Runs</th>
            <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Avg</th>
            <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">SR</th>
            <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Wkts</th>
            <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Eco</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {stats.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="px-4 py-2 font-medium">{row.matchType}</td>
              <td className="px-4 py-2 text-center">{row.matches}</td>
              <td className="px-4 py-2 text-center">{row.innings}</td>
              <td className="px-4 py-2 text-center">{row.runs ?? '-'}</td>
              <td className="px-4 py-2 text-center">{row.average ?? '-'}</td>
              <td className="px-4 py-2 text-center">{row.strikeRate ?? '-'}</td>
              <td className="px-4 py-2 text-center">{row.wickets ?? '-'}</td>
              <td className="px-4 py-2 text-center">{row.economy ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
