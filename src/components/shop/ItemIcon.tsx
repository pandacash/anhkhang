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
