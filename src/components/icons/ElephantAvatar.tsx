import { cn } from "@/lib/utils";

interface ElephantAvatarProps {
  className?: string;
  size?: number;
  selected?: boolean;
}

export const ElephantAvatar = ({ className, size = 120, selected = false }: ElephantAvatarProps) => {
  return (
    <div 
      className={cn(
        "relative transition-all duration-300",
        selected && "scale-110",
        className
      )}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
        {/* Background circle with gradient */}
        <defs>
          <radialGradient id="elephantBg" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="hsl(320, 80%, 92%)"/>
            <stop offset="100%" stopColor="hsl(300, 70%, 85%)"/>
          </radialGradient>
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(320, 65%, 80%)"/>
            <stop offset="100%" stopColor="hsl(290, 60%, 75%)"/>
          </linearGradient>
          <linearGradient id="earGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(320, 60%, 85%)"/>
            <stop offset="100%" stopColor="hsl(290, 55%, 78%)"/>
          </linearGradient>
        </defs>
        
        <circle cx="60" cy="60" r="58" fill="url(#elephantBg)" stroke="hsl(320, 70%, 70%)" strokeWidth="3"/>
        
        {/* Left ear */}
        <ellipse cx="22" cy="50" rx="20" ry="26" fill="url(#earGradient)"/>
        <ellipse cx="22" cy="50" rx="14" ry="18" fill="hsl(350, 80%, 90%)" fillOpacity="0.6"/>
        
        {/* Right ear */}
        <ellipse cx="98" cy="50" rx="20" ry="26" fill="url(#earGradient)"/>
        <ellipse cx="98" cy="50" rx="14" ry="18" fill="hsl(350, 80%, 90%)" fillOpacity="0.6"/>
        
        {/* Head */}
        <ellipse cx="60" cy="55" rx="38" ry="40" fill="url(#bodyGradient)"/>
        
        {/* Eyes - bigger and cuter */}
        <ellipse cx="42" cy="45" rx="11" ry="13" fill="white"/>
        <ellipse cx="78" cy="45" rx="11" ry="13" fill="white"/>
        
        {/* Pupils with sparkle */}
        <circle cx="44" cy="47" r="7" fill="hsl(260, 50%, 20%)"/>
        <circle cx="80" cy="47" r="7" fill="hsl(260, 50%, 20%)"/>
        <circle cx="46" cy="44" r="3" fill="white"/>
        <circle cx="82" cy="44" r="3" fill="white"/>
        <circle cx="42" cy="49" r="1.5" fill="white" fillOpacity="0.6"/>
        <circle cx="78" cy="49" r="1.5" fill="white" fillOpacity="0.6"/>
        
        {/* Eyebrows - happy curved */}
        <path d="M32 36 Q42 32 52 36" stroke="hsl(290, 40%, 50%)" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M68 36 Q78 32 88 36" stroke="hsl(290, 40%, 50%)" strokeWidth="2" fill="none" strokeLinecap="round"/>
        
        {/* Trunk - curled up happily */}
        <path 
          d="M60 58 Q58 68 54 76 Q48 86 42 88 Q36 90 34 86 Q32 82 36 80 Q42 78 46 72 Q52 62 60 58" 
          fill="hsl(310, 55%, 75%)"
          stroke="hsl(300, 50%, 65%)"
          strokeWidth="2"
        />
        <ellipse cx="35" cy="84" rx="4" ry="3" fill="hsl(350, 70%, 85%)"/>
        
        {/* Cheeks - rosy */}
        <ellipse cx="30" cy="60" rx="10" ry="8" fill="hsl(350, 85%, 85%)" fillOpacity="0.7"/>
        <ellipse cx="90" cy="60" rx="10" ry="8" fill="hsl(350, 85%, 85%)" fillOpacity="0.7"/>
        
        {/* Smile */}
        <path 
          d="M50 72 Q60 80 70 72" 
          stroke="hsl(290, 40%, 45%)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Cute flower bow */}
        <g transform="translate(75, 20)">
          {/* Flower petals */}
          <ellipse cx="0" cy="-6" rx="5" ry="7" fill="hsl(340, 85%, 75%)"/>
          <ellipse cx="6" cy="0" rx="5" ry="7" fill="hsl(340, 85%, 75%)" transform="rotate(72)"/>
          <ellipse cx="4" cy="5" rx="5" ry="7" fill="hsl(340, 85%, 75%)" transform="rotate(144)"/>
          <ellipse cx="-4" cy="5" rx="5" ry="7" fill="hsl(340, 85%, 75%)" transform="rotate(216)"/>
          <ellipse cx="-6" cy="0" rx="5" ry="7" fill="hsl(340, 85%, 75%)" transform="rotate(288)"/>
          {/* Center */}
          <circle cx="0" cy="0" r="5" fill="hsl(50, 95%, 65%)"/>
          <circle cx="0" cy="0" r="2" fill="hsl(40, 90%, 55%)"/>
        </g>
        
        {/* Sparkles */}
        <g fill="hsl(50, 100%, 70%)">
          <path d="M18 25 L20 28 L23 25 L20 22 Z" />
          <path d="M95 70 L97 73 L100 70 L97 67 Z" />
        </g>
      </svg>
      
      {selected && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold shadow-elephant">
          ✓
        </div>
      )}
    </div>
  );
};
