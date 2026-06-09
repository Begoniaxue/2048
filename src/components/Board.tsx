import { GameBoard, Tetromino, BOARD_WIDTH, BOARD_HEIGHT } from "../types/game";
import { Cell } from "./Tile";
import { getGhostPosition } from "../utils/gameLogic";

interface BoardProps {
  board: GameBoard;
  currentPiece: Tetromino | null;
}

export const BoardComponent = ({ board, currentPiece }: BoardProps) => {
  const renderBoard = () => {
    const displayBoard = board.map((row) => [...row]);

    if (currentPiece) {
      const ghostPos = getGhostPosition(board, currentPiece);
      const { shape: ghostShape, type: ghostType } = currentPiece;

      for (let y = 0; y < ghostShape.length; y++) {
        for (let x = 0; x < ghostShape[y].length; x++) {
          if (ghostShape[y][x]) {
            const boardY = ghostPos.y + y;
            const boardX = ghostPos.x + x;
            if (
              boardY >= 0 &&
              boardY < BOARD_HEIGHT &&
              boardX >= 0 &&
              boardX < BOARD_WIDTH &&
              displayBoard[boardY][boardX] === null
            ) {
              (displayBoard[boardY] as (string | null)[])[boardX] = `ghost-${ghostType}`;
            }
          }
        }
      }

      const { shape, position, type } = currentPiece;
      for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
          if (shape[y][x]) {
            const boardY = position.y + y;
            const boardX = position.x + x;
            if (
              boardY >= 0 &&
              boardY < BOARD_HEIGHT &&
              boardX >= 0 &&
              boardX < BOARD_WIDTH
            ) {
              (displayBoard[boardY] as (string | null)[])[boardX] = type;
            }
          }
        }
      }
    }

    return displayBoard;
  };

  const displayBoard = renderBoard();

  return (
    <div className="flex items-center justify-center">
      <div className="relative bg-board rounded-lg p-2 shadow-lg">
        <div
          className="grid gap-0.5"
          style={{
            gridTemplateColumns: `repeat(${BOARD_WIDTH}, 1fr)`,
            gridTemplateRows: `repeat(${BOARD_HEIGHT}, 1fr)`,
            width: "min(70vw, 300px)",
            height: "min(140vw, 600px)",
          }}
        >
          {displayBoard.map((row, y) =>
            row.map((cell, x) => {
              const isGhost = typeof cell === "string" && cell.startsWith("ghost-");
              const actualValue = isGhost ? (cell as string).replace("ghost-", "") : cell;
              return (
                <Cell
                  key={`${y}-${x}`}
                  value={actualValue as any}
                  isGhost={isGhost}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
