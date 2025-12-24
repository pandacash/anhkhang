import { useState } from "react";
import { cn } from "@/lib/utils";
import { Player, Subject, DailyStats } from "@/types/app";
import { SubjectButton } from "./SubjectButton";
import { DiamondCounter } from "./DiamondCounter";
import { Leaderboard } from "./Leaderboard";
import { StatsChart } from "./StatsChart";
import { ElephantAvatar } from "./icons/ElephantAvatar";
import { PandaAvatar } from "./icons/PandaAvatar";
import { Button } from "./ui/button";
import { ArrowLeft, History } from "lucide-react";

interface DashboardProps {
  player: Player;
  allPlayers: Player[];
  stats: DailyStats[];
  onSelectSubject: (subject: Subject) => void;
  onBack: () => void;
  onViewHistory: () => void;
}

export const Dashboard = ({ 
  player, 
  allPlayers,
  stats,
  onSelectSubject, 
  onBack,
  onViewHistory
}: DashboardProps) => {
  const isElephant = player.animal === 'elephant';
  
  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Đổi người chơi
        </Button>
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onViewHistory}
            className="gap-2"
          >
            <History className="w-4 h-4" />
            Lịch sử
          </Button>
          <DiamondCounter count={player.diamonds} size="lg" />
        </div>
      </div>
      
      {/* Welcome section */}
      <div className="text-center mb-8">
        <div className="inline-block animate-bounce-gentle">
          {isElephant ? (
            <ElephantAvatar size={100} />
          ) : (
            <PandaAvatar size={100} />
          )}
        </div>
        <h1 className={cn(
          "text-3xl md:text-4xl font-display mt-4",
          isElephant ? "text-accent" : "text-secondary"
        )}>
          Chào {player.name}! 👋
        </h1>
        <p className="text-muted-foreground mt-2">
          Lớp {player.grade} • Hôm nay bạn muốn học gì?
        </p>
      </div>
      
      {/* Subject selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
        <SubjectButton 
          subject="math" 
          onClick={() => onSelectSubject('math')} 
        />
        <SubjectButton 
          subject="english" 
          onClick={() => onSelectSubject('english')} 
        />
      </div>
      
      {/* Stats and Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <StatsChart stats={stats} playerName={player.name} />
        <Leaderboard players={allPlayers} />
      </div>
    </div>
  );
};
