import { cn } from "@/lib/utils";
import { Calculator, BookOpen } from "lucide-react";
import { Subject } from "@/types/app";

interface SubjectButtonProps {
  subject: Subject;
  onClick: () => void;
  disabled?: boolean;
}

export const SubjectButton = ({ subject, onClick, disabled = false }: SubjectButtonProps) => {
  const isMath = subject === 'math';
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative flex flex-col items-center justify-center gap-3 p-8 rounded-3xl",
        "min-h-[180px] w-full transition-all duration-300",
        "border-4 shadow-kid hover:shadow-kid-hover",
        "hover:-translate-y-1 active:scale-95",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0",
        isMath 
          ? "bg-gradient-to-br from-warning/20 to-warning/10 border-warning hover:border-warning/80" 
          : "bg-gradient-to-br from-secondary/20 to-secondary/10 border-secondary hover:border-secondary/80"
      )}
    >
      <div className={cn(
        "p-4 rounded-2xl",
        isMath ? "bg-warning/30" : "bg-secondary/30"
      )}>
        {isMath ? (
          <Calculator className="w-12 h-12 text-warning" />
        ) : (
          <BookOpen className="w-12 h-12 text-secondary" />
        )}
      </div>
      
      <span className={cn(
        "text-2xl font-display",
        isMath ? "text-warning" : "text-secondary"
      )}>
        {isMath ? "Toán" : "Tiếng Anh"}
      </span>
      
      <span className="text-sm text-muted-foreground">
        {isMath ? "Tính toán vui" : "Học từ vựng"}
      </span>
    </button>
  );
};
