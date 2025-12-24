import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Exercise, Subject, Player } from "@/types/app";
import { DiamondCounter } from "./DiamondCounter";
import { Confetti } from "./Confetti";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ArrowLeft, Loader2, CheckCircle, XCircle, Timer, ArrowUpDown, Link2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { DiamondIcon } from "./icons/DiamondIcon";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface ExerciseScreenProps {
  player: Player;
  subject: Subject;
  onBack: () => void;
  onDiamondChange: (change: number) => void;
}

type ExerciseType = 'multiple_choice' | 'fill_blank' | 'matching' | 'ordering';

interface ExtendedExercise extends Exercise {
  type?: ExerciseType;
  blanks?: string[];
  pairs?: { left: string; right: string }[];
  orderItems?: string[];
  correctOrder?: number[];
}

const TIME_LIMIT = 60;

export const ExerciseScreen = ({ 
  player, 
  subject, 
  onBack,
  onDiamondChange 
}: ExerciseScreenProps) => {
  const [exercise, setExercise] = useState<ExtendedExercise | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [diamondChange, setDiamondChange] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  
  // For fill-in-the-blank
  const [fillAnswer, setFillAnswer] = useState("");
  
  // For matching
  const [selectedPairs, setSelectedPairs] = useState<Record<number, number>>({});
  const [leftSelected, setLeftSelected] = useState<number | null>(null);
  
  // For ordering
  const [orderedItems, setOrderedItems] = useState<number[]>([]);
  
  const { toast } = useToast();
  const { playCorrectSound, playWrongSound, playTimeoutSound, playTickSound } = useSoundEffects();
  
  const isMath = subject === 'math';
  const diamondReward = isMath ? 1 : 2;

  // Track if exercise has been answered
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleExitPenalty = useCallback(async () => {
    if (!showResult && exercise && !hasAnswered && player.diamonds > 0) {
      playWrongSound();
      onDiamondChange(-1);
      
      // Log the exit penalty
      await supabase.from('admin_logs').insert({
        player_id: player.id,
        diamond_change: -1,
        reason: 'Thoát bài tập khi chưa trả lời'
      });
    }
  }, [showResult, exercise, hasAnswered, player.diamonds, player.id, onDiamondChange, playWrongSound]);

  const handleBack = useCallback(() => {
    handleExitPenalty();
    onBack();
  }, [handleExitPenalty, onBack]);

  const handleTimeUp = useCallback(() => {
    if (!showResult && exercise) {
      setShowResult(true);
      setHasAnswered(true);
      setDiamondChange(-1);
      playTimeoutSound();
      if (player.diamonds > 0) {
        onDiamondChange(-1);
      }
      toast({
        title: "⏰ Hết giờ!",
        description: "Bạn đã hết thời gian làm bài!",
        variant: "destructive"
      });
    }
  }, [showResult, exercise, player.diamonds, onDiamondChange, toast, playTimeoutSound]);
  
  const fetchExercise = async () => {
    setLoading(true);
    setSelectedAnswer(null);
    setShowResult(false);
    setDiamondChange(0);
    setTimeLeft(TIME_LIMIT);
    setIsTimerRunning(false);
    setFillAnswer("");
    setSelectedPairs({});
    setLeftSelected(null);
    setOrderedItems([]);
    setHasAnswered(false);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-exercise', {
        body: { 
          subject, 
          grade: player.grade,
          playerName: player.name 
        }
      });
      
      if (error) throw error;
      
      // Determine exercise type based on response or randomly assign
      const exerciseType = data.type || 'multiple_choice';
      setExercise({ ...data, type: exerciseType });
      
      // Initialize ordering if needed
      if (exerciseType === 'ordering' && data.orderItems) {
        setOrderedItems(data.orderItems.map((_: any, i: number) => i));
      }
      
      setIsTimerRunning(true);
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

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTimerRunning && timeLeft > 0 && !showResult) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 11 && prev > 1) {
            playTickSound();
          }
          if (prev <= 1) {
            setIsTimerRunning(false);
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft, showResult, handleTimeUp, playTickSound]);
  
  useEffect(() => {
    fetchExercise();
  }, [subject, player.grade]);
  
  const handleAnswer = (index: number) => {
    if (showResult || selectedAnswer !== null) return;
    
    setSelectedAnswer(index);
    setShowResult(true);
    setIsTimerRunning(false);
    setHasAnswered(true);
    
    const isCorrect = index === exercise?.correctAnswer;
    
    if (isCorrect) {
      setShowConfetti(true);
      setDiamondChange(diamondReward);
      onDiamondChange(diamondReward);
      playCorrectSound();
    } else {
      playWrongSound();
      if (player.diamonds > 0) {
        setDiamondChange(-1);
        onDiamondChange(-1);
      }
    }
  };

  const handleFillBlankSubmit = () => {
    if (showResult || !exercise) return;
    
    setShowResult(true);
    setIsTimerRunning(false);
    setHasAnswered(true);
    
    // Check if answer matches any of the correct answers
    const correctAnswers = exercise.blanks || [exercise.options?.[exercise.correctAnswer || 0]];
    const isCorrect = correctAnswers.some(
      ans => fillAnswer.toLowerCase().trim() === ans.toLowerCase().trim()
    );
    
    if (isCorrect) {
      setShowConfetti(true);
      setDiamondChange(diamondReward);
      onDiamondChange(diamondReward);
      playCorrectSound();
    } else {
      playWrongSound();
      if (player.diamonds > 0) {
        setDiamondChange(-1);
        onDiamondChange(-1);
      }
    }
  };

  const handleMatchingSelect = (side: 'left' | 'right', index: number) => {
    if (showResult) return;
    
    if (side === 'left') {
      setLeftSelected(index);
    } else if (leftSelected !== null) {
      const newPairs = { ...selectedPairs, [leftSelected]: index };
      setSelectedPairs(newPairs);
      setLeftSelected(null);
      
      // Check if all pairs are matched
      if (Object.keys(newPairs).length === (exercise?.pairs?.length || 0)) {
        checkMatchingResult(newPairs);
      }
    }
  };

  const checkMatchingResult = (pairs: Record<number, number>) => {
    setShowResult(true);
    setIsTimerRunning(false);
    setHasAnswered(true);
    
    // All correct if left index matches right index
    const isCorrect = Object.entries(pairs).every(([left, right]) => parseInt(left) === right);
    
    if (isCorrect) {
      setShowConfetti(true);
      setDiamondChange(diamondReward);
      onDiamondChange(diamondReward);
      playCorrectSound();
    } else {
      playWrongSound();
      if (player.diamonds > 0) {
        setDiamondChange(-1);
        onDiamondChange(-1);
      }
    }
  };

  const handleOrderMove = (fromIndex: number, direction: 'up' | 'down') => {
    if (showResult) return;
    
    const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;
    if (toIndex < 0 || toIndex >= orderedItems.length) return;
    
    const newOrder = [...orderedItems];
    [newOrder[fromIndex], newOrder[toIndex]] = [newOrder[toIndex], newOrder[fromIndex]];
    setOrderedItems(newOrder);
  };

  const checkOrderingResult = () => {
    setShowResult(true);
    setIsTimerRunning(false);
    setHasAnswered(true);
    
    const correctOrder = exercise?.correctOrder || orderedItems.map((_, i) => i);
    const isCorrect = orderedItems.every((item, index) => item === correctOrder[index]);
    
    if (isCorrect) {
      setShowConfetti(true);
      setDiamondChange(diamondReward);
      onDiamondChange(diamondReward);
      playCorrectSound();
    } else {
      playWrongSound();
      if (player.diamonds > 0) {
        setDiamondChange(-1);
        onDiamondChange(-1);
      }
    }
  };
  
  const handleNext = () => {
    fetchExercise();
  };

  const renderExerciseContent = () => {
    if (!exercise) return null;

    const type = exercise.type || 'multiple_choice';

    switch (type) {
      case 'fill_blank':
        return (
          <div className="space-y-6">
            <div className={cn(
              "bg-card rounded-3xl p-6 md:p-8 shadow-kid border-4",
              isMath ? "border-warning/30" : "border-secondary/30"
            )}>
              <h2 className="text-xl md:text-2xl font-display text-foreground text-center">
                {exercise.question}
              </h2>
            </div>
            
            <div className="flex gap-3 max-w-md mx-auto">
              <Input
                value={fillAnswer}
                onChange={(e) => setFillAnswer(e.target.value)}
                placeholder="Điền câu trả lời..."
                className="text-lg py-6 rounded-xl text-center"
                disabled={showResult}
                onKeyDown={(e) => e.key === 'Enter' && handleFillBlankSubmit()}
              />
              {!showResult && (
                <Button 
                  onClick={handleFillBlankSubmit}
                  className="px-8 py-6 rounded-xl"
                  disabled={!fillAnswer.trim()}
                >
                  Trả lời
                </Button>
              )}
            </div>
          </div>
        );

      case 'matching':
        const pairs = exercise.pairs || [];
        const shuffledRight = [...pairs].sort(() => Math.random() - 0.5);
        
        return (
          <div className="space-y-6">
            <div className={cn(
              "bg-card rounded-3xl p-6 shadow-kid border-4 text-center",
              isMath ? "border-warning/30" : "border-secondary/30"
            )}>
              <h2 className="text-xl font-display text-foreground">
                <Link2 className="inline w-6 h-6 mr-2" />
                Nối cặp đúng
              </h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
              <div className="space-y-3">
                {pairs.map((pair, index) => (
                  <button
                    key={`left-${index}`}
                    onClick={() => handleMatchingSelect('left', index)}
                    className={cn(
                      "w-full p-4 rounded-xl border-3 text-lg font-medium transition-all",
                      leftSelected === index && "border-primary bg-primary/10",
                      selectedPairs[index] !== undefined && "border-success bg-success/10",
                      leftSelected !== index && selectedPairs[index] === undefined && "border-border hover:border-primary"
                    )}
                  >
                    {pair.left}
                  </button>
                ))}
              </div>
              <div className="space-y-3">
                {shuffledRight.map((pair, index) => {
                  const originalIndex = pairs.findIndex(p => p.right === pair.right);
                  const isMatched = Object.values(selectedPairs).includes(originalIndex);
                  
                  return (
                    <button
                      key={`right-${index}`}
                      onClick={() => handleMatchingSelect('right', originalIndex)}
                      disabled={isMatched}
                      className={cn(
                        "w-full p-4 rounded-xl border-3 text-lg font-medium transition-all",
                        isMatched && "border-success bg-success/10 opacity-50",
                        !isMatched && "border-border hover:border-primary"
                      )}
                    >
                      {pair.right}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 'ordering':
        const items = exercise.orderItems || [];
        
        return (
          <div className="space-y-6">
            <div className={cn(
              "bg-card rounded-3xl p-6 shadow-kid border-4 text-center",
              isMath ? "border-warning/30" : "border-secondary/30"
            )}>
              <h2 className="text-xl font-display text-foreground">
                <ArrowUpDown className="inline w-6 h-6 mr-2" />
                {exercise.question || "Sắp xếp theo thứ tự đúng"}
              </h2>
            </div>
            
            <div className="space-y-3 max-w-md mx-auto">
              {orderedItems.map((itemIndex, position) => (
                <div 
                  key={itemIndex}
                  className="flex items-center gap-2"
                >
                  <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold">
                    {position + 1}
                  </span>
                  <div className="flex-1 p-4 rounded-xl border-3 border-border bg-card text-lg font-medium">
                    {items[itemIndex]}
                  </div>
                  {!showResult && (
                    <div className="flex flex-col gap-1">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleOrderMove(position, 'up')}
                        disabled={position === 0}
                        className="h-8 w-8"
                      >
                        ↑
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleOrderMove(position, 'down')}
                        disabled={position === orderedItems.length - 1}
                        className="h-8 w-8"
                      >
                        ↓
                      </Button>
                    </div>
                  )}
                </div>
              ))}
              
              {!showResult && (
                <Button 
                  onClick={checkOrderingResult}
                  className="w-full mt-4 py-6 rounded-xl"
                >
                  Kiểm tra
                </Button>
              )}
            </div>
          </div>
        );

      default: // multiple_choice
        return (
          <div className="space-y-6">
            <div className={cn(
              "bg-card rounded-3xl p-6 md:p-8 shadow-kid border-4",
              isMath ? "border-warning/30" : "border-secondary/30"
            )}>
              <h2 className="text-xl md:text-2xl font-display text-foreground text-center">
                {exercise.question}
              </h2>
            </div>
            
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
          </div>
        );
    }
  };
  
  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <Confetti show={showConfetti} onComplete={() => setShowConfetti(false)} />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay lại
        </Button>
        
        <div className="flex items-center gap-4">
          {/* Timer */}
          {!loading && exercise && !showResult && (
            <div className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full font-bold text-lg",
              timeLeft <= 10 
                ? "bg-destructive/20 text-destructive animate-pulse" 
                : timeLeft <= 30 
                  ? "bg-warning/20 text-warning"
                  : "bg-success/20 text-success"
            )}>
              <Timer className="w-5 h-5" />
              <span>{timeLeft}s</span>
            </div>
          )}
          <div className={cn(
            "px-4 py-2 rounded-full font-display text-lg",
            isMath 
              ? "bg-warning/20 text-warning" 
              : "bg-secondary/20 text-secondary"
          )}>
            {isMath ? "📐 Toán (+1💎)" : "📚 Tiếng Anh (+2💎)"}
          </div>
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
            {renderExerciseContent()}
            
            {/* Result */}
            {showResult && (
              <div className={cn(
                "rounded-2xl p-6 text-center animate-pulse-success",
                diamondChange > 0 ? "bg-success/20" : "bg-destructive/20"
              )}>
                {diamondChange > 0 ? (
                  <div className="space-y-3">
                    <p className="text-2xl font-display text-success">
                      🎉 Chính xác!
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-xl font-bold text-success">+{diamondChange}</span>
                      <DiamondIcon size={28} animate />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-2xl font-display text-destructive">
                      {timeLeft === 0 ? "⏰ Hết giờ!" : "😅 Chưa đúng rồi!"}
                    </p>
                    {diamondChange < 0 && (
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-xl font-bold text-destructive">{diamondChange}</span>
                        <DiamondIcon size={28} />
                      </div>
                    )}
                    {exercise.explanation && (
                      <p className="text-foreground mt-2">{exercise.explanation}</p>
                    )}
                  </div>
                )}
                
                <Button
                  onClick={handleNext}
                  className={cn(
                    "mt-6 text-lg px-8 py-6 rounded-2xl font-bold",
                    diamondChange > 0 
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
