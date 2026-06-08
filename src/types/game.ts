export interface Tile {
  id: number;
  value: number;
  row: number;
  col: number;
  isNew?: boolean;
  isMerged?: boolean;
}

export type Board = (Tile | null)[][];

export type Direction = "up" | "down" | "left" | "right";

export type GameStatus = "playing" | "won" | "over";

export interface GameState {
  board: Board;
  score: number;
  bestScore: number;
  gameStatus: GameStatus;
}

export interface MoveResult {
  board: Board;
  score: number;
  moved: boolean;
}
