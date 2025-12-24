import { cn } from "@/lib/utils";

interface PandaAvatarProps {
  className?: string;
  size?: number;
  selected?: boolean;
}

export const PandaAvatar = ({ className, size = 120, selected = false }: PandaAvatarProps) => {
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
        {/* Background circle */}
        <circle cx="60" cy="60" r="58" fill="url(#pandaBg)" stroke="hsl(170, 50%, 55%)" strokeWidth="3"/>
        
        {/* Ears */}
        <circle cx="28" cy="32" r="16" fill="hsl(0, 0%, 15%)"/>
        <circle cx="92" cy="32" r="16" fill="hsl(0, 0%, 15%)"/>
        
        {/* Head */}
        <ellipse cx="60" cy="60" rx="38" ry="36" fill="white"/>
        
        {/* Eye patches */}
        <ellipse cx="42" cy="52" rx="14" ry="16" fill="hsl(0, 0%, 15%)" transform="rotate(-10 42 52)"/>
        <ellipse cx="78" cy="52" rx="14" ry="16" fill="hsl(0, 0%, 15%)" transform="rotate(10 78 52)"/>
        
        {/* Eyes */}
        <ellipse cx="42" cy="52" rx="7" ry="9" fill="white"/>
        <ellipse cx="78" cy="52" rx="7" ry="9" fill="white"/>
        <circle cx="44" cy="54" r="4" fill="hsl(250, 40%, 25%)"/>
        <circle cx="80" cy="54" r="4" fill="hsl(250, 40%, 25%)"/>
        <circle cx="45" cy="52" r="2" fill="white"/>
        <circle cx="81" cy="52" r="2" fill="white"/>
        
        {/* Nose */}
        <ellipse cx="60" cy="68" rx="6" ry="4" fill="hsl(0, 0%, 20%)"/>
        
        {/* Mouth */}
        <path 
          d="M52 75 Q60 82 68 75" 
          stroke="hsl(0, 0%, 25%)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Cheeks */}
        <circle cx="35" cy="70" r="8" fill="hsl(350, 70%, 80%)" fillOpacity="0.7"/>
        <circle cx="85" cy="70" r="8" fill="hsl(350, 70%, 80%)" fillOpacity="0.7"/>
        
        {/* Bamboo accessory */}
        <rect x="88" y="75" width="4" height="25" rx="2" fill="hsl(100, 50%, 45%)"/>
        <ellipse cx="90" cy="78" rx="6" ry="3" fill="hsl(100, 60%, 55%)"/>
        <ellipse cx="90" cy="85" rx="5" ry="2" fill="hsl(100, 60%, 55%)"/>
        
        <defs>
          <radialGradient id="pandaBg" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="hsl(170, 50%, 90%)"/>
            <stop offset="100%" stopColor="hsl(170, 45%, 80%)"/>
          </radialGradient>
        </defs>
      </svg>
      
      {selected && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-panda text-foreground px-3 py-1 rounded-full text-sm font-bold shadow-panda">
          ✓
        </div>
      )}
    </div>
  );
};
