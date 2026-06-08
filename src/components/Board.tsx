import { useState, useEffect, useMemo, useRef, useCallback } from "react";
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
  const boardRef = useRef<HTMLDivElement>(null);
  const touchRef = useTouch<HTMLDivElement>({ onSwipe });
  const [size, setSize] = useState(480);

  const updateSize = useCallback(() => {
    if (boardRef.current) {
      setSize(boardRef.current.clientWidth);
    }
  }, []);

  useEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [updateSize]);

  const setRefs = useCallback(
    (el: HTMLDivElement | null) => {
      boardRef.current = el;
      (touchRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      if (el) updateSize();
    },
    [touchRef, updateSize]
  );

  const cellSize = (size - PADDING * 2 - GAP * 3) / 4;

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
        ref={setRefs}
        className="relative bg-board rounded-lg touch-none aspect-square w-full max-w-[480px]"
        style={{
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
