import { Tile } from "../types/game";

interface TileProps {
  tile: Tile;
  cellSize: number;
  gap: number;
}

const tileColors: Record<number, string> = {
  2: "bg-tile-2 text-text-dark",
  4: "bg-tile-4 text-text-dark",
  8: "bg-tile-8 text-text-light",
  16: "bg-tile-16 text-text-light",
  32: "bg-tile-32 text-text-light",
  64: "bg-tile-64 text-text-light",
  128: "bg-tile-128 text-text-light",
  256: "bg-tile-256 text-text-light",
  512: "bg-tile-512 text-text-light",
  1024: "bg-tile-1024 text-text-light",
  2048: "bg-tile-2048 text-text-light",
};

const getFontSize = (value: number, cellSize: number): string => {
  const digits = value.toString().length;
  if (digits <= 2) return `${cellSize * 0.45}px`;
  if (digits === 3) return `${cellSize * 0.36}px`;
  if (digits === 4) return `${cellSize * 0.3}px`;
  return `${cellSize * 0.24}px`;
};

export const TileComponent = ({ tile, cellSize, gap }: TileProps) => {
  const colorClass = tileColors[tile.value] || "bg-tile-super text-text-light";
  const fontSize = getFontSize(tile.value, cellSize);

  const x = tile.col * (cellSize + gap);
  const y = tile.row * (cellSize + gap);

  let animationClass = "";
  if (tile.isNew) animationClass = "animate-appear";
  else if (tile.isMerged) animationClass = "animate-pop";

  return (
    <div
      className={`absolute rounded-md flex items-center justify-center font-bold shadow-sm select-none transition-all duration-100 ease-out ${colorClass} ${animationClass}`}
      style={{
        width: `${cellSize}px`,
        height: `${cellSize}px`,
        transform: `translate(${x}px, ${y}px)`,
        fontSize,
      }}
    >
      {tile.value}
    </div>
  );
};
