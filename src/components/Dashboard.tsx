import { useState } from "react";
import { cn } from "@/lib/utils";
import { Player, Subject, DailyStats } from "@/types/app";
import { SubjectButton } from "./SubjectButton";
import { DiamondCounter } from "./DiamondCounter";
import { Leaderboard } from "./Leaderboard";
import { StatsChart } from "./StatsChart";
import { RewardRedemption } from "./RewardRedemption";
import { PunishmentRulesTable } from "./PunishmentRulesTable";
import { RewardRulesTable } from "./RewardRulesTable";
import { ElephantAvatar } from "./icons/ElephantAvatar";
import { PandaAvatar } from "./icons/PandaAvatar";
import { PetStatusBars } from "./PetStatusBars";
import { Button } from "./ui/button";
import { ArrowLeft, History, Gift, ShoppingBag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Shop } from "./shop/Shop";
import { usePlayerItems } from "@/hooks/usePlayerItems";
import { usePetStatus } from "@/hooks/usePetStatus";
import { AvatarChat } from "./AvatarChat";

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
  const [showShop, setShowShop] = useState(false);
  const { toast } = useToast();
  const isElephant = player.animal === 'elephant';
  const { equippedItems, refetch: refetchItems } = usePlayerItems(player.id);
  const { status: petStatus, refetch: refetchPetStatus } = usePetStatus(player.id);

  const handleRedeem = async (diamonds: number, voucherValue: number) => {
    const { error: rpcError } = await supabase.rpc('apply_player_diamond_delta', {
      p_player_id: player.id,
      p_change: -diamonds
    });

    if (rpcError) {
      toast({
        title: "Lỗi",
        description: "Không thể đổi thưởng. Vui lòng thử lại.",
        variant: "destructive"
      });
      return;
    }

    await supabase.from('voucher_redemptions').insert({
      player_id: player.id,
      diamonds_spent: diamonds,
      voucher_value: voucherValue
    });

    await supabase.from('admin_logs').insert({
      player_id: player.id,
      diamond_change: -diamonds,
      reason: `Đổi phiếu ${voucherValue.toLocaleString('vi-VN')}đ`
    });

    toast({
      title: "🎉 Đổi thưởng thành công!",
      description: `Đã đổi ${diamonds} kim cương lấy phiếu ${voucherValue.toLocaleString('vi-VN')}đ`,
    });

    onPlayerUpdate();
  };

  const handlePlayerUpdate = () => {
    onPlayerUpdate();
    refetchItems();
    refetchPetStatus();
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

      <Shop 
        player={player}
        open={showShop}
        onClose={() => setShowShop(false)}
        onPlayerUpdate={handlePlayerUpdate}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
        <Button variant="ghost" onClick={onBack} className="gap-2">
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
            Lịch sử
          </Button>
          <Button
            size="sm"
            onClick={() => setShowShop(true)}
            className={cn(
              "gap-2",
              "bg-gradient-to-r from-secondary to-primary",
              "hover:from-secondary/90 hover:to-primary/90",
              "text-white font-bold shadow-lg"
            )}
          >
            <ShoppingBag className="w-5 h-5" />
            🛒 Cửa hàng
          </Button>
          <Button
            size="sm"
            onClick={() => setShowRedemption(true)}
            className={cn(
              "gap-2 relative overflow-hidden",
              "bg-gradient-to-r from-warning via-accent to-warning",
              "hover:from-warning/90 hover:via-accent/90 hover:to-warning/90",
              "text-white font-bold shadow-lg",
              "animate-pulse border-2 border-warning/50"
            )}
          >
            <Gift className="w-5 h-5 animate-bounce" />
            🎁 Đổi Quà
          </Button>
          <DiamondCounter count={player.diamonds} size="lg" />
        </div>
      </div>
      
      {/* Welcome section */}
      <div className="text-center mb-8">
        <div className="flex items-start justify-center gap-2">
          <div className={cn(
            "inline-block",
            petStatus.isSick ? "animate-pulse" : "animate-bounce-gentle"
          )}>
            {isElephant ? (
              <ElephantAvatar 
                size={120} 
                equippedItems={equippedItems.map(e => e.item)} 
                isSad={petStatus.currentHunger < 30 || petStatus.currentThirst < 30 || petStatus.isSick}
              />
            ) : (
              <PandaAvatar 
                size={120} 
                equippedItems={equippedItems.map(e => e.item)} 
                isSad={petStatus.currentHunger < 30 || petStatus.currentThirst < 30 || petStatus.isSick}
              />
            )}
          </div>
          <AvatarChat 
            playerName={player.name} 
            animalType={isElephant ? 'elephant' : 'panda'}
            hunger={petStatus.currentHunger}
            thirst={petStatus.currentThirst}
            isSick={petStatus.isSick}
          />
        </div>
        
        {/* Pet status bars */}
        <div className="max-w-md mx-auto mt-4">
          <PetStatusBars 
            hunger={petStatus.currentHunger} 
            thirst={petStatus.currentThirst} 
            isSick={petStatus.isSick}
          />
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
        <SubjectButton subject="math" onClick={() => onSelectSubject('math')} />
        <SubjectButton subject="english" onClick={() => onSelectSubject('english')} />
      </div>
      
      {/* Stats and Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
        <StatsChart stats={stats} playerName={player.name} />
        <Leaderboard players={allPlayers} />
      </div>

      {/* Rules Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <RewardRulesTable />
        <PunishmentRulesTable />
      </div>
    </div>
  );
};
