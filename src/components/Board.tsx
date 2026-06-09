import { Card } from "../types/game";
import { CardTile } from "./Tile";

interface BoardProps {
  cards: Card[];
  onCardClick: (cardId: string) => void;
}

export const BoardComponent = ({ cards, onCardClick }: BoardProps) => {
  const activeCards = cards.filter((c) => !c.isRemoved);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-4 shadow-2xl border-4 border-green-800">
        <div className="bg-green-500/30 rounded-xl p-2 min-h-[380px] relative overflow-hidden">
          <div className="relative w-full h-[360px]">
            {activeCards
              .sort((a, b) => a.layer - b.layer)
              .map((card) => (
                <CardTile key={card.id} card={card} onClick={onCardClick} />
              ))}
          </div>
        </div>
        <div className="text-center mt-2 text-green-100/80 text-xs">
          点击未被遮挡的卡牌放入卡槽
        </div>
      </div>
    </div>
  );
};
