import { cn } from "@/lib/utils";

interface ItemIconProps {
  imageKey: string;
  size?: number;
  className?: string;
}

// Map of item keys to their SVG representations
export const ItemIcon = ({ imageKey, size = 48, className }: ItemIconProps) => {
  const iconSize = size;
  
  const renderIcon = () => {
    switch (imageKey) {
      // Panda items
      case 'panda_armor':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <defs>
              <linearGradient id="armorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#FFA500" />
              </linearGradient>
            </defs>
            <path d="M32 8 L48 16 L48 40 L32 56 L16 40 L16 16 Z" fill="url(#armorGrad)" stroke="#B8860B" strokeWidth="2"/>
            <path d="M32 16 L40 20 L40 36 L32 44 L24 36 L24 20 Z" fill="#FFE4B5" stroke="#DAA520" strokeWidth="1"/>
            <circle cx="32" cy="28" r="4" fill="#FF6B6B"/>
          </svg>
        );
      
      case 'panda_shoes':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <defs>
              <linearGradient id="shoeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF69B4" />
                <stop offset="100%" stopColor="#FF1493" />
              </linearGradient>
            </defs>
            <ellipse cx="24" cy="40" rx="12" ry="8" fill="url(#shoeGrad)"/>
            <ellipse cx="40" cy="40" rx="12" ry="8" fill="url(#shoeGrad)"/>
            <rect x="18" y="32" width="12" height="8" fill="#FF69B4" rx="2"/>
            <rect x="34" y="32" width="12" height="8" fill="#FF69B4" rx="2"/>
            <circle cx="20" cy="38" r="2" fill="#FFD700"/>
            <circle cx="44" cy="38" r="2" fill="#FFD700"/>
          </svg>
        );
      
      case 'panda_sword':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <defs>
              <linearGradient id="swordGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C0C0C0" />
                <stop offset="100%" stopColor="#808080" />
              </linearGradient>
            </defs>
            <rect x="30" y="8" width="4" height="36" fill="url(#swordGrad)" rx="1"/>
            <polygon points="32,4 28,12 36,12" fill="#C0C0C0"/>
            <rect x="24" y="44" width="16" height="6" fill="#8B4513" rx="2"/>
            <rect x="28" y="50" width="8" height="10" fill="#654321" rx="2"/>
            <circle cx="32" cy="47" r="2" fill="#FFD700"/>
          </svg>
        );
      
      case 'panda_watergun':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <defs>
              <linearGradient id="gunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00BFFF" />
                <stop offset="100%" stopColor="#1E90FF" />
              </linearGradient>
            </defs>
            <rect x="8" y="28" width="32" height="12" fill="url(#gunGrad)" rx="4"/>
            <rect x="36" y="24" width="16" height="20" fill="#FF6B6B" rx="3"/>
            <rect x="4" y="30" width="8" height="8" fill="#00CED1" rx="2"/>
            <ellipse cx="12" cy="34" rx="2" ry="4" fill="#E0FFFF"/>
            <circle cx="44" cy="34" r="6" fill="#FFD700" stroke="#FFA500" strokeWidth="2"/>
          </svg>
        );
      
      case 'panda_bow':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <defs>
              <linearGradient id="bowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF0000" />
                <stop offset="100%" stopColor="#DC143C" />
              </linearGradient>
            </defs>
            <path d="M16 32 Q8 24 16 16 L32 32 L16 48 Q8 40 16 32" fill="url(#bowGrad)"/>
            <path d="M48 32 Q56 24 48 16 L32 32 L48 48 Q56 40 48 32" fill="url(#bowGrad)"/>
            <circle cx="32" cy="32" r="6" fill="#FFD700"/>
          </svg>
        );
      
      case 'panda_ninja_hat':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <defs>
              <linearGradient id="ninjaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2F2F2F" />
                <stop offset="100%" stopColor="#1A1A1A" />
              </linearGradient>
            </defs>
            <ellipse cx="32" cy="40" rx="24" ry="12" fill="url(#ninjaGrad)"/>
            <ellipse cx="32" cy="36" rx="20" ry="16" fill="#2F2F2F"/>
            <rect x="8" y="32" width="48" height="8" fill="#4A4A4A"/>
            <path d="M48 28 L56 20 L54 28" fill="#C0C0C0"/>
          </svg>
        );
      
      // Elephant items
      case 'elephant_crown':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <defs>
              <linearGradient id="crownGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#FFA500" />
              </linearGradient>
            </defs>
            <polygon points="8,48 12,20 20,32 32,8 44,32 52,20 56,48" fill="url(#crownGrad)" stroke="#B8860B" strokeWidth="2"/>
            <circle cx="12" cy="20" r="4" fill="#FF69B4"/>
            <circle cx="32" cy="12" r="4" fill="#FF69B4"/>
            <circle cx="52" cy="20" r="4" fill="#FF69B4"/>
            <rect x="8" y="48" width="48" height="8" fill="#FFD700" rx="2"/>
            <circle cx="20" cy="52" r="3" fill="#00CED1"/>
            <circle cx="32" cy="52" r="3" fill="#FF69B4"/>
            <circle cx="44" cy="52" r="3" fill="#00CED1"/>
          </svg>
        );
      
      case 'elephant_flower_hat':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <defs>
              <linearGradient id="hatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#DDA0DD" />
                <stop offset="100%" stopColor="#BA55D3" />
              </linearGradient>
            </defs>
            <ellipse cx="32" cy="48" rx="28" ry="8" fill="url(#hatGrad)"/>
            <ellipse cx="32" cy="36" rx="20" ry="16" fill="#DDA0DD"/>
            <circle cx="24" cy="28" r="6" fill="#FF69B4"/>
            <circle cx="40" cy="28" r="6" fill="#FFD700"/>
            <circle cx="32" cy="20" r="6" fill="#87CEEB"/>
            <circle cx="32" cy="28" r="4" fill="#90EE90"/>
          </svg>
        );
      
      case 'elephant_scarf':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <defs>
              <linearGradient id="scarfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF69B4" />
                <stop offset="100%" stopColor="#FF1493" />
              </linearGradient>
            </defs>
            <path d="M8 24 Q32 32 56 24 Q56 36 48 40 L48 56 Q44 60 40 56 L40 44 Q32 48 24 44 L24 56 Q20 60 16 56 L16 40 Q8 36 8 24" fill="url(#scarfGrad)"/>
            <path d="M12 28 Q32 34 52 28" stroke="#FFB6C1" strokeWidth="3" fill="none"/>
            <circle cx="20" cy="52" r="3" fill="#FFD700"/>
            <circle cx="44" cy="52" r="3" fill="#FFD700"/>
          </svg>
        );
      
      case 'elephant_bells':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <defs>
              <linearGradient id="bellGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#FFA500" />
              </linearGradient>
            </defs>
            <circle cx="16" cy="40" r="10" fill="url(#bellGrad)" stroke="#B8860B" strokeWidth="2"/>
            <circle cx="32" cy="36" r="10" fill="url(#bellGrad)" stroke="#B8860B" strokeWidth="2"/>
            <circle cx="48" cy="40" r="10" fill="url(#bellGrad)" stroke="#B8860B" strokeWidth="2"/>
            <circle cx="16" cy="46" r="3" fill="#8B4513"/>
            <circle cx="32" cy="42" r="3" fill="#8B4513"/>
            <circle cx="48" cy="46" r="3" fill="#8B4513"/>
            <path d="M12 28 Q32 20 52 28" stroke="#FF69B4" strokeWidth="4" fill="none"/>
          </svg>
        );
      
      case 'elephant_cape':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <defs>
              <linearGradient id="capeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9370DB" />
                <stop offset="100%" stopColor="#8A2BE2" />
              </linearGradient>
            </defs>
            <path d="M16 12 L48 12 L56 56 L32 48 L8 56 Z" fill="url(#capeGrad)" stroke="#4B0082" strokeWidth="2"/>
            <path d="M20 16 L44 16" stroke="#FFD700" strokeWidth="3"/>
            <circle cx="32" cy="16" r="4" fill="#FFD700"/>
            <path d="M24 28 L32 24 L40 28" stroke="#FFD700" strokeWidth="2" fill="none"/>
            <circle cx="32" cy="36" r="6" fill="#FF69B4"/>
          </svg>
        );
      
      case 'elephant_boots':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <defs>
              <linearGradient id="bootGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF69B4" />
                <stop offset="100%" stopColor="#DB7093" />
              </linearGradient>
            </defs>
            <path d="M12 20 L20 20 L20 44 L8 44 L8 48 L24 48 L24 20" fill="url(#bootGrad)"/>
            <path d="M40 20 L48 20 L48 44 L36 44 L36 48 L52 48 L52 20" fill="url(#bootGrad)"/>
            <ellipse cx="16" cy="48" rx="10" ry="4" fill="#FF1493"/>
            <ellipse cx="44" cy="48" rx="10" ry="4" fill="#FF1493"/>
            <rect x="12" y="24" width="12" height="4" fill="#FFD700" rx="1"/>
            <rect x="40" y="24" width="12" height="4" fill="#FFD700" rx="1"/>
          </svg>
        );
      
      // New Panda items
      case 'panda_helmet':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="36" rx="26" ry="22" fill="#4169E1"/>
            <ellipse cx="32" cy="32" rx="22" ry="18" fill="#6495ED"/>
            <rect x="8" y="34" width="48" height="6" fill="#FFD700"/>
            <path d="M20 20 L32 8 L44 20" stroke="#FF0000" strokeWidth="4" fill="none"/>
          </svg>
        );
      
      case 'panda_sunglasses':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <rect x="4" y="28" width="20" height="14" rx="4" fill="#1A1A1A"/>
            <rect x="40" y="28" width="20" height="14" rx="4" fill="#1A1A1A"/>
            <rect x="24" y="32" width="16" height="3" fill="#1A1A1A"/>
            <rect x="6" y="30" width="8" height="4" fill="#87CEEB" opacity="0.5"/>
            <rect x="50" y="30" width="8" height="4" fill="#87CEEB" opacity="0.5"/>
          </svg>
        );
      
      case 'panda_shield':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <path d="M32 4 L56 16 L56 36 L32 60 L8 36 L8 16 Z" fill="#4169E1" stroke="#1E3A8A" strokeWidth="2"/>
            <path d="M32 12 L48 20 L48 34 L32 50 L16 34 L16 20 Z" fill="#6495ED"/>
            <path d="M32 20 L32 42 M24 28 L40 28" stroke="#FFD700" strokeWidth="4"/>
          </svg>
        );
      
      case 'panda_belt':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <rect x="4" y="26" width="56" height="12" rx="2" fill="#2F2F2F"/>
            <rect x="24" y="24" width="16" height="16" rx="2" fill="#FFD700" stroke="#B8860B" strokeWidth="2"/>
            <rect x="28" y="28" width="8" height="8" fill="#2F2F2F"/>
          </svg>
        );
      
      case 'panda_boxing_gloves':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="18" cy="36" rx="14" ry="16" fill="#FF0000"/>
            <ellipse cx="46" cy="36" rx="14" ry="16" fill="#FF0000"/>
            <rect x="14" y="48" width="8" height="10" fill="#8B0000"/>
            <rect x="42" y="48" width="8" height="10" fill="#8B0000"/>
            <ellipse cx="18" cy="32" rx="6" ry="8" fill="#FF6B6B"/>
            <ellipse cx="46" cy="32" rx="6" ry="8" fill="#FF6B6B"/>
          </svg>
        );
      
      case 'panda_cowboy_hat':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="48" rx="30" ry="8" fill="#8B4513"/>
            <ellipse cx="32" cy="36" rx="18" ry="16" fill="#A0522D"/>
            <rect x="20" y="40" width="24" height="4" fill="#FFD700"/>
            <path d="M24 24 L32 16 L40 24" stroke="#8B4513" strokeWidth="2" fill="none"/>
          </svg>
        );
      
      // New Elephant items
      case 'elephant_flower_crown':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <path d="M8 40 Q32 20 56 40" stroke="#228B22" strokeWidth="4" fill="none"/>
            <circle cx="16" cy="32" r="8" fill="#FF69B4"/>
            <circle cx="32" cy="24" r="8" fill="#FFD700"/>
            <circle cx="48" cy="32" r="8" fill="#FF69B4"/>
            <circle cx="24" cy="28" r="6" fill="#87CEEB"/>
            <circle cx="40" cy="28" r="6" fill="#DDA0DD"/>
            <circle cx="16" cy="32" r="3" fill="#FFFF00"/>
            <circle cx="32" cy="24" r="3" fill="#FFA500"/>
            <circle cx="48" cy="32" r="3" fill="#FFFF00"/>
          </svg>
        );
      
      case 'elephant_pearl_necklace':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <path d="M12 24 Q32 48 52 24" stroke="#DDA0DD" strokeWidth="3" fill="none"/>
            <circle cx="12" cy="24" r="5" fill="#FFFAFA" stroke="#DDD" strokeWidth="1"/>
            <circle cx="22" cy="34" r="5" fill="#FFFAFA" stroke="#DDD" strokeWidth="1"/>
            <circle cx="32" cy="40" r="6" fill="#FFFAFA" stroke="#DDD" strokeWidth="1"/>
            <circle cx="42" cy="34" r="5" fill="#FFFAFA" stroke="#DDD" strokeWidth="1"/>
            <circle cx="52" cy="24" r="5" fill="#FFFAFA" stroke="#DDD" strokeWidth="1"/>
          </svg>
        );
      
      case 'elephant_magic_wand':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <rect x="28" y="24" width="8" height="36" rx="2" fill="#8B4513"/>
            <polygon points="32,4 28,20 36,20" fill="#FFD700"/>
            <circle cx="32" cy="12" r="8" fill="#FF69B4"/>
            <circle cx="32" cy="12" r="4" fill="#FFFF00"/>
            <circle cx="24" cy="8" r="2" fill="#87CEEB"/>
            <circle cx="40" cy="8" r="2" fill="#87CEEB"/>
            <circle cx="28" cy="18" r="2" fill="#DDA0DD"/>
            <circle cx="36" cy="18" r="2" fill="#DDA0DD"/>
          </svg>
        );
      
      case 'elephant_dress':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <path d="M24 8 L40 8 L48 56 L16 56 Z" fill="#FF69B4"/>
            <path d="M20 8 Q32 16 44 8" fill="#FF1493"/>
            <ellipse cx="32" cy="56" rx="20" ry="4" fill="#FF1493"/>
            <circle cx="32" cy="20" r="4" fill="#FFD700"/>
            <path d="M24 30 L40 30" stroke="#FFD700" strokeWidth="2"/>
            <path d="M22 40 L42 40" stroke="#DDA0DD" strokeWidth="2"/>
          </svg>
        );
      
      case 'elephant_headband':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <path d="M8 36 Q32 20 56 36" stroke="#FF69B4" strokeWidth="6" fill="none"/>
            <ellipse cx="48" cy="28" rx="10" ry="8" fill="#FF1493"/>
            <ellipse cx="52" cy="24" rx="8" ry="6" fill="#FF1493"/>
            <circle cx="50" cy="26" r="4" fill="#FFD700"/>
          </svg>
        );
      
      case 'elephant_witch_hat':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="52" rx="28" ry="8" fill="#4B0082"/>
            <polygon points="32,4 8,52 56,52" fill="#6A0DAD"/>
            <rect x="8" y="48" width="48" height="6" fill="#FFD700"/>
            <circle cx="32" cy="32" r="4" fill="#FFD700"/>
            <path d="M28 8 Q24 4 28 0" stroke="#FFD700" strokeWidth="2" fill="none"/>
          </svg>
        );
      
      // New Panda items
      case 'panda_bomber_jacket':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <path d="M16 16 L48 16 L52 48 L12 48 Z" fill="#2F4F4F"/>
            <path d="M16 16 L8 32 L8 48 L12 48 L16 32 Z" fill="#2F4F4F"/>
            <path d="M48 16 L56 32 L56 48 L52 48 L48 32 Z" fill="#2F4F4F"/>
            <rect x="28" y="16" width="8" height="32" fill="#FFD700"/>
            <circle cx="24" cy="28" r="3" fill="#FF6B6B"/>
            <circle cx="40" cy="28" r="3" fill="#FF6B6B"/>
          </svg>
        );
      
      case 'panda_cap':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="40" rx="24" ry="12" fill="#FF0000"/>
            <ellipse cx="32" cy="36" rx="20" ry="16" fill="#FF0000"/>
            <path d="M8 40 L4 48 L28 48 L28 40" fill="#1A1A1A"/>
            <rect x="24" y="28" width="16" height="8" fill="#FFFFFF"/>
          </svg>
        );
      
      case 'panda_aviator_glasses':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="18" cy="32" rx="12" ry="10" fill="#8B4513" stroke="#FFD700" strokeWidth="2"/>
            <ellipse cx="46" cy="32" rx="12" ry="10" fill="#8B4513" stroke="#FFD700" strokeWidth="2"/>
            <rect x="30" y="30" width="4" height="4" fill="#FFD700"/>
            <ellipse cx="18" cy="32" rx="8" ry="6" fill="#87CEEB" opacity="0.5"/>
            <ellipse cx="46" cy="32" rx="8" ry="6" fill="#87CEEB" opacity="0.5"/>
          </svg>
        );
      
      case 'panda_basketball_shoes':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <path d="M8 32 L24 32 L24 48 L4 48 L4 40 Z" fill="#FF6B6B"/>
            <path d="M40 32 L56 32 L60 40 L60 48 L40 48 Z" fill="#FF6B6B"/>
            <rect x="8" y="32" width="16" height="8" fill="#FFFFFF"/>
            <rect x="40" y="32" width="16" height="8" fill="#FFFFFF"/>
            <circle cx="16" cy="44" r="3" fill="#1A1A1A"/>
            <circle cx="48" cy="44" r="3" fill="#1A1A1A"/>
          </svg>
        );
      
      case 'panda_katana':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <rect x="30" y="4" width="4" height="40" fill="#C0C0C0"/>
            <polygon points="32,0 28,8 36,8" fill="#E8E8E8"/>
            <rect x="26" y="44" width="12" height="4" fill="#8B0000"/>
            <rect x="28" y="48" width="8" height="12" fill="#2F2F2F"/>
            <path d="M28 8 L32 4 L36 8" fill="#FFD700"/>
          </svg>
        );
      
      case 'panda_golden_armor':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <path d="M16 12 L48 12 L52 48 L12 48 Z" fill="#FFD700"/>
            <path d="M20 16 L44 16 L46 44 L18 44 Z" fill="#FFA500"/>
            <circle cx="32" cy="28" r="8" fill="#FF0000" stroke="#8B0000" strokeWidth="2"/>
            <path d="M28 28 L36 28 M32 24 L32 32" stroke="#FFD700" strokeWidth="2"/>
          </svg>
        );
      
      case 'panda_emperor_crown':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <polygon points="8,48 12,16 24,28 32,8 40,28 52,16 56,48" fill="#FFD700" stroke="#B8860B" strokeWidth="2"/>
            <circle cx="32" cy="16" r="6" fill="#FF0000"/>
            <circle cx="18" cy="24" r="4" fill="#00CED1"/>
            <circle cx="46" cy="24" r="4" fill="#00CED1"/>
            <rect x="8" y="48" width="48" height="8" fill="#8B0000"/>
            <rect x="16" y="48" width="32" height="8" fill="#FFD700"/>
          </svg>
        );
      
      case 'panda_ninja_gloves':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="18" cy="36" rx="12" ry="14" fill="#2F2F2F"/>
            <ellipse cx="46" cy="36" rx="12" ry="14" fill="#2F2F2F"/>
            <rect x="8" y="44" width="20" height="8" fill="#1A1A1A"/>
            <rect x="36" y="44" width="20" height="8" fill="#1A1A1A"/>
            <path d="M14 28 L18 20 L22 28" fill="#C0C0C0"/>
            <path d="M42 28 L46 20 L50 28" fill="#C0C0C0"/>
          </svg>
        );
      
      case 'panda_rocket_boots':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <path d="M12 16 L24 16 L24 44 L8 44 L8 24 Z" fill="#C0C0C0"/>
            <path d="M40 16 L52 16 L56 24 L56 44 L40 44 Z" fill="#C0C0C0"/>
            <ellipse cx="16" cy="52" rx="8" ry="4" fill="#FF6B6B"/>
            <ellipse cx="48" cy="52" rx="8" ry="4" fill="#FF6B6B"/>
            <rect x="12" y="44" width="8" height="8" fill="#FF0000"/>
            <rect x="44" y="44" width="8" height="8" fill="#FF0000"/>
            <path d="M14 56 L18 64 L14 64 Z" fill="#FFA500"/>
            <path d="M46 56 L50 64 L46 64 Z" fill="#FFA500"/>
          </svg>
        );
      
      case 'panda_laser_gun':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <rect x="8" y="28" width="32" height="14" rx="4" fill="#4169E1"/>
            <rect x="36" y="24" width="20" height="22" rx="4" fill="#1E3A8A"/>
            <circle cx="16" cy="35" r="6" fill="#00FF00"/>
            <rect x="4" y="32" width="8" height="6" fill="#00CED1"/>
            <path d="M0 32 L4 35 L0 38" fill="#00FF00"/>
          </svg>
        );
      
      // New Elephant items
      case 'elephant_gown':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <path d="M24 8 L40 8 L52 56 L12 56 Z" fill="#9370DB"/>
            <path d="M20 8 Q32 16 44 8" fill="#8A2BE2"/>
            <ellipse cx="32" cy="56" rx="24" ry="6" fill="#8A2BE2"/>
            <circle cx="32" cy="16" r="4" fill="#FFD700"/>
            <path d="M20 24 L44 24" stroke="#FFD700" strokeWidth="2"/>
            <circle cx="24" cy="36" r="2" fill="#FFD700"/>
            <circle cx="32" cy="40" r="2" fill="#FFD700"/>
            <circle cx="40" cy="36" r="2" fill="#FFD700"/>
          </svg>
        );
      
      case 'elephant_beret':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="40" rx="24" ry="10" fill="#FF69B4"/>
            <ellipse cx="28" cy="32" rx="20" ry="14" fill="#FF69B4"/>
            <circle cx="32" cy="20" r="4" fill="#FF1493"/>
            <path d="M12 38 Q28 28 48 38" fill="#FF1493"/>
          </svg>
        );
      
      case 'elephant_jade_bracelet':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="32" rx="20" ry="20" fill="none" stroke="#228B22" strokeWidth="8"/>
            <ellipse cx="32" cy="32" rx="16" ry="16" fill="none" stroke="#32CD32" strokeWidth="4"/>
            <circle cx="32" cy="12" r="4" fill="#FFD700"/>
            <circle cx="32" cy="52" r="4" fill="#FFD700"/>
          </svg>
        );
      
      case 'elephant_heels':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <path d="M8 32 L28 32 L28 40 L8 40 L4 56 L8 56 L12 44 L28 44 L28 32" fill="#FF69B4"/>
            <path d="M36 32 L56 32 L60 56 L56 56 L52 44 L36 44 L36 40 L56 40 L56 32" fill="#FF69B4"/>
            <rect x="4" y="52" width="8" height="8" fill="#8B4513"/>
            <rect x="52" y="52" width="8" height="8" fill="#8B4513"/>
            <circle cx="18" cy="36" r="3" fill="#FFD700"/>
            <circle cx="46" cy="36" r="3" fill="#FFD700"/>
          </svg>
        );
      
      case 'elephant_scepter':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <rect x="28" y="20" width="8" height="40" fill="#FFD700"/>
            <circle cx="32" cy="12" r="10" fill="#9370DB" stroke="#FFD700" strokeWidth="2"/>
            <circle cx="32" cy="12" r="5" fill="#FF69B4"/>
            <polygon points="32,0 28,8 36,8" fill="#FFD700"/>
            <rect x="26" y="56" width="12" height="4" fill="#8B4513"/>
          </svg>
        );
      
      case 'elephant_royal_robe':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <path d="M16 8 L48 8 L56 56 L8 56 Z" fill="#8B0000"/>
            <path d="M8 8 L16 8 L12 56 L4 56 Z" fill="#FFFAFA"/>
            <path d="M48 8 L56 8 L60 56 L52 56 Z" fill="#FFFAFA"/>
            <circle cx="32" cy="16" r="6" fill="#FFD700"/>
            <path d="M24 24 L40 24" stroke="#FFD700" strokeWidth="3"/>
            <ellipse cx="10" cy="20" rx="4" ry="6" fill="#D3D3D3"/>
            <ellipse cx="54" cy="20" rx="4" ry="6" fill="#D3D3D3"/>
          </svg>
        );
      
      case 'elephant_diamond_crown':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <polygon points="8,48 14,16 24,28 32,8 40,28 50,16 56,48" fill="#E8E8E8" stroke="#C0C0C0" strokeWidth="2"/>
            <polygon points="32,12 28,24 36,24" fill="#87CEEB"/>
            <polygon points="18,24 14,32 22,32" fill="#87CEEB"/>
            <polygon points="46,24 42,32 50,32" fill="#87CEEB"/>
            <rect x="8" y="48" width="48" height="8" fill="#E8E8E8"/>
            <circle cx="32" cy="52" r="4" fill="#00CED1"/>
          </svg>
        );
      
      case 'elephant_earrings':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <circle cx="16" cy="20" r="4" fill="#FFD700"/>
            <circle cx="48" cy="20" r="4" fill="#FFD700"/>
            <path d="M16 24 L16 36" stroke="#FFD700" strokeWidth="2"/>
            <path d="M48 24 L48 36" stroke="#FFD700" strokeWidth="2"/>
            <circle cx="16" cy="40" r="6" fill="#FFFAFA" stroke="#DDD" strokeWidth="1"/>
            <circle cx="48" cy="40" r="6" fill="#FFFAFA" stroke="#DDD" strokeWidth="1"/>
            <circle cx="16" cy="50" r="4" fill="#FF69B4"/>
            <circle cx="48" cy="50" r="4" fill="#FF69B4"/>
          </svg>
        );
      
      case 'elephant_crystal_shoes':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <path d="M8 32 L28 32 L28 44 L4 44 L4 40 Z" fill="#87CEEB" opacity="0.7"/>
            <path d="M36 32 L56 32 L60 40 L60 44 L36 44 Z" fill="#87CEEB" opacity="0.7"/>
            <path d="M8 32 L28 32 L28 44 L4 44 L4 40 Z" stroke="#E8E8E8" strokeWidth="2" fill="none"/>
            <path d="M36 32 L56 32 L60 40 L60 44 L36 44 Z" stroke="#E8E8E8" strokeWidth="2" fill="none"/>
            <circle cx="18" cy="38" r="3" fill="#FFD700"/>
            <circle cx="48" cy="38" r="3" fill="#FFD700"/>
          </svg>
        );
      
      case 'elephant_magic_mirror':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="28" rx="20" ry="24" fill="#FFD700" stroke="#B8860B" strokeWidth="2"/>
            <ellipse cx="32" cy="28" rx="16" ry="20" fill="#87CEEB"/>
            <ellipse cx="28" cy="24" rx="4" ry="6" fill="#FFFFFF" opacity="0.5"/>
            <rect x="28" y="52" width="8" height="12" fill="#8B4513"/>
            <circle cx="32" cy="8" r="4" fill="#FF69B4"/>
          </svg>
        );
      
      // === PETS ===
      case 'pet_corgi':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="38" rx="20" ry="16" fill="#F4A460"/>
            <ellipse cx="32" cy="42" rx="14" ry="10" fill="#FFDAB9"/>
            <ellipse cx="32" cy="24" rx="14" ry="12" fill="#F4A460"/>
            <ellipse cx="20" cy="14" rx="6" ry="10" fill="#F4A460" transform="rotate(-20 20 14)"/>
            <ellipse cx="44" cy="14" rx="6" ry="10" fill="#F4A460" transform="rotate(20 44 14)"/>
            <ellipse cx="20" cy="15" rx="4" ry="7" fill="#FFE4C4" transform="rotate(-20 20 15)"/>
            <ellipse cx="44" cy="15" rx="4" ry="7" fill="#FFE4C4" transform="rotate(20 44 15)"/>
            <circle cx="26" cy="22" r="3" fill="#1a1a1a"/>
            <circle cx="38" cy="22" r="3" fill="#1a1a1a"/>
            <circle cx="27" cy="21" r="1" fill="white"/>
            <circle cx="39" cy="21" r="1" fill="white"/>
            <ellipse cx="32" cy="28" rx="4" ry="3" fill="#1a1a1a"/>
            <path d="M28 32 Q32 36 36 32" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
            <ellipse cx="18" cy="50" rx="5" ry="4" fill="#F4A460"/>
            <ellipse cx="46" cy="50" rx="5" ry="4" fill="#F4A460"/>
            <ellipse cx="26" cy="52" rx="4" ry="3" fill="#F4A460"/>
            <ellipse cx="38" cy="52" rx="4" ry="3" fill="#F4A460"/>
          </svg>
        );
      
      case 'pet_munchkin':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="40" rx="16" ry="14" fill="#808080"/>
            <ellipse cx="32" cy="44" rx="10" ry="8" fill="#D3D3D3"/>
            <ellipse cx="32" cy="24" rx="14" ry="12" fill="#808080"/>
            <polygon points="18,12 22,24 14,24" fill="#808080"/>
            <polygon points="46,12 50,24 42,24" fill="#808080"/>
            <polygon points="19,14 21,22 17,22" fill="#FFB6C1"/>
            <polygon points="45,14 47,22 43,22" fill="#FFB6C1"/>
            <ellipse cx="26" cy="22" rx="5" ry="6" fill="#90EE90"/>
            <ellipse cx="38" cy="22" rx="5" ry="6" fill="#90EE90"/>
            <ellipse cx="27" cy="23" rx="2" ry="3" fill="#1a1a1a"/>
            <ellipse cx="37" cy="23" rx="2" ry="3" fill="#1a1a1a"/>
            <ellipse cx="32" cy="28" rx="3" ry="2" fill="#FFB6C1"/>
            <path d="M29 31 L32 33 L35 31" stroke="#1a1a1a" strokeWidth="1" fill="none"/>
            <path d="M24 28 L18 26" stroke="#808080" strokeWidth="1"/>
            <path d="M24 30 L18 30" stroke="#808080" strokeWidth="1"/>
            <path d="M40 28 L46 26" stroke="#808080" strokeWidth="1"/>
            <path d="M40 30 L46 30" stroke="#808080" strokeWidth="1"/>
            <ellipse cx="22" cy="52" rx="4" ry="3" fill="#808080"/>
            <ellipse cx="42" cy="52" rx="4" ry="3" fill="#808080"/>
            <path d="M48 36 Q56 32 54 40 Q52 48 48 44" fill="#808080"/>
          </svg>
        );
      
      case 'pet_trex':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="38" rx="14" ry="16" fill="#228B22"/>
            <ellipse cx="32" cy="42" rx="8" ry="10" fill="#90EE90"/>
            <ellipse cx="38" cy="28" rx="12" ry="10" fill="#228B22"/>
            <ellipse cx="42" cy="26" rx="8" ry="6" fill="#228B22"/>
            <circle cx="46" cy="24" r="3" fill="white"/>
            <circle cx="47" cy="24" r="2" fill="#1a1a1a"/>
            <path d="M50 28 L56 30 L50 32 L56 34 L50 36" fill="#228B22"/>
            <polygon points="36,18 38,14 40,18 42,14 44,18" fill="#228B22"/>
            <ellipse cx="18" cy="34" rx="4" ry="6" fill="#228B22"/>
            <ellipse cx="26" cy="52" rx="5" ry="4" fill="#228B22"/>
            <ellipse cx="38" cy="52" rx="5" ry="4" fill="#228B22"/>
            <path d="M44 44 Q52 42 50 50 Q48 56 44 52" fill="#228B22"/>
          </svg>
        );
      
      case 'pet_hamster':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="38" rx="18" ry="16" fill="#D2691E"/>
            <ellipse cx="32" cy="42" rx="12" ry="10" fill="#FFDAB9"/>
            <ellipse cx="32" cy="28" rx="16" ry="14" fill="#D2691E"/>
            <ellipse cx="32" cy="32" rx="10" ry="8" fill="#FFDAB9"/>
            <circle cx="18" cy="18" r="6" fill="#D2691E"/>
            <circle cx="46" cy="18" r="6" fill="#D2691E"/>
            <circle cx="18" cy="18" r="3" fill="#FFB6C1"/>
            <circle cx="46" cy="18" r="3" fill="#FFB6C1"/>
            <circle cx="26" cy="26" r="3" fill="#1a1a1a"/>
            <circle cx="38" cy="26" r="3" fill="#1a1a1a"/>
            <circle cx="27" cy="25" r="1" fill="white"/>
            <circle cx="39" cy="25" r="1" fill="white"/>
            <ellipse cx="32" cy="32" rx="3" ry="2" fill="#FFB6C1"/>
            <circle cx="22" cy="32" r="5" fill="#FFB6C1" opacity="0.5"/>
            <circle cx="42" cy="32" r="5" fill="#FFB6C1" opacity="0.5"/>
            <ellipse cx="24" cy="52" rx="4" ry="3" fill="#D2691E"/>
            <ellipse cx="40" cy="52" rx="4" ry="3" fill="#D2691E"/>
          </svg>
        );
      
      case 'pet_rabbit':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="42" rx="14" ry="12" fill="#FFFFFF" stroke="#E8E8E8" strokeWidth="1"/>
            <ellipse cx="32" cy="46" rx="8" ry="6" fill="#FFF5EE"/>
            <ellipse cx="32" cy="28" rx="12" ry="10" fill="#FFFFFF" stroke="#E8E8E8" strokeWidth="1"/>
            <ellipse cx="24" cy="10" rx="5" ry="14" fill="#FFFFFF" stroke="#E8E8E8" strokeWidth="1"/>
            <ellipse cx="40" cy="10" rx="5" ry="14" fill="#FFFFFF" stroke="#E8E8E8" strokeWidth="1"/>
            <ellipse cx="24" cy="10" rx="3" ry="10" fill="#FFB6C1"/>
            <ellipse cx="40" cy="10" rx="3" ry="10" fill="#FFB6C1"/>
            <circle cx="26" cy="26" r="3" fill="#FF69B4"/>
            <circle cx="38" cy="26" r="3" fill="#FF69B4"/>
            <circle cx="27" cy="25" r="1.5" fill="white"/>
            <circle cx="39" cy="25" r="1.5" fill="white"/>
            <ellipse cx="32" cy="32" rx="3" ry="2" fill="#FFB6C1"/>
            <path d="M28 35 Q32 38 36 35" stroke="#1a1a1a" strokeWidth="1" fill="none"/>
            <ellipse cx="24" cy="52" rx="5" ry="4" fill="#FFFFFF" stroke="#E8E8E8" strokeWidth="1"/>
            <ellipse cx="40" cy="52" rx="5" ry="4" fill="#FFFFFF" stroke="#E8E8E8" strokeWidth="1"/>
            <circle cx="46" cy="44" r="4" fill="#FFFFFF" stroke="#E8E8E8" strokeWidth="1"/>
          </svg>
        );
      
      case 'pet_fox':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="40" rx="14" ry="12" fill="#FF6600"/>
            <ellipse cx="32" cy="44" rx="8" ry="6" fill="#FFFFFF"/>
            <ellipse cx="32" cy="26" rx="12" ry="10" fill="#FF6600"/>
            <polygon points="18,20 24,28 12,28" fill="#FF6600"/>
            <polygon points="46,20 52,28 40,28" fill="#FF6600"/>
            <polygon points="19,22 23,27 15,27" fill="#1a1a1a"/>
            <polygon points="45,22 49,27 41,27" fill="#1a1a1a"/>
            <ellipse cx="26" cy="24" rx="3" ry="4" fill="#FFD700"/>
            <ellipse cx="38" cy="24" rx="3" ry="4" fill="#FFD700"/>
            <ellipse cx="27" cy="25" rx="1.5" ry="2" fill="#1a1a1a"/>
            <ellipse cx="37" cy="25" rx="1.5" ry="2" fill="#1a1a1a"/>
            <ellipse cx="32" cy="30" rx="3" ry="2" fill="#1a1a1a"/>
            <ellipse cx="32" cy="34" rx="4" ry="2" fill="#FFFFFF"/>
            <ellipse cx="24" cy="52" rx="4" ry="3" fill="#1a1a1a"/>
            <ellipse cx="40" cy="52" rx="4" ry="3" fill="#1a1a1a"/>
            <path d="M46 38 Q58 34 56 46 Q54 54 48 50" fill="#FF6600"/>
            <path d="M52 48 Q54 52 50 52" fill="#FFFFFF"/>
          </svg>
        );
      
      case 'pet_owl':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="38" rx="16" ry="18" fill="#8B4513"/>
            <ellipse cx="32" cy="44" rx="10" ry="10" fill="#DEB887"/>
            <path d="M32 44 L28 52 L32 50 L36 52 Z" fill="#DEB887"/>
            <ellipse cx="32" cy="28" rx="14" ry="12" fill="#8B4513"/>
            <polygon points="20,18 26,26 14,26" fill="#8B4513"/>
            <polygon points="44,18 50,26 38,26" fill="#8B4513"/>
            <circle cx="24" cy="26" r="8" fill="#DEB887"/>
            <circle cx="40" cy="26" r="8" fill="#DEB887"/>
            <circle cx="24" cy="26" r="5" fill="#FFD700"/>
            <circle cx="40" cy="26" r="5" fill="#FFD700"/>
            <circle cx="24" cy="26" r="3" fill="#1a1a1a"/>
            <circle cx="40" cy="26" r="3" fill="#1a1a1a"/>
            <polygon points="32,32 28,36 36,36" fill="#FF6600"/>
            <path d="M18 38 Q12 44 16 52 Q18 56 22 54" fill="#8B4513"/>
            <path d="M46 38 Q52 44 48 52 Q46 56 42 54" fill="#8B4513"/>
          </svg>
        );
      
      case 'pet_dragon':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="40" rx="14" ry="14" fill="#9400D3"/>
            <ellipse cx="32" cy="44" rx="8" ry="8" fill="#DDA0DD"/>
            <ellipse cx="32" cy="26" rx="12" ry="10" fill="#9400D3"/>
            <polygon points="26,16 28,10 30,16" fill="#9400D3"/>
            <polygon points="34,16 36,10 38,16" fill="#9400D3"/>
            <polygon points="30,14 32,6 34,14" fill="#FF69B4"/>
            <circle cx="26" cy="24" r="4" fill="#FFD700"/>
            <circle cx="38" cy="24" r="4" fill="#FFD700"/>
            <ellipse cx="27" cy="25" rx="1.5" ry="2" fill="#1a1a1a"/>
            <ellipse cx="37" cy="25" rx="1.5" ry="2" fill="#1a1a1a"/>
            <ellipse cx="32" cy="30" rx="2" ry="1.5" fill="#1a1a1a"/>
            <path d="M30 34 L28 38 M32 34 L32 38 M34 34 L36 38" stroke="#FF6600" strokeWidth="2"/>
            <path d="M18 32 Q8 28 12 40 Q14 48 20 44" fill="#9400D3"/>
            <path d="M46 32 Q56 28 52 40 Q50 48 44 44" fill="#9400D3"/>
            <path d="M44 38 Q58 34 54 50 Q50 60 44 54" fill="#9400D3"/>
            <polygon points="54,48 58,52 54,56 52,52" fill="#9400D3"/>
          </svg>
        );
      
      case 'pet_unicorn':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="40" rx="14" ry="14" fill="#FFFFFF" stroke="#E8E8E8" strokeWidth="1"/>
            <ellipse cx="32" cy="26" rx="12" ry="10" fill="#FFFFFF" stroke="#E8E8E8" strokeWidth="1"/>
            <polygon points="32,2 28,18 36,18" fill="url(#unicornHorn)"/>
            <defs>
              <linearGradient id="unicornHorn" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700"/>
                <stop offset="50%" stopColor="#FF69B4"/>
                <stop offset="100%" stopColor="#87CEEB"/>
              </linearGradient>
            </defs>
            <ellipse cx="20" cy="16" rx="4" ry="8" fill="#FFFFFF" stroke="#E8E8E8" strokeWidth="1"/>
            <ellipse cx="44" cy="16" rx="4" ry="8" fill="#FFFFFF" stroke="#E8E8E8" strokeWidth="1"/>
            <ellipse cx="20" cy="16" rx="2" ry="5" fill="#FFB6C1"/>
            <ellipse cx="44" cy="16" rx="2" ry="5" fill="#FFB6C1"/>
            <circle cx="26" cy="24" r="3" fill="#FF69B4"/>
            <circle cx="38" cy="24" r="3" fill="#FF69B4"/>
            <circle cx="27" cy="23" r="1.5" fill="white"/>
            <circle cx="39" cy="23" r="1.5" fill="white"/>
            <ellipse cx="32" cy="30" rx="2" ry="1.5" fill="#FFB6C1"/>
            <path d="M44 24 Q56 20 58 32 Q60 44 52 48 Q48 50 46 46" fill="#FFB6C1"/>
            <path d="M50 30 Q54 28 56 34" stroke="#FF69B4" strokeWidth="2" fill="none"/>
            <path d="M48 36 Q52 36 54 40" stroke="#87CEEB" strokeWidth="2" fill="none"/>
            <ellipse cx="24" cy="54" rx="4" ry="3" fill="#FFFFFF" stroke="#E8E8E8" strokeWidth="1"/>
            <ellipse cx="40" cy="54" rx="4" ry="3" fill="#FFFFFF" stroke="#E8E8E8" strokeWidth="1"/>
          </svg>
        );
      
      case 'pet_phoenix':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="38" rx="12" ry="14" fill="#FF4500"/>
            <ellipse cx="32" cy="42" rx="8" ry="8" fill="#FFD700"/>
            <ellipse cx="32" cy="24" rx="10" ry="10" fill="#FF4500"/>
            <polygon points="24,12 26,4 28,14" fill="#FF0000"/>
            <polygon points="30,10 32,0 34,10" fill="#FFD700"/>
            <polygon points="36,12 38,4 40,14" fill="#FF0000"/>
            <circle cx="26" cy="22" r="3" fill="#FFD700"/>
            <circle cx="38" cy="22" r="3" fill="#FFD700"/>
            <circle cx="27" cy="21" r="1.5" fill="#1a1a1a"/>
            <circle cx="37" cy="21" r="1.5" fill="#1a1a1a"/>
            <polygon points="32,28 28,32 36,32" fill="#FF6600"/>
            <path d="M18 34 Q6 30 10 44 Q12 56 22 50" fill="#FF4500"/>
            <path d="M46 34 Q58 30 54 44 Q52 56 42 50" fill="#FF4500"/>
            <path d="M12 42 L6 48 M10 46 L4 50" stroke="#FFD700" strokeWidth="2"/>
            <path d="M52 42 L58 48 M54 46 L60 50" stroke="#FFD700" strokeWidth="2"/>
            <path d="M38 46 Q48 44 52 54 Q54 62 46 58 Q40 56 42 50" fill="#FF4500"/>
            <path d="M48 54 L54 58 M50 56 L54 62" stroke="#FFD700" strokeWidth="2"/>
          </svg>
        );
      
      // === NEW PANDA HATS ===
      case 'panda_hat_samurai':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="44" rx="26" ry="10" fill="#2F2F2F"/>
            <ellipse cx="32" cy="36" rx="20" ry="14" fill="#8B0000"/>
            <rect x="8" y="36" width="48" height="6" fill="#FFD700"/>
            <polygon points="32,8 24,32 40,32" fill="#8B0000" stroke="#FFD700" strokeWidth="2"/>
            <circle cx="32" cy="24" r="4" fill="#FFD700"/>
          </svg>
        );
      
      case 'panda_hat_pirate':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="44" rx="26" ry="10" fill="#1A1A1A"/>
            <ellipse cx="32" cy="32" rx="18" ry="16" fill="#1A1A1A"/>
            <rect x="12" y="38" width="40" height="4" fill="#FFD700"/>
            <circle cx="32" cy="28" r="8" fill="#FFFFFF"/>
            <path d="M26 28 L32 22 L38 28 L32 34 Z" fill="#1A1A1A"/>
          </svg>
        );
      
      case 'panda_hat_cowboy':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="48" rx="30" ry="10" fill="#8B4513"/>
            <ellipse cx="32" cy="36" rx="18" ry="14" fill="#A0522D"/>
            <rect x="20" y="38" width="24" height="4" fill="#FFD700"/>
            <path d="M16 48 Q32 40 48 48" fill="#8B4513"/>
          </svg>
        );
      
      case 'panda_hat_viking':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="40" rx="22" ry="16" fill="#8B4513"/>
            <path d="M8 40 Q4 24 12 16" stroke="#FFFAFA" strokeWidth="6" fill="none"/>
            <path d="M56 40 Q60 24 52 16" stroke="#FFFAFA" strokeWidth="6" fill="none"/>
            <rect x="12" y="36" width="40" height="8" fill="#FFD700"/>
            <circle cx="20" cy="40" r="3" fill="#87CEEB"/>
            <circle cx="44" cy="40" r="3" fill="#87CEEB"/>
          </svg>
        );
      
      case 'panda_hat_astronaut':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="36" rx="24" ry="24" fill="#E8E8E8"/>
            <ellipse cx="32" cy="36" rx="18" ry="18" fill="#87CEEB" opacity="0.5"/>
            <rect x="16" y="52" width="32" height="8" fill="#FF6B6B"/>
            <circle cx="48" cy="28" r="4" fill="#FFD700"/>
          </svg>
        );
      
      case 'panda_hat_chef':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="48" rx="20" ry="8" fill="#FFFFFF" stroke="#DDD" strokeWidth="1"/>
            <ellipse cx="32" cy="28" rx="18" ry="20" fill="#FFFFFF" stroke="#DDD" strokeWidth="1"/>
            <circle cx="24" cy="20" r="8" fill="#FFFFFF"/>
            <circle cx="40" cy="20" r="8" fill="#FFFFFF"/>
            <circle cx="32" cy="16" r="8" fill="#FFFFFF"/>
          </svg>
        );
      
      case 'panda_hat_wizard':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="52" rx="26" ry="8" fill="#4B0082"/>
            <polygon points="32,4 8,52 56,52" fill="#6A0DAD"/>
            <rect x="8" y="48" width="48" height="6" fill="#FFD700"/>
            <circle cx="24" cy="36" r="3" fill="#FFD700"/>
            <circle cx="36" cy="28" r="3" fill="#FFD700"/>
            <circle cx="28" cy="44" r="2" fill="#87CEEB"/>
          </svg>
        );
      
      case 'panda_hat_party':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <polygon points="32,4 16,52 48,52" fill="#FF69B4"/>
            <circle cx="32" cy="8" r="6" fill="#FFD700"/>
            <circle cx="24" cy="24" r="3" fill="#87CEEB"/>
            <circle cx="40" cy="32" r="3" fill="#90EE90"/>
            <circle cx="28" cy="40" r="3" fill="#FFD700"/>
            <rect x="16" y="48" width="32" height="6" fill="#FF69B4"/>
          </svg>
        );
      
      case 'panda_hat_ninja':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="36" rx="24" ry="20" fill="#1A1A1A"/>
            <rect x="8" y="28" width="48" height="12" fill="#2F2F2F"/>
            <rect x="8" y="32" width="48" height="4" fill="#8B0000"/>
            <path d="M52 28 L60 20 L58 28" fill="#C0C0C0"/>
          </svg>
        );
      
      case 'panda_hat_ice_crown':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <polygon points="8,48 12,20 24,32 32,8 40,32 52,20 56,48" fill="#87CEEB" stroke="#4169E1" strokeWidth="2"/>
            <circle cx="32" cy="16" r="4" fill="#E0FFFF"/>
            <circle cx="18" cy="28" r="3" fill="#E0FFFF"/>
            <circle cx="46" cy="28" r="3" fill="#E0FFFF"/>
            <rect x="8" y="48" width="48" height="6" fill="#4169E1"/>
          </svg>
        );
      
      // === NEW PANDA ARMOR ===
      case 'panda_armor_samurai':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <path d="M16 12 L48 12 L52 52 L12 52 Z" fill="#8B0000"/>
            <path d="M20 16 L44 16 L46 48 L18 48 Z" fill="#1A1A1A"/>
            <rect x="24" y="20" width="16" height="24" fill="#FFD700"/>
            <path d="M28 24 L36 24 L36 40 L28 40 Z" fill="#8B0000"/>
          </svg>
        );
      
      case 'panda_armor_pirate':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <path d="M16 12 L48 12 L48 52 L16 52 Z" fill="#FFFFFF"/>
            <path d="M16 12 L48 12 L48 20 L16 20 Z" fill="#1A1A1A"/>
            <rect x="28" y="24" width="8" height="28" fill="#8B0000"/>
            <path d="M24 36 L40 36" stroke="#FFD700" strokeWidth="3"/>
          </svg>
        );
      
      case 'panda_armor_cowboy':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <path d="M16 16 L48 16 L48 52 L16 52 Z" fill="#8B4513"/>
            <path d="M20 20 L44 20 L44 48 L20 48 Z" fill="#A0522D"/>
            <rect x="16" y="32" width="32" height="4" fill="#FFD700"/>
            <circle cx="32" cy="26" r="4" fill="#FFD700"/>
          </svg>
        );
      
      case 'panda_armor_viking':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <path d="M16 12 L48 12 L52 52 L12 52 Z" fill="#8B4513"/>
            <ellipse cx="32" cy="32" rx="12" ry="16" fill="#C0C0C0"/>
            <rect x="16" y="24" width="32" height="4" fill="#FFD700"/>
            <rect x="16" y="40" width="32" height="4" fill="#FFD700"/>
          </svg>
        );
      
      case 'panda_armor_astronaut':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <path d="M16 12 L48 12 L48 52 L16 52 Z" fill="#E8E8E8"/>
            <ellipse cx="32" cy="32" rx="10" ry="14" fill="#4169E1"/>
            <rect x="20" y="44" width="8" height="8" fill="#FF6B6B"/>
            <rect x="36" y="44" width="8" height="8" fill="#FF6B6B"/>
            <circle cx="32" cy="20" r="4" fill="#FFD700"/>
          </svg>
        );
      
      case 'panda_armor_chef':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <path d="M16 12 L48 12 L48 52 L16 52 Z" fill="#FFFFFF" stroke="#DDD" strokeWidth="1"/>
            <rect x="28" y="12" width="8" height="40" fill="#FFFFFF"/>
            <circle cx="32" cy="20" r="3" fill="#1A1A1A"/>
            <circle cx="32" cy="32" r="3" fill="#1A1A1A"/>
            <circle cx="32" cy="44" r="3" fill="#1A1A1A"/>
          </svg>
        );
      
      case 'panda_armor_wizard':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <path d="M12 12 L52 12 L56 56 L8 56 Z" fill="#6A0DAD"/>
            <path d="M16 16 L48 16 L50 52 L14 52 Z" fill="#4B0082"/>
            <circle cx="32" cy="32" r="8" fill="#FFD700"/>
            <circle cx="32" cy="32" r="4" fill="#9370DB"/>
          </svg>
        );
      
      case 'panda_armor_ninja':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <path d="M16 12 L48 12 L48 52 L16 52 Z" fill="#1A1A1A"/>
            <path d="M20 16 L44 16 L44 48 L20 48 Z" fill="#2F2F2F"/>
            <rect x="28" y="12" width="8" height="40" fill="#8B0000"/>
            <rect x="16" y="28" width="32" height="8" fill="#8B0000"/>
          </svg>
        );
      
      // === NEW PANDA WEAPONS ===
      case 'panda_weapon_katana':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <rect x="30" y="4" width="4" height="40" fill="#C0C0C0"/>
            <polygon points="32,0 28,8 36,8" fill="#E8E8E8"/>
            <rect x="26" y="44" width="12" height="4" fill="#FFD700"/>
            <rect x="28" y="48" width="8" height="12" fill="#1A1A1A"/>
          </svg>
        );
      
      case 'panda_weapon_cutlass':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <path d="M28 4 Q40 20 36 40" stroke="#C0C0C0" strokeWidth="4" fill="none"/>
            <circle cx="32" cy="48" r="8" fill="#FFD700" stroke="#B8860B" strokeWidth="2"/>
            <rect x="28" y="52" width="8" height="8" fill="#8B4513"/>
          </svg>
        );
      
      case 'panda_weapon_revolver':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <rect x="8" y="28" width="28" height="12" rx="2" fill="#2F2F2F"/>
            <rect x="32" y="24" width="20" height="20" rx="4" fill="#8B4513"/>
            <circle cx="42" cy="34" r="6" fill="#C0C0C0"/>
            <rect x="4" y="30" width="8" height="8" fill="#2F2F2F"/>
          </svg>
        );
      
      case 'panda_weapon_axe':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <rect x="30" y="20" width="4" height="40" fill="#8B4513"/>
            <path d="M20 8 Q32 4 32 20 Q20 20 20 8" fill="#C0C0C0"/>
            <path d="M44 8 Q32 4 32 20 Q44 20 44 8" fill="#C0C0C0"/>
            <rect x="28" y="56" width="8" height="4" fill="#654321"/>
          </svg>
        );
      
      case 'panda_weapon_staff':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <rect x="30" y="16" width="4" height="44" fill="#8B4513"/>
            <circle cx="32" cy="10" r="8" fill="#9370DB"/>
            <circle cx="32" cy="10" r="4" fill="#FFD700"/>
            <circle cx="28" cy="6" r="2" fill="#87CEEB"/>
            <circle cx="36" cy="6" r="2" fill="#FF69B4"/>
          </svg>
        );
      
      case 'panda_weapon_shuriken':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <polygon points="32,4 36,28 60,32 36,36 32,60 28,36 4,32 28,28" fill="#C0C0C0" stroke="#808080" strokeWidth="2"/>
            <circle cx="32" cy="32" r="6" fill="#1A1A1A"/>
          </svg>
        );
      
      case 'panda_weapon_bow':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <path d="M16 8 Q8 32 16 56" stroke="#8B4513" strokeWidth="4" fill="none"/>
            <path d="M16 8 L16 56" stroke="#654321" strokeWidth="2"/>
            <rect x="16" y="30" width="40" height="4" fill="#8B4513"/>
            <polygon points="56,32 52,28 52,36" fill="#C0C0C0"/>
          </svg>
        );
      
      // === NEW ELEPHANT HATS ===
      case 'elephant_hat_samurai':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="44" rx="28" ry="12" fill="#2F2F2F"/>
            <ellipse cx="32" cy="34" rx="22" ry="16" fill="#DC143C"/>
            <rect x="8" y="36" width="48" height="6" fill="#FFD700"/>
            <polygon points="32,6 22,30 42,30" fill="#DC143C" stroke="#FFD700" strokeWidth="2"/>
            <circle cx="32" cy="20" r="5" fill="#FFD700"/>
          </svg>
        );
      
      case 'elephant_hat_pirate':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="46" rx="28" ry="12" fill="#1A1A1A"/>
            <ellipse cx="32" cy="32" rx="20" ry="18" fill="#1A1A1A"/>
            <rect x="10" y="40" width="44" height="4" fill="#FFD700"/>
            <circle cx="32" cy="28" r="10" fill="#FFFFFF"/>
            <path d="M24 28 L32 20 L40 28 L32 36 Z" fill="#1A1A1A"/>
          </svg>
        );
      
      case 'elephant_hat_cowboy':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="50" rx="30" ry="10" fill="#D2691E"/>
            <ellipse cx="32" cy="36" rx="20" ry="16" fill="#CD853F"/>
            <rect x="18" y="40" width="28" height="4" fill="#FFD700"/>
            <path d="M14 50 Q32 42 50 50" fill="#D2691E"/>
          </svg>
        );
      
      case 'elephant_hat_viking':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="42" rx="24" ry="18" fill="#A0522D"/>
            <path d="M6 42 Q2 24 10 14" stroke="#FFFAFA" strokeWidth="8" fill="none"/>
            <path d="M58 42 Q62 24 54 14" stroke="#FFFAFA" strokeWidth="8" fill="none"/>
            <rect x="10" y="38" width="44" height="8" fill="#FFD700"/>
            <circle cx="18" cy="42" r="4" fill="#00CED1"/>
            <circle cx="46" cy="42" r="4" fill="#00CED1"/>
          </svg>
        );
      
      case 'elephant_hat_astronaut':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="36" rx="26" ry="26" fill="#E8E8E8"/>
            <ellipse cx="32" cy="36" rx="20" ry="20" fill="#87CEEB" opacity="0.5"/>
            <rect x="14" y="54" width="36" height="8" fill="#FF6B6B"/>
            <circle cx="50" cy="26" r="5" fill="#FFD700"/>
          </svg>
        );
      
      case 'elephant_hat_chef':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="50" rx="22" ry="10" fill="#FFFFFF" stroke="#DDD" strokeWidth="1"/>
            <ellipse cx="32" cy="28" rx="20" ry="22" fill="#FFFFFF" stroke="#DDD" strokeWidth="1"/>
            <circle cx="22" cy="18" r="10" fill="#FFFFFF"/>
            <circle cx="42" cy="18" r="10" fill="#FFFFFF"/>
            <circle cx="32" cy="14" r="10" fill="#FFFFFF"/>
          </svg>
        );
      
      case 'elephant_hat_wizard':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="54" rx="28" ry="8" fill="#4B0082"/>
            <polygon points="32,2 6,54 58,54" fill="#8A2BE2"/>
            <rect x="6" y="50" width="52" height="6" fill="#FFD700"/>
            <circle cx="22" cy="38" r="4" fill="#FFD700"/>
            <circle cx="38" cy="28" r="4" fill="#FFD700"/>
            <circle cx="26" cy="46" r="3" fill="#87CEEB"/>
          </svg>
        );
      
      case 'elephant_hat_party':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <polygon points="32,2 14,54 50,54" fill="#FF1493"/>
            <circle cx="32" cy="6" r="6" fill="#FFD700"/>
            <circle cx="22" cy="22" r="4" fill="#87CEEB"/>
            <circle cx="42" cy="30" r="4" fill="#90EE90"/>
            <circle cx="26" cy="42" r="4" fill="#FFD700"/>
            <rect x="14" y="50" width="36" height="6" fill="#FF1493"/>
          </svg>
        );
      
      case 'elephant_hat_ninja':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="38" rx="26" ry="22" fill="#1A1A1A"/>
            <rect x="6" y="30" width="52" height="14" fill="#2F2F2F"/>
            <rect x="6" y="34" width="52" height="6" fill="#DC143C"/>
            <path d="M54 30 L62 22 L60 30" fill="#C0C0C0"/>
          </svg>
        );
      
      case 'elephant_hat_fire_crown':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <polygon points="8,48 12,20 24,32 32,8 40,32 52,20 56,48" fill="#FF4500" stroke="#8B0000" strokeWidth="2"/>
            <circle cx="32" cy="16" r="4" fill="#FFD700"/>
            <circle cx="18" cy="28" r="3" fill="#FFD700"/>
            <circle cx="46" cy="28" r="3" fill="#FFD700"/>
            <rect x="8" y="48" width="48" height="6" fill="#8B0000"/>
            <path d="M20 16 L22 8" stroke="#FFD700" strokeWidth="2"/>
            <path d="M44 16 L42 8" stroke="#FFD700" strokeWidth="2"/>
          </svg>
        );
      
      // === NEW ELEPHANT ARMOR ===
      case 'elephant_armor_samurai':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <path d="M14 10 L50 10 L54 54 L10 54 Z" fill="#DC143C"/>
            <path d="M18 14 L46 14 L48 50 L16 50 Z" fill="#1A1A1A"/>
            <rect x="22" y="18" width="20" height="28" fill="#FFD700"/>
            <path d="M26 22 L38 22 L38 42 L26 42 Z" fill="#DC143C"/>
          </svg>
        );
      
      case 'elephant_armor_pirate':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <path d="M14 10 L50 10 L50 54 L14 54 Z" fill="#FFFAFA"/>
            <path d="M14 10 L50 10 L50 20 L14 20 Z" fill="#1A1A1A"/>
            <rect x="26" y="24" width="12" height="30" fill="#DC143C"/>
            <path d="M22 38 L42 38" stroke="#FFD700" strokeWidth="4"/>
          </svg>
        );
      
      case 'elephant_armor_cowboy':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <path d="M14 14 L50 14 L50 54 L14 54 Z" fill="#A0522D"/>
            <path d="M18 18 L46 18 L46 50 L18 50 Z" fill="#CD853F"/>
            <rect x="14" y="32" width="36" height="6" fill="#FFD700"/>
            <circle cx="32" cy="24" r="5" fill="#FFD700"/>
          </svg>
        );
      
      case 'elephant_armor_viking':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <path d="M14 10 L50 10 L54 54 L10 54 Z" fill="#A0522D"/>
            <ellipse cx="32" cy="32" rx="14" ry="18" fill="#C0C0C0"/>
            <rect x="14" y="24" width="36" height="6" fill="#FFD700"/>
            <rect x="14" y="42" width="36" height="6" fill="#FFD700"/>
          </svg>
        );
      
      case 'elephant_armor_astronaut':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <path d="M14 10 L50 10 L50 54 L14 54 Z" fill="#E8E8E8"/>
            <ellipse cx="32" cy="32" rx="12" ry="16" fill="#4169E1"/>
            <rect x="18" y="46" width="10" height="8" fill="#FF6B6B"/>
            <rect x="36" y="46" width="10" height="8" fill="#FF6B6B"/>
            <circle cx="32" cy="18" r="5" fill="#FFD700"/>
          </svg>
        );
      
      case 'elephant_armor_chef':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <path d="M14 10 L50 10 L50 54 L14 54 Z" fill="#FFFFFF" stroke="#DDD" strokeWidth="1"/>
            <rect x="26" y="10" width="12" height="44" fill="#FFFFFF"/>
            <circle cx="32" cy="18" r="4" fill="#1A1A1A"/>
            <circle cx="32" cy="32" r="4" fill="#1A1A1A"/>
            <circle cx="32" cy="46" r="4" fill="#1A1A1A"/>
          </svg>
        );
      
      case 'elephant_armor_wizard':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <path d="M10 10 L54 10 L58 58 L6 58 Z" fill="#8A2BE2"/>
            <path d="M14 14 L50 14 L52 54 L12 54 Z" fill="#4B0082"/>
            <circle cx="32" cy="32" r="10" fill="#FFD700"/>
            <circle cx="32" cy="32" r="5" fill="#9370DB"/>
          </svg>
        );
      
      case 'elephant_armor_ninja':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <path d="M14 10 L50 10 L50 54 L14 54 Z" fill="#1A1A1A"/>
            <path d="M18 14 L46 14 L46 50 L18 50 Z" fill="#2F2F2F"/>
            <rect x="26" y="10" width="12" height="44" fill="#DC143C"/>
            <rect x="14" y="28" width="36" height="8" fill="#DC143C"/>
          </svg>
        );
      
      // === NEW ELEPHANT WEAPONS ===
      case 'elephant_weapon_katana':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <rect x="29" y="2" width="6" height="44" fill="#C0C0C0"/>
            <polygon points="32,0 26,10 38,10" fill="#E8E8E8"/>
            <rect x="24" y="46" width="16" height="6" fill="#FFD700"/>
            <rect x="27" y="52" width="10" height="10" fill="#1A1A1A"/>
          </svg>
        );
      
      case 'elephant_weapon_cutlass':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <path d="M26 2 Q42 20 38 42" stroke="#C0C0C0" strokeWidth="6" fill="none"/>
            <circle cx="32" cy="50" r="10" fill="#FFD700" stroke="#B8860B" strokeWidth="2"/>
            <rect x="27" y="54" width="10" height="8" fill="#A0522D"/>
          </svg>
        );
      
      case 'elephant_weapon_revolver':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <rect x="6" y="26" width="32" height="14" rx="2" fill="#2F2F2F"/>
            <rect x="34" y="22" width="24" height="22" rx="4" fill="#A0522D"/>
            <circle cx="46" cy="33" r="8" fill="#C0C0C0"/>
            <rect x="2" y="29" width="8" height="8" fill="#2F2F2F"/>
          </svg>
        );
      
      case 'elephant_weapon_axe':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <rect x="29" y="18" width="6" height="44" fill="#A0522D"/>
            <path d="M18 6 Q32 2 32 20 Q18 20 18 6" fill="#C0C0C0"/>
            <path d="M46 6 Q32 2 32 20 Q46 20 46 6" fill="#C0C0C0"/>
            <rect x="26" y="58" width="12" height="4" fill="#654321"/>
          </svg>
        );
      
      case 'elephant_weapon_staff':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <rect x="29" y="14" width="6" height="48" fill="#A0522D"/>
            <circle cx="32" cy="8" r="10" fill="#FF69B4"/>
            <circle cx="32" cy="8" r="5" fill="#FFD700"/>
            <circle cx="26" cy="4" r="3" fill="#87CEEB"/>
            <circle cx="38" cy="4" r="3" fill="#9370DB"/>
          </svg>
        );
      
      case 'elephant_weapon_shuriken':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <polygon points="32,2 38,28 62,32 38,38 32,62 26,38 2,32 26,28" fill="#C0C0C0" stroke="#808080" strokeWidth="2"/>
            <circle cx="32" cy="32" r="8" fill="#1A1A1A"/>
          </svg>
        );
      
      case 'elephant_weapon_bow':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <path d="M14 6 Q4 32 14 58" stroke="#A0522D" strokeWidth="6" fill="none"/>
            <path d="M14 6 L14 58" stroke="#654321" strokeWidth="2"/>
            <rect x="14" y="29" width="44" height="6" fill="#A0522D"/>
            <polygon points="58,32 52,26 52,38" fill="#C0C0C0"/>
          </svg>
        );
      
      // === NEW PETS ===
      case 'pet_red_panda':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="40" rx="18" ry="14" fill="#B22222"/>
            <ellipse cx="32" cy="44" rx="12" ry="8" fill="#FF6347"/>
            <ellipse cx="32" cy="26" rx="14" ry="12" fill="#B22222"/>
            <circle cx="20" cy="16" r="6" fill="#B22222"/>
            <circle cx="44" cy="16" r="6" fill="#B22222"/>
            <circle cx="20" cy="16" r="3" fill="#FFFAFA"/>
            <circle cx="44" cy="16" r="3" fill="#FFFAFA"/>
            <ellipse cx="26" cy="24" rx="4" ry="5" fill="#FFFAFA"/>
            <ellipse cx="38" cy="24" rx="4" ry="5" fill="#FFFAFA"/>
            <circle cx="26" cy="24" r="2" fill="#1a1a1a"/>
            <circle cx="38" cy="24" r="2" fill="#1a1a1a"/>
            <ellipse cx="32" cy="30" rx="3" ry="2" fill="#1a1a1a"/>
            <path d="M48 38 Q60 34 58 48 Q56 58 48 52" fill="#B22222"/>
            <path d="M52 42 L58 42" stroke="#FF6347" strokeWidth="2"/>
            <path d="M54 46 L60 46" stroke="#FF6347" strokeWidth="2"/>
          </svg>
        );
      
      case 'pet_wolf':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="42" rx="16" ry="14" fill="#DCDCDC"/>
            <ellipse cx="32" cy="46" rx="10" ry="8" fill="#FFFAFA"/>
            <ellipse cx="32" cy="28" rx="14" ry="12" fill="#DCDCDC"/>
            <polygon points="18,16 24,28 12,28" fill="#DCDCDC"/>
            <polygon points="46,16 52,28 40,28" fill="#DCDCDC"/>
            <polygon points="19,18 23,26 15,26" fill="#FFB6C1"/>
            <polygon points="45,18 49,26 41,26" fill="#FFB6C1"/>
            <ellipse cx="26" cy="26" rx="3" ry="4" fill="#87CEEB"/>
            <ellipse cx="38" cy="26" rx="3" ry="4" fill="#87CEEB"/>
            <ellipse cx="26" cy="26" rx="1.5" ry="2" fill="#1a1a1a"/>
            <ellipse cx="38" cy="26" rx="1.5" ry="2" fill="#1a1a1a"/>
            <ellipse cx="32" cy="32" rx="4" ry="3" fill="#1a1a1a"/>
            <path d="M48 40 Q58 36 56 50 Q54 58 48 54" fill="#DCDCDC"/>
          </svg>
        );
      
      case 'pet_tiger':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="42" rx="18" ry="14" fill="#FF8C00"/>
            <ellipse cx="32" cy="46" rx="12" ry="8" fill="#FFFAFA"/>
            <ellipse cx="32" cy="28" rx="16" ry="14" fill="#FF8C00"/>
            <polygon points="16,16 22,30 10,30" fill="#FF8C00"/>
            <polygon points="48,16 54,30 42,30" fill="#FF8C00"/>
            <polygon points="17,18 21,28 13,28" fill="#FFFAFA"/>
            <polygon points="47,18 51,28 43,28" fill="#FFFAFA"/>
            <path d="M24 18 L28 28" stroke="#1a1a1a" strokeWidth="2"/>
            <path d="M36 28 L40 18" stroke="#1a1a1a" strokeWidth="2"/>
            <path d="M32 16 L32 22" stroke="#1a1a1a" strokeWidth="2"/>
            <circle cx="24" cy="26" r="3" fill="#1a1a1a"/>
            <circle cx="40" cy="26" r="3" fill="#1a1a1a"/>
            <ellipse cx="32" cy="32" rx="4" ry="3" fill="#FFB6C1"/>
            <path d="M48 40 Q58 36 56 50 Q54 58 48 54" fill="#FF8C00"/>
          </svg>
        );
      
      case 'pet_lion':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="32" rx="28" ry="24" fill="#DAA520"/>
            <ellipse cx="32" cy="42" rx="16" ry="14" fill="#F4A460"/>
            <ellipse cx="32" cy="46" rx="10" ry="8" fill="#FFFAF0"/>
            <ellipse cx="32" cy="32" rx="14" ry="12" fill="#F4A460"/>
            <circle cx="24" cy="14" r="4" fill="#DAA520"/>
            <circle cx="40" cy="14" r="4" fill="#DAA520"/>
            <circle cx="24" cy="30" r="3" fill="#1a1a1a"/>
            <circle cx="40" cy="30" r="3" fill="#1a1a1a"/>
            <ellipse cx="32" cy="36" rx="4" ry="3" fill="#1a1a1a"/>
            <path d="M28 40 Q32 44 36 40" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
          </svg>
        );
      
      case 'pet_polar_bear':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="42" rx="20" ry="16" fill="#FFFAFA" stroke="#E8E8E8" strokeWidth="1"/>
            <ellipse cx="32" cy="28" rx="16" ry="14" fill="#FFFAFA" stroke="#E8E8E8" strokeWidth="1"/>
            <circle cx="20" cy="16" r="6" fill="#FFFAFA" stroke="#E8E8E8" strokeWidth="1"/>
            <circle cx="44" cy="16" r="6" fill="#FFFAFA" stroke="#E8E8E8" strokeWidth="1"/>
            <circle cx="24" cy="26" r="3" fill="#1a1a1a"/>
            <circle cx="40" cy="26" r="3" fill="#1a1a1a"/>
            <ellipse cx="32" cy="32" rx="5" ry="4" fill="#1a1a1a"/>
            <path d="M28 38 Q32 42 36 38" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
          </svg>
        );
      
      case 'pet_dolphin':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="36" rx="24" ry="14" fill="#4682B4"/>
            <ellipse cx="32" cy="40" rx="20" ry="8" fill="#87CEEB"/>
            <ellipse cx="50" cy="36" rx="8" ry="6" fill="#4682B4"/>
            <path d="M58 30 L62 24 L58 36" fill="#4682B4"/>
            <path d="M28 24 Q32 16 36 24" fill="#4682B4"/>
            <path d="M12 36 Q4 32 8 44 L16 40" fill="#4682B4"/>
            <circle cx="52" cy="34" r="2" fill="#1a1a1a"/>
            <path d="M56 38 L60 40" stroke="#4682B4" strokeWidth="2"/>
          </svg>
        );
      
      case 'pet_turtle':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="38" rx="20" ry="16" fill="#228B22"/>
            <ellipse cx="32" cy="38" rx="16" ry="12" fill="#32CD32"/>
            <path d="M28 30 L24 26 L32 26 L40 26 L36 30" fill="#228B22"/>
            <ellipse cx="32" cy="24" rx="8" ry="6" fill="#90EE90"/>
            <circle cx="28" cy="22" r="2" fill="#1a1a1a"/>
            <circle cx="36" cy="22" r="2" fill="#1a1a1a"/>
            <ellipse cx="18" cy="44" rx="4" ry="3" fill="#90EE90"/>
            <ellipse cx="46" cy="44" rx="4" ry="3" fill="#90EE90"/>
            <ellipse cx="20" cy="52" rx="3" ry="2" fill="#90EE90"/>
            <ellipse cx="44" cy="52" rx="3" ry="2" fill="#90EE90"/>
            <path d="M32 54 L32 58" stroke="#90EE90" strokeWidth="4"/>
          </svg>
        );
      
      case 'pet_penguin':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="40" rx="16" ry="18" fill="#1a1a1a"/>
            <ellipse cx="32" cy="44" rx="10" ry="12" fill="#FFFAFA"/>
            <ellipse cx="32" cy="22" rx="12" ry="10" fill="#1a1a1a"/>
            <circle cx="26" cy="20" r="3" fill="#FFFAFA"/>
            <circle cx="38" cy="20" r="3" fill="#FFFAFA"/>
            <circle cx="26" cy="20" r="1.5" fill="#1a1a1a"/>
            <circle cx="38" cy="20" r="1.5" fill="#1a1a1a"/>
            <polygon points="32,24 28,30 36,30" fill="#FF6600"/>
            <path d="M16 36 Q8 44 14 54" fill="#1a1a1a"/>
            <path d="M48 36 Q56 44 50 54" fill="#1a1a1a"/>
            <ellipse cx="26" cy="58" rx="4" ry="2" fill="#FF6600"/>
            <ellipse cx="38" cy="58" rx="4" ry="2" fill="#FF6600"/>
          </svg>
        );
      
      case 'pet_koala':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <circle cx="16" cy="24" r="10" fill="#808080"/>
            <circle cx="48" cy="24" r="10" fill="#808080"/>
            <circle cx="16" cy="24" r="6" fill="#FFB6C1"/>
            <circle cx="48" cy="24" r="6" fill="#FFB6C1"/>
            <ellipse cx="32" cy="36" rx="18" ry="18" fill="#808080"/>
            <ellipse cx="32" cy="40" rx="12" ry="12" fill="#D3D3D3"/>
            <ellipse cx="32" cy="42" rx="6" ry="4" fill="#1a1a1a"/>
            <circle cx="24" cy="32" r="3" fill="#1a1a1a"/>
            <circle cx="40" cy="32" r="3" fill="#1a1a1a"/>
          </svg>
        );
      
      case 'pet_kangaroo':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="42" rx="14" ry="16" fill="#D2691E"/>
            <ellipse cx="32" cy="46" rx="8" ry="10" fill="#DEB887"/>
            <ellipse cx="32" cy="24" rx="10" ry="10" fill="#D2691E"/>
            <ellipse cx="20" cy="12" rx="4" ry="8" fill="#D2691E"/>
            <ellipse cx="44" cy="12" rx="4" ry="8" fill="#D2691E"/>
            <ellipse cx="20" cy="12" rx="2" ry="5" fill="#FFB6C1"/>
            <ellipse cx="44" cy="12" rx="2" ry="5" fill="#FFB6C1"/>
            <circle cx="26" cy="22" r="2" fill="#1a1a1a"/>
            <circle cx="38" cy="22" r="2" fill="#1a1a1a"/>
            <ellipse cx="32" cy="28" rx="3" ry="2" fill="#1a1a1a"/>
            <path d="M46 44 Q58 40 54 56 Q50 62 46 56" fill="#D2691E"/>
          </svg>
        );
      
      case 'pet_eagle':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="38" rx="14" ry="16" fill="#8B4513"/>
            <ellipse cx="32" cy="42" rx="10" ry="10" fill="#DEB887"/>
            <ellipse cx="32" cy="24" rx="12" ry="10" fill="#FFFAFA"/>
            <polygon points="32,28 26,36 38,36" fill="#FFD700"/>
            <circle cx="26" cy="22" r="3" fill="#FFD700"/>
            <circle cx="38" cy="22" r="3" fill="#FFD700"/>
            <circle cx="26" cy="22" r="1.5" fill="#1a1a1a"/>
            <circle cx="38" cy="22" r="1.5" fill="#1a1a1a"/>
            <path d="M18 34 Q8 40 12 52 Q14 58 20 54" fill="#8B4513"/>
            <path d="M46 34 Q56 40 52 52 Q50 58 44 54" fill="#8B4513"/>
          </svg>
        );
      
      case 'pet_flamingo':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="32" rx="12" ry="16" fill="#FF69B4"/>
            <path d="M32 16 Q24 8 28 4 Q32 2 34 6 Q36 10 32 16" fill="#FF69B4"/>
            <ellipse cx="32" cy="8" rx="6" ry="4" fill="#FF1493"/>
            <circle cx="30" cy="6" r="2" fill="#1a1a1a"/>
            <polygon points="32,10 28,14 36,14" fill="#1a1a1a"/>
            <path d="M28 48 L26 60" stroke="#FF69B4" strokeWidth="3"/>
            <path d="M36 48 L38 60" stroke="#FF69B4" strokeWidth="3"/>
            <ellipse cx="26" cy="62" rx="3" ry="2" fill="#1a1a1a"/>
            <ellipse cx="38" cy="62" rx="3" ry="2" fill="#1a1a1a"/>
          </svg>
        );
      
      case 'pet_parrot':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="38" rx="12" ry="16" fill="#32CD32"/>
            <ellipse cx="32" cy="42" rx="8" ry="10" fill="#90EE90"/>
            <ellipse cx="32" cy="22" rx="10" ry="10" fill="#32CD32"/>
            <polygon points="20,12 28,22 16,22" fill="#FF0000"/>
            <polygon points="44,12 48,22 36,22" fill="#FF0000"/>
            <polygon points="32,26 26,34 38,34" fill="#FFD700"/>
            <circle cx="26" cy="20" r="3" fill="#FFFAFA"/>
            <circle cx="38" cy="20" r="3" fill="#FFFAFA"/>
            <circle cx="26" cy="20" r="1.5" fill="#1a1a1a"/>
            <circle cx="38" cy="20" r="1.5" fill="#1a1a1a"/>
            <path d="M32 54 Q28 62 24 58 Q22 54 26 52" fill="#FF0000"/>
            <path d="M32 54 Q36 62 40 58 Q42 54 38 52" fill="#00BFFF"/>
          </svg>
        );
      
      case 'pet_goldfish':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="32" rx="20" ry="14" fill="#FF6600"/>
            <ellipse cx="32" cy="32" rx="14" ry="10" fill="#FFD700"/>
            <path d="M52 32 Q62 24 58 32 Q62 40 52 32" fill="#FF6600"/>
            <path d="M28 20 Q32 12 36 20" fill="#FF6600"/>
            <circle cx="22" cy="30" r="3" fill="#1a1a1a"/>
            <path d="M14 32 Q10 28 12 34 Q10 38 14 34" fill="#FF6600"/>
          </svg>
        );
      
      case 'pet_butterfly':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="32" rx="4" ry="16" fill="#8B4513"/>
            <ellipse cx="20" cy="24" rx="12" ry="10" fill="#FF69B4"/>
            <ellipse cx="44" cy="24" rx="12" ry="10" fill="#87CEEB"/>
            <ellipse cx="20" cy="40" rx="10" ry="8" fill="#87CEEB"/>
            <ellipse cx="44" cy="40" rx="10" ry="8" fill="#FF69B4"/>
            <circle cx="16" cy="22" r="3" fill="#FFD700"/>
            <circle cx="48" cy="22" r="3" fill="#FFD700"/>
            <circle cx="18" cy="38" r="2" fill="#FFD700"/>
            <circle cx="46" cy="38" r="2" fill="#FFD700"/>
            <path d="M30 16 Q28 8 26 12" stroke="#8B4513" strokeWidth="2"/>
            <path d="M34 16 Q36 8 38 12" stroke="#8B4513" strokeWidth="2"/>
          </svg>
        );
      
      case 'pet_bee':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="36" rx="16" ry="12" fill="#FFD700"/>
            <rect x="24" y="30" width="16" height="4" fill="#1a1a1a"/>
            <rect x="24" y="38" width="16" height="4" fill="#1a1a1a"/>
            <ellipse cx="32" cy="22" rx="10" ry="8" fill="#FFD700"/>
            <circle cx="26" cy="20" r="3" fill="#1a1a1a"/>
            <circle cx="38" cy="20" r="3" fill="#1a1a1a"/>
            <path d="M28 14 Q26 8 24 12" stroke="#1a1a1a" strokeWidth="2"/>
            <path d="M36 14 Q38 8 40 12" stroke="#1a1a1a" strokeWidth="2"/>
            <ellipse cx="18" cy="28" rx="8" ry="4" fill="#E0FFFF" opacity="0.7"/>
            <ellipse cx="46" cy="28" rx="8" ry="4" fill="#E0FFFF" opacity="0.7"/>
            <path d="M32 48 L32 54" stroke="#1a1a1a" strokeWidth="2"/>
          </svg>
        );
      
      case 'pet_beetle':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="38" rx="18" ry="14" fill="#228B22"/>
            <path d="M32 24 L32 52" stroke="#1a1a1a" strokeWidth="2"/>
            <ellipse cx="32" cy="22" rx="10" ry="8" fill="#228B22"/>
            <circle cx="26" cy="20" r="3" fill="#1a1a1a"/>
            <circle cx="38" cy="20" r="3" fill="#1a1a1a"/>
            <path d="M24 14 Q20 8 18 12" stroke="#228B22" strokeWidth="2"/>
            <path d="M40 14 Q44 8 46 12" stroke="#228B22" strokeWidth="2"/>
            <ellipse cx="24" cy="36" rx="6" ry="8" fill="#32CD32"/>
            <ellipse cx="40" cy="36" rx="6" ry="8" fill="#32CD32"/>
          </svg>
        );
      
      case 'pet_octopus':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="24" rx="18" ry="16" fill="#9370DB"/>
            <circle cx="24" cy="22" r="4" fill="#FFFAFA"/>
            <circle cx="40" cy="22" r="4" fill="#FFFAFA"/>
            <circle cx="24" cy="22" r="2" fill="#1a1a1a"/>
            <circle cx="40" cy="22" r="2" fill="#1a1a1a"/>
            <path d="M28 30 Q32 34 36 30" stroke="#FF69B4" strokeWidth="2" fill="none"/>
            <path d="M16 36 Q8 44 12 56" stroke="#9370DB" strokeWidth="4" fill="none"/>
            <path d="M24 38 Q20 48 24 58" stroke="#9370DB" strokeWidth="4" fill="none"/>
            <path d="M32 40 Q32 50 32 60" stroke="#9370DB" strokeWidth="4" fill="none"/>
            <path d="M40 38 Q44 48 40 58" stroke="#9370DB" strokeWidth="4" fill="none"/>
            <path d="M48 36 Q56 44 52 56" stroke="#9370DB" strokeWidth="4" fill="none"/>
          </svg>
        );
      
      case 'pet_jellyfish':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="20" rx="20" ry="16" fill="#FF69B4" opacity="0.7"/>
            <ellipse cx="32" cy="20" rx="14" ry="10" fill="#FFB6C1" opacity="0.5"/>
            <circle cx="26" cy="18" r="3" fill="#FFFAFA"/>
            <circle cx="38" cy="18" r="3" fill="#FFFAFA"/>
            <path d="M16 32 Q12 44 16 56" stroke="#FF69B4" strokeWidth="3" opacity="0.7" fill="none"/>
            <path d="M24 34 Q20 46 24 58" stroke="#FF69B4" strokeWidth="3" opacity="0.7" fill="none"/>
            <path d="M32 36 Q32 48 32 60" stroke="#FF69B4" strokeWidth="3" opacity="0.7" fill="none"/>
            <path d="M40 34 Q44 46 40 58" stroke="#FF69B4" strokeWidth="3" opacity="0.7" fill="none"/>
            <path d="M48 32 Q52 44 48 56" stroke="#FF69B4" strokeWidth="3" opacity="0.7" fill="none"/>
          </svg>
        );
      
      case 'pet_shark':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="36" rx="24" ry="14" fill="#708090"/>
            <ellipse cx="32" cy="40" rx="18" ry="8" fill="#B0C4DE"/>
            <ellipse cx="50" cy="36" rx="8" ry="6" fill="#708090"/>
            <path d="M58 32 L62 28 L58 38" fill="#708090"/>
            <polygon points="32,22 28,36 36,36" fill="#708090"/>
            <path d="M10 36 Q4 32 8 42 L16 38" fill="#708090"/>
            <circle cx="52" cy="34" r="2" fill="#1a1a1a"/>
            <path d="M44 42 L48 46 L52 42 L56 46" fill="#FFFAFA"/>
          </svg>
        );
      
      case 'pet_fire_dragon':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="40" rx="16" ry="14" fill="#FF4500"/>
            <ellipse cx="32" cy="44" rx="10" ry="8" fill="#FFD700"/>
            <ellipse cx="32" cy="26" rx="14" ry="12" fill="#FF4500"/>
            <polygon points="24,14 26,6 28,14" fill="#FF0000"/>
            <polygon points="32,12 34,4 36,12" fill="#FF0000"/>
            <polygon points="40,14 42,6 44,14" fill="#FF0000"/>
            <circle cx="26" cy="24" r="4" fill="#FFD700"/>
            <circle cx="38" cy="24" r="4" fill="#FFD700"/>
            <ellipse cx="26" cy="24" rx="2" ry="3" fill="#1a1a1a"/>
            <ellipse cx="38" cy="24" rx="2" ry="3" fill="#1a1a1a"/>
            <path d="M28 32 L24 40" stroke="#FF0000" strokeWidth="2"/>
            <path d="M36 32 L40 40" stroke="#FF0000" strokeWidth="2"/>
            <path d="M16 32 Q6 28 10 42 Q12 50 18 46" fill="#FF4500"/>
            <path d="M48 32 Q58 28 54 42 Q52 50 46 46" fill="#FF4500"/>
            <path d="M46 40 Q60 36 56 52 Q52 62 46 56" fill="#FF4500"/>
          </svg>
        );
      
      case 'pet_ice_dragon':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="40" rx="16" ry="14" fill="#4682B4"/>
            <ellipse cx="32" cy="44" rx="10" ry="8" fill="#E0FFFF"/>
            <ellipse cx="32" cy="26" rx="14" ry="12" fill="#4682B4"/>
            <polygon points="24,14 26,6 28,14" fill="#87CEEB"/>
            <polygon points="32,12 34,4 36,12" fill="#87CEEB"/>
            <polygon points="40,14 42,6 44,14" fill="#87CEEB"/>
            <circle cx="26" cy="24" r="4" fill="#E0FFFF"/>
            <circle cx="38" cy="24" r="4" fill="#E0FFFF"/>
            <ellipse cx="26" cy="24" rx="2" ry="3" fill="#1a1a1a"/>
            <ellipse cx="38" cy="24" rx="2" ry="3" fill="#1a1a1a"/>
            <path d="M28 32 L24 40" stroke="#87CEEB" strokeWidth="2"/>
            <path d="M36 32 L40 40" stroke="#87CEEB" strokeWidth="2"/>
            <path d="M16 32 Q6 28 10 42 Q12 50 18 46" fill="#4682B4"/>
            <path d="M48 32 Q58 28 54 42 Q52 50 46 46" fill="#4682B4"/>
            <path d="M46 40 Q60 36 56 52 Q52 62 46 56" fill="#4682B4"/>
          </svg>
        );
      
      case 'pet_slime':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="44" rx="24" ry="16" fill="#32CD32" opacity="0.8"/>
            <ellipse cx="32" cy="40" rx="20" ry="14" fill="#90EE90" opacity="0.8"/>
            <circle cx="24" cy="36" r="4" fill="#1a1a1a"/>
            <circle cx="40" cy="36" r="4" fill="#1a1a1a"/>
            <circle cx="25" cy="35" r="1.5" fill="#FFFAFA"/>
            <circle cx="41" cy="35" r="1.5" fill="#FFFAFA"/>
            <path d="M28 46 Q32 50 36 46" stroke="#228B22" strokeWidth="2" fill="none"/>
          </svg>
        );
      
      case 'pet_spider':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="36" rx="12" ry="10" fill="#1a1a1a"/>
            <ellipse cx="32" cy="24" rx="8" ry="8" fill="#1a1a1a"/>
            <circle cx="28" cy="22" r="3" fill="#FF0000"/>
            <circle cx="36" cy="22" r="3" fill="#FF0000"/>
            <path d="M20 30 Q8 24 4 36" stroke="#1a1a1a" strokeWidth="3" fill="none"/>
            <path d="M20 36 Q8 36 4 48" stroke="#1a1a1a" strokeWidth="3" fill="none"/>
            <path d="M20 42 Q8 48 4 56" stroke="#1a1a1a" strokeWidth="3" fill="none"/>
            <path d="M44 30 Q56 24 60 36" stroke="#1a1a1a" strokeWidth="3" fill="none"/>
            <path d="M44 36 Q56 36 60 48" stroke="#1a1a1a" strokeWidth="3" fill="none"/>
            <path d="M44 42 Q56 48 60 56" stroke="#1a1a1a" strokeWidth="3" fill="none"/>
          </svg>
        );
      
      case 'pet_bat':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="36" rx="10" ry="12" fill="#4B0082"/>
            <ellipse cx="32" cy="24" rx="8" ry="8" fill="#4B0082"/>
            <polygon points="14,18 24,36 8,44" fill="#6A0DAD"/>
            <polygon points="50,18 40,36 56,44" fill="#6A0DAD"/>
            <circle cx="28" cy="22" r="3" fill="#FF69B4"/>
            <circle cx="36" cy="22" r="3" fill="#FF69B4"/>
            <circle cx="28" cy="22" r="1.5" fill="#1a1a1a"/>
            <circle cx="36" cy="22" r="1.5" fill="#1a1a1a"/>
            <polygon points="28,14 30,8 32,14" fill="#4B0082"/>
            <polygon points="32,14 34,8 36,14" fill="#4B0082"/>
          </svg>
        );
      
      case 'pet_rainbow_unicorn':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="42" rx="16" ry="14" fill="#FFFAFA" stroke="#E8E8E8" strokeWidth="1"/>
            <ellipse cx="32" cy="28" rx="14" ry="12" fill="#FFFAFA" stroke="#E8E8E8" strokeWidth="1"/>
            <polygon points="32,0 26,20 38,20" fill="url(#rainbowGrad)"/>
            <defs>
              <linearGradient id="rainbowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF0000"/>
                <stop offset="20%" stopColor="#FF7F00"/>
                <stop offset="40%" stopColor="#FFFF00"/>
                <stop offset="60%" stopColor="#00FF00"/>
                <stop offset="80%" stopColor="#0000FF"/>
                <stop offset="100%" stopColor="#8B00FF"/>
              </linearGradient>
            </defs>
            <ellipse cx="18" cy="18" rx="4" ry="8" fill="#FFB6C1"/>
            <ellipse cx="46" cy="18" rx="4" ry="8" fill="#FFB6C1"/>
            <circle cx="26" cy="26" r="3" fill="#FF69B4"/>
            <circle cx="38" cy="26" r="3" fill="#87CEEB"/>
            <ellipse cx="32" cy="32" rx="2" ry="1.5" fill="#FFB6C1"/>
            <path d="M46 26 Q58 22 60 36 Q62 50 52 48" fill="#FF69B4"/>
            <path d="M52 32 Q56 30 58 38" stroke="#FFD700" strokeWidth="2" fill="none"/>
            <path d="M50 40 Q54 40 56 46" stroke="#87CEEB" strokeWidth="2" fill="none"/>
          </svg>
        );
      
      case 'pet_pegasus':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="42" rx="16" ry="12" fill="#FFFAFA" stroke="#E8E8E8" strokeWidth="1"/>
            <ellipse cx="32" cy="30" rx="12" ry="10" fill="#FFFAFA" stroke="#E8E8E8" strokeWidth="1"/>
            <polygon points="18,20 8,8 24,24" fill="#87CEEB"/>
            <polygon points="24,18 16,4 30,20" fill="#87CEEB"/>
            <polygon points="46,20 56,8 40,24" fill="#87CEEB"/>
            <polygon points="40,18 48,4 34,20" fill="#87CEEB"/>
            <ellipse cx="22" cy="22" rx="3" ry="5" fill="#FFFAFA"/>
            <ellipse cx="42" cy="22" rx="3" ry="5" fill="#FFFAFA"/>
            <circle cx="26" cy="28" r="2" fill="#1a1a1a"/>
            <circle cx="38" cy="28" r="2" fill="#1a1a1a"/>
            <ellipse cx="32" cy="34" rx="2" ry="1.5" fill="#FFB6C1"/>
            <path d="M46 40 Q56 36 58 48 Q60 58 52 56" fill="#E0E0E0"/>
          </svg>
        );
      
      case 'pet_griffin':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="42" rx="18" ry="14" fill="#DAA520"/>
            <ellipse cx="32" cy="46" rx="12" ry="8" fill="#F4A460"/>
            <ellipse cx="32" cy="28" rx="14" ry="12" fill="#DAA520"/>
            <polygon points="20,16 26,28 14,28" fill="#8B4513"/>
            <polygon points="44,16 50,28 38,28" fill="#8B4513"/>
            <polygon points="32,24 26,34 38,34" fill="#FF6600"/>
            <circle cx="26" cy="24" r="3" fill="#FFD700"/>
            <circle cx="38" cy="24" r="3" fill="#FFD700"/>
            <circle cx="26" cy="24" r="1.5" fill="#1a1a1a"/>
            <circle cx="38" cy="24" r="1.5" fill="#1a1a1a"/>
            <polygon points="16,28 6,16 20,36" fill="#8B4513"/>
            <polygon points="48,28 58,16 44,36" fill="#8B4513"/>
            <path d="M46 42 Q58 38 56 52 Q54 60 48 56" fill="#DAA520"/>
          </svg>
        );
      
      case 'pet_fairy':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <ellipse cx="32" cy="40" rx="8" ry="12" fill="#FFB6C1"/>
            <ellipse cx="32" cy="24" rx="8" ry="8" fill="#FFDAB9"/>
            <circle cx="28" cy="22" r="2" fill="#1a1a1a"/>
            <circle cx="36" cy="22" r="2" fill="#1a1a1a"/>
            <path d="M30 28 Q32 30 34 28" stroke="#FF69B4" strokeWidth="1" fill="none"/>
            <ellipse cx="20" cy="32" rx="10" ry="6" fill="#87CEEB" opacity="0.6"/>
            <ellipse cx="44" cy="32" rx="10" ry="6" fill="#87CEEB" opacity="0.6"/>
            <ellipse cx="18" cy="40" rx="8" ry="5" fill="#FF69B4" opacity="0.6"/>
            <ellipse cx="46" cy="40" rx="8" ry="5" fill="#FF69B4" opacity="0.6"/>
            <circle cx="32" cy="12" r="4" fill="#FFD700"/>
            <path d="M28 12 L36 12" stroke="#FFD700" strokeWidth="2"/>
            <circle cx="16" cy="28" r="2" fill="#FFD700"/>
            <circle cx="48" cy="28" r="2" fill="#FFD700"/>
          </svg>
        );
      
      case 'pet_robot':
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <rect x="20" y="24" width="24" height="28" rx="4" fill="#C0C0C0"/>
            <rect x="24" y="28" width="16" height="20" fill="#4169E1"/>
            <rect x="16" y="20" width="32" height="20" rx="4" fill="#808080"/>
            <circle cx="26" cy="28" r="4" fill="#00FF00"/>
            <circle cx="38" cy="28" r="4" fill="#00FF00"/>
            <rect x="28" y="36" width="8" height="2" fill="#1a1a1a"/>
            <rect x="30" y="8" width="4" height="12" fill="#808080"/>
            <circle cx="32" cy="6" r="4" fill="#FF0000"/>
            <rect x="12" y="28" width="4" height="16" rx="2" fill="#808080"/>
            <rect x="48" y="28" width="4" height="16" rx="2" fill="#808080"/>
            <rect x="24" y="52" width="6" height="8" fill="#808080"/>
            <rect x="34" y="52" width="6" height="8" fill="#808080"/>
          </svg>
        );
      
      default:
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" className={className}>
            <rect x="8" y="8" width="48" height="48" fill="#E0E0E0" rx="8"/>
            <text x="32" y="40" textAnchor="middle" fill="#666" fontSize="24">?</text>
          </svg>
        );
    }
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      {renderIcon()}
    </div>
  );
};
