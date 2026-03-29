import { IplTeam } from '@/lib/constants';

interface TeamHeaderProps {
  teamName: string;
  teamInfo?: IplTeam;
  year: number;
  img?: string;
}

export default function TeamHeader({ teamName, teamInfo, year, img }: TeamHeaderProps) {
  const bgColor = teamInfo?.primaryColor ?? '#004BA0';
  const textColor = teamInfo?.secondaryColor ?? '#FFB700';

  return (
    <div
      className="rounded-xl p-6 text-white mb-6"
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex items-center space-x-4">
        {img && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={img} alt={teamName} className="w-16 h-16 object-contain" />
        )}
        <div>
          <h1 className="text-2xl font-bold" style={{ color: textColor }}>
            {teamInfo?.name ?? teamName}
          </h1>
          <p className="text-sm opacity-80">IPL {year} Season</p>
        </div>
      </div>
    </div>
  );
}
