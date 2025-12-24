import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Exercise, Subject, Player } from "@/types/app";
import { DiamondCounter } from "./DiamondCounter";
import { Confetti } from "./Confetti";
import { Button } from "./ui/button";
import { ArrowLeft, Loader2, CheckCircle, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ExerciseScreenProps {
  player: Player;
  subject: Subject;
  onBack: () => void;
  onDiamondEarned: () => void;
}

export const ExerciseScreen = ({ 
  player, 
  subject, 
  onBack,
  onDiamondEarned 
}: ExerciseScreenProps) => {
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [earnedDiamond, setEarnedDiamond] = useState(false);
  const { toast } = useToast();
  
  const isMath = subject === 'math';
  
  const fetchExercise = async () => {
    setLoading(true);
    setSelectedAnswer(null);
    setShowResult(false);
    setEarnedDiamond(false);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-exercise', {
        body: { 
          subject, 
          grade: player.grade,
          playerName: player.name 
        }
      });
      
      if (error) throw error;
      
      setExercise(data);
    } catch (error) {
      console.error('Error fetching exercise:', error);
      toast({
        title: "Lỗi",
        description: "Không thể tải bài tập. Vui lòng thử lại.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchExercise();
  }, [subject, player.grade]);
  
  const handleAnswer = async (index: number) => {
    if (showResult || selectedAnswer !== null) return;
    
    setSelectedAnswer(index);
    setShowResult(true);
    
    const isCorrect = index === exercise?.correctAnswer;
    
    if (isCorrect) {
      setShowConfetti(true);
      setEarnedDiamond(true);
      onDiamondEarned();
    }
  };
  
  const handleNext = () => {
    fetchExercise();
  };
  
  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <Confetti show={showConfetti} onComplete={() => setShowConfetti(false)} />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay lại
        </Button>
        
        <div className={cn(
          "px-4 py-2 rounded-full font-display text-lg",
          isMath 
            ? "bg-warning/20 text-warning" 
            : "bg-secondary/20 text-secondary"
        )}>
          {isMath ? "📐 Toán" : "📚 Tiếng Anh"}
        </div>
      </div>
      
      {/* Main content */}
      <div className="max-w-2xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground">Đang tạo bài tập...</p>
          </div>
        ) : exercise ? (
          <div className="space-y-6">
            {/* Question */}
            <div className={cn(
              "bg-card rounded-3xl p-6 md:p-8 shadow-kid border-4",
              isMath ? "border-warning/30" : "border-secondary/30"
            )}>
              <h2 className="text-xl md:text-2xl font-display text-foreground text-center">
                {exercise.question}
              </h2>
            </div>
            
            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {exercise.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === exercise.correctAnswer;
                const showCorrectness = showResult;
                
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={showResult}
                    className={cn(
                      "relative p-5 rounded-2xl text-lg font-medium transition-all duration-300",
                      "border-3 shadow-kid hover:shadow-kid-hover",
                      "hover:-translate-y-1 active:scale-95",
                      "disabled:hover:translate-y-0",
                      !showCorrectness && "bg-card border-border hover:border-primary",
                      showCorrectness && isCorrect && "bg-success/20 border-success",
                      showCorrectness && isSelected && !isCorrect && "bg-destructive/20 border-destructive",
                      showCorrectness && !isSelected && !isCorrect && "opacity-50"
                    )}
                  >
                    <span className="text-foreground">{option}</span>
                    
                    {showCorrectness && isCorrect && (
                      <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-success" />
                    )}
                    {showCorrectness && isSelected && !isCorrect && (
                      <XCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-destructive" />
                    )}
                  </button>
                );
              })}
            </div>
            
            {/* Result */}
            {showResult && (
              <div className={cn(
                "rounded-2xl p-6 text-center animate-pulse-success",
                earnedDiamond ? "bg-success/20" : "bg-destructive/20"
              )}>
                {earnedDiamond ? (
                  <div className="space-y-3">
                    <p className="text-2xl font-display text-success">
                      🎉 Chính xác!
                    </p>
                    <DiamondCounter count={1} size="lg" showPlus />
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-2xl font-display text-destructive">
                      😅 Chưa đúng rồi!
                    </p>
                    {exercise.explanation && (
                      <p className="text-foreground">{exercise.explanation}</p>
                    )}
                  </div>
                )}
                
                <Button
                  onClick={handleNext}
                  className={cn(
                    "mt-6 text-lg px-8 py-6 rounded-2xl font-bold",
                    earnedDiamond 
                      ? "bg-success hover:bg-success/90" 
                      : "bg-primary hover:bg-primary/90"
                  )}
                >
                  Bài tiếp theo →
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">Không thể tải bài tập</p>
            <Button onClick={fetchExercise}>Thử lại</Button>
          </div>
        )}
      </div>
    </div>
  );
};
