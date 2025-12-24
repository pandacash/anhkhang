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
          <radialGradient id="pandaBg" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="hsl(210, 100%, 95%)"/>
            <stop offset="100%" stopColor="hsl(200, 80%, 88%)"/>
          </radialGradient>
          <linearGradient id="pandaBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(0, 0%, 100%)"/>
            <stop offset="100%" stopColor="hsl(0, 0%, 95%)"/>
          </linearGradient>
          <radialGradient id="cheekGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(350, 100%, 85%)"/>
            <stop offset="100%" stopColor="hsl(350, 80%, 80%)" stopOpacity="0"/>
          </radialGradient>
        </defs>
        
        {/* Background circle - blue for boy */}
        <circle cx="60" cy="60" r="58" fill="url(#pandaBg)" stroke="hsl(200, 70%, 75%)" strokeWidth="3"/>
        
        {/* Ears */}
        <circle cx="22" cy="28" r="18" fill="hsl(0, 0%, 20%)"/>
        <circle cx="22" cy="28" r="12" fill="hsl(0, 0%, 30%)"/>
        <circle cx="98" cy="28" r="18" fill="hsl(0, 0%, 20%)"/>
        <circle cx="98" cy="28" r="12" fill="hsl(0, 0%, 30%)"/>
        
        {/* Head */}
        <ellipse cx="60" cy="58" rx="42" ry="40" fill="url(#pandaBody)"/>
        
        {/* Eye patches - cute rounded shape */}
        <ellipse cx="38" cy="50" rx="16" ry="18" fill="hsl(0, 0%, 15%)" transform="rotate(-10 38 50)"/>
        <ellipse cx="82" cy="50" rx="16" ry="18" fill="hsl(0, 0%, 15%)" transform="rotate(10 82 50)"/>
        
        {/* Eyes - big and cute anime style */}
        <ellipse cx="38" cy="52" rx="10" ry="12" fill="white"/>
        <ellipse cx="82" cy="52" rx="10" ry="12" fill="white"/>
        
        {/* Pupils */}
        <circle cx="40" cy="54" r="7" fill="hsl(0, 0%, 10%)"/>
        <circle cx="84" cy="54" r="7" fill="hsl(0, 0%, 10%)"/>
        
        {/* Eye sparkles */}
        <circle cx="43" cy="51" r="3" fill="white"/>
        <circle cx="87" cy="51" r="3" fill="white"/>
        <circle cx="38" cy="57" r="1.5" fill="white"/>
        <circle cx="82" cy="57" r="1.5" fill="white"/>
        
        {/* Cute nose */}
        <ellipse cx="60" cy="68" rx="8" ry="5" fill="hsl(0, 0%, 20%)"/>
        <ellipse cx="60" cy="67" rx="3" ry="2" fill="hsl(0, 0%, 40%)"/>
        
        {/* Mouth - cute smile */}
        <path d="M52 76 Q60 84 68 76" stroke="hsl(0, 0%, 30%)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        
        {/* Rosy cheeks */}
        <ellipse cx="28" cy="65" rx="8" ry="6" fill="url(#cheekGlow)"/>
        <ellipse cx="92" cy="65" rx="8" ry="6" fill="url(#cheekGlow)"/>
        
        {/* Bamboo accessory */}
        <g transform="translate(85, 15) rotate(30)">
          <rect x="0" y="0" width="6" height="30" rx="3" fill="hsl(120, 50%, 45%)"/>
          <rect x="0" y="0" width="6" height="5" rx="2" fill="hsl(120, 60%, 55%)"/>
          <rect x="0" y="10" width="6" height="3" rx="1" fill="hsl(120, 40%, 35%)"/>
          <rect x="0" y="20" width="6" height="3" rx="1" fill="hsl(120, 40%, 35%)"/>
          <ellipse cx="8" cy="5" rx="6" ry="4" fill="hsl(120, 60%, 50%)"/>
          <ellipse cx="10" cy="3" rx="4" ry="3" fill="hsl(120, 70%, 55%)"/>
        </g>
        
        {/* Sparkles */}
        <circle cx="25" cy="90" r="2" fill="hsl(50, 100%, 70%)"/>
        <circle cx="95" cy="85" r="1.5" fill="hsl(50, 100%, 70%)"/>
        <path d="M15 50 L17 48 L19 50 L17 52 Z" fill="hsl(50, 100%, 80%)"/>
      </svg>
      
      {selected && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-bold shadow-kid">
          ✓
        </div>
      )}
    </div>
  );
};
