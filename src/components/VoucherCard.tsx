import { cn } from "@/lib/utils";
import { Gift, Calendar, Sparkles, Star } from "lucide-react";

interface VoucherCardProps {
  value: number;
  redeemedAt: string;
  playerName: string;
  used?: boolean;
  compact?: boolean;
  className?: string;
}

export const VoucherCard = ({ value, redeemedAt, playerName, used = false, compact = false, className }: VoucherCardProps) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', { 
      day: '2-digit', 
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (compact) {
    return (
      <div className={cn(
        "relative overflow-hidden rounded-2xl p-0.5 bg-gradient-to-br from-warning via-accent to-warning",
        used && "opacity-50",
        className
      )}>
        <div className="relative bg-gradient-to-br from-card via-card to-muted rounded-xl p-3 border border-dashed border-warning/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-warning" />
              <span className="font-display text-lg bg-gradient-to-r from-warning to-accent bg-clip-text text-transparent">
                {value.toLocaleString('vi-VN')}đ
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(redeemedAt)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "relative overflow-hidden rounded-3xl p-1",
      "bg-gradient-to-br from-warning via-accent to-warning",
      used && "opacity-50 grayscale",
      className
    )}>
      {/* Decorative border pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-2 bg-[repeating-linear-gradient(90deg,transparent,transparent_10px,hsl(var(--background))_10px,hsl(var(--background))_12px)]" />
        <div className="absolute bottom-0 left-0 w-full h-2 bg-[repeating-linear-gradient(90deg,transparent,transparent_10px,hsl(var(--background))_10px,hsl(var(--background))_12px)]" />
      </div>
      
      <div className="relative bg-gradient-to-br from-card via-card to-muted rounded-2xl p-6 border-2 border-dashed border-warning/50">
        {/* Corner decorations */}
        <div className="absolute top-2 left-2">
          <Star className="w-4 h-4 text-warning fill-warning" />
        </div>
        <div className="absolute top-2 right-2">
          <Star className="w-4 h-4 text-warning fill-warning" />
        </div>
        <div className="absolute bottom-2 left-2">
          <Sparkles className="w-4 h-4 text-accent" />
        </div>
        <div className="absolute bottom-2 right-2">
          <Sparkles className="w-4 h-4 text-accent" />
        </div>
        
        {/* Header */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-gradient-to-r from-warning/20 to-accent/20 rounded-full mb-2">
            <Gift className="w-5 h-5 text-warning" />
            <span className="font-display text-sm text-foreground">PHIẾU MUA ĐỒ CHƠI</span>
            <Gift className="w-5 h-5 text-warning" />
          </div>
        </div>
        
        {/* Value */}
        <div className="text-center mb-4">
          <div className="relative inline-block">
            <span className="text-4xl md:text-5xl font-display bg-gradient-to-r from-warning via-accent to-warning bg-clip-text text-transparent">
              {value.toLocaleString('vi-VN')}đ
            </span>
            {!used && (
              <div className="absolute -top-2 -right-4 animate-bounce">
                <span className="text-2xl">🎁</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Player name */}
        <div className="text-center mb-4">
          <p className="text-muted-foreground text-sm">Dành cho</p>
          <p className="font-bold text-lg text-foreground">{playerName}</p>
        </div>
        
        {/* Date */}
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>Ngày đổi: {formatDate(redeemedAt)}</span>
        </div>
        
        {/* Status badge */}
        {used && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60 rounded-2xl">
            <div className="bg-muted px-6 py-3 rounded-2xl border-2 border-border transform -rotate-12">
              <span className="font-display text-xl text-muted-foreground">ĐÃ SỬ DỤNG</span>
            </div>
          </div>
        )}
        
        {/* Sparkle animation */}
        {!used && (
          <>
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-warning rounded-full animate-ping" />
            <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-accent rounded-full animate-ping delay-300" />
            <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-warning rounded-full animate-ping delay-500" />
          </>
        )}
      </div>
    </div>
  );
};
