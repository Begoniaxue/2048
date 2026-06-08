import { CharacterCell } from "../types/game";

interface CharTileProps {
  cell: CharacterCell;
  isClickedWrong: boolean;
  isClickedCorrect: boolean;
  onClick: () => void;
  disabled: boolean;
}

export const CharTile = ({
  cell,
  isClickedWrong,
  isClickedCorrect,
  onClick,
  disabled,
}: CharTileProps) => {
  let bgClass = "bg-white hover:bg-tile-hover";
  let textClass = "text-text-dark";
  let borderClass = "border-board-cell";
  let animClass = "";

  if (isClickedWrong) {
    bgClass = "bg-wrong-cell";
    textClass = "text-white";
    borderClass = "border-wrong-cell";
    animClass = "animate-shake";
  } else if (isClickedCorrect) {
    bgClass = "bg-correct-cell";
    textClass = "text-white";
    borderClass = "border-correct-cell";
    animClass = "animate-pop";
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled || isClickedWrong || isClickedCorrect}
      className={`
        aspect-square rounded-md border-2 ${borderClass}
        flex items-center justify-center font-bold shadow-sm
        transition-all duration-150 ease-out
        ${bgClass} ${textClass} ${animClass}
        ${disabled || isClickedWrong || isClickedCorrect ? "cursor-default" : "cursor-pointer active:scale-95"}
      `}
      style={{
        fontSize: "clamp(1.25rem, 4.5vw, 2.25rem)",
      }}
    >
      {cell.char}
    </button>
  );
};
