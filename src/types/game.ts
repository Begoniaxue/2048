export interface CharacterCell {
  id: number;
  char: string;
  isWrong: boolean;
  row: number;
  col: number;
}

export type CharBoard = CharacterCell[][];

export interface Level {
  id: number;
  correctChar: string;
  wrongChar: string;
  rows: number;
  cols: number;
  wrongCount: number;
}

export type GameStatus = "playing" | "won" | "over";

export interface GameState {
  currentLevel: number;
  score: number;
  lives: number;
  maxLives: number;
  totalLevels: number;
  board: CharBoard;
  gameStatus: GameStatus;
  wrongClickedIds: number[];
  correctClickedIds: number[];
}
