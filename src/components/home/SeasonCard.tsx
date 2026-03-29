import Link from 'next/link';

interface SeasonCardProps {
  year: number;
  isCurrentYear?: boolean;
}

const CHAMPIONS: Record<number, string> = {
  2008: 'Rajasthan Royals',
  2009: 'Deccan Chargers',
  2010: 'Chennai Super Kings',
  2011: 'Chennai Super Kings',
  2012: 'Kolkata Knight Riders',
  2013: 'Mumbai Indians',
  2014: 'Kolkata Knight Riders',
  2015: 'Mumbai Indians',
  2016: 'Sunrisers Hyderabad',
  2017: 'Mumbai Indians',
  2018: 'Chennai Super Kings',
  2019: 'Mumbai Indians',
  2020: 'Mumbai Indians',
  2021: 'Chennai Super Kings',
  2022: 'Gujarat Titans',
  2023: 'Chennai Super Kings',
  2024: 'Kolkata Knight Riders',
};

export default function SeasonCard({ year, isCurrentYear }: SeasonCardProps) {
  const champion = CHAMPIONS[year];
  return (
    <Link
      href={`/${year}`}
      className="group relative bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-200 hover:border-ipl-blue transition-all duration-200 overflow-hidden"
    >
      <div className="bg-ipl-blue p-4">
        <span className="text-ipl-gold font-bold text-2xl">{year}</span>
        {isCurrentYear && (
          <span className="ml-2 bg-ipl-gold text-ipl-blue text-xs font-bold px-2 py-0.5 rounded-full">
            LIVE
          </span>
        )}
      </div>
      <div className="p-4">
        {champion ? (
          <>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Champion</p>
            <p className="text-sm font-semibold text-gray-900 mt-1">{champion}</p>
          </>
        ) : (
          <p className="text-sm text-gray-500">Season in progress</p>
        )}
      </div>
    </Link>
  );
}
