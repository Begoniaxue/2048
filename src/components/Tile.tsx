import { Card, CARD_EMOJIS, CARD_COLORS } from "../types/game";

interface CardTileProps {
  card: Card;
  onClick: (cardId: string) => void;
}

export const CardTile = ({ card, onClick }: CardTileProps) => {
  if (card.isRemoved) return null;

  const handleClick = () => {
    if (!card.isBlocked) {
      onClick(card.id);
    }
  };

  const zIndex = card.layer * 10 + 1;
  const colorClass = CARD_COLORS[card.type];
  const opacityClass = card.isBlocked ? "opacity-50" : "opacity-100";
  const cursorClass = card.isBlocked ? "cursor-not-allowed" : "cursor-pointer hover:scale-105 active:scale-95";

  return (
    <div
      onClick={handleClick}
      onTouchEnd={(e) => {
        e.preventDefault();
        handleClick();
      }}
      className={`
        absolute w-14 h-14 rounded-lg border-2 shadow-lg
        flex items-center justify-center
        transition-all duration-200 ease-out
        ${colorClass}
        ${opacityClass}
        ${cursorClass}
        animate-card-appear
      `}
      style={{
        left: `${card.x}px`,
        top: `${card.y}px`,
        zIndex,
        boxShadow: card.isBlocked
          ? "0 2px 4px rgba(0,0,0,0.2)"
          : "0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5)",
      }}
    >
      <span className="text-3xl select-none">{CARD_EMOJIS[card.type]}</span>
      {card.isBlocked && (
        <div className="absolute inset-0 bg-gray-900/20 rounded-lg" />
      )}
    </div>
  );
};
