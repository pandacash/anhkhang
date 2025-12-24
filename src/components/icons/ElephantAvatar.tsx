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
          <radialGradient id="elephantBgNew" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="hsl(340, 85%, 92%)"/>
            <stop offset="100%" stopColor="hsl(320, 75%, 85%)"/>
          </radialGradient>
          <linearGradient id="bodyGradientNew" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(340, 70%, 82%)"/>
            <stop offset="100%" stopColor="hsl(320, 65%, 78%)"/>
          </linearGradient>
        </defs>
        
        {/* Background circle */}
        <circle cx="60" cy="60" r="58" fill="url(#elephantBgNew)" stroke="hsl(340, 75%, 75%)" strokeWidth="3"/>
        
        {/* Left ear - rounder */}
        <ellipse cx="18" cy="48" rx="18" ry="24" fill="hsl(340, 65%, 80%)"/>
        <ellipse cx="18" cy="48" rx="12" ry="16" fill="hsl(350, 85%, 88%)" fillOpacity="0.8"/>
        
        {/* Right ear */}
        <ellipse cx="102" cy="48" rx="18" ry="24" fill="hsl(340, 65%, 80%)"/>
        <ellipse cx="102" cy="48" rx="12" ry="16" fill="hsl(350, 85%, 88%)" fillOpacity="0.8"/>
        
        {/* Head - round and cute */}
        <ellipse cx="60" cy="58" rx="40" ry="42" fill="url(#bodyGradientNew)"/>
        
        {/* Forehead highlight */}
        <ellipse cx="60" cy="40" rx="20" ry="12" fill="hsl(340, 80%, 88%)" fillOpacity="0.5"/>
        
        {/* Eyes - big sparkly anime style */}
        <ellipse cx="40" cy="48" rx="12" ry="14" fill="white"/>
        <ellipse cx="80" cy="48" rx="12" ry="14" fill="white"/>
        
        {/* Pupils */}
        <ellipse cx="42" cy="50" rx="8" ry="10" fill="hsl(280, 60%, 25%)"/>
        <ellipse cx="82" cy="50" rx="8" ry="10" fill="hsl(280, 60%, 25%)"/>
        
        {/* Eye sparkles */}
        <circle cx="45" cy="46" r="4" fill="white"/>
        <circle cx="85" cy="46" r="4" fill="white"/>
        <circle cx="39" cy="52" r="2" fill="white" fillOpacity="0.7"/>
        <circle cx="79" cy="52" r="2" fill="white" fillOpacity="0.7"/>
        
        {/* Eyelashes */}
        <path d="M30 42 L34 46" stroke="hsl(320, 50%, 40%)" strokeWidth="2" strokeLinecap="round"/>
        <path d="M28 47 L33 49" stroke="hsl(320, 50%, 40%)" strokeWidth="2" strokeLinecap="round"/>
        <path d="M90 42 L86 46" stroke="hsl(320, 50%, 40%)" strokeWidth="2" strokeLinecap="round"/>
        <path d="M92 47 L87 49" stroke="hsl(320, 50%, 40%)" strokeWidth="2" strokeLinecap="round"/>
        
        {/* Trunk - short and curly */}
        <path 
          d="M60 62 Q58 72 52 78 Q46 84 48 90 Q50 96 56 94 Q62 92 60 84 Q58 76 60 70" 
          fill="hsl(335, 60%, 78%)"
          stroke="hsl(320, 55%, 70%)"
          strokeWidth="2"
        />
        {/* Trunk tip */}
        <ellipse cx="52" cy="92" rx="6" ry="4" fill="hsl(350, 70%, 85%)"/>
        
        {/* Rosy cheeks */}
        <ellipse cx="25" cy="62" rx="10" ry="8" fill="hsl(350, 90%, 85%)" fillOpacity="0.8"/>
        <ellipse cx="95" cy="62" rx="10" ry="8" fill="hsl(350, 90%, 85%)" fillOpacity="0.8"/>
        
        {/* Smile */}
        <path 
          d="M48 75 Q60 85 72 75" 
          stroke="hsl(320, 45%, 50%)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Crown/tiara for princess */}
        <g transform="translate(60, 18)">
          {/* Tiara base */}
          <path 
            d="M-25 8 Q-20 0 -12 5 Q-6 -5 0 2 Q6 -5 12 5 Q20 0 25 8 L22 12 L-22 12 Z" 
            fill="hsl(50, 95%, 65%)"
            stroke="hsl(45, 90%, 50%)"
            strokeWidth="1"
          />
          {/* Gems */}
          <circle cx="0" cy="4" r="4" fill="hsl(340, 90%, 70%)"/>
          <circle cx="-12" cy="6" r="2.5" fill="hsl(195, 100%, 60%)"/>
          <circle cx="12" cy="6" r="2.5" fill="hsl(195, 100%, 60%)"/>
          {/* Sparkle on center gem */}
          <circle cx="-1" cy="3" r="1" fill="white"/>
        </g>
        
        {/* Little hearts around */}
        <g fill="hsl(350, 85%, 75%)">
          <path d="M15 80 C15 78 17 76 19 78 C21 76 23 78 23 80 C23 83 19 86 19 86 C19 86 15 83 15 80Z" transform="scale(0.6) translate(10, 20)"/>
          <path d="M15 80 C15 78 17 76 19 78 C21 76 23 78 23 80 C23 83 19 86 19 86 C19 86 15 83 15 80Z" transform="scale(0.5) translate(180, 30)"/>
        </g>
        
        {/* Sparkle stars */}
        <g fill="hsl(50, 100%, 70%)">
          <path d="M98 28 L99 31 L102 31 L100 33 L101 36 L98 34 L95 36 L96 33 L94 31 L97 31 Z" transform="scale(0.7)"/>
          <path d="M25 95 L26 98 L29 98 L27 100 L28 103 L25 101 L22 103 L23 100 L21 98 L24 98 Z" transform="scale(0.6)"/>
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
