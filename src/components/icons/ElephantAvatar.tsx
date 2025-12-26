import { cn } from "@/lib/utils";
import { ShopItem } from "@/types/shop";
import { ItemIcon } from "@/components/shop/ItemIcon";

interface ElephantAvatarProps {
  className?: string;
  size?: number;
  selected?: boolean;
  equippedItems?: ShopItem[];
  showDecorations?: boolean;
}

// Known item keys that have custom SVG rendering in the avatar
const CUSTOM_RENDERED_ITEMS = [
  'elephant_crown', 'elephant_flower_hat', 'elephant_witch_hat', 'elephant_flower_crown',
  'elephant_cape', 'elephant_dress',
  'elephant_boots',
  'elephant_magic_wand',
  'elephant_bells', 'elephant_scarf', 'elephant_pearl_necklace', 'elephant_headband'
];

export const ElephantAvatar = ({ 
  className, 
  size = 120, 
  selected = false,
  equippedItems = [],
  showDecorations = true
}: ElephantAvatarProps) => {
  const hat = equippedItems.find(i => i.category === 'hat');
  const armor = equippedItems.find(i => i.category === 'armor');
  const weapon = equippedItems.find(i => i.category === 'weapon');
  const shoes = equippedItems.find(i => i.category === 'shoes');
  const accessory = equippedItems.find(i => i.category === 'accessory');
  const pet = equippedItems.find(i => i.category === 'pet');

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
          <radialGradient id="elephantBgFull" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="hsl(340, 80%, 92%)"/>
            <stop offset="100%" stopColor="hsl(320, 70%, 85%)"/>
          </radialGradient>
          <linearGradient id="elephantBodyFull" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(220, 20%, 78%)"/>
            <stop offset="50%" stopColor="hsl(220, 18%, 72%)"/>
            <stop offset="100%" stopColor="hsl(220, 15%, 65%)"/>
          </linearGradient>
          <linearGradient id="dressGradFull" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFB6C1"/>
            <stop offset="50%" stopColor="#FF69B4"/>
            <stop offset="100%" stopColor="#FF1493"/>
          </linearGradient>
          <linearGradient id="capeGradFull" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9370DB"/>
            <stop offset="100%" stopColor="#8A2BE2"/>
          </linearGradient>
        </defs>
        
        {/* Background ellipse */}
        <ellipse cx="60" cy="70" rx="58" ry="68" fill="url(#elephantBgFull)" stroke="hsl(340, 70%, 75%)" strokeWidth="3"/>
        
        {/* Sparkle decorations */}
        {showDecorations && (
          <>
            <circle cx="12" cy="25" r="4" fill="hsl(340, 80%, 75%)"/>
            <circle cx="12" cy="25" r="2" fill="hsl(50, 100%, 70%)"/>
            <circle cx="108" cy="30" r="3" fill="hsl(300, 70%, 75%)"/>
            <circle cx="108" cy="30" r="1.5" fill="hsl(50, 100%, 75%)"/>
            <circle cx="15" cy="115" r="3" fill="hsl(200, 70%, 70%)"/>
            <circle cx="105" cy="120" r="2.5" fill="hsl(340, 75%, 70%)"/>
          </>
        )}

        {/* === LEGS === */}
        <rect x="35" y="110" width="14" height="20" rx="6" fill="url(#elephantBodyFull)"/>
        <rect x="71" y="110" width="14" height="20" rx="6" fill="url(#elephantBodyFull)"/>
        
        {/* Feet */}
        {!hasShoes && (
          <>
            <ellipse cx="42" cy="130" rx="10" ry="6" fill="hsl(220, 18%, 68%)"/>
            <ellipse cx="78" cy="130" rx="10" ry="6" fill="hsl(220, 18%, 68%)"/>
            {/* Toenails */}
            <circle cx="36" cy="131" r="2" fill="hsl(220, 15%, 60%)"/>
            <circle cx="42" cy="133" r="2" fill="hsl(220, 15%, 60%)"/>
            <circle cx="48" cy="131" r="2" fill="hsl(220, 15%, 60%)"/>
            <circle cx="72" cy="131" r="2" fill="hsl(220, 15%, 60%)"/>
            <circle cx="78" cy="133" r="2" fill="hsl(220, 15%, 60%)"/>
            <circle cx="84" cy="131" r="2" fill="hsl(220, 15%, 60%)"/>
          </>
        )}
        
        {/* Shoes - Boots */}
        {shoes?.image_key === 'elephant_boots' && (
          <>
            <path d="M30 120 L35 108 L52 108 L52 120 L28 125 Z" fill="#FF69B4" stroke="#FF1493" strokeWidth="1.5"/>
            <path d="M68 120 L73 108 L90 108 L90 120 L66 125 Z" fill="#FF69B4" stroke="#FF1493" strokeWidth="1.5"/>
            <ellipse cx="42" cy="108" rx="10" ry="4" fill="#FFB6C1"/>
            <ellipse cx="80" cy="108" rx="10" ry="4" fill="#FFB6C1"/>
            <rect x="36" y="112" width="10" height="4" fill="#FFD700" rx="1"/>
            <rect x="74" y="112" width="10" height="4" fill="#FFD700" rx="1"/>
          </>
        )}

        {/* === BODY === */}
        <ellipse cx="60" cy="90" rx="26" ry="28" fill="url(#elephantBodyFull)"/>
        {/* Belly */}
        <ellipse cx="60" cy="93" rx="16" ry="18" fill="hsl(220, 22%, 82%)"/>
        
        {/* === ARMS === */}
        <ellipse cx="30" cy="85" rx="10" ry="16" fill="url(#elephantBodyFull)" transform="rotate(-10 30 85)"/>
        <ellipse cx="90" cy="85" rx="10" ry="16" fill="url(#elephantBodyFull)" transform="rotate(10 90 85)"/>
        
        {/* Armor - Cape */}
        {armor?.image_key === 'elephant_cape' && (
          <path d="M32 65 L88 65 L95 118 L60 110 L25 118 Z" fill="url(#capeGradFull)" stroke="#4B0082" strokeWidth="1.5"/>
        )}
        
        {/* Armor - Princess Dress */}
        {armor?.image_key === 'elephant_dress' && (
          <>
            <path d="M32 68 L88 68 L98 120 L60 115 L22 120 Z" fill="url(#dressGradFull)" stroke="#FF1493" strokeWidth="1.5"/>
            <path d="M38 80 Q60 88 82 80" stroke="#FFB6C1" strokeWidth="2" fill="none"/>
            <path d="M32 95 Q60 105 88 95" stroke="#FFB6C1" strokeWidth="2" fill="none"/>
            <ellipse cx="60" cy="70" rx="8" ry="4" fill="#FF69B4"/>
            <circle cx="60" cy="70" r="3" fill="#FF1493"/>
            <circle cx="45" cy="88" r="2" fill="#FFD700"/>
            <circle cx="75" cy="92" r="2" fill="#FFD700"/>
            <circle cx="55" cy="105" r="1.5" fill="#FFD700"/>
          </>
        )}

        {/* === EARS === */}
        <ellipse cx="18" cy="45" rx="20" ry="28" fill="url(#elephantBodyFull)" stroke="hsl(220, 15%, 60%)" strokeWidth="1"/>
        <ellipse cx="18" cy="45" rx="14" ry="20" fill="hsl(350, 60%, 85%)" fillOpacity="0.5"/>
        
        <ellipse cx="102" cy="45" rx="20" ry="28" fill="url(#elephantBodyFull)" stroke="hsl(220, 15%, 60%)" strokeWidth="1"/>
        <ellipse cx="102" cy="45" rx="14" ry="20" fill="hsl(350, 60%, 85%)" fillOpacity="0.5"/>

        {/* === HEAD === */}
        <ellipse cx="60" cy="42" rx="32" ry="30" fill="url(#elephantBodyFull)"/>
        
        {/* Forehead highlight */}
        <ellipse cx="60" cy="30" rx="18" ry="10" fill="hsl(220, 25%, 82%)" fillOpacity="0.5"/>
        
        {/* Eyes */}
        <ellipse cx="48" cy="38" rx="9" ry="11" fill="white"/>
        <ellipse cx="72" cy="38" rx="9" ry="11" fill="white"/>
        <circle cx="50" cy="40" r="5" fill="hsl(220, 40%, 20%)"/>
        <circle cx="74" cy="40" r="5" fill="hsl(220, 40%, 20%)"/>
        <circle cx="52" cy="37" r="2.5" fill="white"/>
        <circle cx="76" cy="37" r="2.5" fill="white"/>
        
        {/* Eyelashes */}
        <path d="M38 32 L41 36" stroke="hsl(220, 20%, 40%)" strokeWidth="2" strokeLinecap="round"/>
        <path d="M36 36 L40 38" stroke="hsl(220, 20%, 40%)" strokeWidth="2" strokeLinecap="round"/>
        <path d="M82 32 L79 36" stroke="hsl(220, 20%, 40%)" strokeWidth="2" strokeLinecap="round"/>
        <path d="M84 36 L80 38" stroke="hsl(220, 20%, 40%)" strokeWidth="2" strokeLinecap="round"/>
        
        {/* Trunk */}
        <path 
          d="M60 48 
             C60 52 58 58 56 64
             C54 70 50 78 48 84
             C46 90 48 94 52 94
             C56 94 58 90 58 86
             C58 82 56 78 58 74
             C60 70 62 66 62 60
             C62 54 60 48 60 48"
          fill="url(#elephantBodyFull)"
          stroke="hsl(220, 15%, 58%)"
          strokeWidth="1.5"
        />
        <ellipse cx="50" cy="92" rx="4" ry="3" fill="hsl(220, 20%, 60%)"/>
        <circle cx="48" cy="91" r="1.5" fill="hsl(220, 15%, 45%)"/>
        <circle cx="52" cy="91" r="1.5" fill="hsl(220, 15%, 45%)"/>
        
        {/* Trunk wrinkles */}
        <path d="M54 68 Q58 70 62 68" stroke="hsl(220, 15%, 55%)" strokeWidth="1" fill="none"/>
        <path d="M52 74 Q56 76 60 74" stroke="hsl(220, 15%, 55%)" strokeWidth="1" fill="none"/>
        <path d="M50 80 Q54 82 58 80" stroke="hsl(220, 15%, 55%)" strokeWidth="1" fill="none"/>
        
        {/* Smile */}
        <path d="M65 55 Q70 60 76 56" stroke="hsl(220, 15%, 50%)" strokeWidth="2" fill="none" strokeLinecap="round"/>

        {/* === ACCESSORIES === */}
        {/* Bells */}
        {accessory?.image_key === 'elephant_bells' && (
          <>
            <circle cx="22" cy="70" r="6" fill="#FFD700" stroke="#B8860B" strokeWidth="1.5"/>
            <circle cx="22" cy="74" r="2" fill="#8B4513"/>
            <circle cx="98" cy="70" r="6" fill="#FFD700" stroke="#B8860B" strokeWidth="1.5"/>
            <circle cx="98" cy="74" r="2" fill="#8B4513"/>
          </>
        )}
        
        {/* Scarf */}
        {accessory?.image_key === 'elephant_scarf' && (
          <>
            <path d="M35 52 Q60 62 85 52 Q88 58 82 63" fill="#FF69B4" stroke="#FF1493" strokeWidth="1"/>
            <path d="M82 63 L78 88 Q74 93 70 88 L74 65" fill="#FF69B4" stroke="#FF1493" strokeWidth="1"/>
            <path d="M38 52 Q35 58 38 63 L42 88 Q46 93 50 88 L46 65" fill="#FF69B4" stroke="#FF1493" strokeWidth="1"/>
          </>
        )}
        
        {/* Pearl necklace */}
        {accessory?.image_key === 'elephant_pearl_necklace' && (
          <>
            <path d="M38 55 Q60 65 82 55" stroke="#E8E8E8" strokeWidth="2" fill="none"/>
            <circle cx="43" cy="57" r="3" fill="white" stroke="#D3D3D3" strokeWidth="0.5"/>
            <circle cx="52" cy="61" r="3.5" fill="white" stroke="#D3D3D3" strokeWidth="0.5"/>
            <circle cx="60" cy="63" r="4" fill="white" stroke="#D3D3D3" strokeWidth="0.5"/>
            <circle cx="68" cy="61" r="3.5" fill="white" stroke="#D3D3D3" strokeWidth="0.5"/>
            <circle cx="77" cy="57" r="3" fill="white" stroke="#D3D3D3" strokeWidth="0.5"/>
          </>
        )}
        
        {/* Headband with bow */}
        {accessory?.image_key === 'elephant_headband' && (
          <>
            <path d="M28 28 Q60 18 92 28" stroke="#FF69B4" strokeWidth="4" fill="none"/>
            <g transform="translate(88, 25)">
              <ellipse cx="-5" cy="0" rx="5" ry="3" fill="#FF1493"/>
              <ellipse cx="5" cy="0" rx="5" ry="3" fill="#FF1493"/>
              <circle cx="0" cy="0" r="2.5" fill="#FF69B4"/>
            </g>
          </>
        )}
        
        {/* === WEAPON === */}
        {/* Magic wand */}
        {weapon?.image_key === 'elephant_magic_wand' && (
          <g transform="translate(100, 75) rotate(20)">
            <rect x="-2.5" y="-5" width="5" height="35" fill="#FFD700" rx="2"/>
            <rect x="-1.5" y="0" width="3" height="28" fill="#FFF8DC"/>
            <polygon points="0,-15 3,-8 10,-8 5,-3 7,5 0,1 -7,5 -5,-3 -10,-8 -3,-8" fill="#FF69B4" stroke="#FF1493" strokeWidth="1"/>
            <circle cx="0" cy="-5" r="2.5" fill="#FFD700"/>
            <circle cx="-7" cy="-12" r="2" fill="#FFD700" className="animate-sparkle"/>
            <circle cx="7" cy="-15" r="1.5" fill="#FF69B4" className="animate-sparkle"/>
          </g>
        )}

        {/* === HATS === */}
        {/* Crown */}
        {hat?.image_key === 'elephant_crown' && (
          <g transform="translate(60, 8)">
            <polygon points="-26,20 -22,0 -12,12 0,-12 12,12 22,0 26,20" fill="#FFD700" stroke="#B8860B" strokeWidth="1.5"/>
            <circle cx="-20" cy="4" r="3.5" fill="#FF69B4"/>
            <circle cx="0" cy="-10" r="3.5" fill="#FF69B4"/>
            <circle cx="20" cy="4" r="3.5" fill="#FF69B4"/>
            <rect x="-26" y="20" width="52" height="7" fill="#FFD700" rx="2"/>
            <circle cx="-14" cy="23.5" r="2" fill="#87CEEB"/>
            <circle cx="0" cy="23.5" r="2.5" fill="#FF69B4"/>
            <circle cx="14" cy="23.5" r="2" fill="#87CEEB"/>
          </g>
        )}
        
        {/* Flower hat */}
        {hat?.image_key === 'elephant_flower_hat' && (
          <g transform="translate(60, 6)">
            <ellipse cx="0" cy="14" rx="26" ry="9" fill="#DDA0DD"/>
            <ellipse cx="0" cy="8" rx="20" ry="12" fill="#BA55D3"/>
            <circle cx="-10" cy="0" r="6" fill="#FF69B4"/>
            <circle cx="10" cy="0" r="6" fill="#FFD700"/>
            <circle cx="0" cy="-6" r="6" fill="#87CEEB"/>
            <circle cx="-10" cy="0" r="2.5" fill="#FFD700"/>
            <circle cx="10" cy="0" r="2.5" fill="#FF69B4"/>
            <circle cx="0" cy="-6" r="2.5" fill="#90EE90"/>
            <circle cx="-18" cy="8" r="4" fill="#90EE90"/>
            <circle cx="18" cy="8" r="4" fill="#FF69B4"/>
          </g>
        )}
        
        {/* Witch hat */}
        {hat?.image_key === 'elephant_witch_hat' && (
          <>
            <ellipse cx="60" cy="22" rx="38" ry="9" fill="#4B0082"/>
            <ellipse cx="60" cy="20" rx="34" ry="7" fill="#6B238E"/>
            <path d="M38 22 L60 -15 L82 22 Z" fill="#4B0082"/>
            <path d="M42 20 L60 -10 L78 20 Z" fill="#6B238E"/>
            <rect x="40" y="14" width="40" height="5" fill="#FF69B4"/>
            <rect x="52" y="12" width="16" height="9" fill="#FFD700" rx="2"/>
            <rect x="56" y="15" width="8" height="3" fill="#4B0082"/>
            <polygon points="48,2 49,5 52,5 50,7 51,10 48,8 45,10 46,7 44,5 47,5" fill="#FFD700"/>
            <polygon points="72,5 73,7 75,7 74,9 74.5,11 72,9.5 69.5,11 70,9 69,7 71,7" fill="#FFD700"/>
          </>
        )}
        
        {/* Flower crown */}
        {hat?.image_key === 'elephant_flower_crown' && (
          <>
            <path d="M28 26 Q60 16 92 26" stroke="#228B22" strokeWidth="4" fill="none"/>
            <circle cx="38" cy="22" r="5" fill="#FF69B4"/>
            <circle cx="38" cy="22" r="2" fill="#FFD700"/>
            <circle cx="52" cy="18" r="6" fill="#FFD700"/>
            <circle cx="52" cy="18" r="2.5" fill="#FF69B4"/>
            <circle cx="60" cy="16" r="7" fill="#FF69B4"/>
            <circle cx="60" cy="16" r="3" fill="#FFD700"/>
            <circle cx="68" cy="18" r="6" fill="#87CEEB"/>
            <circle cx="68" cy="18" r="2.5" fill="#FFD700"/>
            <circle cx="82" cy="22" r="5" fill="#90EE90"/>
            <circle cx="82" cy="22" r="2" fill="#FF69B4"/>
          </>
        )}
        
        {/* Default pink bow if no hat */}
        {!hasHat && (
          <g transform="translate(60, 16)">
            <ellipse cx="-12" cy="0" rx="10" ry="6" fill="hsl(340, 85%, 65%)"/>
            <ellipse cx="12" cy="0" rx="10" ry="6" fill="hsl(340, 85%, 65%)"/>
            <circle cx="0" cy="0" r="5" fill="hsl(340, 90%, 60%)"/>
            <ellipse cx="-12" cy="0" rx="5" ry="3" fill="hsl(340, 80%, 75%)" fillOpacity="0.5"/>
            <ellipse cx="12" cy="0" rx="5" ry="3" fill="hsl(340, 80%, 75%)" fillOpacity="0.5"/>
            <ellipse cx="0" cy="10" rx="3" ry="7" fill="hsl(340, 85%, 65%)"/>
          </g>
        )}
        
        {/* Heart decoration */}
        {showDecorations && (
          <path d="M10 60 C10 58 12 56 14 58 C16 56 18 58 18 60 C18 63 14 66 14 66 C14 66 10 63 10 60 Z" fill="hsl(340, 80%, 70%)"/>
        )}
      </svg>
      
      {/* Generic item rendering for items without custom SVG */}
      {/* Hat - generic */}
      {hat && !CUSTOM_RENDERED_ITEMS.includes(hat.image_key) && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2" style={{ width: size * 0.45, height: size * 0.45 }}>
          <ItemIcon imageKey={hat.image_key} size={size * 0.45} />
        </div>
      )}
      
      {/* Armor - generic */}
      {armor && !CUSTOM_RENDERED_ITEMS.includes(armor.image_key) && (
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2" style={{ width: size * 0.5, height: size * 0.5 }}>
          <ItemIcon imageKey={armor.image_key} size={size * 0.5} />
        </div>
      )}
      
      {/* Weapon - generic */}
      {weapon && !CUSTOM_RENDERED_ITEMS.includes(weapon.image_key) && (
        <div className="absolute top-1/4 -right-2" style={{ width: size * 0.35, height: size * 0.35 }}>
          <ItemIcon imageKey={weapon.image_key} size={size * 0.35} />
        </div>
      )}
      
      {/* Shoes - generic */}
      {shoes && !CUSTOM_RENDERED_ITEMS.includes(shoes.image_key) && (
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2" style={{ width: size * 0.4, height: size * 0.4 }}>
          <ItemIcon imageKey={shoes.image_key} size={size * 0.4} />
        </div>
      )}
      
      {/* Accessory - generic */}
      {accessory && !CUSTOM_RENDERED_ITEMS.includes(accessory.image_key) && (
        <div className="absolute top-1/2 -left-2" style={{ width: size * 0.3, height: size * 0.3 }}>
          <ItemIcon imageKey={accessory.image_key} size={size * 0.3} />
        </div>
      )}
      
      {/* Pet display */}
      {pet && (
        <div className="absolute -right-4 bottom-2 animate-bounce" style={{ width: size * 0.4, height: size * 0.4 }}>
          <PetIcon imageKey={pet.image_key} size={size * 0.4} />
        </div>
      )}
      
      {selected && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold shadow-elephant">
          ✓
        </div>
      )}
    </div>
  );
};

// Pet icon component
const PetIcon = ({ imageKey, size }: { imageKey: string; size: number }) => {
  const iconSize = size;
  
  switch (imageKey) {
    case 'pet_corgi':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64">
          <ellipse cx="32" cy="38" rx="20" ry="16" fill="#F4A460"/>
          <ellipse cx="32" cy="42" rx="14" ry="10" fill="#FFDAB9"/>
          <ellipse cx="32" cy="24" rx="14" ry="12" fill="#F4A460"/>
          <ellipse cx="20" cy="14" rx="6" ry="10" fill="#F4A460" transform="rotate(-20 20 14)"/>
          <ellipse cx="44" cy="14" rx="6" ry="10" fill="#F4A460" transform="rotate(20 44 14)"/>
          <circle cx="26" cy="22" r="3" fill="#1a1a1a"/>
          <circle cx="38" cy="22" r="3" fill="#1a1a1a"/>
          <ellipse cx="32" cy="28" rx="4" ry="3" fill="#1a1a1a"/>
          <path d="M28 32 Q32 36 36 32" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
        </svg>
      );
    case 'pet_munchkin':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64">
          <ellipse cx="32" cy="40" rx="16" ry="14" fill="#808080"/>
          <ellipse cx="32" cy="24" rx="14" ry="12" fill="#808080"/>
          <polygon points="18,12 22,24 14,24" fill="#808080"/>
          <polygon points="46,12 50,24 42,24" fill="#808080"/>
          <ellipse cx="26" cy="22" rx="5" ry="6" fill="#90EE90"/>
          <ellipse cx="38" cy="22" rx="5" ry="6" fill="#90EE90"/>
          <ellipse cx="27" cy="23" rx="2" ry="3" fill="#1a1a1a"/>
          <ellipse cx="37" cy="23" rx="2" ry="3" fill="#1a1a1a"/>
          <ellipse cx="32" cy="28" rx="3" ry="2" fill="#FFB6C1"/>
        </svg>
      );
    case 'pet_trex':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64">
          <ellipse cx="32" cy="38" rx="14" ry="16" fill="#228B22"/>
          <ellipse cx="38" cy="28" rx="12" ry="10" fill="#228B22"/>
          <circle cx="46" cy="24" r="3" fill="white"/>
          <circle cx="47" cy="24" r="2" fill="#1a1a1a"/>
          <polygon points="36,18 38,14 40,18 42,14 44,18" fill="#228B22"/>
          <path d="M50 28 L56 30 L50 32 L56 34 L50 36" fill="#228B22"/>
        </svg>
      );
    case 'pet_hamster':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64">
          <ellipse cx="32" cy="38" rx="18" ry="16" fill="#D2691E"/>
          <ellipse cx="32" cy="28" rx="16" ry="14" fill="#D2691E"/>
          <circle cx="18" cy="18" r="6" fill="#D2691E"/>
          <circle cx="46" cy="18" r="6" fill="#D2691E"/>
          <circle cx="18" cy="18" r="3" fill="#FFB6C1"/>
          <circle cx="46" cy="18" r="3" fill="#FFB6C1"/>
          <circle cx="26" cy="26" r="3" fill="#1a1a1a"/>
          <circle cx="38" cy="26" r="3" fill="#1a1a1a"/>
          <ellipse cx="32" cy="32" rx="3" ry="2" fill="#FFB6C1"/>
        </svg>
      );
    case 'pet_rabbit':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64">
          <ellipse cx="32" cy="42" rx="14" ry="12" fill="#FFFFFF" stroke="#E8E8E8"/>
          <ellipse cx="32" cy="28" rx="12" ry="10" fill="#FFFFFF" stroke="#E8E8E8"/>
          <ellipse cx="24" cy="10" rx="5" ry="14" fill="#FFFFFF" stroke="#E8E8E8"/>
          <ellipse cx="40" cy="10" rx="5" ry="14" fill="#FFFFFF" stroke="#E8E8E8"/>
          <ellipse cx="24" cy="10" rx="3" ry="10" fill="#FFB6C1"/>
          <ellipse cx="40" cy="10" rx="3" ry="10" fill="#FFB6C1"/>
          <circle cx="26" cy="26" r="3" fill="#FF69B4"/>
          <circle cx="38" cy="26" r="3" fill="#FF69B4"/>
          <ellipse cx="32" cy="32" rx="3" ry="2" fill="#FFB6C1"/>
        </svg>
      );
    case 'pet_fox':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64">
          <ellipse cx="32" cy="40" rx="14" ry="12" fill="#FF6600"/>
          <ellipse cx="32" cy="26" rx="12" ry="10" fill="#FF6600"/>
          <polygon points="18,20 24,28 12,28" fill="#FF6600"/>
          <polygon points="46,20 52,28 40,28" fill="#FF6600"/>
          <ellipse cx="26" cy="24" rx="3" ry="4" fill="#FFD700"/>
          <ellipse cx="38" cy="24" rx="3" ry="4" fill="#FFD700"/>
          <ellipse cx="27" cy="25" rx="1.5" ry="2" fill="#1a1a1a"/>
          <ellipse cx="37" cy="25" rx="1.5" ry="2" fill="#1a1a1a"/>
          <ellipse cx="32" cy="30" rx="3" ry="2" fill="#1a1a1a"/>
        </svg>
      );
    case 'pet_owl':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64">
          <ellipse cx="32" cy="38" rx="16" ry="18" fill="#8B4513"/>
          <ellipse cx="32" cy="28" rx="14" ry="12" fill="#8B4513"/>
          <polygon points="20,18 26,26 14,26" fill="#8B4513"/>
          <polygon points="44,18 50,26 38,26" fill="#8B4513"/>
          <circle cx="24" cy="26" r="8" fill="#DEB887"/>
          <circle cx="40" cy="26" r="8" fill="#DEB887"/>
          <circle cx="24" cy="26" r="3" fill="#1a1a1a"/>
          <circle cx="40" cy="26" r="3" fill="#1a1a1a"/>
          <polygon points="32,32 28,36 36,36" fill="#FF6600"/>
        </svg>
      );
    case 'pet_dragon':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64">
          <ellipse cx="32" cy="40" rx="14" ry="14" fill="#9400D3"/>
          <ellipse cx="32" cy="26" rx="12" ry="10" fill="#9400D3"/>
          <polygon points="26,16 28,10 30,16" fill="#9400D3"/>
          <polygon points="34,16 36,10 38,16" fill="#9400D3"/>
          <circle cx="26" cy="24" r="4" fill="#FFD700"/>
          <circle cx="38" cy="24" r="4" fill="#FFD700"/>
          <path d="M30 34 L28 38 M32 34 L32 38 M34 34 L36 38" stroke="#FF6600" strokeWidth="2"/>
        </svg>
      );
    case 'pet_unicorn':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64">
          <ellipse cx="32" cy="40" rx="14" ry="14" fill="#FFFFFF" stroke="#E8E8E8"/>
          <ellipse cx="32" cy="26" rx="12" ry="10" fill="#FFFFFF" stroke="#E8E8E8"/>
          <polygon points="32,2 28,18 36,18" fill="#FFD700"/>
          <ellipse cx="20" cy="16" rx="4" ry="8" fill="#FFB6C1"/>
          <ellipse cx="44" cy="16" rx="4" ry="8" fill="#FFB6C1"/>
          <circle cx="26" cy="24" r="3" fill="#FF69B4"/>
          <circle cx="38" cy="24" r="3" fill="#FF69B4"/>
        </svg>
      );
    case 'pet_phoenix':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64">
          <ellipse cx="32" cy="38" rx="12" ry="14" fill="#FF4500"/>
          <ellipse cx="32" cy="24" rx="10" ry="10" fill="#FF4500"/>
          <polygon points="24,12 26,4 28,14" fill="#FF0000"/>
          <polygon points="30,10 32,0 34,10" fill="#FFD700"/>
          <polygon points="36,12 38,4 40,14" fill="#FF0000"/>
          <circle cx="26" cy="22" r="3" fill="#FFD700"/>
          <circle cx="38" cy="22" r="3" fill="#FFD700"/>
          <polygon points="32,28 28,32 36,32" fill="#FF6600"/>
        </svg>
      );
    default:
      return null;
  }
};
