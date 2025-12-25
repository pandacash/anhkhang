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
  const hat = equippedItems.find(i => i.category === 'hat');
  const armor = equippedItems.find(i => i.category === 'armor');
  const weapon = equippedItems.find(i => i.category === 'weapon');
  const shoes = equippedItems.find(i => i.category === 'shoes');
  const accessory = equippedItems.find(i => i.category === 'accessory');

  const hasHat = !!hat;
  const hasArmor = !!armor;
  const hasWeapon = !!weapon;
  const hasShoes = !!shoes;
  const hasAccessory = !!accessory;

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
          <linearGradient id="dressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFB6C1"/>
            <stop offset="50%" stopColor="#FF69B4"/>
            <stop offset="100%" stopColor="#FF1493"/>
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
        
        {/* Shoes/Boots - Giày bốt */}
        {shoes?.image_key === 'elephant_boots' && (
          <>
            <path d="M28 102 L32 90 L48 90 L48 102 L25 106 Z" fill="#FF69B4" stroke="#FF1493" strokeWidth="1"/>
            <path d="M72 102 L76 90 L92 90 L92 102 L70 106 Z" fill="#FF69B4" stroke="#FF1493" strokeWidth="1"/>
            {/* Boot decorations */}
            <rect x="34" y="92" width="12" height="4" fill="#FFD700" rx="1"/>
            <rect x="78" y="92" width="12" height="4" fill="#FFD700" rx="1"/>
            {/* Boot cuffs */}
            <ellipse cx="40" cy="90" rx="10" ry="3" fill="#FFB6C1"/>
            <ellipse cx="84" cy="90" rx="10" ry="3" fill="#FFB6C1"/>
          </>
        )}
        
        {/* Armor - Cape */}
        {armor?.image_key === 'elephant_cape' && (
          <path d="M28 55 L92 55 L98 105 L60 95 L22 105 Z" fill="url(#capeGradEl)" stroke="#4B0082" strokeWidth="1.5"/>
        )}
        
        {/* Armor - Princess Dress */}
        {armor?.image_key === 'elephant_dress' && (
          <>
            <path d="M30 60 L90 60 L100 110 L60 105 L20 110 Z" fill="url(#dressGrad)" stroke="#FF1493" strokeWidth="1.5"/>
            {/* Dress layers */}
            <path d="M35 75 Q60 82 85 75" stroke="#FFB6C1" strokeWidth="2" fill="none"/>
            <path d="M30 90 Q60 98 90 90" stroke="#FFB6C1" strokeWidth="2" fill="none"/>
            {/* Bow on dress */}
            <ellipse cx="60" cy="62" rx="8" ry="4" fill="#FF69B4"/>
            <circle cx="60" cy="62" r="3" fill="#FF1493"/>
            {/* Sparkles on dress */}
            <circle cx="45" cy="80" r="2" fill="#FFD700"/>
            <circle cx="75" cy="85" r="2" fill="#FFD700"/>
            <circle cx="55" cy="95" r="1.5" fill="#FFD700"/>
          </>
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
        
        {/* Accessories */}
        {/* Bells - Chuông lục lạc */}
        {accessory?.image_key === 'elephant_bells' && (
          <>
            <circle cx="22" cy="78" r="7" fill="#FFD700" stroke="#B8860B" strokeWidth="1.5"/>
            <circle cx="22" cy="82" r="2.5" fill="#8B4513"/>
            <path d="M22 71 L22 68" stroke="#B8860B" strokeWidth="2"/>
            
            <circle cx="98" cy="78" r="7" fill="#FFD700" stroke="#B8860B" strokeWidth="1.5"/>
            <circle cx="98" cy="82" r="2.5" fill="#8B4513"/>
            <path d="M98 71 L98 68" stroke="#B8860B" strokeWidth="2"/>
          </>
        )}
        
        {/* Scarf - Khăn quàng */}
        {accessory?.image_key === 'elephant_scarf' && (
          <>
            <path d="M32 58 Q60 68 88 58 Q90 65 85 70" fill="#FF69B4" stroke="#FF1493" strokeWidth="1"/>
            <path d="M85 70 L82 95 Q78 100 74 95 L76 72" fill="#FF69B4" stroke="#FF1493" strokeWidth="1"/>
            <path d="M35 58 Q32 65 35 70 L38 95 Q42 100 46 95 L44 72" fill="#FF69B4" stroke="#FF1493" strokeWidth="1"/>
            {/* Scarf pattern */}
            <circle cx="80" cy="82" r="2" fill="#FFB6C1"/>
            <circle cx="40" cy="82" r="2" fill="#FFB6C1"/>
          </>
        )}
        
        {/* Pearl necklace - Vòng cổ ngọc trai */}
        {accessory?.image_key === 'elephant_pearl_necklace' && (
          <>
            <path d="M35 62 Q60 72 85 62" stroke="#E8E8E8" strokeWidth="2" fill="none"/>
            <circle cx="40" cy="64" r="3" fill="white" stroke="#D3D3D3" strokeWidth="0.5"/>
            <circle cx="50" cy="68" r="3.5" fill="white" stroke="#D3D3D3" strokeWidth="0.5"/>
            <circle cx="60" cy="70" r="4" fill="white" stroke="#D3D3D3" strokeWidth="0.5"/>
            <circle cx="70" cy="68" r="3.5" fill="white" stroke="#D3D3D3" strokeWidth="0.5"/>
            <circle cx="80" cy="64" r="3" fill="white" stroke="#D3D3D3" strokeWidth="0.5"/>
            {/* Pearl shine */}
            <circle cx="58" cy="68" r="1.5" fill="rgba(255,255,255,0.8)"/>
          </>
        )}
        
        {/* Headband with bow - Bờm tóc nơ */}
        {accessory?.image_key === 'elephant_headband' && (
          <>
            <path d="M25 35 Q60 25 95 35" stroke="#FF69B4" strokeWidth="4" fill="none"/>
            {/* Bow on side */}
            <g transform="translate(90, 32)">
              <ellipse cx="-6" cy="0" rx="6" ry="4" fill="#FF1493"/>
              <ellipse cx="6" cy="0" rx="6" ry="4" fill="#FF1493"/>
              <circle cx="0" cy="0" r="3" fill="#FF69B4"/>
            </g>
          </>
        )}
        
        {/* Weapon - Magic wand */}
        {weapon?.image_key === 'elephant_magic_wand' && (
          <g transform="translate(105, 55) rotate(25)">
            {/* Wand stick */}
            <rect x="-3" y="-5" width="6" height="40" fill="#FFD700" rx="2"/>
            <rect x="-2" y="0" width="4" height="35" fill="#FFF8DC"/>
            {/* Star tip */}
            <polygon points="0,-15 3,-8 10,-8 5,-3 7,5 0,1 -7,5 -5,-3 -10,-8 -3,-8" fill="#FF69B4" stroke="#FF1493" strokeWidth="1"/>
            <circle cx="0" cy="-5" r="3" fill="#FFD700"/>
            {/* Sparkles */}
            <circle cx="-8" cy="-12" r="2" fill="#FFD700" className="animate-sparkle"/>
            <circle cx="8" cy="-18" r="1.5" fill="#FF69B4" className="animate-sparkle"/>
          </g>
        )}
        
        {/* Cute smile */}
        <path d="M68 68 Q72 74 78 70" stroke="hsl(220, 15%, 50%)" strokeWidth="2" fill="none" strokeLinecap="round"/>
        
        {/* Hats */}
        {/* Crown - Vương miện */}
        {hat?.image_key === 'elephant_crown' && (
          <g transform="translate(60, 10)">
            <polygon points="-28,22 -24,0 -14,14 0,-15 14,14 24,0 28,22" fill="#FFD700" stroke="#B8860B" strokeWidth="1.5"/>
            <circle cx="-22" cy="4" r="4" fill="#FF69B4"/>
            <circle cx="0" cy="-12" r="4" fill="#FF69B4"/>
            <circle cx="22" cy="4" r="4" fill="#FF69B4"/>
            <rect x="-28" y="22" width="56" height="8" fill="#FFD700" rx="2"/>
            {/* Jewels on band */}
            <circle cx="-15" cy="26" r="2" fill="#87CEEB"/>
            <circle cx="0" cy="26" r="2.5" fill="#FF69B4"/>
            <circle cx="15" cy="26" r="2" fill="#87CEEB"/>
          </g>
        )}
        
        {/* Flower hat - Mũ hoa */}
        {hat?.image_key === 'elephant_flower_hat' && (
          <g transform="translate(60, 8)">
            <ellipse cx="0" cy="14" rx="28" ry="10" fill="#DDA0DD"/>
            <ellipse cx="0" cy="8" rx="22" ry="14" fill="#BA55D3"/>
            {/* Flowers */}
            <circle cx="-12" cy="0" r="7" fill="#FF69B4"/>
            <circle cx="12" cy="0" r="7" fill="#FFD700"/>
            <circle cx="0" cy="-8" r="7" fill="#87CEEB"/>
            {/* Flower centers */}
            <circle cx="-12" cy="0" r="3" fill="#FFD700"/>
            <circle cx="12" cy="0" r="3" fill="#FF69B4"/>
            <circle cx="0" cy="-8" r="3" fill="#90EE90"/>
            {/* Extra small flowers */}
            <circle cx="-20" cy="8" r="4" fill="#90EE90"/>
            <circle cx="20" cy="8" r="4" fill="#FF69B4"/>
          </g>
        )}
        
        {/* Witch hat - Mũ phù thủy */}
        {hat?.image_key === 'elephant_witch_hat' && (
          <>
            {/* Brim */}
            <ellipse cx="60" cy="28" rx="42" ry="10" fill="#4B0082"/>
            <ellipse cx="60" cy="26" rx="38" ry="8" fill="#6B238E"/>
            {/* Cone */}
            <path d="M35 28 L60 -15 L85 28 Z" fill="#4B0082"/>
            <path d="M40 26 L60 -10 L80 26 Z" fill="#6B238E"/>
            {/* Band */}
            <rect x="38" y="18" width="44" height="6" fill="#FF69B4"/>
            {/* Buckle */}
            <rect x="52" y="16" width="16" height="10" fill="#FFD700" rx="2"/>
            <rect x="56" y="19" width="8" height="4" fill="#4B0082"/>
            {/* Stars */}
            <polygon points="45,5 46,8 49,8 47,10 48,13 45,11 42,13 43,10 41,8 44,8" fill="#FFD700"/>
            <polygon points="75,8 76,10 78,10 77,12 77.5,14 75,12.5 72.5,14 73,12 72,10 74,10" fill="#FFD700"/>
          </>
        )}
        
        {/* Flower crown - Vương miện hoa */}
        {hat?.image_key === 'elephant_flower_crown' && (
          <>
            <path d="M25 32 Q60 22 95 32" stroke="#228B22" strokeWidth="4" fill="none"/>
            {/* Flowers */}
            <circle cx="35" cy="28" r="6" fill="#FF69B4"/>
            <circle cx="35" cy="28" r="2.5" fill="#FFD700"/>
            <circle cx="50" cy="24" r="7" fill="#FFD700"/>
            <circle cx="50" cy="24" r="3" fill="#FF69B4"/>
            <circle cx="60" cy="22" r="8" fill="#FF69B4"/>
            <circle cx="60" cy="22" r="3.5" fill="#FFD700"/>
            <circle cx="70" cy="24" r="7" fill="#87CEEB"/>
            <circle cx="70" cy="24" r="3" fill="#FFD700"/>
            <circle cx="85" cy="28" r="6" fill="#90EE90"/>
            <circle cx="85" cy="28" r="2.5" fill="#FF69B4"/>
            {/* Leaves */}
            <ellipse cx="42" cy="30" rx="4" ry="2" fill="#228B22" transform="rotate(-20 42 30)"/>
            <ellipse cx="78" cy="30" rx="4" ry="2" fill="#228B22" transform="rotate(20 78 30)"/>
          </>
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
