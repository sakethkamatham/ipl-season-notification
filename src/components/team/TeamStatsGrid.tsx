interface Stat {
  label: string;
  value: string | number;
}

interface TeamStatsGridProps {
  stats: Stat[];
}

export default function TeamStatsGrid({ stats }: TeamStatsGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-gray-50 rounded-lg p-4">
          <p className="text-xs text-gray-500 uppercase tracking-wide">{stat.label}</p>
          <p className="text-2xl font-bold text-ipl-blue mt-1">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
