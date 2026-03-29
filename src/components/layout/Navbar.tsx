import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-ipl-blue text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-ipl-gold font-bold text-xl">🏏</span>
            <span className="font-bold text-lg">IPL Dashboard</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/" className="hover:text-ipl-gold transition-colors text-sm">
              Seasons
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
