import { useState, useEffect, useCallback } from "react";
import { Player, Subject, DailyStats } from "@/types/app";
import { PlayerSelect } from "@/components/PlayerSelect";
import { Dashboard } from "@/components/Dashboard";
import { ExerciseScreen } from "@/components/ExerciseScreen";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

type Screen = 'select' | 'dashboard' | 'exercise';

const Index = () => {
  const [screen, setScreen] = useState<Screen>('select');
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [currentSubject, setCurrentSubject] = useState<Subject | null>(null);
  const [stats, setStats] = useState<DailyStats[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPlayers = async () => {
    const { data, error } = await supabase.from('players').select('*');
    if (error) {
      console.error('Error fetching players:', error);
      return;
    }
    setPlayers(data.map(p => ({
      id: p.id,
      name: p.name,
      grade: p.grade,
      animal: p.animal as 'elephant' | 'panda',
      diamonds: p.diamonds
    })));
  };

  const fetchStats = async (playerId: string) => {
    const { data, error } = await supabase
      .from('daily_stats')
      .select('*')
      .eq('player_id', playerId)
      .order('date', { ascending: true })
      .limit(7);
    
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
  }, [currentPlayer]);

  const handleSelectPlayer = (player: Player) => {
    setCurrentPlayer(player);
    setScreen('dashboard');
  };

  const handleSelectSubject = (subject: Subject) => {
    setCurrentSubject(subject);
    setScreen('exercise');
  };

  const handleDiamondEarned = useCallback(async () => {
    if (!currentPlayer) return;

    const today = new Date().toISOString().split('T')[0];
    
    // Update player diamonds
    await supabase.from('players')
      .update({ diamonds: currentPlayer.diamonds + 1 })
      .eq('id', currentPlayer.id);

    // Update daily stats
    const { data: existingStat } = await supabase
      .from('daily_stats')
      .select('*')
      .eq('player_id', currentPlayer.id)
      .eq('date', today)
      .maybeSingle();

    if (existingStat) {
      await supabase.from('daily_stats')
        .update({ diamonds: existingStat.diamonds + 1 })
        .eq('id', existingStat.id);
    } else {
      await supabase.from('daily_stats')
        .insert({ player_id: currentPlayer.id, date: today, diamonds: 1 });
    }

    // Refresh data
    setCurrentPlayer(prev => prev ? { ...prev, diamonds: prev.diamonds + 1 } : null);
    fetchPlayers();
    fetchStats(currentPlayer.id);
  }, [currentPlayer]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (screen === 'exercise' && currentPlayer && currentSubject) {
    return (
      <ExerciseScreen
        player={currentPlayer}
        subject={currentSubject}
        onBack={() => setScreen('dashboard')}
        onDiamondEarned={handleDiamondEarned}
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
      />
    );
  }

  return <PlayerSelect players={players} onSelectPlayer={handleSelectPlayer} />;
};

export default Index;
