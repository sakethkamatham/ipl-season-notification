export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm">
          IPL Dashboard — Powered by{' '}
          <span className="text-ipl-gold">CricAPI</span>
        </p>
        <p className="text-xs mt-2">
          Data provided by cricketdata.org. Not affiliated with BCCI or IPL.
        </p>
      </div>
    </footer>
  );
}
