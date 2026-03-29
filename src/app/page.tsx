import YearSelector from '@/components/home/YearSelector';
import { IPL_YEARS } from '@/lib/constants';

export default function HomePage() {
  return (
    <div>
      <section className="bg-ipl-blue text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-ipl-gold mb-4">IPL Dashboard</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Explore every IPL season from 2008 to 2025. View standings, match results,
            team rosters, and player statistics.
          </p>
        </div>
      </section>
      <YearSelector years={IPL_YEARS} />
    </div>
  );
}
