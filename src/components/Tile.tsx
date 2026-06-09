import { CellValue, TETROMINO_COLORS } from "../types/game";

interface CellProps {
  value: CellValue;
  isGhost?: boolean;
}

export const Cell = ({ value, isGhost = false }: CellProps) => {
  let bgClass = "bg-board-cell";
  let borderClass = "border-board-cell/50";

  if (value) {
    bgClass = TETROMINO_COLORS[value];
    borderClass = "border-white/30";
  }

  if (isGhost && value) {
    bgClass = `${TETROMINO_COLORS[value]} opacity-30`;
    borderClass = "border-white/20";
  }

  return (
    <div
      className={`
        aspect-square rounded-sm border ${borderClass}
        flex items-center justify-center
        transition-colors duration-100
        ${bgClass}
      `}
    />
  );
};
