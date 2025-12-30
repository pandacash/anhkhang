import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RefreshCw, X, Utensils, Droplets } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AvatarChatProps {
  playerName: string;
  animalType: 'elephant' | 'panda';
  hunger?: number;
  thirst?: number;
  isSick?: boolean;
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

// Messages when hungry/thirsty
const getHungryMessages = (animalType: 'elephant' | 'panda', playerName: string): string[] => {
  const name = animalType === 'elephant' ? 'Voi' : 'Gấu Trúc';
  const ownerTitle = playerName === 'Tuệ Anh' ? 'chị' : 'anh';
  
  return [
    `${ownerTitle} ơi... em ${name} đói bụng quá... 🥺`,
    `Bụng em ${name} kêu ùng ục rồi ${ownerTitle} ơi... 😢`,
    `${ownerTitle} cho em ăn gì đi, em đói lắm rồi... 🍽️`,
    `Em ${name} yếu quá, cần được ăn ${ownerTitle} ơi... 😿`,
    `Huhu... em ${name} đói quá không học được nữa rồi... 😭`,
  ];
};

const getThirstyMessages = (animalType: 'elephant' | 'panda', playerName: string): string[] => {
  const name = animalType === 'elephant' ? 'Voi' : 'Gấu Trúc';
  const ownerTitle = playerName === 'Tuệ Anh' ? 'chị' : 'anh';
  
  return [
    `${ownerTitle} ơi... em ${name} khát nước quá... 💧`,
    `Cho em uống nước đi ${ownerTitle} ơi, khát quá... 🥺`,
    `Em ${name} cần nước, miệng khô khốc rồi... 😢`,
    `${ownerTitle} ơi, em ${name} khát... cho em uống đi... 💦`,
    `Huhu... em ${name} khát quá, không chịu nổi nữa rồi... 😭`,
  ];
};

const getSickMessages = (animalType: 'elephant' | 'panda', playerName: string): string[] => {
  const name = animalType === 'elephant' ? 'Voi' : 'Gấu Trúc';
  const ownerTitle = playerName === 'Tuệ Anh' ? 'chị' : 'anh';
  
  return [
    `${ownerTitle} ơi... em ${name} bị ốm rồi... cứu em với... 😭`,
    `Em ${name} yếu lắm rồi ${ownerTitle} ơi... cho em ăn uống đi... 🤒`,
    `Huhu... em ${name} không khỏe... ${ownerTitle} đừng bỏ em... 😿`,
    `Em ${name} cần ${ownerTitle} chăm sóc... em ốm quá... 💔`,
  ];
};

export const AvatarChat = ({ playerName, animalType, hunger = 100, thirst = 100, isSick = false }: AvatarChatProps) => {
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasReachedLimit, setHasReachedLimit] = useState(false);
  const [isUrgentMessage, setIsUrgentMessage] = useState(false);

  // Check for urgent status (hungry/thirsty/sick)
  const isHungry = hunger < 30;
  const isThirsty = thirst < 30;
  const needsAttention = isHungry || isThirsty || isSick;

  // Get random message from array
  const getRandomMessage = (messages: string[]) => {
    return messages[Math.floor(Math.random() * messages.length)];
  };

  // Show urgent message when hungry/thirsty
  useEffect(() => {
    if (needsAttention) {
      let urgentMessage = '';
      
      if (isSick) {
        urgentMessage = getRandomMessage(getSickMessages(animalType, playerName));
      } else if (isHungry && isThirsty) {
        // Both hungry and thirsty - pick one randomly
        const allMessages = [...getHungryMessages(animalType, playerName), ...getThirstyMessages(animalType, playerName)];
        urgentMessage = getRandomMessage(allMessages);
      } else if (isHungry) {
        urgentMessage = getRandomMessage(getHungryMessages(animalType, playerName));
      } else if (isThirsty) {
        urgentMessage = getRandomMessage(getThirstyMessages(animalType, playerName));
      }
      
      setMessage(urgentMessage);
      setIsVisible(true);
      setIsUrgentMessage(true);
    } else {
      setIsUrgentMessage(false);
    }
  }, [needsAttention, isHungry, isThirsty, isSick, animalType, playerName]);

  const checkAndFetchMessage = async () => {
    // Don't fetch normal messages if showing urgent message
    if (needsAttention) return;
    
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
    // Don't auto-fetch if showing urgent message
    if (needsAttention) return;
    
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
  }, [playerName, animalType, needsAttention]);

  // Auto hide after 8 seconds (but not for urgent messages)
  useEffect(() => {
    if (isVisible && message && !isUrgentMessage) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, message, isUrgentMessage]);

  // Cycle urgent messages every 10 seconds
  useEffect(() => {
    if (isUrgentMessage && needsAttention) {
      const interval = setInterval(() => {
        let newMessage = '';
        if (isSick) {
          newMessage = getRandomMessage(getSickMessages(animalType, playerName));
        } else if (isHungry) {
          newMessage = getRandomMessage(getHungryMessages(animalType, playerName));
        } else if (isThirsty) {
          newMessage = getRandomMessage(getThirstyMessages(animalType, playerName));
        }
        setMessage(newMessage);
      }, 10000);
      
      return () => clearInterval(interval);
    }
  }, [isUrgentMessage, needsAttention, isHungry, isThirsty, isSick, animalType, playerName]);

  // Don't render anything if reached limit or not visible (unless urgent)
  if ((hasReachedLimit && !isUrgentMessage) || (!isVisible && !isLoading)) {
    return null;
  }

  return (
    <div className="z-50 animate-fade-in self-start mt-4">
      <div className={cn(
        "relative rounded-2xl px-4 py-3 shadow-xl max-w-[220px] min-w-[160px]",
        isUrgentMessage 
          ? "bg-destructive/10 border-2 border-destructive/50 animate-pulse" 
          : "bg-card border border-border"
      )}>
        {/* Speech bubble tail pointing left */}
        <div className="absolute top-4 left-0 -translate-x-full">
          <div className={cn(
            "w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent",
            isUrgentMessage ? "border-r-destructive/50" : "border-r-border"
          )} />
          <div 
            className={cn(
              "absolute top-0 left-[1px] w-0 h-0 border-t-transparent border-b-transparent",
              isUrgentMessage ? "border-r-destructive/10" : "border-r-card"
            )}
            style={{ borderTopWidth: '7px', borderBottomWidth: '7px', borderRightWidth: '7px' }} 
          />
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span className="text-xs">Đang nghĩ...</span>
          </div>
        ) : (
          <>
            {!isUrgentMessage && (
              <button 
                onClick={() => setIsVisible(false)}
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center"
              >
                <X className="h-3 w-3" />
              </button>
            )}
            
            {/* Urgent message icons */}
            {isUrgentMessage && (
              <div className="flex items-center gap-1 mb-2">
                {(isHungry || isSick) && <Utensils className="h-4 w-4 text-destructive animate-bounce" />}
                {(isThirsty || isSick) && <Droplets className="h-4 w-4 text-destructive animate-bounce" />}
              </div>
            )}
            
            <p className={cn(
              "text-sm leading-relaxed",
              isUrgentMessage ? "text-destructive font-medium" : "text-foreground"
            )}>
              {message}
            </p>
          </>
        )}
      </div>
    </div>
  );
};
