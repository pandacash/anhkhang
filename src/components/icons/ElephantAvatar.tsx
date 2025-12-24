import { cn } from "@/lib/utils";
import { ShopItem } from "@/types/shop";

interface ElephantAvatarProps {
  className?: string;
  size?: number;
  selected?: boolean;
  equippedItems?: ShopItem[];
  showDecorations?: boolean;
}

export const ElephantAvatar = ({ 
  className, 
  size = 120, 
  selected = false,
  equippedItems = [],
  showDecorations = true
}: ElephantAvatarProps) => {
  const hasHat = equippedItems.some(i => i.category === 'hat');
  const hasArmor = equippedItems.some(i => i.category === 'armor');
  const hasShoes = equippedItems.some(i => i.category === 'shoes');
  const hasAccessory = equippedItems.some(i => i.category === 'accessory');

  const hat = equippedItems.find(i => i.category === 'hat');
  const accessory = equippedItems.find(i => i.category === 'accessory');

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
          <linearGradient id="capeGradEl" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9370DB"/>
            <stop offset="100%" stopColor="#8A2BE2"/>
          </linearGradient>
        </defs>
        
        {/* Background circle - pink for girl */}
        <circle cx="60" cy="60" r="58" fill="url(#elephantBg)" stroke="hsl(340, 70%, 75%)" strokeWidth="3"/>
        
        {/* Extra flower decorations */}
        {showDecorations && (
          <>
            <circle cx="15" cy="85" r="6" fill="hsl(340, 80%, 75%)"/>
            <circle cx="15" cy="85" r="3" fill="hsl(50, 100%, 70%)"/>
            <circle cx="10" cy="75" r="4" fill="hsl(300, 70%, 75%)"/>
            <circle cx="10" cy="75" r="2" fill="hsl(50, 100%, 75%)"/>
            
            <circle cx="105" cy="80" r="5" fill="hsl(200, 70%, 70%)"/>
            <circle cx="105" cy="80" r="2.5" fill="hsl(50, 100%, 70%)"/>
            <circle cx="110" cy="90" r="4" fill="hsl(340, 75%, 70%)"/>
            <circle cx="110" cy="90" r="2" fill="hsl(50, 100%, 75%)"/>
          </>
        )}
        
        {/* Shoes/Boots */}
        {hasShoes && (
          <>
            <path d="M30 105 L35 95 L45 95 L45 105 L25 105 Z" fill="#FF69B4"/>
            <path d="M75 105 L80 95 L90 95 L90 105 L70 105 Z" fill="#FF69B4"/>
            <rect x="32" y="97" width="10" height="3" fill="#FFD700" rx="1"/>
            <rect x="77" y="97" width="10" height="3" fill="#FFD700" rx="1"/>
          </>
        )}
        
        {/* Cape/Armor */}
        {hasArmor && (
          <path d="M30 55 L90 55 L95 100 L60 92 L25 100 Z" fill="url(#capeGradEl)" stroke="#4B0082" strokeWidth="1"/>
        )}
        
        {/* Large elephant ears */}
        <ellipse cx="18" cy="50" rx="22" ry="30" fill="url(#elephantBody)" stroke="hsl(220, 15%, 60%)" strokeWidth="1"/>
        <ellipse cx="18" cy="50" rx="15" ry="22" fill="hsl(350, 60%, 85%)" fillOpacity="0.5"/>
        
        <ellipse cx="102" cy="50" rx="22" ry="30" fill="url(#elephantBody)" stroke="hsl(220, 15%, 60%)" strokeWidth="1"/>
        <ellipse cx="102" cy="50" rx="15" ry="22" fill="hsl(350, 60%, 85%)" fillOpacity="0.5"/>
        
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
        
        {/* Trunk */}
        <path 
          d="M60 58 
             C60 62 58 68 56 74
             C54 80 50 88 48 94
             C46 100 48 104 52 104
             C56 104 58 100 58 96
             C58 92 56 88 58 84
             C60 80 62 76 62 70
             C62 64 60 58 60 58"
          fill="url(#elephantBody)"
          stroke="hsl(220, 15%, 58%)"
          strokeWidth="1.5"
        />
        {/* Trunk tip nostrils */}
        <ellipse cx="50" cy="102" rx="4" ry="3" fill="hsl(220, 20%, 60%)"/>
        <circle cx="48" cy="101" r="1.5" fill="hsl(220, 15%, 45%)"/>
        <circle cx="52" cy="101" r="1.5" fill="hsl(220, 15%, 45%)"/>
        
        {/* Trunk wrinkles */}
        <path d="M54 78 Q58 80 62 78" stroke="hsl(220, 15%, 55%)" strokeWidth="1" fill="none"/>
        <path d="M52 84 Q56 86 60 84" stroke="hsl(220, 15%, 55%)" strokeWidth="1" fill="none"/>
        <path d="M50 90 Q54 92 58 90" stroke="hsl(220, 15%, 55%)" strokeWidth="1" fill="none"/>
        
        {/* Bells accessory */}
        {accessory?.image_key === 'elephant_bells' && (
          <>
            <circle cx="25" cy="75" r="6" fill="#FFD700" stroke="#B8860B" strokeWidth="1"/>
            <circle cx="25" cy="79" r="2" fill="#8B4513"/>
            <circle cx="95" cy="75" r="6" fill="#FFD700" stroke="#B8860B" strokeWidth="1"/>
            <circle cx="95" cy="79" r="2" fill="#8B4513"/>
          </>
        )}
        
        {/* Scarf accessory */}
        {accessory?.image_key === 'elephant_scarf' && (
          <path d="M35 60 Q60 68 85 60 Q85 70 80 75 L80 95 Q75 100 70 95 L70 78 Q60 82 50 78 L50 95 Q45 100 40 95 L40 75 Q35 70 35 60" fill="#FF69B4" stroke="#FF1493" strokeWidth="1"/>
        )}
        
        {/* Cute smile */}
        <path d="M68 68 Q72 74 78 70" stroke="hsl(220, 15%, 50%)" strokeWidth="2" fill="none" strokeLinecap="round"/>
        
        {/* Crown hat */}
        {hat?.image_key === 'elephant_crown' && (
          <g transform="translate(60, 12)">
            <polygon points="-25,20 -22,0 -12,12 0,-12 12,12 22,0 25,20" fill="#FFD700" stroke="#B8860B" strokeWidth="1"/>
            <circle cx="-20" cy="2" r="3" fill="#FF69B4"/>
            <circle cx="0" cy="-10" r="3" fill="#FF69B4"/>
            <circle cx="20" cy="2" r="3" fill="#FF69B4"/>
            <rect x="-25" y="20" width="50" height="6" fill="#FFD700" rx="2"/>
          </g>
        )}
        
        {/* Flower hat */}
        {hat?.image_key === 'elephant_flower_hat' && (
          <g transform="translate(60, 8)">
            <ellipse cx="0" cy="12" rx="25" ry="8" fill="#DDA0DD"/>
            <ellipse cx="0" cy="6" rx="18" ry="12" fill="#BA55D3"/>
            <circle cx="-10" cy="0" r="6" fill="#FF69B4"/>
            <circle cx="10" cy="0" r="6" fill="#FFD700"/>
            <circle cx="0" cy="-6" r="6" fill="#87CEEB"/>
            <circle cx="0" cy="2" r="4" fill="#90EE90"/>
          </g>
        )}
        
        {/* Default pink bow if no hat */}
        {!hasHat && (
          <g transform="translate(60, 20)">
            <ellipse cx="-14" cy="0" rx="12" ry="7" fill="hsl(340, 85%, 65%)"/>
            <ellipse cx="14" cy="0" rx="12" ry="7" fill="hsl(340, 85%, 65%)"/>
            <circle cx="0" cy="0" r="6" fill="hsl(340, 90%, 60%)"/>
            <ellipse cx="-14" cy="0" rx="6" ry="4" fill="hsl(340, 80%, 75%)" fillOpacity="0.5"/>
            <ellipse cx="14" cy="0" rx="6" ry="4" fill="hsl(340, 80%, 75%)" fillOpacity="0.5"/>
            <ellipse cx="0" cy="12" rx="4" ry="9" fill="hsl(340, 85%, 65%)"/>
            <ellipse cx="0" cy="12" rx="4" ry="9" fill="hsl(340, 85%, 65%)" transform="rotate(10)"/>
          </g>
        )}
        
        {/* Sparkles */}
        {showDecorations && (
          <>
            <circle cx="95" cy="25" r="2.5" fill="hsl(50, 100%, 70%)" className="animate-sparkle"/>
            <circle cx="25" cy="95" r="2" fill="hsl(50, 100%, 70%)" className="animate-sparkle"/>
            <path d="M98 40 L100 38 L102 40 L100 42 Z" fill="hsl(50, 100%, 80%)"/>
            <circle cx="8" cy="55" r="2" fill="hsl(340, 80%, 75%)" className="animate-sparkle"/>
          </>
        )}
        
        {/* Heart decoration */}
        {showDecorations && (
          <path d="M12 70 C12 68 14 66 16 68 C18 66 20 68 20 70 C20 73 16 76 16 76 C16 76 12 73 12 70 Z" fill="hsl(340, 80%, 70%)"/>
        )}
      </svg>
      
      {selected && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold shadow-elephant">
          ✓
        </div>
      )}
    </div>
  );
};
