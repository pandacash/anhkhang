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
        <defs>
          <radialGradient id="pandaBgMale" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="hsl(200, 60%, 90%)"/>
            <stop offset="100%" stopColor="hsl(210, 50%, 82%)"/>
          </radialGradient>
          <linearGradient id="pandaBlack" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(0, 0%, 20%)"/>
            <stop offset="100%" stopColor="hsl(0, 0%, 10%)"/>
          </linearGradient>
        </defs>
        
        {/* Background circle - blue for boy */}
        <circle cx="60" cy="60" r="58" fill="url(#pandaBgMale)" stroke="hsl(200, 50%, 60%)" strokeWidth="3"/>
        
        {/* Ears - black and bigger */}
        <circle cx="25" cy="28" r="18" fill="url(#pandaBlack)"/>
        <circle cx="95" cy="28" r="18" fill="url(#pandaBlack)"/>
        
        {/* Head - white */}
        <ellipse cx="60" cy="58" rx="40" ry="38" fill="hsl(0, 0%, 98%)"/>
        
        {/* Eye patches - bold and angular */}
        <ellipse cx="40" cy="50" rx="16" ry="18" fill="url(#pandaBlack)" transform="rotate(-15 40 50)"/>
        <ellipse cx="80" cy="50" rx="16" ry="18" fill="url(#pandaBlack)" transform="rotate(15 80 50)"/>
        
        {/* Eyes - determined look */}
        <ellipse cx="40" cy="50" rx="8" ry="10" fill="white"/>
        <ellipse cx="80" cy="50" rx="8" ry="10" fill="white"/>
        
        {/* Pupils - looking slightly up for confident look */}
        <circle cx="41" cy="48" r="5" fill="hsl(200, 60%, 15%)"/>
        <circle cx="81" cy="48" r="5" fill="hsl(200, 60%, 15%)"/>
        <circle cx="43" cy="46" r="2" fill="white"/>
        <circle cx="83" cy="46" r="2" fill="white"/>
        
        {/* Eyebrows - bold, masculine */}
        <path d="M28 38 L48 42" stroke="hsl(0, 0%, 15%)" strokeWidth="3" strokeLinecap="round"/>
        <path d="M92 38 L72 42" stroke="hsl(0, 0%, 15%)" strokeWidth="3" strokeLinecap="round"/>
        
        {/* Nose - bigger */}
        <ellipse cx="60" cy="68" rx="8" ry="5" fill="hsl(0, 0%, 15%)"/>
        <ellipse cx="60" cy="66" rx="3" ry="2" fill="hsl(0, 0%, 30%)"/>
        
        {/* Confident smile */}
        <path 
          d="M48 78 Q60 88 72 78" 
          stroke="hsl(0, 0%, 20%)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Teeth showing in smile */}
        <path 
          d="M52 80 L52 84 L56 84 L56 80" 
          fill="white"
          stroke="hsl(0, 0%, 85%)"
          strokeWidth="0.5"
        />
        <path 
          d="M64 80 L64 84 L68 84 L68 80" 
          fill="white"
          stroke="hsl(0, 0%, 85%)"
          strokeWidth="0.5"
        />
        
        {/* Subtle cheek marks */}
        <ellipse cx="28" cy="65" rx="5" ry="3" fill="hsl(0, 0%, 90%)"/>
        <ellipse cx="92" cy="65" rx="5" ry="3" fill="hsl(0, 0%, 90%)"/>
        
        {/* Cool headband */}
        <path 
          d="M22 35 Q60 28 98 35" 
          stroke="hsl(200, 70%, 50%)"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="60" cy="30" r="6" fill="hsl(200, 70%, 50%)"/>
        <text x="60" y="33" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">★</text>
        
        {/* Bamboo stick */}
        <g transform="translate(92, 70) rotate(25)">
          <rect x="0" y="0" width="5" height="30" rx="2" fill="hsl(100, 45%, 40%)"/>
          <rect x="0" y="8" width="5" height="2" fill="hsl(100, 40%, 35%)"/>
          <rect x="0" y="18" width="5" height="2" fill="hsl(100, 40%, 35%)"/>
          <ellipse cx="2.5" cy="-3" rx="6" ry="4" fill="hsl(100, 55%, 50%)"/>
        </g>
      </svg>
      
      {selected && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-panda text-foreground px-3 py-1 rounded-full text-sm font-bold shadow-panda">
          ✓
        </div>
      )}
    </div>
  );
};
