import { cn } from "@/lib/utils";
import { ShopItem } from "@/types/shop";
import { ItemIcon } from "@/components/shop/ItemIcon";

interface ElephantAvatarProps {
  className?: string;
  size?: number;
  selected?: boolean;
  equippedItems?: ShopItem[];
  showDecorations?: boolean;
  isSad?: boolean;
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
  showDecorations = true,
  isSad = false
}: ElephantAvatarProps) => {
  const hat = equippedItems.find(i => i.category === 'hat');
  const armor = equippedItems.find(i => i.category === 'armor');
  const weapon = equippedItems.find(i => i.category === 'weapon');
  const shoes = equippedItems.find(i => i.category === 'shoes');
  const accessory = equippedItems.find(i => i.category === 'accessory');
  
  // Get all equipped pets (allow multiple)
  const pets = equippedItems.filter(i => i.category === 'pet');
  
  // Flying pets that should appear above the avatar
  const FLYING_PETS = ['pet_dragon', 'pet_phoenix', 'pet_owl', 'pet_eagle', 'pet_parrot', 'pet_flamingo'];
  const flyingPets = pets.filter(p => FLYING_PETS.includes(p.image_key));
  const groundPets = pets.filter(p => !FLYING_PETS.includes(p.image_key));

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
        <circle cx="50" cy={isSad ? "42" : "40"} r="5" fill="hsl(220, 40%, 20%)"/>
        <circle cx="74" cy={isSad ? "42" : "40"} r="5" fill="hsl(220, 40%, 20%)"/>
        <circle cx="52" cy={isSad ? "39" : "37"} r="2.5" fill="white"/>
        <circle cx="76" cy={isSad ? "39" : "37"} r="2.5" fill="white"/>
        
        {/* Sad eyebrows */}
        {isSad && (
          <>
            <path d="M40 28 L56 34" stroke="hsl(220, 20%, 50%)" strokeWidth="3" strokeLinecap="round"/>
            <path d="M80 28 L64 34" stroke="hsl(220, 20%, 50%)" strokeWidth="3" strokeLinecap="round"/>
          </>
        )}
        
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
        
        {/* Smile or Sad mouth */}
        {isSad ? (
          <>
            <path d="M65 60 Q70 55 76 58" stroke="hsl(220, 15%, 50%)" strokeWidth="2" fill="none" strokeLinecap="round"/>
            {/* Tear drops */}
            <ellipse cx="42" cy="52" rx="2" ry="4" fill="hsl(200, 80%, 70%)" className="animate-pulse"/>
            <ellipse cx="80" cy="52" rx="2" ry="4" fill="hsl(200, 80%, 70%)" className="animate-pulse"/>
          </>
        ) : (
          <path d="M65 55 Q70 60 76 56" stroke="hsl(220, 15%, 50%)" strokeWidth="2" fill="none" strokeLinecap="round"/>
        )}

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
      {/* Hat - generic - positioned above the head */}
      {hat && !CUSTOM_RENDERED_ITEMS.includes(hat.image_key) && (
        <div className="absolute left-1/2 -translate-x-1/2" style={{ top: -size * 0.15, width: size * 0.35, height: size * 0.35 }}>
          <ItemIcon imageKey={hat.image_key} size={size * 0.35} />
        </div>
      )}
      
      {/* Armor - generic - positioned at bottom body */}
      {armor && !CUSTOM_RENDERED_ITEMS.includes(armor.image_key) && (
        <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: size * 0.15, width: size * 0.4, height: size * 0.4 }}>
          <ItemIcon imageKey={armor.image_key} size={size * 0.4} />
        </div>
      )}
      
      {/* Weapon - generic - positioned to the right side */}
      {weapon && !CUSTOM_RENDERED_ITEMS.includes(weapon.image_key) && (
        <div className="absolute" style={{ top: size * 0.35, right: -size * 0.1, width: size * 0.3, height: size * 0.3 }}>
          <ItemIcon imageKey={weapon.image_key} size={size * 0.3} />
        </div>
      )}
      
      {/* Shoes - generic - positioned at very bottom */}
      {shoes && !CUSTOM_RENDERED_ITEMS.includes(shoes.image_key) && (
        <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: -size * 0.05, width: size * 0.35, height: size * 0.35 }}>
          <ItemIcon imageKey={shoes.image_key} size={size * 0.35} />
        </div>
      )}
      
      {/* Accessory - generic - positioned to the left side */}
      {accessory && !CUSTOM_RENDERED_ITEMS.includes(accessory.image_key) && (
        <div className="absolute" style={{ top: size * 0.35, left: -size * 0.1, width: size * 0.25, height: size * 0.25 }}>
          <ItemIcon imageKey={accessory.image_key} size={size * 0.25} />
        </div>
      )}
      
      {/* Flying pets - displayed above the avatar in a neat row */}
      {flyingPets.length > 0 && (
        <div 
          className="absolute flex items-center justify-center gap-1"
          style={{ 
            top: -size * 0.35, 
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          {flyingPets.slice(0, 3).map((pet, index) => (
            <div 
              key={pet.id}
              className="animate-float" 
              style={{ 
                width: size * 0.4, 
                height: size * 0.4,
                animationDelay: `${index * 0.2}s`
              }}
            >
              <PetIcon imageKey={pet.image_key} size={size * 0.4} />
            </div>
          ))}
        </div>
      )}
      
      {/* Ground pets - displayed in a row below the avatar */}
      {groundPets.length > 0 && (
        <div 
          className="absolute flex items-end justify-center gap-1"
          style={{ 
            bottom: -size * 0.3, 
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          {groundPets.slice(0, 4).map((pet, index) => (
            <div 
              key={pet.id}
              className="animate-bounce" 
              style={{ 
                width: size * 0.38, 
                height: size * 0.38,
                animationDelay: `${index * 0.15}s`
              }}
            >
              <PetIcon imageKey={pet.image_key} size={size * 0.38} />
            </div>
          ))}
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
    case 'pet_spider':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64">
          <ellipse cx="32" cy="38" rx="12" ry="10" fill="#1a1a1a"/>
          <ellipse cx="32" cy="26" rx="10" ry="10" fill="#1a1a1a"/>
          <circle cx="26" cy="24" r="4" fill="#FF0000"/>
          <circle cx="38" cy="24" r="4" fill="#FF0000"/>
          <circle cx="26" cy="24" r="2" fill="#1a1a1a"/>
          <circle cx="38" cy="24" r="2" fill="#1a1a1a"/>
          <circle cx="30" cy="20" r="2" fill="#FF0000"/>
          <circle cx="34" cy="20" r="2" fill="#FF0000"/>
          <path d="M22 30 Q10 25 6 18" stroke="#1a1a1a" strokeWidth="3" fill="none"/>
          <path d="M22 34 Q8 32 2 28" stroke="#1a1a1a" strokeWidth="3" fill="none"/>
          <path d="M22 38 Q8 40 2 46" stroke="#1a1a1a" strokeWidth="3" fill="none"/>
          <path d="M22 42 Q10 48 6 56" stroke="#1a1a1a" strokeWidth="3" fill="none"/>
          <path d="M42 30 Q54 25 58 18" stroke="#1a1a1a" strokeWidth="3" fill="none"/>
          <path d="M42 34 Q56 32 62 28" stroke="#1a1a1a" strokeWidth="3" fill="none"/>
          <path d="M42 38 Q56 40 62 46" stroke="#1a1a1a" strokeWidth="3" fill="none"/>
          <path d="M42 42 Q54 48 58 56" stroke="#1a1a1a" strokeWidth="3" fill="none"/>
        </svg>
      );
    case 'pet_octopus':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64">
          <ellipse cx="32" cy="24" rx="16" ry="14" fill="#FF69B4"/>
          <circle cx="26" cy="22" r="4" fill="white"/>
          <circle cx="38" cy="22" r="4" fill="white"/>
          <circle cx="27" cy="23" r="2" fill="#1a1a1a"/>
          <circle cx="39" cy="23" r="2" fill="#1a1a1a"/>
          <path d="M16 34 Q10 44 14 54" stroke="#FF69B4" strokeWidth="4" fill="none"/>
          <path d="M22 36 Q18 48 22 58" stroke="#FF69B4" strokeWidth="4" fill="none"/>
          <path d="M32 38 Q32 50 32 60" stroke="#FF69B4" strokeWidth="4" fill="none"/>
          <path d="M42 36 Q46 48 42 58" stroke="#FF69B4" strokeWidth="4" fill="none"/>
          <path d="M48 34 Q54 44 50 54" stroke="#FF69B4" strokeWidth="4" fill="none"/>
        </svg>
      );
    case 'pet_beetle':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64">
          <ellipse cx="32" cy="38" rx="16" ry="14" fill="#228B22"/>
          <ellipse cx="32" cy="24" rx="10" ry="8" fill="#1a1a1a"/>
          <circle cx="26" cy="22" r="3" fill="#FFD700"/>
          <circle cx="38" cy="22" r="3" fill="#FFD700"/>
          <path d="M32 26 L32 50" stroke="#1a1a1a" strokeWidth="2"/>
          <path d="M20 30 Q10 28 6 20" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
          <path d="M44 30 Q54 28 58 20" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
        </svg>
      );
    case 'pet_butterfly':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64">
          <ellipse cx="32" cy="32" rx="4" ry="16" fill="#1a1a1a"/>
          <ellipse cx="20" cy="24" rx="12" ry="14" fill="#FF69B4"/>
          <ellipse cx="44" cy="24" rx="12" ry="14" fill="#FF69B4"/>
          <ellipse cx="18" cy="42" rx="8" ry="10" fill="#FFB6C1"/>
          <ellipse cx="46" cy="42" rx="8" ry="10" fill="#FFB6C1"/>
          <circle cx="20" cy="22" r="4" fill="#FFD700"/>
          <circle cx="44" cy="22" r="4" fill="#FFD700"/>
          <path d="M28 14 Q26 6 22 4" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
          <path d="M36 14 Q38 6 42 4" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
        </svg>
      );
    case 'pet_dolphin':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64">
          <ellipse cx="32" cy="32" rx="20" ry="12" fill="#4169E1"/>
          <ellipse cx="52" cy="32" rx="8" ry="4" fill="#4169E1"/>
          <polygon points="56,28 64,24 64,40 56,36" fill="#4169E1"/>
          <ellipse cx="16" cy="32" rx="8" ry="6" fill="#4169E1"/>
          <circle cx="12" cy="30" r="2" fill="#1a1a1a"/>
          <polygon points="32,20 28,12 36,12" fill="#4169E1"/>
          <ellipse cx="20" cy="34" rx="8" ry="4" fill="#87CEEB"/>
        </svg>
      );
    case 'pet_shark':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64">
          <ellipse cx="32" cy="32" rx="22" ry="14" fill="#708090"/>
          <polygon points="10,32 2,24 2,40" fill="#708090"/>
          <polygon points="32,18 28,8 36,8" fill="#708090"/>
          <ellipse cx="48" cy="32" rx="8" ry="6" fill="#708090"/>
          <circle cx="52" cy="30" r="3" fill="white"/>
          <circle cx="53" cy="30" r="2" fill="#1a1a1a"/>
          <path d="M44 38 L48 42 L52 38" stroke="white" strokeWidth="2" fill="none"/>
          <ellipse cx="32" cy="36" rx="14" ry="6" fill="#E8E8E8"/>
        </svg>
      );
    case 'pet_goldfish':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64">
          <ellipse cx="32" cy="32" rx="16" ry="12" fill="#FFA500"/>
          <polygon points="10,32 2,24 2,40" fill="#FFA500"/>
          <ellipse cx="44" cy="32" rx="6" ry="8" fill="#FFA500"/>
          <circle cx="48" cy="30" r="3" fill="white"/>
          <circle cx="49" cy="30" r="2" fill="#1a1a1a"/>
          <polygon points="32,20 28,14 36,14" fill="#FF6600"/>
          <ellipse cx="36" cy="34" rx="4" ry="2" fill="#FFD700"/>
        </svg>
      );
    case 'pet_penguin':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64">
          <ellipse cx="32" cy="38" rx="16" ry="18" fill="#1a1a1a"/>
          <ellipse cx="32" cy="40" rx="10" ry="14" fill="white"/>
          <ellipse cx="32" cy="22" rx="14" ry="12" fill="#1a1a1a"/>
          <circle cx="26" cy="20" r="4" fill="white"/>
          <circle cx="38" cy="20" r="4" fill="white"/>
          <circle cx="27" cy="21" r="2" fill="#1a1a1a"/>
          <circle cx="39" cy="21" r="2" fill="#1a1a1a"/>
          <polygon points="32,26 28,32 36,32" fill="#FFA500"/>
          <ellipse cx="22" cy="40" rx="6" ry="4" fill="#1a1a1a" transform="rotate(-20 22 40)"/>
          <ellipse cx="42" cy="40" rx="6" ry="4" fill="#1a1a1a" transform="rotate(20 42 40)"/>
        </svg>
      );
    case 'pet_flamingo':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64">
          <ellipse cx="32" cy="20" rx="10" ry="8" fill="#FF69B4"/>
          <circle cx="36" cy="18" r="3" fill="white"/>
          <circle cx="37" cy="18" r="2" fill="#1a1a1a"/>
          <path d="M32 28 Q28 40 32 56" stroke="#FF69B4" strokeWidth="4" fill="none"/>
          <polygon points="42,18 50,16 46,22" fill="#1a1a1a"/>
          <ellipse cx="32" cy="26" rx="8" ry="6" fill="#FF69B4"/>
        </svg>
      );
    case 'pet_eagle':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64">
          <ellipse cx="32" cy="32" rx="14" ry="12" fill="#8B4513"/>
          <ellipse cx="32" cy="20" rx="10" ry="10" fill="white"/>
          <circle cx="28" cy="18" r="3" fill="#FFD700"/>
          <circle cx="36" cy="18" r="3" fill="#FFD700"/>
          <polygon points="32,22 28,28 36,28" fill="#FFA500"/>
          <path d="M18 28 Q4 20 2 32" stroke="#8B4513" strokeWidth="4" fill="none"/>
          <path d="M46 28 Q60 20 62 32" stroke="#8B4513" strokeWidth="4" fill="none"/>
        </svg>
      );
    case 'pet_bat':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64">
          <ellipse cx="32" cy="32" rx="10" ry="10" fill="#4a4a4a"/>
          <polygon points="22,24 4,12 18,36" fill="#4a4a4a"/>
          <polygon points="42,24 60,12 46,36" fill="#4a4a4a"/>
          <circle cx="28" cy="28" r="4" fill="#FFD700"/>
          <circle cx="36" cy="28" r="4" fill="#FFD700"/>
          <polygon points="18,12 22,8 20,14" fill="#4a4a4a"/>
          <polygon points="46,12 42,8 44,14" fill="#4a4a4a"/>
        </svg>
      );
    case 'pet_polar_bear':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64">
          <ellipse cx="32" cy="40" rx="18" ry="16" fill="white" stroke="#E8E8E8"/>
          <ellipse cx="32" cy="24" rx="16" ry="14" fill="white" stroke="#E8E8E8"/>
          <circle cx="20" cy="14" r="6" fill="white" stroke="#E8E8E8"/>
          <circle cx="44" cy="14" r="6" fill="white" stroke="#E8E8E8"/>
          <circle cx="26" cy="22" r="3" fill="#1a1a1a"/>
          <circle cx="38" cy="22" r="3" fill="#1a1a1a"/>
          <ellipse cx="32" cy="28" rx="4" ry="3" fill="#1a1a1a"/>
        </svg>
      );
    case 'pet_red_panda':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64">
          <ellipse cx="32" cy="40" rx="16" ry="14" fill="#CD5C5C"/>
          <ellipse cx="32" cy="24" rx="14" ry="12" fill="#CD5C5C"/>
          <circle cx="18" cy="14" r="6" fill="#CD5C5C"/>
          <circle cx="46" cy="14" r="6" fill="#CD5C5C"/>
          <ellipse cx="26" cy="24" rx="6" ry="5" fill="white"/>
          <ellipse cx="38" cy="24" rx="6" ry="5" fill="white"/>
          <circle cx="26" cy="25" r="3" fill="#1a1a1a"/>
          <circle cx="38" cy="25" r="3" fill="#1a1a1a"/>
          <ellipse cx="32" cy="30" rx="3" ry="2" fill="#1a1a1a"/>
        </svg>
      );
    case 'pet_superhero_panda':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64">
          <ellipse cx="32" cy="40" rx="16" ry="14" fill="white"/>
          <ellipse cx="32" cy="24" rx="14" ry="12" fill="white"/>
          <circle cx="18" cy="14" r="6" fill="#1a1a1a"/>
          <circle cx="46" cy="14" r="6" fill="#1a1a1a"/>
          <rect x="22" y="18" width="20" height="8" fill="#FF0000" rx="2"/>
          <circle cx="26" cy="22" r="3" fill="white"/>
          <circle cx="38" cy="22" r="3" fill="white"/>
          <polygon points="32,44 28,52 32,50 36,52" fill="#FF0000"/>
        </svg>
      );
    case 'pet_griffin':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64">
          <ellipse cx="32" cy="38" rx="16" ry="14" fill="#DAA520"/>
          <ellipse cx="32" cy="22" rx="12" ry="10" fill="#DAA520"/>
          <polygon points="18,12 22,22 14,22" fill="#DAA520"/>
          <polygon points="46,12 50,22 42,22" fill="#DAA520"/>
          <circle cx="26" cy="20" r="4" fill="#FFD700"/>
          <circle cx="38" cy="20" r="4" fill="#FFD700"/>
          <polygon points="32,26 28,32 36,32" fill="#FFA500"/>
          <path d="M16 32 Q4 24 2 36" stroke="#DAA520" strokeWidth="4" fill="none"/>
          <path d="M48 32 Q60 24 62 36" stroke="#DAA520" strokeWidth="4" fill="none"/>
        </svg>
      );
    case 'pet_tiger':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64">
          <ellipse cx="32" cy="40" rx="16" ry="14" fill="#FFA500"/>
          <ellipse cx="32" cy="24" rx="14" ry="12" fill="#FFA500"/>
          <circle cx="18" cy="14" r="6" fill="#FFA500"/>
          <circle cx="46" cy="14" r="6" fill="#FFA500"/>
          <circle cx="26" cy="22" r="4" fill="white"/>
          <circle cx="38" cy="22" r="4" fill="white"/>
          <circle cx="27" cy="23" r="2" fill="#1a1a1a"/>
          <circle cx="39" cy="23" r="2" fill="#1a1a1a"/>
          <path d="M26 14 L30 20" stroke="#1a1a1a" strokeWidth="2"/>
          <path d="M38 14 L34 20" stroke="#1a1a1a" strokeWidth="2"/>
          <path d="M32 16 L32 20" stroke="#1a1a1a" strokeWidth="2"/>
          <ellipse cx="32" cy="28" rx="3" ry="2" fill="#FFB6C1"/>
        </svg>
      );
    case 'pet_kangaroo':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64">
          <ellipse cx="32" cy="42" rx="14" ry="16" fill="#D2691E"/>
          <ellipse cx="32" cy="24" rx="10" ry="10" fill="#D2691E"/>
          <ellipse cx="20" cy="16" rx="6" ry="10" fill="#D2691E"/>
          <ellipse cx="44" cy="16" rx="6" ry="10" fill="#D2691E"/>
          <circle cx="28" cy="22" r="3" fill="#1a1a1a"/>
          <circle cx="36" cy="22" r="3" fill="#1a1a1a"/>
          <ellipse cx="32" cy="28" rx="3" ry="2" fill="#1a1a1a"/>
          <ellipse cx="32" cy="44" rx="8" ry="6" fill="#DEB887"/>
        </svg>
      );
    case 'pet_koala':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64">
          <ellipse cx="32" cy="40" rx="16" ry="14" fill="#808080"/>
          <ellipse cx="32" cy="24" rx="14" ry="12" fill="#808080"/>
          <circle cx="16" cy="20" r="8" fill="#808080"/>
          <circle cx="48" cy="20" r="8" fill="#808080"/>
          <circle cx="16" cy="20" r="5" fill="#FFB6C1"/>
          <circle cx="48" cy="20" r="5" fill="#FFB6C1"/>
          <circle cx="26" cy="24" r="3" fill="#1a1a1a"/>
          <circle cx="38" cy="24" r="3" fill="#1a1a1a"/>
          <ellipse cx="32" cy="30" rx="6" ry="4" fill="#1a1a1a"/>
        </svg>
      );
    case 'pet_rainbow_unicorn':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64">
          <ellipse cx="32" cy="40" rx="14" ry="14" fill="#FFB6C1"/>
          <ellipse cx="32" cy="26" rx="12" ry="10" fill="#FFB6C1"/>
          <polygon points="32,2 28,18 36,18" fill="url(#rainbow2)"/>
          <defs>
            <linearGradient id="rainbow2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF0000"/>
              <stop offset="25%" stopColor="#FFD700"/>
              <stop offset="50%" stopColor="#00FF00"/>
              <stop offset="75%" stopColor="#00BFFF"/>
              <stop offset="100%" stopColor="#9400D3"/>
            </linearGradient>
          </defs>
          <ellipse cx="20" cy="16" rx="4" ry="8" fill="#87CEEB"/>
          <ellipse cx="44" cy="16" rx="4" ry="8" fill="#87CEEB"/>
          <circle cx="26" cy="24" r="3" fill="#FF69B4"/>
          <circle cx="38" cy="24" r="3" fill="#FF69B4"/>
        </svg>
      );
    case 'pet_bee':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64">
          <ellipse cx="32" cy="36" rx="14" ry="12" fill="#FFD700"/>
          <ellipse cx="32" cy="36" rx="14" ry="12" fill="url(#beeStripes2)"/>
          <defs>
            <pattern id="beeStripes2" patternUnits="userSpaceOnUse" width="8" height="64">
              <rect x="0" y="0" width="4" height="64" fill="#1a1a1a"/>
            </pattern>
          </defs>
          <ellipse cx="32" cy="24" rx="10" ry="8" fill="#FFD700"/>
          <circle cx="28" cy="22" r="3" fill="#1a1a1a"/>
          <circle cx="36" cy="22" r="3" fill="#1a1a1a"/>
          <ellipse cx="20" cy="28" rx="10" ry="6" fill="rgba(200,200,255,0.5)" transform="rotate(-30 20 28)"/>
          <ellipse cx="44" cy="28" rx="10" ry="6" fill="rgba(200,200,255,0.5)" transform="rotate(30 44 28)"/>
          <path d="M28 14 Q26 8 24 6" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
          <path d="M36 14 Q38 8 40 6" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
        </svg>
      );
    case 'pet_pegasus':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64">
          <ellipse cx="32" cy="40" rx="14" ry="12" fill="white" stroke="#E8E8E8"/>
          <ellipse cx="36" cy="28" rx="10" ry="8" fill="white" stroke="#E8E8E8"/>
          <circle cx="42" cy="26" r="3" fill="#87CEEB"/>
          <path d="M16 32 Q6 24 4 34 Q6 28 12 30" stroke="white" strokeWidth="6" fill="white"/>
          <path d="M48 32 Q58 24 60 34 Q58 28 52 30" stroke="white" strokeWidth="6" fill="white"/>
          <ellipse cx="28" cy="52" rx="4" ry="8" fill="white" stroke="#E8E8E8"/>
          <ellipse cx="38" cy="52" rx="4" ry="8" fill="white" stroke="#E8E8E8"/>
        </svg>
      );
    case 'pet_ice_dragon':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64">
          <ellipse cx="32" cy="40" rx="14" ry="14" fill="#87CEEB"/>
          <ellipse cx="32" cy="26" rx="12" ry="10" fill="#87CEEB"/>
          <polygon points="26,16 28,10 30,16" fill="#00BFFF"/>
          <polygon points="34,16 36,10 38,16" fill="#00BFFF"/>
          <circle cx="26" cy="24" r="4" fill="white"/>
          <circle cx="38" cy="24" r="4" fill="white"/>
          <circle cx="27" cy="25" r="2" fill="#00BFFF"/>
          <circle cx="39" cy="25" r="2" fill="#00BFFF"/>
          <path d="M30 34 L28 40 M32 34 L32 40 M34 34 L36 40" stroke="#00BFFF" strokeWidth="2"/>
        </svg>
      );
    case 'pet_fire_dragon':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64">
          <ellipse cx="32" cy="40" rx="14" ry="14" fill="#FF4500"/>
          <ellipse cx="32" cy="26" rx="12" ry="10" fill="#FF4500"/>
          <polygon points="26,16 28,10 30,16" fill="#FF0000"/>
          <polygon points="34,16 36,10 38,16" fill="#FF0000"/>
          <circle cx="26" cy="24" r="4" fill="#FFD700"/>
          <circle cx="38" cy="24" r="4" fill="#FFD700"/>
          <path d="M28 34 L24 42 M32 34 L32 44 M36 34 L40 42" stroke="#FF6600" strokeWidth="3"/>
        </svg>
      );
    case 'pet_turtle':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64">
          <ellipse cx="32" cy="38" rx="18" ry="14" fill="#228B22"/>
          <ellipse cx="32" cy="36" rx="14" ry="10" fill="#32CD32"/>
          <path d="M24 32 L28 28 L32 32 L36 28 L40 32" stroke="#228B22" strokeWidth="2" fill="none"/>
          <ellipse cx="16" cy="40" rx="6" ry="4" fill="#90EE90"/>
          <ellipse cx="48" cy="40" rx="6" ry="4" fill="#90EE90"/>
          <ellipse cx="32" cy="24" rx="8" ry="6" fill="#90EE90"/>
          <circle cx="30" cy="22" r="2" fill="#1a1a1a"/>
          <circle cx="34" cy="22" r="2" fill="#1a1a1a"/>
        </svg>
      );
    case 'pet_slime':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64">
          <ellipse cx="32" cy="42" rx="20" ry="14" fill="#00FF00"/>
          <ellipse cx="32" cy="30" rx="16" ry="16" fill="#32CD32"/>
          <circle cx="26" cy="28" r="5" fill="white"/>
          <circle cx="38" cy="28" r="5" fill="white"/>
          <circle cx="27" cy="29" r="3" fill="#1a1a1a"/>
          <circle cx="39" cy="29" r="3" fill="#1a1a1a"/>
          <ellipse cx="32" cy="38" rx="4" ry="2" fill="#228B22"/>
          <circle cx="20" cy="22" r="3" fill="rgba(255,255,255,0.5)"/>
        </svg>
      );
    case 'pet_wolf':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64">
          <ellipse cx="32" cy="42" rx="16" ry="14" fill="#E8E8E8"/>
          <ellipse cx="32" cy="26" rx="14" ry="12" fill="#E8E8E8"/>
          <polygon points="18,10 24,26 12,26" fill="#E8E8E8"/>
          <polygon points="46,10 52,26 40,26" fill="#E8E8E8"/>
          <circle cx="26" cy="24" r="4" fill="#87CEEB"/>
          <circle cx="38" cy="24" r="4" fill="#87CEEB"/>
          <circle cx="27" cy="25" r="2" fill="#1a1a1a"/>
          <circle cx="39" cy="25" r="2" fill="#1a1a1a"/>
          <ellipse cx="32" cy="32" rx="4" ry="3" fill="#1a1a1a"/>
        </svg>
      );
    case 'pet_lion':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="22" fill="#DAA520"/>
          <ellipse cx="32" cy="34" rx="14" ry="12" fill="#FFA500"/>
          <ellipse cx="32" cy="28" rx="12" ry="10" fill="#FFA500"/>
          <circle cx="26" cy="26" r="4" fill="white"/>
          <circle cx="38" cy="26" r="4" fill="white"/>
          <circle cx="27" cy="27" r="2" fill="#1a1a1a"/>
          <circle cx="39" cy="27" r="2" fill="#1a1a1a"/>
          <ellipse cx="32" cy="32" rx="4" ry="3" fill="#8B4513"/>
        </svg>
      );
    case 'pet_jellyfish':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64">
          <ellipse cx="32" cy="24" rx="18" ry="14" fill="rgba(255,105,180,0.7)"/>
          <path d="M18 30 Q16 44 20 54" stroke="rgba(255,182,193,0.7)" strokeWidth="3" fill="none"/>
          <path d="M26 32 Q24 48 28 58" stroke="rgba(255,182,193,0.7)" strokeWidth="3" fill="none"/>
          <path d="M32 34 Q32 50 32 60" stroke="rgba(255,182,193,0.7)" strokeWidth="3" fill="none"/>
          <path d="M38 32 Q40 48 36 58" stroke="rgba(255,182,193,0.7)" strokeWidth="3" fill="none"/>
          <path d="M46 30 Q48 44 44 54" stroke="rgba(255,182,193,0.7)" strokeWidth="3" fill="none"/>
          <circle cx="26" cy="22" r="3" fill="white"/>
          <circle cx="38" cy="22" r="3" fill="white"/>
        </svg>
      );
    case 'pet_parrot':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64">
          <ellipse cx="32" cy="38" rx="12" ry="14" fill="#00FF00"/>
          <ellipse cx="32" cy="22" rx="10" ry="10" fill="#00FF00"/>
          <circle cx="28" cy="20" r="4" fill="white"/>
          <circle cx="36" cy="20" r="4" fill="white"/>
          <circle cx="29" cy="21" r="2" fill="#1a1a1a"/>
          <circle cx="37" cy="21" r="2" fill="#1a1a1a"/>
          <polygon points="32,26 26,32 38,32" fill="#FF6600"/>
          <polygon points="26,10 30,18 22,16" fill="#FF0000"/>
          <polygon points="38,10 34,18 42,16" fill="#0000FF"/>
          <path d="M20 34 Q10 38 8 48" stroke="#00FF00" strokeWidth="4" fill="none"/>
          <path d="M44 34 Q54 38 56 48" stroke="#00FF00" strokeWidth="4" fill="none"/>
        </svg>
      );
    case 'pet_baby_elephant':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64">
          <ellipse cx="32" cy="40" rx="18" ry="16" fill="#B0C4DE"/>
          <ellipse cx="32" cy="24" rx="16" ry="14" fill="#B0C4DE"/>
          <circle cx="16" cy="18" r="8" fill="#B0C4DE"/>
          <circle cx="48" cy="18" r="8" fill="#B0C4DE"/>
          <circle cx="24" cy="22" r="4" fill="white"/>
          <circle cx="40" cy="22" r="4" fill="white"/>
          <circle cx="25" cy="23" r="2" fill="#1a1a1a"/>
          <circle cx="41" cy="23" r="2" fill="#1a1a1a"/>
          <path d="M32 30 Q28 36 30 44 Q32 48 34 44 Q36 36 32 30" fill="#B0C4DE" stroke="#778899" strokeWidth="1"/>
        </svg>
      );
    case 'pet_fairy':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64">
          <ellipse cx="32" cy="40" rx="10" ry="12" fill="#FFB6C1"/>
          <ellipse cx="32" cy="24" rx="8" ry="8" fill="#FFDAB9"/>
          <circle cx="28" cy="22" r="2" fill="#4169E1"/>
          <circle cx="36" cy="22" r="2" fill="#4169E1"/>
          <path d="M30 28 Q32 30 34 28" stroke="#FF69B4" strokeWidth="1" fill="none"/>
          <ellipse cx="20" cy="32" rx="8" ry="12" fill="rgba(255,182,193,0.5)" transform="rotate(-20 20 32)"/>
          <ellipse cx="44" cy="32" rx="8" ry="12" fill="rgba(255,182,193,0.5)" transform="rotate(20 44 32)"/>
          <circle cx="32" cy="14" r="3" fill="#FFD700"/>
        </svg>
      );
    case 'pet_robot':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64">
          <rect x="18" y="28" width="28" height="24" fill="#708090" rx="4"/>
          <rect x="20" y="18" width="24" height="18" fill="#708090" rx="4"/>
          <rect x="26" y="22" width="6" height="6" fill="#00BFFF"/>
          <rect x="36" y="22" width="6" height="6" fill="#00BFFF"/>
          <rect x="28" y="32" width="8" height="4" fill="#1a1a1a"/>
          <rect x="14" y="32" width="6" height="12" fill="#708090" rx="2"/>
          <rect x="44" y="32" width="6" height="12" fill="#708090" rx="2"/>
          <rect x="30" y="8" width="4" height="10" fill="#708090"/>
          <circle cx="32" cy="6" r="4" fill="#FF0000"/>
        </svg>
      );
    default:
      return null;
  }
};
