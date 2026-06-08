import { Board, Tile, Direction, MoveResult } from "../types/game";

let tileIdCounter = 0;

const BOARD_SIZE = 4;

export const createEmptyBoard = (): Board => {
  return Array.from({ length: BOARD_SIZE }, () =>
    Array.from({ length: BOARD_SIZE }, () => null)
  );
};

export const getEmptyPositions = (board: Board): { row: number; col: number }[] => {
  const positions: { row: number; col: number }[] = [];
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (!board[row][col]) {
        positions.push({ row, col });
      }
    }
  }
  return positions;
};

export const addRandomTile = (board: Board): Board => {
  const emptyPositions = getEmptyPositions(board);
  if (emptyPositions.length === 0) return board;

  const { row, col } = emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
  const value = Math.random() < 0.9 ? 2 : 4;

  const newBoard = board.map((r) => [...r]);
  newBoard[row][col] = {
    id: ++tileIdCounter,
    value,
    row,
    col,
    isNew: true,
  };
  return newBoard;
};

export const initBoard = (): Board => {
  let board = createEmptyBoard();
  board = addRandomTile(board);
  board = addRandomTile(board);
  return board;
};

const rotateBoard = (board: Board): Board => {
  const newBoard = createEmptyBoard();
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      newBoard[col][BOARD_SIZE - 1 - row] = board[row][col];
    }
  }
  return newBoard;
};

const moveRowLeft = (row: (Tile | null)[]): { row: (Tile | null)[]; score: number; moved: boolean } => {
  const tiles = row.filter((t): t is Tile => t !== null);
  const newRow: (Tile | null)[] = [];
  let score = 0;
  let moved = false;

  let i = 0;
  while (i < tiles.length) {
    if (i + 1 < tiles.length && tiles[i].value === tiles[i + 1].value) {
      const mergedValue = tiles[i].value * 2;
      newRow.push({
        id: ++tileIdCounter,
        value: mergedValue,
        row: 0,
        col: 0,
        isMerged: true,
      });
      score += mergedValue;
      moved = true;
      i += 2;
    } else {
      newRow.push({ ...tiles[i], isNew: false, isMerged: false });
      i += 1;
    }
  }

  while (newRow.length < BOARD_SIZE) {
    newRow.push(null);
  }

  for (let j = 0; j < BOARD_SIZE; j++) {
    const orig = row[j];
    const now = newRow[j];
    if ((orig?.id !== now?.id) || (orig?.value !== now?.value)) {
      moved = true;
    }
  }

  return { row: newRow, score, moved };
};

const moveBoardLeft = (board: Board): MoveResult => {
  let totalScore = 0;
  let anyMoved = false;
  const newBoard: Board = board.map((row, rowIndex) => {
    const { row: newRow, score, moved } = moveRowLeft(row);
    totalScore += score;
    if (moved) anyMoved = true;
    return newRow.map((tile, colIndex) => {
      if (tile) {
        return { ...tile, row: rowIndex, col: colIndex };
      }
      return null;
    });
  });
  return { board: newBoard, score: totalScore, moved: anyMoved };
};

const syncTilePositions = (board: Board): Board => {
  return board.map((row, rowIndex) =>
    row.map((tile, colIndex) => {
      if (tile) {
        return { ...tile, row: rowIndex, col: colIndex };
      }
      return null;
    })
  );
};

export const move = (board: Board, direction: Direction): MoveResult => {
  let rotations = 0;
  switch (direction) {
    case "left":
      rotations = 0;
      break;
    case "up":
      rotations = 1;
      break;
    case "right":
      rotations = 2;
      break;
    case "down":
      rotations = 3;
      break;
  }

  let rotated = board;
  for (let i = 0; i < rotations; i++) {
    rotated = rotateBoard(rotated);
  }

  const result = moveBoardLeft(rotated);

  let finalBoard = result.board;
  const reverseRotations = (4 - rotations) % 4;
  for (let i = 0; i < reverseRotations; i++) {
    finalBoard = rotateBoard(finalBoard);
  }

  finalBoard = syncTilePositions(finalBoard);

  return { board: finalBoard, score: result.score, moved: result.moved };
};

export const hasWon = (board: Board): boolean => {
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col]?.value === 2048) {
        return true;
      }
    }
  }
  return false;
};

export const canMove = (board: Board): boolean => {
  if (getEmptyPositions(board).length > 0) return true;

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const tile = board[row][col];
      if (!tile) continue;
      if (col + 1 < BOARD_SIZE && board[row][col + 1]?.value === tile.value) {
        return true;
      }
      if (row + 1 < BOARD_SIZE && board[row + 1][col]?.value === tile.value) {
        return true;
      }
    }
  }
  return false;
};

export const clearTileFlags = (board: Board): Board => {
  return board.map((row) =>
    row.map((tile) => (tile ? { ...tile, isNew: false, isMerged: false } : null))
  );
};
