import { useEffect, useState } from "react";

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
}

interface ConfettiProps {
  show: boolean;
  onComplete?: () => void;
}

const colors = [
  "hsl(330, 70%, 70%)", // pink
  "hsl(170, 50%, 70%)", // mint
  "hsl(195, 100%, 60%)", // diamond blue
  "hsl(50, 90%, 65%)",  // yellow
  "hsl(270, 60%, 60%)", // purple
  "hsl(140, 60%, 50%)", // green
];

export const Confetti = ({ show, onComplete }: ConfettiProps) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  
  useEffect(() => {
    if (show) {
      const newPieces: ConfettiPiece[] = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.3,
      }));
      setPieces(newPieces);
      
      const timer = setTimeout(() => {
        setPieces([]);
        onComplete?.();
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);
  
  if (!show || pieces.length === 0) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute bottom-0 w-3 h-3 rounded-sm animate-confetti"
          style={{
            left: `${piece.x}%`,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
          }}
        />
      ))}
    </div>
  );
};
