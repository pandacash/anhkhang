import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Player } from "@/types/app";
import { ShopItem, PlayerItem } from "@/types/shop";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DiamondIcon } from "@/components/icons/DiamondIcon";
import { ItemIcon } from "./ItemIcon";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ShoppingBag, Package, Check, Sparkles, PawPrint } from "lucide-react";

interface ShopProps {
  player: Player;
  open: boolean;
  onClose: () => void;
  onPlayerUpdate: () => void;
}

export const Shop = ({ player, open, onClose, onPlayerUpdate }: ShopProps) => {
  const [items, setItems] = useState<ShopItem[]>([]);
  const [playerItems, setPlayerItems] = useState<PlayerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState<string | null>(null);
  const { toast } = useToast();

  const isElephant = player.animal === 'elephant';

  useEffect(() => {
    if (open) {
      fetchData();
    }
  }, [open, player.id]);

  const fetchData = async () => {
    setLoading(true);
    
    // Fetch items for this animal type
    const { data: itemsData } = await supabase
      .from('items')
      .select('*')
      .or(`animal_type.eq.${player.animal},animal_type.eq.both`);
    
    // Fetch player's purchased items
    const { data: playerItemsData } = await supabase
      .from('player_items')
      .select('*, item:items(*)')
      .eq('player_id', player.id);
    
    setItems((itemsData as ShopItem[]) || []);
    setPlayerItems((playerItemsData as PlayerItem[]) || []);
    setLoading(false);
  };

  const handlePurchase = async (item: ShopItem) => {
    if (player.diamonds < item.price) {
      toast({
        title: "Không đủ kim cương! 💎",
        description: `Bạn cần ${item.price} kim cương để mua ${item.name}`,
        variant: "destructive"
      });
      return;
    }

    setPurchasing(item.id);

    // Deduct diamonds
    const { error: rpcError } = await supabase.rpc('apply_player_diamond_delta', {
      p_player_id: player.id,
      p_change: -item.price
    });

    if (rpcError) {
      toast({
        title: "Lỗi",
        description: "Không thể mua item. Vui lòng thử lại.",
        variant: "destructive"
      });
      setPurchasing(null);
      return;
    }

    // Add item to player inventory
    const { error: insertError } = await supabase
      .from('player_items')
      .insert({
        player_id: player.id,
        item_id: item.id,
        equipped: false
      });

    if (insertError) {
      toast({
        title: "Lỗi",
        description: "Không thể thêm vào kho đồ.",
        variant: "destructive"
      });
      setPurchasing(null);
      return;
    }

    // Log purchase
    await supabase.from('admin_logs').insert({
      player_id: player.id,
      diamond_change: -item.price,
      reason: `Mua ${item.name}`
    });

    toast({
      title: "🎉 Mua thành công!",
      description: `Bạn đã mua ${item.name}. Vào Kho đồ để mặc nhé!`,
    });

    onPlayerUpdate();
    fetchData();
    setPurchasing(null);
  };

  const handleEquip = async (playerItem: PlayerItem) => {
    // Unequip all items of the same category first
    const item = items.find(i => i.id === playerItem.item_id);
    if (!item) return;

    const sameCategory = playerItems.filter(pi => {
      const piItem = items.find(i => i.id === pi.item_id);
      return piItem?.category === item.category && pi.equipped;
    });

    for (const pi of sameCategory) {
      await supabase
        .from('player_items')
        .update({ equipped: false })
        .eq('id', pi.id);
    }

    // Equip/unequip this item
    const { error } = await supabase
      .from('player_items')
      .update({ equipped: !playerItem.equipped })
      .eq('id', playerItem.id);

    if (error) {
      toast({
        title: "Lỗi",
        description: "Không thể thay đổi trang bị.",
        variant: "destructive"
      });
      return;
    }

    fetchData();
    onPlayerUpdate();
  };

  const isPurchased = (itemId: string) => {
    return playerItems.some(pi => pi.item_id === itemId);
  };

  const getPlayerItem = (itemId: string) => {
    return playerItems.find(pi => pi.item_id === itemId);
  };

  const [activeTab, setActiveTab] = useState<'shop' | 'pets' | 'inventory'>('shop');

  // Filter items by category
  const regularItems = items.filter(item => item.category !== 'pet');
  const petItems = items.filter(item => item.category === 'pet');
  const inventoryPets = playerItems.filter(pi => {
    const item = items.find(i => i.id === pi.item_id);
    return item?.category === 'pet';
  });
  const inventoryRegular = playerItems.filter(pi => {
    const item = items.find(i => i.id === pi.item_id);
    return item?.category !== 'pet';
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className={cn(
        "max-w-2xl max-h-[85vh] overflow-hidden",
        "bg-gradient-to-b from-card to-muted/50"
      )}>
        <DialogHeader>
          <DialogTitle className={cn(
            "text-2xl font-display flex items-center gap-2",
            isElephant ? "text-accent" : "text-secondary"
          )}>
            <Sparkles className="w-6 h-6 animate-sparkle" />
            {activeTab === 'pets' ? 'Thú cưng' : 'Cửa hàng'}
          </DialogTitle>
        </DialogHeader>

        {/* Diamond display */}
        <div className={cn(
          "flex items-center justify-center gap-2 py-2 px-4 rounded-full mx-auto",
          "bg-gradient-to-r from-diamond/20 to-diamond-glow/20",
          "border-2 border-diamond/30"
        )}>
          <DiamondIcon size={24} animate />
          <span className="font-bold text-lg">{player.diamonds} kim cương</span>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 justify-center flex-wrap">
          <Button
            variant={activeTab === 'shop' ? 'default' : 'outline'}
            onClick={() => setActiveTab('shop')}
            className="gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            Trang phục
          </Button>
          <Button
            variant={activeTab === 'pets' ? 'default' : 'outline'}
            onClick={() => setActiveTab('pets')}
            className="gap-2"
          >
            <PawPrint className="w-4 h-4" />
            Thú cưng
          </Button>
          <Button
            variant={activeTab === 'inventory' ? 'default' : 'outline'}
            onClick={() => setActiveTab('inventory')}
            className="gap-2"
          >
            <Package className="w-4 h-4" />
            Kho đồ ({playerItems.length})
          </Button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[50vh] p-2">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
          ) : activeTab === 'shop' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {regularItems.map(item => {
                const purchased = isPurchased(item.id);
                return (
                  <div
                    key={item.id}
                    className={cn(
                      "relative p-4 rounded-2xl border-2 transition-all",
                      "bg-card hover:shadow-lg",
                      purchased 
                        ? "border-success/50 bg-success/5" 
                        : isElephant 
                          ? "border-accent/30 hover:border-accent" 
                          : "border-secondary/30 hover:border-secondary"
                    )}
                  >
                    {purchased && (
                      <div className="absolute top-2 right-2 bg-success text-success-foreground rounded-full p-1">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                    
                    <div className="flex flex-col items-center gap-2">
                      <div className={cn(
                        "p-3 rounded-xl",
                        isElephant ? "bg-elephant-pink-light" : "bg-panda-mint-light"
                      )}>
                        <ItemIcon imageKey={item.image_key} size={56} />
                      </div>
                      
                      <h3 className="font-bold text-sm text-center">{item.name}</h3>
                      <p className="text-xs text-muted-foreground text-center line-clamp-2">
                        {item.description}
                      </p>
                      
                      {!purchased ? (
                        <Button
                          size="sm"
                          onClick={() => handlePurchase(item)}
                          disabled={purchasing === item.id || player.diamonds < item.price}
                          className={cn(
                            "gap-1 mt-2",
                            player.diamonds < item.price && "opacity-50"
                          )}
                        >
                          <DiamondIcon size={14} />
                          {item.price}
                          {purchasing === item.id && (
                            <span className="ml-1 animate-spin">⏳</span>
                          )}
                        </Button>
                      ) : (
                        <span className="text-xs text-success font-medium mt-2">
                          ✓ Đã mua
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : activeTab === 'pets' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {petItems.map(item => {
                const purchased = isPurchased(item.id);
                return (
                  <div
                    key={item.id}
                    className={cn(
                      "relative p-4 rounded-2xl border-2 transition-all",
                      "bg-card hover:shadow-lg",
                      purchased 
                        ? "border-success/50 bg-success/5" 
                        : "border-primary/30 hover:border-primary"
                    )}
                  >
                    {purchased && (
                      <div className="absolute top-2 right-2 bg-success text-success-foreground rounded-full p-1">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                    
                    <div className="flex flex-col items-center gap-2">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100">
                        <ItemIcon imageKey={item.image_key} size={64} />
                      </div>
                      
                      <h3 className="font-bold text-sm text-center">{item.name}</h3>
                      <p className="text-xs text-muted-foreground text-center line-clamp-2">
                        {item.description}
                      </p>
                      
                      {!purchased ? (
                        <Button
                          size="sm"
                          onClick={() => handlePurchase(item)}
                          disabled={purchasing === item.id || player.diamonds < item.price}
                          className={cn(
                            "gap-1 mt-2",
                            player.diamonds < item.price && "opacity-50"
                          )}
                        >
                          <DiamondIcon size={14} />
                          {item.price}
                          {purchasing === item.id && (
                            <span className="ml-1 animate-spin">⏳</span>
                          )}
                        </Button>
                      ) : (
                        <span className="text-xs text-success font-medium mt-2">
                          ✓ Đã mua
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Regular items inventory */}
              {inventoryRegular.length > 0 && (
                <div>
                  <h3 className="font-bold text-sm mb-2 text-muted-foreground">Trang phục</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {inventoryRegular.map(playerItem => {
                      const item = items.find(i => i.id === playerItem.item_id);
                      if (!item) return null;
                      
                      return (
                        <div
                          key={playerItem.id}
                          className={cn(
                            "relative p-4 rounded-2xl border-2 transition-all cursor-pointer",
                            "bg-card hover:shadow-lg",
                            playerItem.equipped 
                              ? "border-success ring-2 ring-success/30" 
                              : "border-muted hover:border-primary"
                          )}
                          onClick={() => handleEquip(playerItem)}
                        >
                          {playerItem.equipped && (
                            <div className="absolute top-2 right-2 bg-success text-success-foreground rounded-full px-2 py-0.5 text-xs font-bold">
                              Đang mặc
                            </div>
                          )}
                          
                          <div className="flex flex-col items-center gap-2">
                            <div className={cn(
                              "p-3 rounded-xl",
                              isElephant ? "bg-elephant-pink-light" : "bg-panda-mint-light"
                            )}>
                              <ItemIcon imageKey={item.image_key} size={56} />
                            </div>
                            
                            <h3 className="font-bold text-sm text-center">{item.name}</h3>
                            
                            <Button
                              size="sm"
                              variant={playerItem.equipped ? "outline" : "default"}
                              className="mt-2"
                            >
                              {playerItem.equipped ? "Tháo ra" : "Mặc vào"}
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {/* Pets inventory */}
              {inventoryPets.length > 0 && (
                <div>
                  <h3 className="font-bold text-sm mb-2 text-muted-foreground">Thú cưng</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {inventoryPets.map(playerItem => {
                      const item = items.find(i => i.id === playerItem.item_id);
                      if (!item) return null;
                      
                      return (
                        <div
                          key={playerItem.id}
                          className={cn(
                            "relative p-4 rounded-2xl border-2 transition-all cursor-pointer",
                            "bg-card hover:shadow-lg",
                            playerItem.equipped 
                              ? "border-success ring-2 ring-success/30" 
                              : "border-muted hover:border-primary"
                          )}
                          onClick={() => handleEquip(playerItem)}
                        >
                          {playerItem.equipped && (
                            <div className="absolute top-2 right-2 bg-success text-success-foreground rounded-full px-2 py-0.5 text-xs font-bold">
                              Đang nuôi
                            </div>
                          )}
                          
                          <div className="flex flex-col items-center gap-2">
                            <div className="p-3 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100">
                              <ItemIcon imageKey={item.image_key} size={64} />
                            </div>
                            
                            <h3 className="font-bold text-sm text-center">{item.name}</h3>
                            
                            <Button
                              size="sm"
                              variant={playerItem.equipped ? "outline" : "default"}
                              className="mt-2"
                            >
                              {playerItem.equipped ? "Cất đi" : "Mang theo"}
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {playerItems.length === 0 && (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Kho đồ trống. Hãy mua đồ ở cửa hàng!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
