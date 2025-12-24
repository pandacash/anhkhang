import { cn } from "@/lib/utils";
import { Player } from "@/types/app";
import { ElephantAvatar } from "./icons/ElephantAvatar";
import { PandaAvatar } from "./icons/PandaAvatar";
import { DiamondIcon } from "./icons/DiamondIcon";
import { Trophy } from "lucide-react";

interface LeaderboardProps {
  players: Player[];
}

export const Leaderboard = ({ players }: LeaderboardProps) => {
  const sortedPlayers = [...players].sort((a, b) => b.diamonds - a.diamonds);
  const leader = sortedPlayers[0];
  
  return (
    <div className="bg-card rounded-3xl p-6 shadow-kid border-2 border-border">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="w-8 h-8 text-warning" />
        <h3 className="text-xl font-display text-foreground">Bảng Xếp Hạng</h3>
      </div>
      
      <div className="space-y-4">
        {sortedPlayers.map((player, index) => {
          const isLeader = player.id === leader.id && players.length > 1 && leader.diamonds > 0;
          const isElephant = player.animal === 'elephant';
          
          return (
            <div
              key={player.id}
              className={cn(
                "flex items-center gap-4 p-4 rounded-2xl transition-all",
                isLeader 
                  ? "bg-gradient-to-r from-warning/20 to-warning/10 border-2 border-warning" 
                  : "bg-muted/50 border-2 border-transparent"
              )}
            >
              {/* Rank */}
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center font-bold",
                index === 0 ? "bg-warning text-warning-foreground" : "bg-muted-foreground/20 text-muted-foreground"
              )}>
                {index + 1}
              </div>
              
              {/* Avatar */}
              <div className="relative">
                {isElephant ? (
                  <ElephantAvatar size={50} />
                ) : (
                  <PandaAvatar size={50} />
                )}
                {isLeader && (
                  <div className="absolute -top-2 -right-2 text-lg">👑</div>
                )}
              </div>
              
              {/* Name */}
              <div className="flex-1">
                <p className="font-bold text-foreground">{player.name}</p>
                <p className="text-sm text-muted-foreground">Lớp {player.grade}</p>
              </div>
              
              {/* Diamonds */}
              <div className="flex items-center gap-2">
                <DiamondIcon size={20} animate={isLeader} />
                <span className="font-bold text-foreground">{player.diamonds}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
