export interface Level {
  id: number;
  correctChar: string;
  wrongChar: string;
  rows: number;
  cols: number;
  wrongCount: number;
}

export type TetrominoType = "I" | "O" | "T" | "S" | "Z" | "J" | "L";

export type CellValue = TetrominoType | null;

export type GameBoard = CellValue[][];

export interface Position {
  x: number;
  y: number;
}

export interface Tetromino {
  type: TetrominoType;
  shape: number[][];
  position: Position;
}

export type GameStatus = "idle" | "playing" | "paused" | "over";

export interface GameState {
  board: GameBoard;
  currentPiece: Tetromino | null;
  nextPiece: Tetromino | null;
  score: number;
  bestScore: number;
  level: number;
  lines: number;
  gameStatus: GameStatus;
}

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

export const TETROMINO_COLORS: Record<TetrominoType, string> = {
  I: "bg-cyan-400",
  O: "bg-yellow-400",
  T: "bg-purple-500",
  S: "bg-green-500",
  Z: "bg-red-500",
  J: "bg-blue-500",
  L: "bg-orange-500",
};

export const TETROMINO_SHAPES: Record<TetrominoType, number[][]> = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
};
