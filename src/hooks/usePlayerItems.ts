import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ShopItem, PlayerItem } from "@/types/shop";

export const usePlayerItems = (playerId: string | undefined) => {
  const [equippedItems, setEquippedItems] = useState<(PlayerItem & { item: ShopItem })[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEquippedItems = async () => {
    if (!playerId) {
      setEquippedItems([]);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('player_items')
      .select('*, item:items(*)')
      .eq('player_id', playerId)
      .eq('equipped', true);

    if (!error && data) {
      setEquippedItems(data as (PlayerItem & { item: ShopItem })[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEquippedItems();
  }, [playerId]);

  return { equippedItems, loading, refetch: fetchEquippedItems };
};
