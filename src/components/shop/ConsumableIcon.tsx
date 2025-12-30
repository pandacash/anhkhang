import { cn } from "@/lib/utils";

interface ConsumableIconProps {
  imageKey: string;
  size?: number;
  className?: string;
}

export const ConsumableIcon = ({ imageKey, size = 48, className }: ConsumableIconProps) => {
  const getEmoji = () => {
    switch (imageKey) {
      // Food items
      case 'food_bread': return '🍞';
      case 'food_apple': return '🍎';
      case 'food_banana': return '🍌';
      case 'food_burger': return '🍔';
      case 'food_pizza': return '🍕';
      case 'food_bento': return '🍱';
      case 'food_buffet': return '🍽️';
      case 'food_feast': return '👑🍽️';
      // Drink items
      case 'drink_water': return '💧';
      case 'drink_orange': return '🍊';
      case 'drink_milk': return '🥛';
      case 'drink_boba': return '🧋';
      case 'drink_smoothie': return '🥤';
      case 'drink_coconut': return '🥥';
      case 'drink_cocktail': return '🍹';
      case 'drink_magic': return '✨🧪';
      default: return '🎁';
    }
  };

  return (
    <div 
      className={cn("flex items-center justify-center", className)}
      style={{ fontSize: size * 0.7, width: size, height: size }}
    >
      {getEmoji()}
    </div>
  );
};
