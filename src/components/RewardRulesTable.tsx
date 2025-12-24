import { Star } from "lucide-react";
import { DiamondIcon } from "./icons/DiamondIcon";

interface RewardRulesTableProps {
  compact?: boolean;
}

const REWARD_RULES = [
  { reason: "Giúp đỡ bố mẹ việc nhà", diamonds: 3 },
  { reason: "Giúp đỡ chị hoặc em", diamonds: 3 },
  { reason: "Giao tiếp với người ngoài lịch sự", diamonds: 5 },
  { reason: "Mạnh dạn khi ra ngoài", diamonds: 5 },
];

export const RewardRulesTable = ({ compact = false }: RewardRulesTableProps) => {
  return (
    <div className="bg-card rounded-3xl p-4 md:p-6 shadow-kid border-2 border-primary/30">
      <h3 className="font-display text-lg md:text-xl mb-4 text-primary flex items-center gap-2">
        <Star className="w-5 h-5 fill-warning text-warning" />
        Bảng Thưởng Kim Cương
      </h3>
      
      <div className="space-y-2">
        {REWARD_RULES.map((rule, index) => (
          <div 
            key={index}
            className={`flex justify-between items-center py-2 px-3 rounded-xl ${
              index % 2 === 0 ? 'bg-primary/5' : 'bg-primary/10'
            } ${compact ? 'text-sm' : ''}`}
          >
            <span className="text-foreground flex-1 pr-2">{rule.reason}</span>
            <span className="font-bold text-primary whitespace-nowrap flex items-center gap-1">
              thưởng {rule.diamonds} <DiamondIcon size={compact ? 14 : 16} />
            </span>
          </div>
        ))}
      </div>
      
      <p className="text-xs text-muted-foreground mt-4 text-center">
        ⭐ Hãy cố gắng để được thưởng nhiều kim cương nhé!
      </p>
    </div>
  );
};
