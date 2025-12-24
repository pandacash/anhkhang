import { cn } from "@/lib/utils";
import { DailyStats } from "@/types/app";
import { BarChart3 } from "lucide-react";
import { DiamondIcon } from "./icons/DiamondIcon";

interface StatsChartProps {
  stats: DailyStats[];
  playerName: string;
}

export const StatsChart = ({ stats, playerName }: StatsChartProps) => {
  const maxDiamonds = Math.max(...stats.map(s => s.diamonds), 1);
  
  // Get day name in Vietnamese
  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    return days[date.getDay()];
  };
  
  return (
    <div className="bg-card rounded-3xl p-6 shadow-kid border-2 border-border">
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 className="w-8 h-8 text-primary" />
        <h3 className="text-xl font-display text-foreground">
          Thống kê của {playerName}
        </h3>
      </div>
      
      {stats.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <DiamondIcon size={48} className="mx-auto mb-3 opacity-30" />
          <p>Chưa có dữ liệu thống kê</p>
          <p className="text-sm">Hãy làm bài tập để kiếm kim cương nhé!</p>
        </div>
      ) : (
        <div className="flex items-end justify-between gap-2 h-40">
          {stats.slice(-7).map((stat, index) => {
            const height = (stat.diamonds / maxDiamonds) * 100;
            
            return (
              <div key={stat.date} className="flex-1 flex flex-col items-center gap-2">
                {/* Bar */}
                <div className="relative w-full flex justify-center">
                  <div
                    className={cn(
                      "w-8 rounded-t-lg transition-all duration-500",
                      "bg-gradient-to-t from-primary to-primary/60"
                    )}
                    style={{ 
                      height: `${Math.max(height, 5)}%`,
                      animationDelay: `${index * 100}ms`
                    }}
                  />
                  {stat.diamonds > 0 && (
                    <div className="absolute -top-6 text-xs font-bold text-foreground">
                      {stat.diamonds}
                    </div>
                  )}
                </div>
                
                {/* Day label */}
                <span className="text-xs text-muted-foreground font-medium">
                  {getDayName(stat.date)}
                </span>
              </div>
            );
          })}
        </div>
      )}
      
      {/* Total */}
      {stats.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
          <span className="text-muted-foreground">Tổng 7 ngày gần nhất:</span>
          <div className="flex items-center gap-2">
            <DiamondIcon size={24} animate />
            <span className="text-xl font-bold text-foreground">
              {stats.slice(-7).reduce((sum, s) => sum + s.diamonds, 0)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
