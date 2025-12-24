import { AlertTriangle } from "lucide-react";
import { DiamondIcon } from "./icons/DiamondIcon";

interface PunishmentRulesTableProps {
  compact?: boolean;
}

const PUNISHMENT_RULES = [
  { reason: "Luộm thuộm", diamonds: 3, perPerson: false },
  { reason: "Dậy muộn để bố mẹ gọi nhiều, không đánh răng buổi tối", diamonds: 3, perPerson: false },
  { reason: "Không tự giác học bài để bố mẹ phải nhắc nhở nhiều (trước 19h tối)", diamonds: 5, perPerson: false },
  { reason: "Tranh cãi nhau", diamonds: 10, perPerson: true },
  { reason: "La hét trong nhà", diamonds: 10, perPerson: true },
  { reason: "Nói các từ bố cấm", diamonds: 50, perPerson: false },
];

export const PunishmentRulesTable = ({ compact = false }: PunishmentRulesTableProps) => {
  return (
    <div className="bg-card rounded-3xl p-4 md:p-6 shadow-kid border-2 border-destructive/30">
      <h3 className="font-display text-lg md:text-xl mb-4 text-destructive flex items-center gap-2">
        <AlertTriangle className="w-5 h-5" />
        Bảng lỗi bị trừ kim cương
      </h3>
      
      <div className="space-y-2">
        {PUNISHMENT_RULES.map((rule, index) => (
          <div 
            key={index}
            className={`flex justify-between items-center py-2 px-3 rounded-xl ${
              index % 2 === 0 ? 'bg-destructive/5' : 'bg-destructive/10'
            } ${compact ? 'text-sm' : ''}`}
          >
            <span className="text-foreground flex-1 pr-2">{rule.reason}</span>
            <span className="font-bold text-destructive whitespace-nowrap flex items-center gap-1">
              bị trừ {rule.diamonds} <DiamondIcon size={compact ? 14 : 16} />
              {rule.perPerson && <span className="text-xs font-bold"> mỗi bạn</span>}
            </span>
          </div>
        ))}
      </div>
      
      <p className="text-xs text-muted-foreground mt-4 text-center">
        ⚠️ Hãy ngoan ngoãn để giữ kim cương nhé!
      </p>
    </div>
  );
};
