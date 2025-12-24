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
        <defs>
          <radialGradient id="elephantBg" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="hsl(340, 80%, 92%)"/>
            <stop offset="100%" stopColor="hsl(320, 70%, 85%)"/>
          </radialGradient>
          <linearGradient id="elephantBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(220, 15%, 75%)"/>
            <stop offset="50%" stopColor="hsl(220, 12%, 68%)"/>
            <stop offset="100%" stopColor="hsl(220, 10%, 60%)"/>
          </linearGradient>
          <linearGradient id="elephantEar" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(220, 12%, 70%)"/>
            <stop offset="100%" stopColor="hsl(220, 10%, 62%)"/>
          </linearGradient>
        </defs>
        
        {/* Background circle - pink for girl */}
        <circle cx="60" cy="60" r="58" fill="url(#elephantBg)" stroke="hsl(340, 70%, 75%)" strokeWidth="3"/>
        
        {/* Large elephant ears */}
        <ellipse cx="15" cy="55" rx="22" ry="30" fill="url(#elephantEar)"/>
        <ellipse cx="15" cy="55" rx="15" ry="22" fill="hsl(350, 60%, 80%)" fillOpacity="0.7"/>
        
        <ellipse cx="105" cy="55" rx="22" ry="30" fill="url(#elephantEar)"/>
        <ellipse cx="105" cy="55" rx="15" ry="22" fill="hsl(350, 60%, 80%)" fillOpacity="0.7"/>
        
        {/* Head */}
        <ellipse cx="60" cy="52" rx="35" ry="32" fill="url(#elephantBody)"/>
        
        {/* Forehead bump */}
        <ellipse cx="60" cy="38" rx="18" ry="10" fill="hsl(220, 15%, 78%)" fillOpacity="0.6"/>
        
        {/* Eyes */}
        <ellipse cx="45" cy="45" rx="8" ry="10" fill="white"/>
        <ellipse cx="75" cy="45" rx="8" ry="10" fill="white"/>
        <circle cx="46" cy="47" r="5" fill="hsl(220, 30%, 20%)"/>
        <circle cx="76" cy="47" r="5" fill="hsl(220, 30%, 20%)"/>
        <circle cx="48" cy="45" r="2" fill="white"/>
        <circle cx="78" cy="45" r="2" fill="white"/>
        
        {/* Cute eyelashes for girl */}
        <path d="M36 40 L39 44" stroke="hsl(220, 20%, 40%)" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M34 44 L38 46" stroke="hsl(220, 20%, 40%)" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M84 40 L81 44" stroke="hsl(220, 20%, 40%)" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M86 44 L82 46" stroke="hsl(220, 20%, 40%)" strokeWidth="1.5" strokeLinecap="round"/>
        
        {/* Long trunk */}
        <path 
          d="M60 55 
             Q60 65 58 75 
             Q56 85 52 92 
             Q48 98 44 96 
             Q40 94 42 88
             Q44 82 48 78
             Q52 74 54 68
             Q56 62 58 55"
          fill="url(#elephantBody)"
          stroke="hsl(220, 12%, 55%)"
          strokeWidth="2"
        />
        {/* Trunk tip nostrils */}
        <ellipse cx="43" cy="92" rx="5" ry="3" fill="hsl(220, 15%, 60%)"/>
        <circle cx="41" cy="92" r="1.5" fill="hsl(220, 15%, 50%)"/>
        <circle cx="45" cy="92" r="1.5" fill="hsl(220, 15%, 50%)"/>
        
        {/* Tusks */}
        <path d="M50 68 Q46 75 48 82" stroke="hsl(45, 30%, 95%)" strokeWidth="4" fill="none" strokeLinecap="round"/>
        <path d="M70 68 Q74 75 72 82" stroke="hsl(45, 30%, 95%)" strokeWidth="4" fill="none" strokeLinecap="round"/>
        
        {/* Rosy cheeks */}
        <ellipse cx="32" cy="55" rx="6" ry="5" fill="hsl(350, 80%, 80%)" fillOpacity="0.7"/>
        <ellipse cx="88" cy="55" rx="6" ry="5" fill="hsl(350, 80%, 80%)" fillOpacity="0.7"/>
        
        {/* Pink bow for girl */}
        <g transform="translate(60, 22)">
          <ellipse cx="-12" cy="0" rx="10" ry="6" fill="hsl(340, 85%, 70%)"/>
          <ellipse cx="12" cy="0" rx="10" ry="6" fill="hsl(340, 85%, 70%)"/>
          <circle cx="0" cy="0" r="5" fill="hsl(340, 90%, 65%)"/>
          <ellipse cx="0" cy="10" rx="3" ry="8" fill="hsl(340, 85%, 70%)"/>
          <ellipse cx="0" cy="10" rx="3" ry="8" fill="hsl(340, 85%, 70%)" transform="rotate(15)"/>
        </g>
        
        {/* Sparkles */}
        <circle cx="95" cy="25" r="2" fill="hsl(50, 100%, 70%)"/>
        <circle cx="25" cy="85" r="1.5" fill="hsl(50, 100%, 70%)"/>
      </svg>
      
      {selected && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold shadow-elephant">
          ✓
        </div>
      )}
    </div>
  );
};
