import { CharBoard, CharacterCell, Level } from "../types/game";

let cellIdCounter = 0;

export const generateBoard = (level: Level): CharBoard => {
  const { rows, cols, correctChar, wrongChar, wrongCount } = level;
  const totalCells = rows * cols;

  const wrongPositions = new Set<number>();
  while (wrongPositions.size < wrongCount) {
    const pos = Math.floor(Math.random() * totalCells);
    wrongPositions.add(pos);
  }

  const board: CharBoard = [];
  let idx = 0;

  for (let r = 0; r < rows; r++) {
    const row: CharacterCell[] = [];
    for (let c = 0; c < cols; c++) {
      const isWrong = wrongPositions.has(idx);
      row.push({
        id: cellIdCounter++,
        char: isWrong ? wrongChar : correctChar,
        isWrong,
        row: r,
        col: c,
      });
      idx++;
    }
    board.push(row);
  }

  return board;
};

export const getTotalWrongInBoard = (board: CharBoard): number => {
  let count = 0;
  for (const row of board) {
    for (const cell of row) {
      if (cell.isWrong) count++;
    }
  }
  return count;
};
