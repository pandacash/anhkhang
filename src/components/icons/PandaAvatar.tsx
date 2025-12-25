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
  const hat = equippedItems.find(i => i.category === 'hat');
  const armor = equippedItems.find(i => i.category === 'armor');
  const weapon = equippedItems.find(i => i.category === 'weapon');
  const shoes = equippedItems.find(i => i.category === 'shoes');
  const accessory = equippedItems.find(i => i.category === 'accessory');

  const hasHat = !!hat;
  const hasArmor = !!armor;
  const hasShoes = !!shoes;

  return (
    <div 
      className={cn(
        "relative transition-all duration-300",
        selected && "scale-110",
        className
      )}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 120 140" fill="none" className="w-full h-full">
        <defs>
          <radialGradient id="pandaBgFull" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="hsl(210, 100%, 95%)"/>
            <stop offset="100%" stopColor="hsl(200, 80%, 88%)"/>
          </radialGradient>
          <linearGradient id="pandaBodyFull" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(0, 0%, 100%)"/>
            <stop offset="100%" stopColor="hsl(0, 0%, 95%)"/>
          </linearGradient>
          <linearGradient id="armorGradPandaFull" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700"/>
            <stop offset="100%" stopColor="#FFA500"/>
          </linearGradient>
        </defs>
        
        {/* Background circle */}
        <ellipse cx="60" cy="70" rx="58" ry="68" fill="url(#pandaBgFull)" stroke="hsl(200, 70%, 75%)" strokeWidth="3"/>
        
        {/* Sparkle decorations */}
        {showDecorations && (
          <>
            <circle cx="12" cy="30" r="3" fill="hsl(200, 100%, 70%)" className="animate-sparkle"/>
            <circle cx="108" cy="35" r="2.5" fill="hsl(50, 100%, 70%)" className="animate-sparkle"/>
            <circle cx="15" cy="110" r="2" fill="hsl(50, 100%, 70%)" className="animate-sparkle"/>
            <circle cx="105" cy="115" r="2.5" fill="hsl(200, 100%, 70%)" className="animate-sparkle"/>
          </>
        )}

        {/* === LEGS === */}
        <ellipse cx="42" cy="125" rx="12" ry="8" fill="hsl(0, 0%, 20%)"/>
        <ellipse cx="78" cy="125" rx="12" ry="8" fill="hsl(0, 0%, 20%)"/>
        
        {/* Feet/Paws */}
        {!hasShoes && (
          <>
            <ellipse cx="42" cy="130" rx="10" ry="6" fill="hsl(0, 0%, 15%)"/>
            <ellipse cx="78" cy="130" rx="10" ry="6" fill="hsl(0, 0%, 15%)"/>
            {/* Toe pads */}
            <circle cx="36" cy="129" r="2.5" fill="hsl(350, 50%, 75%)"/>
            <circle cx="42" cy="131" r="2.5" fill="hsl(350, 50%, 75%)"/>
            <circle cx="48" cy="129" r="2.5" fill="hsl(350, 50%, 75%)"/>
            <circle cx="72" cy="129" r="2.5" fill="hsl(350, 50%, 75%)"/>
            <circle cx="78" cy="131" r="2.5" fill="hsl(350, 50%, 75%)"/>
            <circle cx="84" cy="129" r="2.5" fill="hsl(350, 50%, 75%)"/>
          </>
        )}
        
        {/* Shoes - Giày thể thao */}
        {shoes?.image_key === 'panda_shoes' && (
          <>
            <ellipse cx="42" cy="130" rx="14" ry="8" fill="#FF69B4"/>
            <ellipse cx="78" cy="130" rx="14" ry="8" fill="#FF69B4"/>
            <ellipse cx="42" cy="128" rx="12" ry="6" fill="#FF1493"/>
            <ellipse cx="78" cy="128" rx="12" ry="6" fill="#FF1493"/>
            {/* Shoe stripes */}
            <path d="M34 128 L50 128" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M70 128 L86 128" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            {/* Shoe dots */}
            <circle cx="36" cy="130" r="2" fill="#FFD700"/>
            <circle cx="48" cy="130" r="2" fill="#FFD700"/>
            <circle cx="72" cy="130" r="2" fill="#FFD700"/>
            <circle cx="84" cy="130" r="2" fill="#FFD700"/>
          </>
        )}

        {/* === BODY === */}
        <ellipse cx="60" cy="95" rx="28" ry="30" fill="url(#pandaBodyFull)"/>
        {/* Belly */}
        <ellipse cx="60" cy="98" rx="18" ry="20" fill="hsl(0, 0%, 98%)"/>
        
        {/* === ARMS === */}
        <ellipse cx="28" cy="88" rx="10" ry="18" fill="hsl(0, 0%, 20%)" transform="rotate(-15 28 88)"/>
        <ellipse cx="92" cy="88" rx="10" ry="18" fill="hsl(0, 0%, 20%)" transform="rotate(15 92 88)"/>
        {/* Paw pads */}
        <circle cx="22" cy="100" r="5" fill="hsl(0, 0%, 15%)"/>
        <circle cx="98" cy="100" r="5" fill="hsl(0, 0%, 15%)"/>
        <circle cx="22" cy="100" r="3" fill="hsl(350, 50%, 75%)"/>
        <circle cx="98" cy="100" r="3" fill="hsl(350, 50%, 75%)"/>
        
        {/* Armor - Giáp chiến binh */}
        {armor?.image_key === 'panda_armor' && (
          <>
            <path d="M35 70 L42 62 L78 62 L85 70 L88 115 L32 115 Z" fill="url(#armorGradPandaFull)" stroke="#B8860B" strokeWidth="2"/>
            <circle cx="60" cy="78" r="8" fill="#FF6B6B" stroke="#CC0000" strokeWidth="1"/>
            <path d="M45 90 L75 90" stroke="#FFE4B5" strokeWidth="3"/>
            <path d="M45 100 L75 100" stroke="#FFE4B5" strokeWidth="2"/>
            <path d="M48 108 L72 108" stroke="#FFE4B5" strokeWidth="2"/>
            {/* Shoulder pads */}
            <ellipse cx="32" cy="72" rx="10" ry="8" fill="#FFD700" stroke="#B8860B" strokeWidth="1.5"/>
            <ellipse cx="88" cy="72" rx="10" ry="8" fill="#FFD700" stroke="#B8860B" strokeWidth="1.5"/>
          </>
        )}

        {/* === HEAD === */}
        {/* Ears */}
        <circle cx="30" cy="28" r="16" fill="hsl(0, 0%, 20%)"/>
        <circle cx="30" cy="28" r="10" fill="hsl(0, 0%, 30%)"/>
        <circle cx="90" cy="28" r="16" fill="hsl(0, 0%, 20%)"/>
        <circle cx="90" cy="28" r="10" fill="hsl(0, 0%, 30%)"/>
        
        {/* Head */}
        <ellipse cx="60" cy="45" rx="35" ry="32" fill="url(#pandaBodyFull)"/>
        
        {/* Eye patches */}
        <ellipse cx="42" cy="42" rx="14" ry="16" fill="hsl(0, 0%, 15%)" transform="rotate(-10 42 42)"/>
        <ellipse cx="78" cy="42" rx="14" ry="16" fill="hsl(0, 0%, 15%)" transform="rotate(10 78 42)"/>
        
        {/* Sunglasses accessory */}
        {accessory?.image_key === 'panda_sunglasses' ? (
          <>
            <rect x="26" y="36" width="24" height="16" rx="4" fill="#1a1a2e" stroke="#0f0f1a" strokeWidth="2"/>
            <rect x="70" y="36" width="24" height="16" rx="4" fill="#1a1a2e" stroke="#0f0f1a" strokeWidth="2"/>
            <path d="M50 44 L70 44" stroke="#0f0f1a" strokeWidth="3"/>
            <ellipse cx="34" cy="42" rx="5" ry="3" fill="rgba(255,255,255,0.2)"/>
            <ellipse cx="78" cy="42" rx="5" ry="3" fill="rgba(255,255,255,0.2)"/>
          </>
        ) : (
          <>
            {/* Eyes */}
            <ellipse cx="42" cy="44" rx="9" ry="11" fill="white"/>
            <ellipse cx="78" cy="44" rx="9" ry="11" fill="white"/>
            <circle cx="44" cy="46" r="6" fill="hsl(0, 0%, 10%)"/>
            <circle cx="80" cy="46" r="6" fill="hsl(0, 0%, 10%)"/>
            <circle cx="46" cy="43" r="2.5" fill="white"/>
            <circle cx="82" cy="43" r="2.5" fill="white"/>
          </>
        )}
        
        {/* Nose */}
        <ellipse cx="60" cy="56" rx="7" ry="4" fill="hsl(0, 0%, 20%)"/>
        <ellipse cx="60" cy="55" rx="2.5" ry="1.5" fill="hsl(0, 0%, 40%)"/>
        
        {/* Mouth */}
        <path d="M53 62 Q60 68 67 62" stroke="hsl(0, 0%, 30%)" strokeWidth="2" fill="none" strokeLinecap="round"/>
        
        {/* === ACCESSORIES === */}
        {/* Red bow - Nơ đỏ */}
        {accessory?.image_key === 'panda_bow' && (
          <g transform="translate(60, 72)">
            <path d="M-12 0 Q-18 -6 -12 -12 L0 0 L-12 12 Q-18 6 -12 0" fill="#FF0000"/>
            <path d="M12 0 Q18 -6 12 -12 L0 0 L12 12 Q18 6 12 0" fill="#FF0000"/>
            <circle cx="0" cy="0" r="5" fill="#DC143C" stroke="#8B0000" strokeWidth="1"/>
          </g>
        )}
        
        {/* Boxing gloves */}
        {accessory?.image_key === 'panda_boxing_gloves' && (
          <>
            <ellipse cx="18" cy="102" rx="10" ry="12" fill="#FF0000" stroke="#CC0000" strokeWidth="2"/>
            <ellipse cx="18" cy="100" rx="6" ry="4" fill="#FF4444"/>
            <ellipse cx="102" cy="102" rx="10" ry="12" fill="#FF0000" stroke="#CC0000" strokeWidth="2"/>
            <ellipse cx="102" cy="100" rx="6" ry="4" fill="#FF4444"/>
          </>
        )}
        
        {/* Ninja belt */}
        {accessory?.image_key === 'panda_belt' && (
          <>
            <rect x="35" cy="105" y="103" width="50" height="8" fill="#2F2F2F" rx="2"/>
            <rect x="55" y="101" width="10" height="12" fill="#FFD700" rx="2"/>
            <circle cx="60" cy="107" r="3" fill="#1a1a1a"/>
          </>
        )}
        
        {/* === WEAPONS === */}
        {/* Sword */}
        {weapon?.image_key === 'panda_sword' && (
          <g transform="translate(105, 70) rotate(30)">
            <rect x="-2" y="-25" width="4" height="30" fill="#C0C0C0" rx="1"/>
            <rect x="-1" y="-23" width="2" height="26" fill="rgba(255,255,255,0.5)"/>
            <polygon points="0,-28 -3,-22 3,-22" fill="#C0C0C0"/>
            <rect x="-8" y="5" width="16" height="5" fill="#FFD700" rx="1"/>
            <rect x="-3" y="10" width="6" height="10" fill="#8B4513" rx="1"/>
            <circle cx="0" cy="22" r="3" fill="#FFD700"/>
          </g>
        )}
        
        {/* Water gun */}
        {weapon?.image_key === 'panda_watergun' && (
          <g transform="translate(102, 85)">
            <rect x="-18" y="-6" width="22" height="12" fill="#00BFFF" rx="4"/>
            <rect x="2" y="-10" width="12" height="20" fill="#FF6B6B" rx="3"/>
            <ellipse cx="-20" cy="0" rx="4" ry="5" fill="#00CED1"/>
            <rect x="-4" y="6" width="8" height="8" fill="#FF4444" rx="2"/>
          </g>
        )}
        
        {/* Shield */}
        {weapon?.image_key === 'panda_shield' && (
          <g transform="translate(12, 80)">
            <path d="M0 -12 L18 -8 L20 15 L10 28 L0 15 Z" fill="#C0C0C0" stroke="#8B4513" strokeWidth="2"/>
            <path d="M4 -6 L14 -3 L15 12 L10 20 L5 12 Z" fill="#FFD700"/>
            <circle cx="10" cy="5" r="5" fill="#FF0000"/>
          </g>
        )}
        
        {/* === HATS === */}
        {/* Ninja hat */}
        {hat?.image_key === 'panda_ninja_hat' && (
          <>
            <ellipse cx="60" cy="18" rx="38" ry="12" fill="#2F2F2F"/>
            <rect x="22" y="10" width="76" height="14" fill="#4A4A4A"/>
            <rect x="45" y="12" width="30" height="10" fill="#C0C0C0" rx="2"/>
            <path d="M55 15 L60 19 L65 15" stroke="#8B4513" strokeWidth="2" fill="none"/>
          </>
        )}
        
        {/* Cowboy hat */}
        {hat?.image_key === 'panda_cowboy_hat' && (
          <>
            <ellipse cx="60" cy="20" rx="42" ry="10" fill="#8B4513"/>
            <ellipse cx="60" cy="18" rx="38" ry="8" fill="#A0522D"/>
            <path d="M38 20 L42 -5 L60 2 L78 -5 L82 20 Z" fill="#8B4513"/>
            <path d="M42 18 L44 0 L60 5 L76 0 L78 18 Z" fill="#A0522D"/>
            <rect x="42" y="10" width="36" height="5" fill="#1a1a1a"/>
            <rect x="55" y="9" width="10" height="7" fill="#FFD700" rx="1"/>
          </>
        )}
        
        {/* Helmet */}
        {hat?.image_key === 'panda_helmet' && (
          <>
            <ellipse cx="60" cy="25" rx="36" ry="26" fill="#FF0000"/>
            <ellipse cx="60" cy="23" rx="34" ry="23" fill="#FF3333"/>
            <rect x="28" y="32" width="64" height="10" fill="#1a1a2e" rx="3"/>
            <rect x="30" y="34" width="60" height="6" fill="rgba(100,150,255,0.3)" rx="2"/>
            <polygon points="60,5 63,12 70,12 65,17 67,24 60,20 53,24 55,17 50,12 57,12" fill="#FFD700"/>
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
