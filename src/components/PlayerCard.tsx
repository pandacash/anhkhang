import { cn } from "@/lib/utils";
import { ElephantAvatar } from "./icons/ElephantAvatar";
import { PandaAvatar } from "./icons/PandaAvatar";
import { DiamondIcon } from "./icons/DiamondIcon";
import { Player } from "@/types/app";
import { ShopItem } from "@/types/shop";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface PlayerCardProps {
  player: Player;
  onClick: () => void;
  selected?: boolean;
  showDiamonds?: boolean;
}

export const PlayerCard = ({ player, onClick, selected = false, showDiamonds = false }: PlayerCardProps) => {
  const isElephant = player.animal === 'elephant';
  const [equippedItems, setEquippedItems] = useState<ShopItem[]>([]);
  
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
  }, [player.id, player.diamonds]); // Re-fetch when diamonds change (might have bought something)
  
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
        selected && (isElephant ? "border-accent shadow-elephant" : "border-secondary shadow-panda")
      )}
    >
      {/* Avatar */}
      <div className={cn(
        "animate-float",
        selected && "animate-bounce-gentle"
      )}>
        {isElephant ? (
          <ElephantAvatar size={140} selected={selected} equippedItems={equippedItems} />
        ) : (
          <PandaAvatar size={140} selected={selected} equippedItems={equippedItems} />
        )}
      </div>
      
      {/* Name */}
      <h2 className={cn(
        "mt-4 text-2xl font-display",
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
