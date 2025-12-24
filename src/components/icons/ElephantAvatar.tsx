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
        {/* Background circle */}
        <circle cx="60" cy="60" r="58" fill="url(#elephantBg)" stroke="hsl(330, 70%, 65%)" strokeWidth="3"/>
        
        {/* Ears */}
        <ellipse cx="25" cy="55" rx="18" ry="22" fill="hsl(330, 60%, 75%)"/>
        <ellipse cx="25" cy="55" rx="12" ry="15" fill="hsl(330, 70%, 85%)"/>
        <ellipse cx="95" cy="55" rx="18" ry="22" fill="hsl(330, 60%, 75%)"/>
        <ellipse cx="95" cy="55" rx="12" ry="15" fill="hsl(330, 70%, 85%)"/>
        
        {/* Head */}
        <ellipse cx="60" cy="58" rx="35" ry="38" fill="hsl(330, 60%, 78%)"/>
        
        {/* Eyes */}
        <ellipse cx="45" cy="48" rx="8" ry="10" fill="white"/>
        <ellipse cx="75" cy="48" rx="8" ry="10" fill="white"/>
        <circle cx="47" cy="50" r="5" fill="hsl(250, 40%, 25%)"/>
        <circle cx="77" cy="50" r="5" fill="hsl(250, 40%, 25%)"/>
        <circle cx="48" cy="48" r="2" fill="white"/>
        <circle cx="78" cy="48" r="2" fill="white"/>
        
        {/* Trunk */}
        <path 
          d="M60 60 Q60 75 55 85 Q50 95 55 100 Q60 105 65 100 Q70 95 65 85 Q60 75 60 60" 
          fill="hsl(330, 55%, 72%)"
          stroke="hsl(330, 50%, 65%)"
          strokeWidth="2"
        />
        
        {/* Cheeks */}
        <circle cx="35" cy="62" r="8" fill="hsl(350, 70%, 80%)" fillOpacity="0.6"/>
        <circle cx="85" cy="62" r="8" fill="hsl(350, 70%, 80%)" fillOpacity="0.6"/>
        
        {/* Crown/Bow for girl */}
        <path 
          d="M40 25 Q50 18 60 25 Q70 18 80 25 L75 35 Q60 28 45 35 Z" 
          fill="hsl(50, 90%, 65%)"
          stroke="hsl(40, 80%, 55%)"
          strokeWidth="1"
        />
        <circle cx="60" cy="22" r="4" fill="hsl(350, 80%, 70%)"/>
        
        <defs>
          <radialGradient id="elephantBg" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="hsl(330, 70%, 90%)"/>
            <stop offset="100%" stopColor="hsl(330, 60%, 80%)"/>
          </radialGradient>
        </defs>
      </svg>
      
      {selected && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold shadow-elephant">
          ✓
        </div>
      )}
    </div>
  );
};
