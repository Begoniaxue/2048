import { useState, useEffect, useMemo } from "react";
import { Board, Direction } from "../types/game";
import { TileComponent } from "./Tile";
import { useTouch } from "../hooks/useTouch";

interface BoardProps {
  board: Board;
  onSwipe: (direction: Direction) => void;
}

const GAP = 12;
const PADDING = 12;

export const BoardComponent = ({ board, onSwipe }: BoardProps) => {
  const touchRef = useTouch<HTMLDivElement>({ onSwipe });
  const [containerWidth, setContainerWidth] = useState(480);

  useEffect(() => {
    const updateSize = () => {
      setContainerWidth(Math.min(window.innerWidth * 0.9, 480));
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const cellSize = (containerWidth - PADDING * 2 - GAP * 3) / 4;

  const tiles = useMemo(() => {
    const result = [];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        const tile = board[row][col];
        if (tile) result.push(tile);
      }
    }
    return result;
  }, [board]);

  return (
    <div className="flex items-center justify-center w-full">
      <div
        ref={touchRef}
        className="relative bg-board rounded-lg touch-none"
        style={{
          width: containerWidth,
          height: containerWidth,
          padding: PADDING,
        }}
      >
        <div
          className="w-full h-full grid grid-cols-4 grid-rows-4"
          style={{ gap: GAP }}
        >
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="bg-board-cell rounded-md" />
          ))}
        </div>

        <div className="absolute inset-0" style={{ padding: PADDING }}>
          {tiles.map((tile) => (
            <TileComponent
              key={tile.id}
              tile={tile}
              cellSize={cellSize}
              gap={GAP}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
