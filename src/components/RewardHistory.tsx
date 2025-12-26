import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Player } from "@/types/app";
import { Button } from "./ui/button";
import { ArrowLeft, History, Gift, AlertTriangle } from "lucide-react";
import { ElephantAvatar } from "./icons/ElephantAvatar";
import { PandaAvatar } from "./icons/PandaAvatar";
import { DiamondIcon } from "./icons/DiamondIcon";
import { supabase } from "@/integrations/supabase/client";

interface RewardHistoryProps {
  player: Player;
  onBack: () => void;
}

type AdminLog = {
  id: string;
  player_id: string;
  diamond_change: number;
  reason: string;
  created_at: string;
};

export const RewardHistory = ({ player, onBack }: RewardHistoryProps) => {
  const [logs, setLogs] = useState<AdminLog[]>([]);
  const [loading, setLoading] = useState(true);
  const isElephant = player.animal === 'elephant';

  useEffect(() => {
    fetchLogs();
  }, [player.id]);

  const fetchLogs = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('admin_logs')
      .select('*')
      .eq('player_id', player.id)
      .order('created_at', { ascending: false })
      .limit(50);
    
    if (data) {
      // Filter out translation help logs and shop purchases - these are not punishments
      const filteredLogs = (data as AdminLog[]).filter(
        log => !log.reason.includes('Sử dụng hỗ trợ dịch tiếng Anh') && 
               !log.reason.startsWith('Mua ')
      );
      setLogs(filteredLogs);
    }
    setLoading(false);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', { 
      day: '2-digit', 
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const rewards = logs.filter(l => l.diamond_change > 0);
  const punishments = logs.filter(l => l.diamond_change < 0);

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-5 h-5" />
          Quay lại
        </Button>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Player info */}
        <div className="text-center mb-8">
          <div className="inline-block">
            {isElephant ? (
              <ElephantAvatar size={80} />
            ) : (
              <PandaAvatar size={80} />
            )}
          </div>
          <h1 className={cn(
            "text-2xl font-display mt-3",
            isElephant ? "text-accent" : "text-secondary"
          )}>
            Lịch sử của {player.name}
          </h1>
          <p className="text-muted-foreground">Xem lại những lần được thưởng và phạt</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-muted-foreground">Đang tải...</p>
          </div>
        ) : logs.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-3xl shadow-kid border-2 border-border">
            <History className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">Chưa có lịch sử thưởng/phạt</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Summary */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-success/10 border-2 border-success/30 rounded-2xl p-4 text-center">
                <Gift className="w-8 h-8 text-success mx-auto mb-2" />
                <p className="text-2xl font-bold text-success">{rewards.length}</p>
                <p className="text-sm text-muted-foreground">Lần thưởng</p>
              </div>
              <div className="bg-destructive/10 border-2 border-destructive/30 rounded-2xl p-4 text-center">
                <AlertTriangle className="w-8 h-8 text-destructive mx-auto mb-2" />
                <p className="text-2xl font-bold text-destructive">{punishments.length}</p>
                <p className="text-sm text-muted-foreground">Lần phạt</p>
              </div>
            </div>

            {/* Logs list */}
            <div className="bg-card rounded-3xl p-6 shadow-kid border-2 border-border">
              <h3 className="font-display text-lg mb-4 text-foreground flex items-center gap-2">
                <History className="w-5 h-5" />
                Chi tiết
              </h3>
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {logs.map((log) => (
                  <div 
                    key={log.id}
                    className={cn(
                      "p-4 rounded-xl border-2",
                      log.diamond_change > 0 
                        ? "border-success/30 bg-success/5" 
                        : "border-destructive/30 bg-destructive/5"
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {log.diamond_change > 0 ? (
                            <Gift className="w-4 h-4 text-success" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-destructive" />
                          )}
                          <span className={cn(
                            "font-bold",
                            log.diamond_change > 0 ? "text-success" : "text-destructive"
                          )}>
                            {log.diamond_change > 0 ? "Được thưởng" : "Bị phạt"}
                          </span>
                        </div>
                        <p className="text-foreground">{log.reason}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {formatDate(log.created_at)}
                        </p>
                      </div>
                      <div className={cn(
                        "flex items-center gap-1 font-bold text-lg",
                        log.diamond_change > 0 ? "text-success" : "text-destructive"
                      )}>
                        {log.diamond_change > 0 ? "+" : ""}{log.diamond_change}
                        <DiamondIcon size={20} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
