import { cn } from "@/lib/utils";
import { Utensils, Droplets, AlertTriangle } from "lucide-react";
import { Progress } from "./ui/progress";

interface PetStatusBarsProps {
  hunger: number;
  thirst: number;
  isSick: boolean;
  compact?: boolean;
}

export const PetStatusBars = ({ hunger, thirst, isSick, compact = false }: PetStatusBarsProps) => {
  const getHungerColor = (value: number) => {
    if (value > 60) return "bg-success";
    if (value > 30) return "bg-warning";
    return "bg-destructive";
  };

  const getThirstColor = (value: number) => {
    if (value > 60) return "bg-blue-500";
    if (value > 30) return "bg-warning";
    return "bg-destructive";
  };

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        {isSick && (
          <div className="flex items-center gap-1 text-destructive animate-pulse">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-xs font-bold">Ốm!</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <Utensils className={cn("w-4 h-4", hunger < 30 ? "text-destructive animate-pulse" : "text-success")} />
          <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className={cn("h-full transition-all", getHungerColor(hunger))}
              style={{ width: `${hunger}%` }}
            />
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Droplets className={cn("w-4 h-4", thirst < 30 ? "text-destructive animate-pulse" : "text-blue-500")} />
          <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className={cn("h-full transition-all", getThirstColor(thirst))}
              style={{ width: `${thirst}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "p-4 rounded-2xl border-2",
      isSick 
        ? "bg-destructive/10 border-destructive/30 animate-pulse" 
        : "bg-card border-border"
    )}>
      {isSick && (
        <div className="flex items-center gap-2 text-destructive mb-3 justify-center">
          <AlertTriangle className="w-5 h-5" />
          <span className="font-bold">Thú cưng đang ốm! Hãy cho ăn/uống ngay!</span>
        </div>
      )}
      
      <div className="space-y-3">
        {/* Hunger bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Utensils className={cn(
                "w-5 h-5",
                hunger < 30 ? "text-destructive animate-bounce" : "text-success"
              )} />
              <span className="font-medium text-sm">No bụng</span>
            </div>
            <span className={cn(
              "text-sm font-bold",
              hunger < 30 ? "text-destructive" : hunger < 60 ? "text-warning" : "text-success"
            )}>
              {hunger}%
            </span>
          </div>
          <Progress 
            value={hunger} 
            className="h-3"
            indicatorClassName={getHungerColor(hunger)}
          />
        </div>

        {/* Thirst bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className={cn(
                "w-5 h-5",
                thirst < 30 ? "text-destructive animate-bounce" : "text-blue-500"
              )} />
              <span className="font-medium text-sm">Khát nước</span>
            </div>
            <span className={cn(
              "text-sm font-bold",
              thirst < 30 ? "text-destructive" : thirst < 60 ? "text-warning" : "text-blue-500"
            )}>
              {thirst}%
            </span>
          </div>
          <Progress 
            value={thirst} 
            className="h-3"
            indicatorClassName={getThirstColor(thirst)}
          />
        </div>
      </div>
    </div>
  );
};
