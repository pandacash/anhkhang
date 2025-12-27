import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RefreshCw, X } from 'lucide-react';

interface AvatarChatProps {
  playerName: string;
  animalType: 'elephant' | 'panda';
}

const STORAGE_KEY = 'avatar_chat_daily';

const getDailyData = (playerName: string) => {
  const today = new Date().toDateString();
  const stored = localStorage.getItem(`${STORAGE_KEY}_${playerName}`);
  if (stored) {
    const data = JSON.parse(stored);
    if (data.date === today) {
      return data;
    }
  }
  // New day - reset with random limit 1-3
  const newData = { date: today, count: 0, limit: Math.floor(Math.random() * 3) + 1 };
  localStorage.setItem(`${STORAGE_KEY}_${playerName}`, JSON.stringify(newData));
  return newData;
};

const incrementDailyCount = (playerName: string) => {
  const data = getDailyData(playerName);
  data.count += 1;
  localStorage.setItem(`${STORAGE_KEY}_${playerName}`, JSON.stringify(data));
  return data;
};

export const AvatarChat = ({ playerName, animalType }: AvatarChatProps) => {
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasReachedLimit, setHasReachedLimit] = useState(false);

  const checkAndFetchMessage = async () => {
    const dailyData = getDailyData(playerName);
    
    // Check if already reached daily limit
    if (dailyData.count >= dailyData.limit) {
      setHasReachedLimit(true);
      return;
    }

    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('avatar-chat', {
        body: { playerName, animalType }
      });

      if (error) throw error;
      
      setMessage(data.message);
      setIsVisible(true);
      incrementDailyCount(playerName);
    } catch (error) {
      console.error('Error fetching avatar message:', error);
      // Fallback messages
      const fallbacks = animalType === 'elephant' 
        ? [`Chào ${playerName === 'Tuệ Anh' ? 'chị Tuệ Anh' : 'anh Phúc Khang'}! Em Voi chúc anh/chị học giỏi nha!`]
        : [`Chào ${playerName === 'Tuệ Anh' ? 'chị Tuệ Anh' : 'anh Phúc Khang'}! Em Gấu Trúc yêu anh/chị nhiều lắm!`];
      setMessage(fallbacks[0]);
      setIsVisible(true);
      incrementDailyCount(playerName);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const dailyData = getDailyData(playerName);
    if (dailyData.count >= dailyData.limit) {
      setHasReachedLimit(true);
      return;
    }

    // Auto fetch on mount with a small delay
    const timer = setTimeout(() => {
      checkAndFetchMessage();
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [playerName, animalType]);

  // Auto hide after 8 seconds
  useEffect(() => {
    if (isVisible && message) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, message]);

  // Don't render anything if reached limit or not visible
  if (hasReachedLimit || (!isVisible && !isLoading)) {
    return null;
  }

  return (
    <div className="z-50 animate-fade-in self-start mt-4">
      <div className="relative bg-card border border-border rounded-2xl px-4 py-3 shadow-xl max-w-[220px] min-w-[160px]">
        {/* Speech bubble tail pointing left */}
        <div className="absolute top-4 left-0 -translate-x-full">
          <div className="w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-border" />
          <div className="absolute top-0 left-[1px] w-0 h-0 border-t-7 border-b-7 border-r-7 border-t-transparent border-b-transparent border-r-card" 
               style={{ borderTopWidth: '7px', borderBottomWidth: '7px', borderRightWidth: '7px' }} />
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span className="text-xs">Đang nghĩ...</span>
          </div>
        ) : (
          <>
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center"
            >
              <X className="h-3 w-3" />
            </button>
            <p className="text-sm text-foreground leading-relaxed">{message}</p>
          </>
        )}
      </div>
    </div>
  );
};
