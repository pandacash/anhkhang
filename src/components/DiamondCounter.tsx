import { cn } from "@/lib/utils";
import { DiamondIcon } from "./icons/DiamondIcon";

interface DiamondCounterProps {
  count: number;
  className?: string;
  size?: "sm" | "md" | "lg";
  showPlus?: boolean;
}

export const DiamondCounter = ({ 
  count, 
  className,
  size = "md",
  showPlus = false 
}: DiamondCounterProps) => {
  const sizeClasses = {
    sm: "px-3 py-1 text-sm gap-1",
    md: "px-4 py-2 text-lg gap-2",
    lg: "px-6 py-3 text-2xl gap-3"
  };
  
  const iconSizes = {
    sm: 16,
    md: 24,
    lg: 32
  };
  
  return (
    <div className={cn(
      "inline-flex items-center bg-card rounded-full shadow-diamond border-2 border-diamond/30",
      sizeClasses[size],
      className
    )}>
      <DiamondIcon size={iconSizes[size]} animate />
      <span className="font-bold text-foreground">
        {showPlus && count > 0 && "+"}{count}
      </span>
    </div>
  );
};
