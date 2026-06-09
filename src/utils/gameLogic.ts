import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  TETROMINO_SHAPES,
  TetrominoType,
  Tetromino,
  GameBoard,
  Position,
} from "../types/game";

const TETROMINO_TYPES: TetrominoType[] = ["I", "O", "T", "S", "Z", "J", "L"];

export const createEmptyBoard = (): GameBoard => {
  return Array.from({ length: BOARD_HEIGHT }, () =>
    Array(BOARD_WIDTH).fill(null)
  );
};

export const getRandomTetrominoType = (): TetrominoType => {
  return TETROMINO_TYPES[Math.floor(Math.random() * TETROMINO_TYPES.length)];
};

export const createTetromino = (type: TetrominoType): Tetromino => {
  const shape = TETROMINO_SHAPES[type].map((row) => [...row]);
  return {
    type,
    shape,
    position: {
      x: Math.floor((BOARD_WIDTH - shape[0].length) / 2),
      y: 0,
    },
  };
};

export const rotateMatrix = (matrix: number[][]): number[][] => {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const rotated: number[][] = [];

  for (let c = 0; c < cols; c++) {
    const newRow: number[] = [];
    for (let r = rows - 1; r >= 0; r--) {
      newRow.push(matrix[r][c]);
    }
    rotated.push(newRow);
  }

  return rotated;
};

export const checkCollision = (
  board: GameBoard,
  piece: Tetromino,
  offset: Position = { x: 0, y: 0 }
): boolean => {
  const { shape, position } = piece;

  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const newX = position.x + x + offset.x;
        const newY = position.y + y + offset.y;

        if (
          newX < 0 ||
          newX >= BOARD_WIDTH ||
          newY >= BOARD_HEIGHT ||
          (newY >= 0 && board[newY][newX] !== null)
        ) {
          return true;
        }
      }
    }
  }

  return false;
};

export const lockPiece = (board: GameBoard, piece: Tetromino): GameBoard => {
  const newBoard = board.map((row) => [...row]);
  const { shape, position, type } = piece;

  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const boardY = position.y + y;
        const boardX = position.x + x;
        if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
          newBoard[boardY][boardX] = type;
        }
      }
    }
  }

  return newBoard;
};

export const clearLines = (
  board: GameBoard
): { newBoard: GameBoard; linesCleared: number } => {
  const newBoard = board.filter((row) => row.some((cell) => cell === null));
  const linesCleared = BOARD_HEIGHT - newBoard.length;

  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array(BOARD_WIDTH).fill(null));
  }

  return { newBoard, linesCleared };
};

export const calculateScore = (linesCleared: number, level: number): number => {
  const lineScores = [0, 100, 300, 500, 800];
  return lineScores[linesCleared] * (level + 1);
};

export const calculateLevel = (lines: number): number => {
  return Math.floor(lines / 10);
};

export const getDropSpeed = (level: number): number => {
  return Math.max(100, 1000 - level * 100);
};

export const getGhostPosition = (
  board: GameBoard,
  piece: Tetromino
): Position => {
  let ghostY = piece.position.y;

  while (!checkCollision(board, { ...piece, position: { ...piece.position, y: ghostY + 1 } })) {
    ghostY++;
  }

  return { x: piece.position.x, y: ghostY };
};
