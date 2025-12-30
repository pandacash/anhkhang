import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Player } from "@/types/app";
import { ShopItem, PlayerItem } from "@/types/shop";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DiamondIcon } from "@/components/icons/DiamondIcon";
import { ItemIcon } from "./ItemIcon";
import { ConsumableIcon } from "./ConsumableIcon";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { usePetStatus, parseItemValue } from "@/hooks/usePetStatus";
import { ShoppingBag, Package, Check, Sparkles, PawPrint, Utensils, Droplets } from "lucide-react";

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
  const { status: petStatus, feedPet, waterPet, refetch: refetchPetStatus } = usePetStatus(player.id);

  const isElephant = player.animal === 'elephant';

  useEffect(() => {
    if (open) {
      fetchData();
      refetchPetStatus();
    }
  }, [open, player.id]);

  const fetchData = async () => {
    setLoading(true);
    
    // Fetch items for this animal type
    const { data: itemsData } = await supabase
      .from('items')
      .select('*')
      .or(`animal_type.eq.${player.animal},animal_type.eq.both`);
    
    // Fetch player's purchased items (only non-consumables)
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

    // For consumables (food/drink), use immediately instead of adding to inventory
    if (item.category === 'food' || item.category === 'drink') {
      const value = parseItemValue(item.description);
      
      if (item.category === 'food') {
        await feedPet(value);
        toast({
          title: `🍽️ Đã cho ${isElephant ? 'Voi' : 'Gấu trúc'} ăn!`,
          description: `${item.name} giúp no thêm ${value}%`,
        });
      } else {
        await waterPet(value);
        toast({
          title: `💧 Đã cho ${isElephant ? 'Voi' : 'Gấu trúc'} uống!`,
          description: `${item.name} giúp đỡ khát thêm ${value}%`,
        });
      }

      // Log purchase
      await supabase.from('admin_logs').insert({
        player_id: player.id,
        diamond_change: -item.price,
        reason: `Cho ăn/uống: ${item.name}`
      });

      onPlayerUpdate();
      refetchPetStatus();
      setPurchasing(null);
      return;
    }

    // Add non-consumable item to player inventory
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

  const [activeTab, setActiveTab] = useState<'food' | 'shop' | 'pets' | 'inventory'>('food');

  // Filter items by category
  const foodItems = items.filter(item => item.category === 'food');
  const drinkItems = items.filter(item => item.category === 'drink');
  const regularItems = items.filter(item => !['pet', 'food', 'drink'].includes(item.category));
  const petItems = items.filter(item => item.category === 'pet');
  const inventoryPets = playerItems.filter(pi => {
    const item = items.find(i => i.id === pi.item_id);
    return item?.category === 'pet';
  });
  const inventoryRegular = playerItems.filter(pi => {
    const item = items.find(i => i.id === pi.item_id);
    return item?.category && !['pet', 'food', 'drink'].includes(item.category);
  });

  const getHungerColor = () => {
    if (petStatus.currentHunger > 60) return "text-success";
    if (petStatus.currentHunger > 30) return "text-warning";
    return "text-destructive";
  };

  const getThirstColor = () => {
    if (petStatus.currentThirst > 60) return "text-blue-500";
    if (petStatus.currentThirst > 30) return "text-warning";
    return "text-destructive";
  };

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
            {activeTab === 'food' ? 'Thức ăn & Nước' : activeTab === 'pets' ? 'Thú cưng' : 'Cửa hàng'}
          </DialogTitle>
        </DialogHeader>

        {/* Diamond display and pet status */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className={cn(
            "flex items-center gap-2 py-2 px-4 rounded-full",
            "bg-gradient-to-r from-diamond/20 to-diamond-glow/20",
            "border-2 border-diamond/30"
          )}>
            <DiamondIcon size={24} animate />
            <span className="font-bold text-lg">{player.diamonds} 💎</span>
          </div>
          
          {/* Pet status indicators */}
          <div className="flex items-center gap-3">
            <div className={cn("flex items-center gap-1", petStatus.currentHunger < 30 && "animate-pulse")}>
              <Utensils className={cn("w-4 h-4", getHungerColor())} />
              <span className={cn("font-bold text-sm", getHungerColor())}>{petStatus.currentHunger}%</span>
            </div>
            <div className={cn("flex items-center gap-1", petStatus.currentThirst < 30 && "animate-pulse")}>
              <Droplets className={cn("w-4 h-4", getThirstColor())} />
              <span className={cn("font-bold text-sm", getThirstColor())}>{petStatus.currentThirst}%</span>
            </div>
          </div>
        </div>

        {/* Warning if pet is sick */}
        {petStatus.isSick && (
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 text-center">
            <span className="text-destructive font-bold animate-pulse">
              ⚠️ {isElephant ? 'Voi' : 'Gấu trúc'} đang ốm! Hãy cho ăn/uống ngay!
            </span>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 justify-center flex-wrap">
          <Button
            variant={activeTab === 'food' ? 'default' : 'outline'}
            onClick={() => setActiveTab('food')}
            className={cn(
              "gap-2",
              activeTab === 'food' && "bg-gradient-to-r from-orange-500 to-amber-500"
            )}
          >
            <Utensils className="w-4 h-4" />
            Thức ăn
          </Button>
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
            Kho ({playerItems.length})
          </Button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[50vh] p-2">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
          ) : activeTab === 'food' ? (
            <div className="space-y-6">
              {/* Food section */}
              <div>
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-orange-500" />
                  Đồ ăn (No bụng: {petStatus.currentHunger}%)
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {foodItems.map(item => (
                    <div
                      key={item.id}
                      className={cn(
                        "p-3 rounded-xl border-2 transition-all",
                        "bg-gradient-to-b from-orange-50 to-amber-50",
                        "border-orange-200 hover:border-orange-400 hover:shadow-lg"
                      )}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <ConsumableIcon imageKey={item.image_key} size={48} />
                        <h4 className="font-bold text-sm text-center">{item.name}</h4>
                        <p className="text-xs text-muted-foreground text-center">
                          +{parseItemValue(item.description)} no
                        </p>
                        <Button
                          size="sm"
                          onClick={() => handlePurchase(item)}
                          disabled={purchasing === item.id || player.diamonds < item.price}
                          className={cn(
                            "gap-1 w-full",
                            "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600",
                            player.diamonds < item.price && "opacity-50"
                          )}
                        >
                          <DiamondIcon size={12} />
                          {item.price}
                          {purchasing === item.id && <span className="ml-1 animate-spin">⏳</span>}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Drinks section */}
              <div>
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-blue-500" />
                  Đồ uống (Khát: {petStatus.currentThirst}%)
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {drinkItems.map(item => (
                    <div
                      key={item.id}
                      className={cn(
                        "p-3 rounded-xl border-2 transition-all",
                        "bg-gradient-to-b from-blue-50 to-cyan-50",
                        "border-blue-200 hover:border-blue-400 hover:shadow-lg"
                      )}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <ConsumableIcon imageKey={item.image_key} size={48} />
                        <h4 className="font-bold text-sm text-center">{item.name}</h4>
                        <p className="text-xs text-muted-foreground text-center">
                          +{parseItemValue(item.description)} đỡ khát
                        </p>
                        <Button
                          size="sm"
                          onClick={() => handlePurchase(item)}
                          disabled={purchasing === item.id || player.diamonds < item.price}
                          className={cn(
                            "gap-1 w-full",
                            "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600",
                            player.diamonds < item.price && "opacity-50"
                          )}
                        >
                          <DiamondIcon size={12} />
                          {item.price}
                          {purchasing === item.id && <span className="ml-1 animate-spin">⏳</span>}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
                <div className="text-center py-8 text-muted-foreground">
                  <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Kho đồ trống</p>
                  <p className="text-sm">Hãy mua đồ từ cửa hàng nhé!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
