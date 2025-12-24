import { useState } from "react";
import { cn } from "@/lib/utils";
import { Player } from "@/types/app";
import { Button } from "./ui/button";
import { Gift, ArrowRight, Check, Star } from "lucide-react";
import { DiamondIcon } from "./icons/DiamondIcon";
import { ElephantAvatar } from "./icons/ElephantAvatar";
import { PandaAvatar } from "./icons/PandaAvatar";

interface RewardRedemptionProps {
  player: Player;
  onClose: () => void;
  onRedeem: (diamonds: number, voucherValue: number) => void;
}

const VOUCHER_TIERS = [
  { diamonds: 30, value: 30000, label: "30K" },
  { diamonds: 50, value: 50000, label: "50K" },
  { diamonds: 80, value: 80000, label: "80K" },
  { diamonds: 100, value: 100000, label: "100K" },
  { diamonds: 150, value: 150000, label: "150K" },
];

export const RewardRedemption = ({ player, onClose, onRedeem }: RewardRedemptionProps) => {
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [redeemed, setRedeemed] = useState(false);
  const isElephant = player.animal === 'elephant';

  const handleRedeem = () => {
    if (selectedTier !== null) {
      const tier = VOUCHER_TIERS[selectedTier];
      onRedeem(tier.diamonds, tier.value);
      setRedeemed(true);
    }
  };

  if (redeemed && selectedTier !== null) {
    const tier = VOUCHER_TIERS[selectedTier];
    const today = new Date().toLocaleDateString('vi-VN', { 
      day: '2-digit', 
      month: '2-digit',
      year: 'numeric'
    });
    
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-card rounded-3xl p-6 md:p-8 shadow-kid border-4 border-success max-w-md w-full text-center animate-pulse-success overflow-y-auto max-h-[90vh]">
          <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-success" />
          </div>
          
          <h2 className="text-2xl font-display text-success mb-6">
            🎉 Đổi thưởng thành công!
          </h2>
          
          {/* Voucher Card Preview */}
          <div className="relative overflow-hidden rounded-3xl p-1 bg-gradient-to-br from-warning via-accent to-warning mb-6">
            <div className="relative bg-gradient-to-br from-card via-card to-muted rounded-2xl p-5 border-2 border-dashed border-warning/50">
              {/* Corner decorations */}
              <div className="absolute top-2 left-2">
                <Star className="w-3 h-3 text-warning fill-warning" />
              </div>
              <div className="absolute top-2 right-2">
                <Star className="w-3 h-3 text-warning fill-warning" />
              </div>
              
              {/* Header */}
              <div className="text-center mb-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-warning/20 to-accent/20 rounded-full">
                  <Gift className="w-4 h-4 text-warning" />
                  <span className="font-display text-xs text-foreground">PHIẾU MUA ĐỒ CHƠI</span>
                  <Gift className="w-4 h-4 text-warning" />
                </div>
              </div>
              
              {/* Value */}
              <div className="text-center mb-3">
                <span className="text-3xl font-display bg-gradient-to-r from-warning via-accent to-warning bg-clip-text text-transparent">
                  {tier.value.toLocaleString('vi-VN')}đ
                </span>
                <div className="absolute top-1/3 right-4 animate-bounce">
                  <span className="text-xl">🎁</span>
                </div>
              </div>
              
              {/* Player name */}
              <div className="text-center mb-2">
                <p className="text-xs text-muted-foreground">Dành cho</p>
                <p className="font-bold text-foreground">{player.name}</p>
              </div>
              
              {/* Date */}
              <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                <span>📅 Ngày đổi: {today}</span>
              </div>
              
              {/* Sparkle animation */}
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-warning rounded-full animate-ping" />
              <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-accent rounded-full animate-ping delay-300" />
            </div>
          </div>
          
          <p className="text-muted-foreground mb-6 text-sm">
            🎊 {player.name} được mua một món đồ chơi có giá trị tối đa {tier.label}!
          </p>
          
          <Button onClick={onClose} className="w-full py-6 text-lg rounded-2xl bg-success hover:bg-success/90">
            Tuyệt vời! ✨
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-3xl p-6 md:p-8 shadow-kid border-2 border-border max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-block mb-4">
            {isElephant ? <ElephantAvatar size={80} /> : <PandaAvatar size={80} />}
          </div>
          <h2 className="text-2xl font-display text-foreground">
            🎁 Đổi Kim Cương Lấy Quà
          </h2>
          <p className="text-muted-foreground mt-2">
            {player.name} có <strong className="text-primary">{player.diamonds}</strong> kim cương
          </p>
        </div>

        {/* Current diamonds */}
        <div className="flex items-center justify-center gap-3 mb-6 p-4 bg-muted/50 rounded-2xl">
          <DiamondIcon size={32} animate />
          <span className="text-3xl font-bold text-foreground">{player.diamonds}</span>
        </div>

        {/* Voucher tiers */}
        <div className="space-y-3 mb-6">
          <p className="font-medium text-foreground flex items-center gap-2">
            <Star className="w-5 h-5 text-warning" />
            Chọn phiếu muốn đổi:
          </p>
          
          {VOUCHER_TIERS.map((tier, index) => {
            const canAfford = player.diamonds >= tier.diamonds;
            const isSelected = selectedTier === index;
            
            return (
              <button
                key={tier.diamonds}
                onClick={() => canAfford && setSelectedTier(index)}
                disabled={!canAfford}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-2xl border-3 transition-all",
                  canAfford && !isSelected && "border-border hover:border-primary bg-card",
                  canAfford && isSelected && "border-primary bg-primary/10",
                  !canAfford && "border-border bg-muted/30 opacity-50 cursor-not-allowed"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center",
                    canAfford ? "bg-warning/20" : "bg-muted"
                  )}>
                    <Gift className={cn(
                      "w-5 h-5",
                      canAfford ? "text-warning" : "text-muted-foreground"
                    )} />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-foreground">
                      Phiếu {tier.value.toLocaleString('vi-VN')}đ
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Mua đồ chơi tối đa {tier.label}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "font-bold",
                    canAfford ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {tier.diamonds}
                  </span>
                  <DiamondIcon size={20} />
                  {isSelected && (
                    <Check className="w-5 h-5 text-primary ml-2" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Progress to next tier */}
        {player.diamonds < VOUCHER_TIERS[0].diamonds && (
          <div className="bg-muted/50 rounded-2xl p-4 mb-6">
            <p className="text-sm text-muted-foreground text-center">
              Cần thêm <strong className="text-primary">{VOUCHER_TIERS[0].diamonds - player.diamonds}</strong> kim cương 
              để đổi phiếu đầu tiên!
            </p>
            <div className="mt-3 bg-border rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all"
                style={{ width: `${(player.diamonds / VOUCHER_TIERS[0].diamonds) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1 py-6 rounded-2xl">
            Để sau
          </Button>
          <Button 
            onClick={handleRedeem}
            disabled={selectedTier === null}
            className={cn(
              "flex-1 py-6 rounded-2xl gap-2",
              selectedTier !== null && "bg-success hover:bg-success/90"
            )}
          >
            Đổi ngay
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
