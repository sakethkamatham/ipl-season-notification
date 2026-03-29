import { PlayerDetail } from '@/types/domain';
import Badge from '@/components/ui/Badge';

interface PlayerHeaderProps {
  player: PlayerDetail;
}

export default function PlayerHeader({ player }: PlayerHeaderProps) {
  return (
    <div className="bg-ipl-blue text-white rounded-xl p-6 mb-6">
      <div className="flex items-center space-x-4">
        {player.img && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={player.img}
            alt={player.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-ipl-gold"
          />
        )}
        <div>
          <h1 className="text-2xl font-bold text-ipl-gold">{player.name}</h1>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {player.role && <Badge variant="info">{player.role}</Badge>}
            {player.country && <span className="text-sm opacity-80">{player.country}</span>}
            {player.battingStyle && (
              <span className="text-xs opacity-70">{player.battingStyle}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
