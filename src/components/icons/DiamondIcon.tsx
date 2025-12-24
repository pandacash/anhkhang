import { cn } from "@/lib/utils";

interface DiamondIconProps {
  className?: string;
  size?: number;
  animate?: boolean;
}

export const DiamondIcon = ({ className, size = 24, animate = false }: DiamondIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={cn(animate && "animate-diamond-glow", className)}
    >
      <defs>
        <linearGradient id="diamondGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(195, 100%, 70%)" />
          <stop offset="50%" stopColor="hsl(195, 100%, 60%)" />
          <stop offset="100%" stopColor="hsl(210, 100%, 65%)" />
        </linearGradient>
      </defs>
      <path
        d="M12 2L2 9L12 22L22 9L12 2Z"
        fill="url(#diamondGradient)"
        stroke="hsl(195, 100%, 45%)"
        strokeWidth="1"
      />
      <path
        d="M12 2L7 9H17L12 2Z"
        fill="hsl(195, 100%, 80%)"
        fillOpacity="0.5"
      />
      <path
        d="M7 9L12 22L2 9H7Z"
        fill="hsl(210, 100%, 55%)"
        fillOpacity="0.3"
      />
    </svg>
  );
};
