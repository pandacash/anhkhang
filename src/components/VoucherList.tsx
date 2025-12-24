import { useState, useEffect } from "react";
import { Player } from "@/types/app";
import { VoucherCard } from "./VoucherCard";
import { Button } from "./ui/button";
import { ArrowLeft, Gift, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface VoucherRedemption {
  id: string;
  player_id: string;
  diamonds_spent: number;
  voucher_value: number;
  redeemed_at: string;
  used: boolean;
  used_at: string | null;
}

interface VoucherListProps {
  player: Player;
  onBack: () => void;
}

export const VoucherList = ({ player, onBack }: VoucherListProps) => {
  const [vouchers, setVouchers] = useState<VoucherRedemption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVouchers();
  }, [player.id]);

  const fetchVouchers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('voucher_redemptions')
      .select('*')
      .eq('player_id', player.id)
      .eq('used', false)
      .order('redeemed_at', { ascending: false });

    if (data && !error) {
      setVouchers(data);
    }
    setLoading(false);
  };

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
        <div className="text-center mb-8">
          <Gift className="w-16 h-16 text-warning mx-auto mb-4" />
          <h1 className="text-3xl font-display text-foreground">
            Phiếu Mua Đồ Chơi của {player.name}
          </h1>
          <p className="text-muted-foreground mt-2">
            Các phiếu đang chờ được sử dụng
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : vouchers.length === 0 ? (
          <div className="text-center py-12 bg-muted/30 rounded-3xl">
            <Gift className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Chưa có phiếu mua đồ chơi nào.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Hãy tích lũy kim cương và đổi quà nhé!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {vouchers.map((voucher) => (
              <VoucherCard
                key={voucher.id}
                value={voucher.voucher_value}
                redeemedAt={voucher.redeemed_at}
                playerName={player.name}
                used={voucher.used}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
