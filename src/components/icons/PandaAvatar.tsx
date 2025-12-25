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
          <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C0C0C0"/>
            <stop offset="50%" stopColor="#E8E8E8"/>
            <stop offset="100%" stopColor="#A0A0A0"/>
          </linearGradient>
        </defs>
        
        {/* Background circle - blue for boy */}
        <circle cx="60" cy="60" r="58" fill="url(#pandaBg)" stroke="hsl(200, 70%, 75%)" strokeWidth="3"/>
        
        {/* Sparkle decorations */}
        {showDecorations && (
          <>
            <circle cx="15" cy="85" r="3" fill="hsl(200, 100%, 70%)" className="animate-sparkle"/>
            <circle cx="105" cy="80" r="2.5" fill="hsl(50, 100%, 70%)" className="animate-sparkle"/>
          </>
        )}
        
        {/* Shoes - Giày thể thao */}
        {shoes?.image_key === 'panda_shoes' && (
          <>
            <ellipse cx="40" cy="108" rx="12" ry="7" fill="#FF69B4"/>
            <ellipse cx="80" cy="108" rx="12" ry="7" fill="#FF69B4"/>
            <ellipse cx="40" cy="106" rx="10" ry="5" fill="#FF1493"/>
            <ellipse cx="80" cy="106" rx="10" ry="5" fill="#FF1493"/>
            <circle cx="36" cy="105" r="2.5" fill="#FFD700"/>
            <circle cx="44" cy="105" r="2.5" fill="#FFD700"/>
            <circle cx="76" cy="105" r="2.5" fill="#FFD700"/>
            <circle cx="84" cy="105" r="2.5" fill="#FFD700"/>
            {/* Laces */}
            <path d="M36 108 L44 108" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M76 108 L84 108" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </>
        )}
        
        {/* Ears */}
        <circle cx="22" cy="28" r="18" fill="hsl(0, 0%, 20%)"/>
        <circle cx="22" cy="28" r="12" fill="hsl(0, 0%, 30%)"/>
        <circle cx="98" cy="28" r="18" fill="hsl(0, 0%, 20%)"/>
        <circle cx="98" cy="28" r="12" fill="hsl(0, 0%, 30%)"/>
        
        {/* Armor - Giáp chiến binh */}
        {armor?.image_key === 'panda_armor' && (
          <>
            <path d="M32 80 L40 68 L80 68 L88 80 L88 105 L32 105 Z" fill="url(#armorGradPanda)" stroke="#B8860B" strokeWidth="2"/>
            <circle cx="60" cy="82" r="6" fill="#FF6B6B" stroke="#CC0000" strokeWidth="1"/>
            <path d="M42 90 L78 90" stroke="#FFE4B5" strokeWidth="3"/>
            <path d="M42 96 L78 96" stroke="#FFE4B5" strokeWidth="2"/>
            {/* Shoulder pads */}
            <ellipse cx="35" cy="72" rx="8" ry="6" fill="#FFD700" stroke="#B8860B" strokeWidth="1"/>
            <ellipse cx="85" cy="72" rx="8" ry="6" fill="#FFD700" stroke="#B8860B" strokeWidth="1"/>
          </>
        )}
        
        {/* Head */}
        <ellipse cx="60" cy="58" rx="42" ry="40" fill="url(#pandaBody)"/>
        
        {/* Eye patches - cute rounded shape */}
        <ellipse cx="38" cy="50" rx="16" ry="18" fill="hsl(0, 0%, 15%)" transform="rotate(-10 38 50)"/>
        <ellipse cx="82" cy="50" rx="16" ry="18" fill="hsl(0, 0%, 15%)" transform="rotate(10 82 50)"/>
        
        {/* Sunglasses accessory - render over eye patches */}
        {accessory?.image_key === 'panda_sunglasses' ? (
          <>
            {/* Sunglasses frame */}
            <rect x="20" y="42" width="28" height="20" rx="4" fill="#1a1a2e" stroke="#0f0f1a" strokeWidth="2"/>
            <rect x="72" y="42" width="28" height="20" rx="4" fill="#1a1a2e" stroke="#0f0f1a" strokeWidth="2"/>
            <path d="M48 52 L72 52" stroke="#0f0f1a" strokeWidth="3"/>
            {/* Lens shine */}
            <ellipse cx="30" cy="48" rx="6" ry="4" fill="rgba(255,255,255,0.2)"/>
            <ellipse cx="82" cy="48" rx="6" ry="4" fill="rgba(255,255,255,0.2)"/>
          </>
        ) : (
          <>
            {/* Normal Eyes - big and cute anime style */}
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
          </>
        )}
        
        {/* Cute nose */}
        <ellipse cx="60" cy="68" rx="8" ry="5" fill="hsl(0, 0%, 20%)"/>
        <ellipse cx="60" cy="67" rx="3" ry="2" fill="hsl(0, 0%, 40%)"/>
        
        {/* Mouth - cute smile */}
        <path d="M52 76 Q60 84 68 76" stroke="hsl(0, 0%, 30%)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        
        {/* Accessories */}
        {/* Red bow - Nơ đỏ */}
        {accessory?.image_key === 'panda_bow' && (
          <g transform="translate(60, 88)">
            <path d="M-15 0 Q-22 -8 -15 -16 L0 0 L-15 16 Q-22 8 -15 0" fill="#FF0000"/>
            <path d="M15 0 Q22 -8 15 -16 L0 0 L15 16 Q22 8 15 0" fill="#FF0000"/>
            <circle cx="0" cy="0" r="6" fill="#DC143C" stroke="#8B0000" strokeWidth="1"/>
            {/* Ribbon tails */}
            <path d="M-5 5 L-10 20 L-8 20 L-3 8" fill="#CC0000"/>
            <path d="M5 5 L10 20 L8 20 L3 8" fill="#CC0000"/>
          </g>
        )}
        
        {/* Boxing gloves - Găng tay boxing */}
        {accessory?.image_key === 'panda_boxing_gloves' && (
          <>
            <ellipse cx="8" cy="70" rx="10" ry="12" fill="#FF0000" stroke="#CC0000" strokeWidth="2"/>
            <ellipse cx="8" cy="68" rx="6" ry="4" fill="#FF4444"/>
            <rect x="2" y="80" width="12" height="6" fill="#8B0000" rx="2"/>
            
            <ellipse cx="112" cy="70" rx="10" ry="12" fill="#FF0000" stroke="#CC0000" strokeWidth="2"/>
            <ellipse cx="112" cy="68" rx="6" ry="4" fill="#FF4444"/>
            <rect x="106" y="80" width="12" height="6" fill="#8B0000" rx="2"/>
          </>
        )}
        
        {/* Ninja belt - Đai lưng ninja */}
        {accessory?.image_key === 'panda_belt' && (
          <>
            <rect x="30" y="92" width="60" height="8" fill="#2F2F2F" rx="2"/>
            <rect x="55" y="90" width="10" height="12" fill="#FFD700" rx="2"/>
            <circle cx="60" cy="96" r="3" fill="#1a1a1a"/>
          </>
        )}
        
        {/* Weapons */}
        {/* Sword - Kiếm */}
        {weapon?.image_key === 'panda_sword' && (
          <g transform="translate(100, 45) rotate(35)">
            {/* Blade */}
            <rect x="-3" y="-30" width="6" height="35" fill="linear-gradient(90deg, #C0C0C0 0%, #E8E8E8 50%, #A0A0A0 100%)" rx="1"/>
            <polygon points="0,-35 -4,-28 4,-28" fill="#C0C0C0"/>
            {/* Blade shine */}
            <rect x="-1" y="-28" width="2" height="30" fill="rgba(255,255,255,0.5)"/>
            {/* Guard */}
            <rect x="-10" y="5" width="20" height="6" fill="#FFD700" rx="2"/>
            {/* Handle */}
            <rect x="-4" y="11" width="8" height="12" fill="#8B4513" rx="2"/>
            <rect x="-3" y="13" width="1" height="8" fill="#654321"/>
            <rect x="2" y="13" width="1" height="8" fill="#654321"/>
            {/* Pommel */}
            <circle cx="0" cy="25" r="4" fill="#FFD700"/>
          </g>
        )}
        
        {/* Water gun - Súng nước */}
        {weapon?.image_key === 'panda_watergun' && (
          <g transform="translate(100, 60)">
            {/* Body */}
            <rect x="-20" y="-8" width="25" height="16" fill="#00BFFF" rx="4"/>
            {/* Tank */}
            <rect x="2" y="-12" width="14" height="24" fill="#FF6B6B" rx="3"/>
            <rect x="4" y="-10" width="10" height="20" fill="#FF8888" rx="2"/>
            {/* Nozzle */}
            <ellipse cx="-22" cy="0" rx="4" ry="6" fill="#00CED1"/>
            <circle cx="-24" cy="0" r="3" fill="#0099AA"/>
            {/* Handle */}
            <rect x="-5" y="8" width="8" height="10" fill="#FF4444" rx="2"/>
            {/* Trigger */}
            <rect x="-2" y="4" width="4" height="6" fill="#00AACC" rx="1"/>
          </g>
        )}
        
        {/* Shield - Khiên */}
        {weapon?.image_key === 'panda_shield' && (
          <g transform="translate(8, 50)">
            <path d="M0 -15 L20 -10 L22 15 L10 30 L-2 15 Z" fill="url(#shieldGrad)" stroke="#8B4513" strokeWidth="2"/>
            <path d="M5 -8 L15 -5 L16 12 L10 22 L3 12 Z" fill="#FFD700"/>
            <circle cx="10" cy="5" r="6" fill="#FF0000" stroke="#8B0000" strokeWidth="1"/>
            <path d="M7 5 L10 2 L13 5 L10 8 Z" fill="#FFD700"/>
          </g>
        )}
        
        {/* Hats */}
        {/* Ninja hat - Mũ ninja */}
        {hat?.image_key === 'panda_ninja_hat' && (
          <>
            <ellipse cx="60" cy="22" rx="42" ry="12" fill="#2F2F2F"/>
            <rect x="18" y="14" width="84" height="14" fill="#4A4A4A"/>
            <rect x="18" y="20" width="84" height="4" fill="#2F2F2F"/>
            {/* Metal plate */}
            <rect x="45" y="16" width="30" height="10" fill="#C0C0C0" rx="2"/>
            <path d="M55 19 L60 23 L65 19" stroke="#8B4513" strokeWidth="2" fill="none"/>
          </>
        )}
        
        {/* Cowboy hat - Mũ cao bồi */}
        {hat?.image_key === 'panda_cowboy_hat' && (
          <>
            {/* Brim */}
            <ellipse cx="60" cy="25" rx="45" ry="12" fill="#8B4513"/>
            <ellipse cx="60" cy="23" rx="42" ry="10" fill="#A0522D"/>
            {/* Crown */}
            <path d="M35 25 L38 0 L60 5 L82 0 L85 25 Z" fill="#8B4513"/>
            <path d="M38 22 L40 5 L60 9 L80 5 L82 22 Z" fill="#A0522D"/>
            {/* Band */}
            <rect x="38" y="15" width="44" height="5" fill="#1a1a1a"/>
            <rect x="55" y="14" width="10" height="7" fill="#FFD700" rx="1"/>
          </>
        )}
        
        {/* Helmet - Mũ bảo hiểm */}
        {hat?.image_key === 'panda_helmet' && (
          <>
            <ellipse cx="60" cy="30" rx="40" ry="28" fill="#FF0000"/>
            <ellipse cx="60" cy="28" rx="38" ry="25" fill="#FF3333"/>
            {/* Visor */}
            <rect x="25" y="35" width="70" height="12" fill="#1a1a2e" rx="3"/>
            <rect x="28" y="37" width="64" height="8" fill="rgba(100,150,255,0.3)" rx="2"/>
            {/* Star */}
            <polygon points="60,8 63,15 70,15 65,20 67,28 60,24 53,28 55,20 50,15 57,15" fill="#FFD700"/>
            {/* Side vents */}
            <rect x="20" y="25" width="3" height="8" fill="#CC0000" rx="1"/>
            <rect x="97" y="25" width="3" height="8" fill="#CC0000" rx="1"/>
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
