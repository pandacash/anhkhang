import { Player } from "@/types/app";
import { PlayerCard } from "./PlayerCard";
import { DiamondIcon } from "./icons/DiamondIcon";

interface PlayerSelectProps {
  players: Player[];
  onSelectPlayer: (player: Player) => void;
}

export const PlayerSelect = ({ players, onSelectPlayer }: PlayerSelectProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Title */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <DiamondIcon size={40} animate />
          <h1 className="text-4xl md:text-5xl font-display text-primary">
            Học Vui
          </h1>
          <DiamondIcon size={40} animate />
        </div>
        <p className="text-lg text-muted-foreground">
          Chọn tên của con để bắt đầu nào! 🎉
        </p>
      </div>
      
      {/* Player cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
        {players.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            onClick={() => onSelectPlayer(player)}
            showDiamonds
          />
        ))}
      </div>
      
      {/* Footer */}
      <p className="mt-12 text-sm text-muted-foreground">
        Làm đúng bài tập để nhận kim cương nhé! 💎
      </p>
    </div>
  );
};
