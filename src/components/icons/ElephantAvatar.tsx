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
            <stop offset="0%" stopColor="hsl(220, 20%, 78%)"/>
            <stop offset="50%" stopColor="hsl(220, 18%, 72%)"/>
            <stop offset="100%" stopColor="hsl(220, 15%, 65%)"/>
          </linearGradient>
          <radialGradient id="elephantCheek" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(350, 100%, 85%)"/>
            <stop offset="100%" stopColor="hsl(350, 80%, 80%)" stopOpacity="0"/>
          </radialGradient>
        </defs>
        
        {/* Background circle - pink for girl */}
        <circle cx="60" cy="60" r="58" fill="url(#elephantBg)" stroke="hsl(340, 70%, 75%)" strokeWidth="3"/>
        
        {/* Large elephant ears */}
        <ellipse cx="18" cy="50" rx="20" ry="28" fill="url(#elephantBody)" stroke="hsl(220, 15%, 60%)" strokeWidth="1"/>
        <ellipse cx="18" cy="50" rx="14" ry="20" fill="hsl(350, 60%, 85%)" fillOpacity="0.6"/>
        
        <ellipse cx="102" cy="50" rx="20" ry="28" fill="url(#elephantBody)" stroke="hsl(220, 15%, 60%)" strokeWidth="1"/>
        <ellipse cx="102" cy="50" rx="14" ry="20" fill="hsl(350, 60%, 85%)" fillOpacity="0.6"/>
        
        {/* Head */}
        <ellipse cx="60" cy="52" rx="36" ry="34" fill="url(#elephantBody)"/>
        
        {/* Forehead highlight */}
        <ellipse cx="60" cy="38" rx="20" ry="12" fill="hsl(220, 25%, 82%)" fillOpacity="0.5"/>
        
        {/* Eyes - big cute anime style */}
        <ellipse cx="45" cy="45" rx="10" ry="12" fill="white"/>
        <ellipse cx="75" cy="45" rx="10" ry="12" fill="white"/>
        
        {/* Pupils */}
        <circle cx="47" cy="47" r="6" fill="hsl(220, 40%, 20%)"/>
        <circle cx="77" cy="47" r="6" fill="hsl(220, 40%, 20%)"/>
        
        {/* Eye sparkles */}
        <circle cx="50" cy="44" r="3" fill="white"/>
        <circle cx="80" cy="44" r="3" fill="white"/>
        <circle cx="45" cy="50" r="1.5" fill="white"/>
        <circle cx="75" cy="50" r="1.5" fill="white"/>
        
        {/* Cute eyelashes for girl */}
        <path d="M33 38 L37 43" stroke="hsl(220, 20%, 40%)" strokeWidth="2" strokeLinecap="round"/>
        <path d="M31 43 L36 46" stroke="hsl(220, 20%, 40%)" strokeWidth="2" strokeLinecap="round"/>
        <path d="M87 38 L83 43" stroke="hsl(220, 20%, 40%)" strokeWidth="2" strokeLinecap="round"/>
        <path d="M89 43 L84 46" stroke="hsl(220, 20%, 40%)" strokeWidth="2" strokeLinecap="round"/>
        
        {/* Trunk - cute curled */}
        <path 
          d="M60 55 
             Q60 65 57 72 
             Q54 80 50 85 
             Q46 90 42 88
             Q38 86 40 82
             Q42 78 46 76
             Q50 74 53 70
             Q56 66 57 60"
          fill="url(#elephantBody)"
          stroke="hsl(220, 15%, 58%)"
          strokeWidth="1.5"
        />
        {/* Trunk tip */}
        <ellipse cx="41" cy="85" rx="5" ry="4" fill="hsl(220, 18%, 70%)"/>
        <circle cx="39" cy="85" r="2" fill="hsl(220, 15%, 55%)"/>
        <circle cx="43" cy="85" r="2" fill="hsl(220, 15%, 55%)"/>
        
        {/* Rosy cheeks */}
        <ellipse cx="30" cy="58" rx="8" ry="6" fill="url(#elephantCheek)"/>
        <ellipse cx="90" cy="58" rx="8" ry="6" fill="url(#elephantCheek)"/>
        
        {/* Cute smile */}
        <path d="M65 70 Q68 75 73 72" stroke="hsl(220, 15%, 50%)" strokeWidth="2" fill="none" strokeLinecap="round"/>
        
        {/* Pink bow for girl */}
        <g transform="translate(60, 20)">
          <ellipse cx="-14" cy="0" rx="12" ry="7" fill="hsl(340, 85%, 65%)"/>
          <ellipse cx="14" cy="0" rx="12" ry="7" fill="hsl(340, 85%, 65%)"/>
          <circle cx="0" cy="0" r="6" fill="hsl(340, 90%, 60%)"/>
          <ellipse cx="-14" cy="0" rx="6" ry="4" fill="hsl(340, 80%, 75%)" fillOpacity="0.5"/>
          <ellipse cx="14" cy="0" rx="6" ry="4" fill="hsl(340, 80%, 75%)" fillOpacity="0.5"/>
          <ellipse cx="0" cy="12" rx="4" ry="9" fill="hsl(340, 85%, 65%)"/>
          <ellipse cx="0" cy="12" rx="4" ry="9" fill="hsl(340, 85%, 65%)" transform="rotate(10)"/>
        </g>
        
        {/* Sparkles */}
        <circle cx="95" cy="25" r="2.5" fill="hsl(50, 100%, 70%)"/>
        <circle cx="25" cy="85" r="2" fill="hsl(50, 100%, 70%)"/>
        <path d="M98 40 L100 38 L102 40 L100 42 Z" fill="hsl(50, 100%, 80%)"/>
        
        {/* Heart decoration */}
        <path d="M12 70 C12 68 14 66 16 68 C18 66 20 68 20 70 C20 73 16 76 16 76 C16 76 12 73 12 70 Z" fill="hsl(340, 80%, 70%)"/>
      </svg>
      
      {selected && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold shadow-elephant">
          ✓
        </div>
      )}
    </div>
  );
};
