import { useState } from "react";
import { cn } from "@/lib/utils";
import { Player, Subject, DailyStats } from "@/types/app";
import { SubjectButton } from "./SubjectButton";
import { DiamondCounter } from "./DiamondCounter";
import { Leaderboard } from "./Leaderboard";
import { StatsChart } from "./StatsChart";
import { RewardRedemption } from "./RewardRedemption";
import { ElephantAvatar } from "./icons/ElephantAvatar";
import { PandaAvatar } from "./icons/PandaAvatar";
import { Button } from "./ui/button";
import { ArrowLeft, History, Gift } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface DashboardProps {
  player: Player;
  allPlayers: Player[];
  stats: DailyStats[];
  onSelectSubject: (subject: Subject) => void;
  onBack: () => void;
  onViewHistory: () => void;
  onPlayerUpdate: () => void;
}

export const Dashboard = ({ 
  player, 
  allPlayers,
  stats,
  onSelectSubject, 
  onBack,
  onViewHistory,
  onPlayerUpdate
}: DashboardProps) => {
  const [showRedemption, setShowRedemption] = useState(false);
  const { toast } = useToast();
  const isElephant = player.animal === 'elephant';

  const handleRedeem = async (diamonds: number, voucherValue: number) => {
    const newDiamonds = player.diamonds - diamonds;
    
    // Update player diamonds
    await supabase.from('players')
      .update({ diamonds: newDiamonds })
      .eq('id', player.id);

    // Log redemption
    await supabase.from('voucher_redemptions').insert({
      player_id: player.id,
      diamonds_spent: diamonds,
      voucher_value: voucherValue
    });

    toast({
      title: "🎉 Đổi thưởng thành công!",
      description: `Đã đổi ${diamonds} kim cương lấy phiếu ${voucherValue.toLocaleString('vi-VN')}đ`,
    });

    onPlayerUpdate();
  };
  
  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      {showRedemption && (
        <RewardRedemption
          player={player}
          onClose={() => setShowRedemption(false)}
          onRedeem={handleRedeem}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
        <Button
          variant="ghost"
          onClick={onBack}
          className="gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Đổi người chơi
        </Button>
        
        <div className="flex items-center gap-3 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={onViewHistory}
            className="gap-2"
          >
            <History className="w-4 h-4" />
            Lịch sử thưởng phạt
          </Button>
          <Button
            size="sm"
            onClick={() => setShowRedemption(true)}
            className={cn(
              "gap-2 relative overflow-hidden",
              "bg-gradient-to-r from-warning via-accent to-warning",
              "hover:from-warning/90 hover:via-accent/90 hover:to-warning/90",
              "text-white font-bold shadow-lg",
              "animate-pulse border-2 border-warning/50",
              "hover:scale-105 transition-transform"
            )}
          >
            <Gift className="w-5 h-5 animate-bounce" />
            🎁 Đổi Quà
            <span className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" />
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
