import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Board, GameStatus } from "../types/game";
import {
  initBoard,
  move,
  addRandomTile,
  hasWon,
  canMove,
  clearTileFlags,
} from "../utils/gameLogic";
import type { Direction } from "../types/game";

interface GameStore {
  board: Board;
  score: number;
  bestScore: number;
  gameStatus: GameStatus;
  resetGame: () => void;
  handleMove: (direction: Direction) => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      board: initBoard(),
      score: 0,
      bestScore: 0,
      gameStatus: "playing",

      resetGame: () => {
        set({
          board: initBoard(),
          score: 0,
          gameStatus: "playing",
        });
      },

      handleMove: (direction: Direction) => {
        const { board, score, bestScore, gameStatus } = get();
        if (gameStatus !== "playing") return;

        const clearedBoard = clearTileFlags(board);
        const result = move(clearedBoard, direction);

        if (!result.moved) return;

        const newBoard = addRandomTile(result.board);
        const newScore = score + result.score;
        const newBestScore = Math.max(bestScore, newScore);

        let newStatus: GameStatus = "playing";
        if (hasWon(newBoard)) {
          newStatus = "won";
        } else if (!canMove(newBoard)) {
          newStatus = "over";
        }

        set({
          board: newBoard,
          score: newScore,
          bestScore: newBestScore,
          gameStatus: newStatus,
        });
      },
    }),
    {
      name: "game-2048-storage",
      partialize: (state) => ({ bestScore: state.bestScore }),
    }
  )
);
