import { CharBoard } from "../types/game";
import { CharTile } from "./Tile";

interface BoardProps {
  board: CharBoard;
  onCellClick: (cellId: number, isWrong: boolean) => void;
  wrongClickedIds: number[];
  correctClickedIds: number[];
  disabled: boolean;
}

export const BoardComponent = ({
  board,
  onCellClick,
  wrongClickedIds,
  correctClickedIds,
  disabled,
}: BoardProps) => {
  const rows = board.length;
  const cols = board[0]?.length || 0;

  return (
    <div className="w-full flex items-center justify-center">
      <div
        className="relative bg-board rounded-lg p-3 w-full max-w-[520px] aspect-square"
      >
        <div
          className="w-full h-full grid"
          style={{
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            gap: "8px",
          }}
        >
          {board.flat().map((cell) => (
            <CharTile
              key={cell.id}
              cell={cell}
              isClickedWrong={wrongClickedIds.includes(cell.id)}
              isClickedCorrect={correctClickedIds.includes(cell.id)}
              onClick={() => onCellClick(cell.id, cell.isWrong)}
              disabled={disabled}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
