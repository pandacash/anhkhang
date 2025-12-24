import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Player } from "@/types/app";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { ArrowLeft, Lock, Plus, Minus, History, Shield, Gift, Trash2, Calendar, RotateCcw, AlertTriangle } from "lucide-react";
import { ElephantAvatar } from "./icons/ElephantAvatar";
import { PandaAvatar } from "./icons/PandaAvatar";
import { DiamondIcon } from "./icons/DiamondIcon";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AdminPanelProps {
  players: Player[];
  onBack: () => void;
  onActionComplete: () => void;
}

const ADMIN_PASSWORD = "2305";

type AdminLog = {
  id: string;
  player_id: string;
  diamond_change: number;
  reason: string;
  created_at: string;
};

type VoucherRedemption = {
  id: string;
  player_id: string;
  voucher_value: number;
  redeemed_at: string;
  used: boolean;
};

export const AdminPanel = ({ players, onBack, onActionComplete }: AdminPanelProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [diamondChange, setDiamondChange] = useState<number>(1);
  const [reason, setReason] = useState("");
  const [isReward, setIsReward] = useState(true);
  const [logs, setLogs] = useState<AdminLog[]>([]);
  const [vouchers, setVouchers] = useState<VoucherRedemption[]>([]);
  const [showLogs, setShowLogs] = useState(false);
  const [showVouchers, setShowVouchers] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showResetHistoryDialog, setShowResetHistoryDialog] = useState(false);
  const [showResetAllDialog, setShowResetAllDialog] = useState(false);
  const { toast } = useToast();

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError(false);
      fetchLogs();
    } else {
      setPasswordError(true);
    }
  };

  const fetchLogs = async () => {
    const { data } = await supabase
      .from('admin_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);
    
    if (data) {
      setLogs(data as AdminLog[]);
    }
  };

  const fetchVouchers = async () => {
    const { data } = await supabase
      .from('voucher_redemptions')
      .select('*')
      .eq('used', false)
      .order('redeemed_at', { ascending: false });
    
    if (data) {
      setVouchers(data as VoucherRedemption[]);
    }
  };

  const handleMarkUsed = async (voucherId: string) => {
    await supabase
      .from('voucher_redemptions')
      .update({ used: true, used_at: new Date().toISOString() })
      .eq('id', voucherId);
    
    toast({ title: "Đã đánh dấu phiếu đã sử dụng!" });
    fetchVouchers();
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchLogs();
      fetchVouchers();
    }
  }, [isAuthenticated]);

  const handleResetDiamonds = async (player: Player) => {
    if (!confirm(`Bạn có chắc muốn reset kim cương của ${player.name} về 0?`)) {
      return;
    }

    setLoading(true);
    try {
      // Use atomic RPC to reset diamonds safely
      await supabase.rpc('apply_player_diamond_delta', {
        p_player_id: player.id,
        p_change: -player.diamonds
      });

      await supabase.from('admin_logs').insert({
        player_id: player.id,
        diamond_change: -player.diamonds,
        reason: 'Reset kim cương về 0'
      });

      toast({
        title: "Đã reset!",
        description: `${player.name} đã được reset về 0 kim cương`,
      });

      onActionComplete();
      fetchLogs();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Lỗi",
        description: "Không thể reset. Vui lòng thử lại.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedPlayer || !reason.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng chọn người chơi và nhập lý do",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    const change = isReward ? diamondChange : -diamondChange;

    try {
      // Use atomic RPC to update diamonds safely
      await supabase.rpc('apply_player_diamond_delta', {
        p_player_id: selectedPlayer.id,
        p_change: change
      });

      // Log the action
      await supabase.from('admin_logs').insert({
        player_id: selectedPlayer.id,
        diamond_change: change,
        reason: reason.trim()
      });

      toast({
        title: isReward ? "Đã thưởng!" : "Đã phạt!",
        description: `${selectedPlayer.name} ${isReward ? "+" : ""}${change} kim cương`,
      });

      // Reset form
      setSelectedPlayer(null);
      setReason("");
      setDiamondChange(1);
      onActionComplete();
      fetchLogs();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Lỗi",
        description: "Không thể thực hiện. Vui lòng thử lại.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetHistory = async () => {
    setShowResetHistoryDialog(false);
    setLoading(true);
    try {
      await supabase.from('admin_logs').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      toast({
        title: "Đã xóa!",
        description: "Lịch sử thưởng/phạt đã được xóa",
      });
      
      setLogs([]);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Lỗi",
        description: "Không thể xóa lịch sử. Vui lòng thử lại.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetAll = async () => {
    setShowResetAllDialog(false);
    setLoading(true);
    try {
      // Reset all players' diamonds to 0 using atomic RPC
      for (const player of players) {
        if (player.diamonds > 0) {
          await supabase.rpc('apply_player_diamond_delta', {
            p_player_id: player.id,
            p_change: -player.diamonds
          });
        }
      }
      
      // Delete all admin logs
      await supabase.from('admin_logs').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      // Delete all daily stats
      await supabase.from('daily_stats').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      // Delete all voucher redemptions
      await supabase.from('voucher_redemptions').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      toast({
        title: "Đã reset toàn bộ!",
        description: "Tất cả dữ liệu đã được xóa và kim cương đã reset về 0",
      });
      
      setLogs([]);
      setVouchers([]);
      onActionComplete();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Lỗi",
        description: "Không thể reset. Vui lòng thử lại.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getPlayerName = (playerId: string) => {
    return players.find(p => p.id === playerId)?.name || "Unknown";
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', { 
      day: '2-digit', 
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="bg-card rounded-3xl p-8 shadow-kid border-2 border-border max-w-sm w-full">
          <div className="text-center mb-6">
            <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-2xl font-display text-foreground">Admin Panel</h1>
            <p className="text-muted-foreground mt-2">Nhập mật khẩu để tiếp tục</p>
          </div>
          
          <div className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError(false);
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className={cn(
                  "pl-10 text-lg py-6 rounded-xl",
                  passwordError && "border-destructive"
                )}
              />
            </div>
            
            {passwordError && (
              <p className="text-destructive text-sm text-center">Mật khẩu không đúng!</p>
            )}
            
            <Button 
              onClick={handleLogin}
              className="w-full py-6 text-lg rounded-xl"
            >
              Đăng nhập
            </Button>
            
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="w-full"
            >
              ← Quay lại
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-5 h-5" />
          Thoát Admin
        </Button>
        
        <Button 
          variant="outline" 
          onClick={() => { setShowVouchers(!showVouchers); setShowLogs(false); }}
          className="gap-2"
        >
          <Gift className="w-5 h-5" />
          Phiếu ({vouchers.length})
        </Button>
        <Button 
          variant="outline" 
          onClick={() => { setShowLogs(!showLogs); setShowVouchers(false); }}
          className="gap-2"
        >
          <History className="w-5 h-5" />
          {showLogs ? "Ẩn lịch sử" : "Xem lịch sử"}
        </Button>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display text-primary">🔧 Admin Panel</h1>
          <p className="text-muted-foreground">Thưởng hoặc phạt kim cương cho các bé</p>
        </div>

        {/* Player selection */}
        <div className="bg-card rounded-3xl p-6 shadow-kid border-2 border-border">
          <h3 className="font-display text-lg mb-4 text-foreground">1. Chọn người chơi</h3>
          <div className="grid grid-cols-2 gap-4">
            {players.map((player) => {
              const isSelected = selectedPlayer?.id === player.id;
              const isElephant = player.animal === 'elephant';
              
              return (
                <div key={player.id} className="relative">
                  <button
                    onClick={() => setSelectedPlayer(player)}
                    className={cn(
                      "w-full flex flex-col items-center p-4 rounded-2xl transition-all border-3",
                      isSelected 
                        ? (isElephant ? "border-accent bg-accent/10" : "border-secondary bg-secondary/10")
                        : "border-border bg-muted/30 hover:border-primary"
                    )}
                  >
                    {isElephant ? (
                      <ElephantAvatar size={60} />
                    ) : (
                      <PandaAvatar size={60} />
                    )}
                    <span className="font-bold mt-2 text-foreground">{player.name}</span>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <DiamondIcon size={14} />
                      <span>{player.diamonds}</span>
                    </div>
                  </button>
                  {player.diamonds > 0 && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleResetDiamonds(player);
                      }}
                      className="absolute -top-2 -right-2 h-8 w-8 p-0 rounded-full bg-destructive/10 hover:bg-destructive/20 text-destructive"
                      title="Reset kim cương"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Action type */}
        <div className="bg-card rounded-3xl p-6 shadow-kid border-2 border-border">
          <h3 className="font-display text-lg mb-4 text-foreground">2. Chọn hành động</h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setIsReward(true)}
              className={cn(
                "flex items-center justify-center gap-3 p-4 rounded-2xl border-3 transition-all",
                isReward 
                  ? "border-success bg-success/20 text-success" 
                  : "border-border hover:border-success"
              )}
            >
              <Plus className="w-6 h-6" />
              <span className="font-bold text-lg">Thưởng</span>
            </button>
            <button
              onClick={() => setIsReward(false)}
              className={cn(
                "flex items-center justify-center gap-3 p-4 rounded-2xl border-3 transition-all",
                !isReward 
                  ? "border-destructive bg-destructive/20 text-destructive" 
                  : "border-border hover:border-destructive"
              )}
            >
              <Minus className="w-6 h-6" />
              <span className="font-bold text-lg">Phạt</span>
            </button>
          </div>
        </div>

        {/* Diamond amount */}
        <div className="bg-card rounded-3xl p-6 shadow-kid border-2 border-border">
          <h3 className="font-display text-lg mb-4 text-foreground">3. Số kim cương</h3>
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setDiamondChange(Math.max(1, diamondChange - 1))}
              className="w-12 h-12 rounded-xl"
            >
              <Minus className="w-6 h-6" />
            </Button>
            <div className="flex items-center gap-2 bg-muted rounded-xl">
              <span className={cn(
                "text-xl font-bold px-2",
                isReward ? "text-success" : "text-destructive"
              )}>
                {isReward ? "+" : "-"}
              </span>
              <Input
                type="number"
                min={1}
                value={diamondChange}
                onChange={(e) => setDiamondChange(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 text-center text-2xl font-bold border-0 bg-transparent p-0 h-12"
              />
              <DiamondIcon size={32} animate />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setDiamondChange(diamondChange + 1)}
              className="w-12 h-12 rounded-xl"
            >
              <Plus className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Reason */}
        <div className="bg-card rounded-3xl p-6 shadow-kid border-2 border-border">
          <h3 className="font-display text-lg mb-4 text-foreground">4. Lý do</h3>
          
          {/* Punishment Rules Table */}
          {!isReward && (
            <div className="mb-4 bg-destructive/10 rounded-xl p-4 border border-destructive/30">
              <h4 className="font-bold text-destructive mb-3 flex items-center gap-2">
                📋 Bảng lỗi phạt tham khảo
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center py-1 border-b border-destructive/20">
                  <span className="text-foreground">Luộm thuộm</span>
                  <span className="font-bold text-destructive">bị trừ 3 💎</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-destructive/20">
                  <span className="text-foreground">Dậy muộn để bố mẹ gọi nhiều, không đánh răng buổi tối</span>
                  <span className="font-bold text-destructive">bị trừ 3 💎</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-destructive/20">
                  <span className="text-foreground">Không tự giác học bài để bố mẹ phải nhắc nhở nhiều (trước 19h tối)</span>
                  <span className="font-bold text-destructive">bị trừ 5 💎</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-destructive/20">
                  <span className="text-foreground">Tranh cãi nhau</span>
                  <span className="font-bold text-destructive">bị trừ 10 💎 mỗi bạn</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-destructive/20">
                  <span className="text-foreground">La hét trong nhà</span>
                  <span className="font-bold text-destructive">bị trừ 10 💎 mỗi bạn</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-foreground font-medium">Nói các từ bố cấm</span>
                  <span className="font-bold text-destructive">bị trừ 50 💎</span>
                </div>
              </div>
            </div>
          )}
          
          <Textarea
            placeholder={isReward 
              ? "Ví dụ: Giúp mẹ nấu ăn, Ngoan ngoãn..." 
              : "Ví dụ: Dậy muộn, Không nghe lời..."
            }
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="text-lg rounded-xl min-h-[100px]"
          />
        </div>

        {/* Submit */}
        <Button
          onClick={handleSubmit}
          disabled={!selectedPlayer || !reason.trim() || loading}
          className={cn(
            "w-full py-6 text-lg rounded-2xl font-bold",
            isReward 
              ? "bg-success hover:bg-success/90" 
              : "bg-destructive hover:bg-destructive/90"
          )}
        >
          {loading ? "Đang xử lý..." : (isReward ? "✓ Thưởng" : "✗ Phạt")}
        </Button>

        {/* Vouchers */}
        {showVouchers && (
          <div className="bg-card rounded-3xl p-6 shadow-kid border-2 border-border">
            <h3 className="font-display text-lg mb-4 text-foreground flex items-center gap-2">
              <Gift className="w-5 h-5 text-warning" />
              Phiếu chưa sử dụng
            </h3>
            {vouchers.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">Không có phiếu nào</p>
            ) : (
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {vouchers.map((v) => (
                  <div key={v.id} className="p-4 rounded-xl border-2 border-warning/30 bg-warning/10 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-foreground">{getPlayerName(v.player_id)}</p>
                      <p className="text-lg text-warning font-display">{v.voucher_value.toLocaleString('vi-VN')}đ</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(v.redeemed_at)}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleMarkUsed(v.id)}
                      className="gap-1 border-success text-success hover:bg-success/10"
                    >
                      <Trash2 className="w-4 h-4" />
                      Đã dùng
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Logs */}
        {showLogs && logs.length > 0 && (
          <div className="bg-card rounded-3xl p-6 shadow-kid border-2 border-border">
            <h3 className="font-display text-lg mb-4 text-foreground flex items-center gap-2">
              <History className="w-5 h-5" />
              Lịch sử thưởng/phạt
            </h3>
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {logs.map((log) => (
                <div 
                  key={log.id}
                  className={cn(
                    "p-4 rounded-xl border-2",
                    log.diamond_change > 0 
                      ? "border-success/30 bg-success/10" 
                      : "border-destructive/30 bg-destructive/10"
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-foreground">{getPlayerName(log.player_id)}</span>
                    <span className={cn(
                      "font-bold flex items-center gap-1",
                      log.diamond_change > 0 ? "text-success" : "text-destructive"
                    )}>
                      {log.diamond_change > 0 ? "+" : ""}{log.diamond_change}
                      <DiamondIcon size={16} />
                    </span>
                  </div>
                  <p className="text-sm text-foreground">{log.reason}</p>
                  <p className="text-xs text-muted-foreground mt-1">{formatDate(log.created_at)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Danger Zone */}
        <div className="bg-card rounded-3xl p-6 shadow-kid border-2 border-destructive/30">
          <h3 className="font-display text-lg mb-4 text-destructive flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Vùng nguy hiểm
          </h3>
          <div className="space-y-3">
            <Button
              variant="outline"
              onClick={() => setShowResetHistoryDialog(true)}
              disabled={loading || logs.length === 0}
              className="w-full gap-2 border-warning text-warning hover:bg-warning/10"
            >
              <History className="w-4 h-4" />
              Reset lịch sử thưởng/phạt
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowResetAllDialog(true)}
              disabled={loading}
              className="w-full gap-2 border-destructive text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4" />
              Reset toàn bộ dữ liệu
            </Button>
          </div>
        </div>
      </div>

      {/* Reset History Dialog */}
      <AlertDialog open={showResetHistoryDialog} onOpenChange={setShowResetHistoryDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-warning">
              <History className="w-5 h-5" />
              Xóa lịch sử thưởng/phạt?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              Hành động này sẽ <span className="font-bold">xóa toàn bộ lịch sử thưởng/phạt</span> của tất cả các bé. 
              Kim cương và phiếu đổi quà sẽ không bị ảnh hưởng.
              <br /><br />
              <span className="text-destructive font-medium">Không thể hoàn tác!</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleResetHistory}
              className="bg-warning hover:bg-warning/90"
            >
              Xác nhận xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reset All Dialog */}
      <AlertDialog open={showResetAllDialog} onOpenChange={setShowResetAllDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" />
              Reset toàn bộ dữ liệu?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              Hành động này sẽ:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><span className="font-bold">Reset kim cương</span> của tất cả các bé về 0</li>
                <li><span className="font-bold">Xóa toàn bộ lịch sử</span> thưởng/phạt</li>
                <li><span className="font-bold">Xóa toàn bộ thống kê</span> hàng ngày</li>
                <li><span className="font-bold">Xóa toàn bộ phiếu</span> đổi quà</li>
              </ul>
              <br />
              <span className="text-destructive font-bold">⚠️ KHÔNG THỂ HOÀN TÁC!</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleResetAll}
              className="bg-destructive hover:bg-destructive/90"
            >
              Xác nhận reset tất cả
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
