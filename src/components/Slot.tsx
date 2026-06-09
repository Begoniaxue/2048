import { Card, CARD_EMOJIS, CARD_COLORS } from "../types/game";

interface SlotProps {
  slot: (Card | null)[];
}

export const Slot = ({ slot }: SlotProps) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-amber-800/80 rounded-xl p-3 shadow-inner">
        <div className="flex justify-center gap-1">
          {slot.map((card, index) => (
            <div
              key={index}
              className={`
                w-11 h-14 rounded-lg border-2 border-dashed
                flex items-center justify-center
                transition-all duration-300 ease-out
                ${card ? CARD_COLORS[card.type] : "bg-amber-900/50 border-amber-600/50"}
                ${card ? "animate-slot-in" : ""}
              `}
            >
              {card && (
                <span className="text-2xl select-none animate-bounce-in">
                  {CARD_EMOJIS[card.type]}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-2 text-amber-200/80 text-xs">
        卡槽 · 三消自动消除
      </div>
    </div>
  );
};
