import { cn } from "@/lib/utils";
import { ShopItem } from "@/types/shop";
import { ItemIcon } from "@/components/shop/ItemIcon";

interface PandaAvatarProps {
  className?: string;
  size?: number;
  selected?: boolean;
  equippedItems?: ShopItem[];
  showDecorations?: boolean;
  isSad?: boolean;
}

// Known item keys that have custom SVG rendering in the avatar
const CUSTOM_RENDERED_ITEMS = [
  'panda_ninja_hat', 'panda_cowboy_hat', 'panda_helmet',
  'panda_armor',
  'panda_shoes',
  'panda_sword', 'panda_watergun', 'panda_shield',
  'panda_sunglasses', 'panda_bow', 'panda_boxing_gloves', 'panda_belt'
];

export const PandaAvatar = ({ 
  className, 
  size = 120, 
  selected = false,
  equippedItems = [],
  showDecorations = true,
  isSad = false
}: PandaAvatarProps) => {
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
            <circle cx="44" cy={isSad ? "48" : "46"} r="6" fill="hsl(0, 0%, 10%)"/>
            <circle cx="80" cy={isSad ? "48" : "46"} r="6" fill="hsl(0, 0%, 10%)"/>
            <circle cx="46" cy={isSad ? "45" : "43"} r="2.5" fill="white"/>
            <circle cx="82" cy={isSad ? "45" : "43"} r="2.5" fill="white"/>
            
            {/* Sad eyebrows */}
            {isSad && (
              <>
                <path d="M32 32 L52 38" stroke="hsl(0, 0%, 25%)" strokeWidth="3" strokeLinecap="round"/>
                <path d="M88 32 L68 38" stroke="hsl(0, 0%, 25%)" strokeWidth="3" strokeLinecap="round"/>
                {/* Tear drops */}
                <ellipse cx="36" cy="56" rx="2" ry="4" fill="hsl(200, 80%, 70%)" className="animate-pulse"/>
                <ellipse cx="86" cy="56" rx="2" ry="4" fill="hsl(200, 80%, 70%)" className="animate-pulse"/>
              </>
            )}
          </>
        )}
        
        {/* Nose */}
        <ellipse cx="60" cy="56" rx="7" ry="4" fill="hsl(0, 0%, 20%)"/>
        <ellipse cx="60" cy="55" rx="2.5" ry="1.5" fill="hsl(0, 0%, 40%)"/>
        
        {/* Mouth - Happy or Sad */}
        {isSad ? (
          <path d="M53 66 Q60 60 67 66" stroke="hsl(0, 0%, 30%)" strokeWidth="2" fill="none" strokeLinecap="round"/>
        ) : (
          <path d="M53 62 Q60 68 67 62" stroke="hsl(0, 0%, 30%)" strokeWidth="2" fill="none" strokeLinecap="round"/>
        )}
        
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
      
      {/* Flying pets - displayed above the avatar */}
      {flyingPets.map((pet, index) => (
        <div 
          key={pet.id}
          className="absolute animate-float" 
          style={{ 
            top: -size * 0.3 - (index * size * 0.15), 
            left: `${30 + index * 20}%`,
            width: size * 0.35, 
            height: size * 0.35 
          }}
        >
          <PetIcon imageKey={pet.image_key} size={size * 0.35} />
        </div>
      ))}
      
      {/* Ground pets - displayed on the sides */}
      {groundPets.map((pet, index) => {
        const isRight = index % 2 === 0;
        const positionOffset = Math.floor(index / 2) * size * 0.15;
        return (
          <div 
            key={pet.id}
            className="absolute animate-bounce" 
            style={{ 
              bottom: size * 0.05 + positionOffset,
              [isRight ? 'right' : 'left']: -size * 0.15,
              width: size * 0.35, 
              height: size * 0.35 
            }}
          >
            <PetIcon imageKey={pet.image_key} size={size * 0.35} />
          </div>
        );
      })}
      
      {selected && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-bold shadow-kid">
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
