import { cn } from "@/lib/utils";
import { DailyStats } from "@/types/app";
import { BarChart3, TrendingUp } from "lucide-react";
import { DiamondIcon } from "./icons/DiamondIcon";

interface StatsChartProps {
  stats: DailyStats[];
  playerName: string;
}

export const StatsChart = ({ stats, playerName }: StatsChartProps) => {
  // Create last 7 days data
  const getLast7Days = () => {
    const days: DailyStats[] = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const existingStat = stats.find(s => s.date === dateStr);
      days.push({
        date: dateStr,
        diamonds: existingStat?.diamonds || 0
      });
    }
    return days;
  };

  const last7Days = getLast7Days();
  const maxDiamonds = Math.max(...last7Days.map(s => s.diamonds), 5);
  const totalDiamonds = last7Days.reduce((sum, s) => sum + s.diamonds, 0);
  
  // Get day name in Vietnamese
  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    return days[date.getDay()];
  };

  const isToday = (dateStr: string) => {
    return dateStr === new Date().toISOString().split('T')[0];
  };
  
  return (
    <div className="bg-card rounded-3xl p-6 shadow-kid border-2 border-border">
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 className="w-8 h-8 text-primary" />
        <h3 className="text-xl font-display text-foreground">
          Thống kê của {playerName}
        </h3>
      </div>
      
      {/* Bar Chart */}
      <div className="relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-8 w-8 flex flex-col justify-between text-xs text-muted-foreground">
          <span>{maxDiamonds}</span>
          <span>{Math.round(maxDiamonds / 2)}</span>
          <span>0</span>
        </div>
        
        {/* Chart area */}
        <div className="ml-10 h-48">
          {/* Grid lines */}
          <div className="absolute left-10 right-0 top-0 h-48">
            <div className="absolute top-0 left-0 right-0 border-t border-dashed border-border" />
            <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-border" />
            <div className="absolute bottom-0 left-0 right-0 border-t border-border" />
          </div>
          
          {/* Bars */}
          <div className="relative h-full flex items-end justify-between gap-2 px-2">
            {last7Days.map((stat, index) => {
              const heightPercent = maxDiamonds > 0 ? (stat.diamonds / maxDiamonds) * 100 : 0;
              const today = isToday(stat.date);
              const yesterday = index === last7Days.length - 2;
              
              return (
                <div key={stat.date} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  {/* Value label */}
                  {stat.diamonds > 0 && (
                    <div className={cn(
                      "text-sm font-bold flex items-center gap-1",
                      today ? "text-primary" : "text-foreground"
                    )}>
                      {stat.diamonds}
                    </div>
                  )}
                  
                  {/* Bar */}
                  <div
                    className={cn(
                      "w-full max-w-[40px] rounded-t-lg transition-all duration-500 relative",
                      today 
                        ? "bg-gradient-to-t from-primary to-primary/70" 
                        : "bg-gradient-to-t from-secondary to-secondary/70",
                      stat.diamonds === 0 && "bg-muted min-h-[4px]"
                    )}
                    style={{ 
                      height: stat.diamonds > 0 ? `${Math.max(heightPercent, 8)}%` : '4px',
                    }}
                  >
                    {/* Today indicator */}
                    {today && stat.diamonds > 0 && (
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                        <TrendingUp className="w-4 h-4 text-primary animate-bounce" />
                      </div>
                    )}
                  </div>
                  
                  {/* Day label */}
                  <span className={cn(
                    "text-xs font-medium mt-1",
                    today ? "text-primary font-bold" : "text-muted-foreground"
                  )}>
                    {today ? "Nay" : getDayName(stat.date)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Tổng tuần này:</span>
          <div className="flex items-center gap-2">
            <DiamondIcon size={24} animate />
            <span className="text-2xl font-bold text-foreground">{totalDiamonds}</span>
          </div>
        </div>
        
        {/* Motivation message */}
        {last7Days.length >= 2 && (
          <div className="mt-3 text-sm">
            {last7Days[last7Days.length - 1].diamonds > last7Days[last7Days.length - 2].diamonds ? (
              <p className="text-success flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Tuyệt vời! Hôm nay con làm tốt hơn hôm qua! 🎉
              </p>
            ) : last7Days[last7Days.length - 1].diamonds > 0 ? (
              <p className="text-muted-foreground">
                Cố gắng vượt qua {last7Days[last7Days.length - 2].diamonds} kim cương của hôm qua nhé! 💪
              </p>
            ) : (
              <p className="text-muted-foreground">
                Hãy làm bài tập để kiếm kim cương nào! ✨
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
