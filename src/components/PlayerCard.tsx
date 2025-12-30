import { cn } from "@/lib/utils";
import { ElephantAvatar } from "./icons/ElephantAvatar";
import { PandaAvatar } from "./icons/PandaAvatar";
import { DiamondIcon } from "./icons/DiamondIcon";
import { Player } from "@/types/app";
import { ShopItem } from "@/types/shop";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { usePetStatus } from "@/hooks/usePetStatus";
import { Utensils, Droplets } from "lucide-react";

interface PlayerCardProps {
  player: Player;
  onClick: () => void;
  selected?: boolean;
  showDiamonds?: boolean;
}

export const PlayerCard = ({ player, onClick, selected = false, showDiamonds = false }: PlayerCardProps) => {
  const isElephant = player.animal === 'elephant';
  const [equippedItems, setEquippedItems] = useState<ShopItem[]>([]);
  const { status: petStatus } = usePetStatus(player.id);
  
  const isHungry = petStatus.currentHunger < 30;
  const isThirsty = petStatus.currentThirst < 30;
  const isSad = isHungry || isThirsty || petStatus.isSick;
  
  useEffect(() => {
    const fetchEquippedItems = async () => {
      const { data } = await supabase
        .from('player_items')
        .select('*, item:items(*)')
        .eq('player_id', player.id)
        .eq('equipped', true);
      
      if (data) {
        const items = data
          .map(pi => pi.item as ShopItem)
          .filter(Boolean);
        setEquippedItems(items);
      }
    };
    
    fetchEquippedItems();
  }, [player.id, player.diamonds]);
  
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
    <button
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center p-6 rounded-3xl transition-all duration-300",
        "bg-card border-4 shadow-kid hover:shadow-kid-hover",
        "hover:-translate-y-2 active:scale-95",
        isElephant 
          ? "border-elephant hover:border-accent" 
          : "border-panda hover:border-secondary",
        selected && (isElephant ? "border-accent shadow-elephant" : "border-secondary shadow-panda"),
        isSad && "animate-pulse"
      )}
    >
      {/* Hunger/Thirst indicators */}
      <div className="absolute top-2 right-2 flex flex-col gap-1">
        <div className={cn("flex items-center gap-1", isHungry && "animate-bounce")}>
          <Utensils className={cn("w-4 h-4", getHungerColor())} />
          <span className={cn("text-xs font-bold", getHungerColor())}>{petStatus.currentHunger}%</span>
        </div>
        <div className={cn("flex items-center gap-1", isThirsty && "animate-bounce")}>
          <Droplets className={cn("w-4 h-4", getThirstColor())} />
          <span className={cn("text-xs font-bold", getThirstColor())}>{petStatus.currentThirst}%</span>
        </div>
      </div>
      
      {/* Avatar */}
      <div className={cn(
        isSad ? "" : "animate-float",
        selected && "animate-bounce-gentle"
      )}>
        {isElephant ? (
          <ElephantAvatar size={140} selected={selected} equippedItems={equippedItems} isSad={isSad} />
        ) : (
          <PandaAvatar size={140} selected={selected} equippedItems={equippedItems} isSad={isSad} />
        )}
      </div>
      
      {/* Sad message */}
      {isSad && (
        <div className="text-xs text-destructive font-medium mt-1 animate-pulse">
          {petStatus.isSick ? "😭 Đang ốm!" : isHungry ? "🥺 Đói bụng..." : "💧 Khát nước..."}
        </div>
      )}
      
      {/* Name */}
      <h2 className={cn(
        "mt-2 text-2xl font-display",
        isElephant ? "text-accent" : "text-secondary"
      )}>
        {player.name}
      </h2>
      
      {/* Grade */}
      <p className="text-muted-foreground font-medium">
        Lớp {player.grade}
      </p>
      
      {/* Diamonds display */}
      {showDiamonds && (
        <div className={cn(
          "mt-3 flex items-center gap-2 px-4 py-2 rounded-full",
          isElephant ? "bg-elephant-light" : "bg-panda-light"
        )}>
          <DiamondIcon size={20} animate />
          <span className="font-bold text-foreground">{player.diamonds}</span>
        </div>
      )}
    </button>
  );
};
