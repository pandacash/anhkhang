import { cn } from "@/lib/utils";
import { ShopItem } from "@/types/shop";

interface PandaAvatarProps {
  className?: string;
  size?: number;
  selected?: boolean;
  equippedItems?: ShopItem[];
  showDecorations?: boolean;
}

export const PandaAvatar = ({ 
  className, 
  size = 120, 
  selected = false,
  equippedItems = [],
  showDecorations = true
}: PandaAvatarProps) => {
  const hasHat = equippedItems.some(i => i.category === 'hat');
  const hasArmor = equippedItems.some(i => i.category === 'armor');
  const hasWeapon = equippedItems.some(i => i.category === 'weapon');
  const hasShoes = equippedItems.some(i => i.category === 'shoes');
  const hasAccessory = equippedItems.some(i => i.category === 'accessory');

  const hat = equippedItems.find(i => i.category === 'hat');
  const weapon = equippedItems.find(i => i.category === 'weapon');

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
          <linearGradient id="armorGradPanda" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700"/>
            <stop offset="100%" stopColor="#FFA500"/>
          </linearGradient>
        </defs>
        
        {/* Background circle - blue for boy */}
        <circle cx="60" cy="60" r="58" fill="url(#pandaBg)" stroke="hsl(200, 70%, 75%)" strokeWidth="3"/>
        
        {/* Extra bamboo decorations */}
        {showDecorations && (
          <>
            <rect x="8" y="75" width="4" height="30" fill="hsl(120, 40%, 50%)" rx="2"/>
            <rect x="14" y="80" width="3" height="25" fill="hsl(120, 35%, 45%)" rx="1.5"/>
            <ellipse cx="10" cy="73" rx="6" ry="4" fill="hsl(120, 50%, 55%)"/>
            <ellipse cx="16" cy="78" rx="5" ry="3" fill="hsl(120, 45%, 50%)"/>
            
            <rect x="105" y="70" width="4" height="35" fill="hsl(120, 40%, 50%)" rx="2"/>
            <rect x="100" y="78" width="3" height="27" fill="hsl(120, 35%, 45%)" rx="1.5"/>
            <ellipse cx="107" cy="68" rx="6" ry="4" fill="hsl(120, 50%, 55%)"/>
          </>
        )}
        
        {/* Shoes */}
        {hasShoes && (
          <>
            <ellipse cx="40" cy="108" rx="10" ry="6" fill="#FF69B4"/>
            <ellipse cx="80" cy="108" rx="10" ry="6" fill="#FF69B4"/>
            <circle cx="38" cy="106" r="2" fill="#FFD700"/>
            <circle cx="82" cy="106" r="2" fill="#FFD700"/>
          </>
        )}
        
        {/* Ears */}
        <circle cx="22" cy="28" r="18" fill="hsl(0, 0%, 20%)"/>
        <circle cx="22" cy="28" r="12" fill="hsl(0, 0%, 30%)"/>
        <circle cx="98" cy="28" r="18" fill="hsl(0, 0%, 20%)"/>
        <circle cx="98" cy="28" r="12" fill="hsl(0, 0%, 30%)"/>
        
        {/* Body extension for armor */}
        {hasArmor && (
          <>
            <path d="M35 85 L45 75 L75 75 L85 85 L85 105 L35 105 Z" fill="url(#armorGradPanda)" stroke="#B8860B" strokeWidth="1.5"/>
            <circle cx="60" cy="88" r="5" fill="#FF6B6B"/>
            <path d="M45 95 L75 95" stroke="#FFE4B5" strokeWidth="2"/>
          </>
        )}
        
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
        
        {/* Accessory - Red bow */}
        {hasAccessory && (
          <g transform="translate(60, 85)">
            <path d="M-12 0 Q-18 -6 -12 -12 L0 0 L-12 12 Q-18 6 -12 0" fill="#FF0000"/>
            <path d="M12 0 Q18 -6 12 -12 L0 0 L12 12 Q18 6 12 0" fill="#FF0000"/>
            <circle cx="0" cy="0" r="5" fill="#DC143C"/>
          </g>
        )}
        
        {/* Weapon - Sword or Water gun */}
        {weapon?.image_key === 'panda_sword' && (
          <g transform="translate(95, 50) rotate(30)">
            <rect x="-2" y="-25" width="4" height="30" fill="#C0C0C0" rx="1"/>
            <polygon points="0,-28 -3,-22 3,-22" fill="#C0C0C0"/>
            <rect x="-6" y="5" width="12" height="5" fill="#8B4513" rx="1"/>
            <rect x="-3" y="10" width="6" height="8" fill="#654321" rx="1"/>
          </g>
        )}
        {weapon?.image_key === 'panda_watergun' && (
          <g transform="translate(95, 55)">
            <rect x="-15" y="-5" width="20" height="10" fill="#00BFFF" rx="3"/>
            <rect x="2" y="-8" width="12" height="16" fill="#FF6B6B" rx="2"/>
            <ellipse cx="-17" cy="0" rx="3" ry="5" fill="#00CED1"/>
          </g>
        )}
        
        {/* Hat - Ninja hat */}
        {hat?.image_key === 'panda_ninja_hat' && (
          <>
            <ellipse cx="60" cy="25" rx="38" ry="15" fill="#2F2F2F"/>
            <rect x="20" y="18" width="80" height="12" fill="#4A4A4A"/>
            <path d="M90 15 L105 5 L102 18" fill="#C0C0C0"/>
          </>
        )}
        
        {/* Sparkles */}
        {showDecorations && (
          <>
            <circle cx="25" cy="90" r="2" fill="hsl(50, 100%, 70%)" className="animate-sparkle"/>
            <circle cx="95" cy="85" r="1.5" fill="hsl(50, 100%, 70%)" className="animate-sparkle"/>
            <path d="M15 50 L17 48 L19 50 L17 52 Z" fill="hsl(50, 100%, 80%)"/>
            <circle cx="105" cy="45" r="2" fill="hsl(180, 100%, 70%)" className="animate-sparkle"/>
          </>
        )}
      </svg>
      
      {selected && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-bold shadow-kid">
          ✓
        </div>
      )}
    </div>
  );
};
