import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type PetStatus = {
  currentHunger: number;
  currentThirst: number;
  isSick: boolean;
};

export const usePetStatus = (playerId: string) => {
  const [status, setStatus] = useState<PetStatus>({
    currentHunger: 100,
    currentThirst: 100,
    isSick: false,
  });
  const [loading, setLoading] = useState(true);

  const fetchStatus = useCallback(async () => {
    if (!playerId) return;
    
    const { data, error } = await supabase.rpc('get_pet_status', {
      p_player_id: playerId,
    });

    if (!error && data && data.length > 0) {
      const row = data[0];
      setStatus({
        currentHunger: row.current_hunger,
        currentThirst: row.current_thirst,
        isSick: row.is_currently_sick,
      });
    }
    setLoading(false);
  }, [playerId]);

  useEffect(() => {
    fetchStatus();
    
    // Refresh every minute to update decay
    const interval = setInterval(fetchStatus, 60000);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  const feedPet = async (foodValue: number) => {
    const { data, error } = await supabase.rpc('feed_pet', {
      p_player_id: playerId,
      p_food_value: foodValue,
    });

    if (!error && data && data.length > 0) {
      setStatus(prev => ({
        ...prev,
        currentHunger: data[0].new_hunger,
        isSick: data[0].new_hunger === 0 || prev.currentThirst === 0,
      }));
    }
    return !error;
  };

  const waterPet = async (drinkValue: number) => {
    const { data, error } = await supabase.rpc('water_pet', {
      p_player_id: playerId,
      p_drink_value: drinkValue,
    });

    if (!error && data && data.length > 0) {
      setStatus(prev => ({
        ...prev,
        currentThirst: data[0].new_thirst,
        isSick: prev.currentHunger === 0 || data[0].new_thirst === 0,
      }));
    }
    return !error;
  };

  return {
    status,
    loading,
    refetch: fetchStatus,
    feedPet,
    waterPet,
  };
};

// Helper to parse food/drink value from description
export const parseItemValue = (description: string | null): number => {
  if (!description) return 20;
  const match = description.match(/\+(\d+)/);
  return match ? parseInt(match[1], 10) : 20;
};
