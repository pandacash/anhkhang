import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { MessageCircle, X, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AvatarChatProps {
  playerName: string;
  animalType: 'elephant' | 'panda';
}

export const AvatarChat = ({ playerName, animalType }: AvatarChatProps) => {
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fetchMessage = async () => {
    setIsLoading(true);
    setHasError(false);
    
    try {
      const { data, error } = await supabase.functions.invoke('avatar-chat', {
        body: { playerName, animalType }
      });

      if (error) throw error;
      
      setMessage(data.message);
      setIsVisible(true);
    } catch (error) {
      console.error('Error fetching avatar message:', error);
      setHasError(true);
      // Fallback messages
      const fallbacks = animalType === 'elephant' 
        ? [`Chào ${playerName === 'Tuệ Anh' ? 'chị Tuệ Anh' : 'anh Phúc Khang'}! Em Voi chúc anh/chị học giỏi nha!`]
        : [`Chào ${playerName === 'Tuệ Anh' ? 'chị Tuệ Anh' : 'anh Phúc Khang'}! Em Gấu Trúc yêu anh/chị nhiều lắm!`];
      setMessage(fallbacks[0]);
      setIsVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Auto fetch on mount with a small delay
    const timer = setTimeout(() => {
      fetchMessage();
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [playerName, animalType]);

  // Auto hide after 10 seconds
  useEffect(() => {
    if (isVisible && message) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, message]);

  if (!isVisible && !isLoading) {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={fetchMessage}
        className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-primary/90 hover:bg-primary text-primary-foreground shadow-lg animate-bounce"
        disabled={isLoading}
      >
        <MessageCircle className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <div className="absolute -top-4 left-1/2 -translate-x-1/2 -translate-y-full z-10 animate-fade-in">
      <div className="relative bg-card border border-border rounded-2xl px-4 py-3 shadow-xl max-w-[200px] min-w-[150px]">
        {/* Speech bubble tail */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full">
          <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-border" />
          <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-7 border-r-7 border-t-7 border-l-transparent border-r-transparent border-t-card" 
               style={{ borderLeftWidth: '7px', borderRightWidth: '7px', borderTopWidth: '7px' }} />
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
            <button
              onClick={fetchMessage}
              className="mt-2 text-xs text-primary hover:text-primary/80 flex items-center gap-1"
            >
              <RefreshCw className="h-3 w-3" />
              Nói tiếp
            </button>
          </>
        )}
      </div>
    </div>
  );
};
