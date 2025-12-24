import { useState, useEffect, useCallback } from "react";
import { Player, Subject, DailyStats } from "@/types/app";
import { PlayerSelect } from "@/components/PlayerSelect";
import { Dashboard } from "@/components/Dashboard";
import { ExerciseScreen } from "@/components/ExerciseScreen";
import { AdminPanel } from "@/components/AdminPanel";
import { RewardHistory } from "@/components/RewardHistory";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

type Screen = 'select' | 'dashboard' | 'exercise' | 'admin' | 'history';

const Index = () => {
  const [screen, setScreen] = useState<Screen>('select');
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [currentSubject, setCurrentSubject] = useState<Subject | null>(null);
  const [stats, setStats] = useState<DailyStats[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPlayers = useCallback(async () => {
    const { data, error } = await supabase.from('players').select('*');
    if (error) {
      console.error('Error fetching players:', error);
      return;
    }
    const updatedPlayers = data.map(p => ({
      id: p.id,
      name: p.name,
      grade: p.grade,
      animal: p.animal as 'elephant' | 'panda',
      diamonds: p.diamonds
    }));
    setPlayers(updatedPlayers);
    
    // Update current player if exists
    if (currentPlayer) {
      const updated = updatedPlayers.find(p => p.id === currentPlayer.id);
      if (updated) {
        setCurrentPlayer(updated);
      }
    }
    
    return updatedPlayers;
  }, [currentPlayer]);

  const fetchStats = async (playerId: string) => {
    const { data, error } = await supabase
      .from('daily_stats')
      .select('*')
      .eq('player_id', playerId)
      .order('date', { ascending: true });
    
    if (!error && data) {
      setStats(data.map(s => ({ date: s.date, diamonds: s.diamonds })));
    }
  };

  useEffect(() => {
    fetchPlayers().finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (currentPlayer) {
      fetchStats(currentPlayer.id);
    }
  }, [currentPlayer?.id]);

  const handleSelectPlayer = (player: Player) => {
    setCurrentPlayer(player);
    setScreen('dashboard');
  };

  const handleSelectSubject = (subject: Subject) => {
    setCurrentSubject(subject);
    setScreen('exercise');
  };

  const handleDiamondChange = useCallback(async (change: number) => {
    if (!currentPlayer) return;

    // Use atomic RPC to update diamonds safely (avoids stale overwrites)
    const { data, error } = await supabase.rpc('apply_player_diamond_delta', {
      p_player_id: currentPlayer.id,
      p_change: change
    });

    if (error) {
      console.error('Error updating diamonds:', error);
      return;
    }

    // Get new diamonds from RPC result
    const newDiamonds = data?.[0]?.new_diamonds ?? Math.max(0, currentPlayer.diamonds + change);

    // Refresh data
    setCurrentPlayer(prev => prev ? { ...prev, diamonds: newDiamonds } : null);
    fetchPlayers();
    fetchStats(currentPlayer.id);
  }, [currentPlayer, fetchPlayers]);

  const handleOpenAdmin = () => {
    setScreen('admin');
  };

  const handleAdminAction = async () => {
    await fetchPlayers();
    // Also refresh stats if current player exists
    if (currentPlayer) {
      fetchStats(currentPlayer.id);
    }
  };

  const handleViewHistory = () => {
    setScreen('history');
  };

  const handlePlayerUpdate = async () => {
    const updated = await fetchPlayers();
    if (updated && currentPlayer) {
      const p = updated.find(p => p.id === currentPlayer.id);
      if (p) setCurrentPlayer(p);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (screen === 'admin') {
    return (
      <AdminPanel
        players={players}
        onBack={() => setScreen('select')}
        onActionComplete={handleAdminAction}
      />
    );
  }

  if (screen === 'history' && currentPlayer) {
    return (
      <RewardHistory
        player={currentPlayer}
        onBack={() => setScreen('dashboard')}
      />
    );
  }

  if (screen === 'exercise' && currentPlayer && currentSubject) {
    return (
      <ExerciseScreen
        player={currentPlayer}
        subject={currentSubject}
        onBack={() => setScreen('dashboard')}
        onDiamondChange={handleDiamondChange}
      />
    );
  }

  if (screen === 'dashboard' && currentPlayer) {
    return (
      <Dashboard
        player={currentPlayer}
        allPlayers={players}
        stats={stats}
        onSelectSubject={handleSelectSubject}
        onBack={() => {
          setCurrentPlayer(null);
          setScreen('select');
        }}
        onViewHistory={handleViewHistory}
        onPlayerUpdate={handlePlayerUpdate}
      />
    );
  }

  return (
    <PlayerSelect 
      players={players} 
      onSelectPlayer={handleSelectPlayer}
      onOpenAdmin={handleOpenAdmin}
    />
  );
};

export default Index;
