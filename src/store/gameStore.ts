import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GameBoard, Tetromino, GameStatus, BOARD_WIDTH, BOARD_HEIGHT } from "../types/game";
import {
  createEmptyBoard,
  createTetromino,
  getRandomTetrominoType,
  rotateMatrix,
  checkCollision,
  lockPiece,
  clearLines,
  calculateScore,
  calculateLevel,
} from "../utils/gameLogic";

interface GameStore {
  board: GameBoard;
  currentPiece: Tetromino | null;
  nextPiece: Tetromino | null;
  score: number;
  bestScore: number;
  level: number;
  lines: number;
  gameStatus: GameStatus;
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  resetGame: () => void;
  moveLeft: () => void;
  moveRight: () => void;
  moveDown: () => boolean;
  rotate: () => void;
  hardDrop: () => void;
  tick: () => void;
}

const initGame = () => {
  const board = createEmptyBoard();
  const currentPiece = createTetromino(getRandomTetrominoType());
  const nextPiece = createTetromino(getRandomTetrominoType());

  return {
    board,
    currentPiece,
    nextPiece,
    score: 0,
    level: 0,
    lines: 0,
    gameStatus: "idle" as GameStatus,
  };
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...initGame(),
      bestScore: 0,

      startGame: () => {
        const newState = initGame();
        set({
          ...newState,
          gameStatus: "playing",
        });
      },

      pauseGame: () => {
        const { gameStatus } = get();
        if (gameStatus === "playing") {
          set({ gameStatus: "paused" });
        }
      },

      resumeGame: () => {
        const { gameStatus } = get();
        if (gameStatus === "paused") {
          set({ gameStatus: "playing" });
        }
      },

      resetGame: () => {
        const newState = initGame();
        set({
          ...newState,
          gameStatus: "idle",
        });
      },

      moveLeft: () => {
        const { board, currentPiece, gameStatus } = get();
        if (gameStatus !== "playing" || !currentPiece) return;

        if (!checkCollision(board, currentPiece, { x: -1, y: 0 })) {
          set({
            currentPiece: {
              ...currentPiece,
              position: { ...currentPiece.position, x: currentPiece.position.x - 1 },
            },
          });
        }
      },

      moveRight: () => {
        const { board, currentPiece, gameStatus } = get();
        if (gameStatus !== "playing" || !currentPiece) return;

        if (!checkCollision(board, currentPiece, { x: 1, y: 0 })) {
          set({
            currentPiece: {
              ...currentPiece,
              position: { ...currentPiece.position, x: currentPiece.position.x + 1 },
            },
          });
        }
      },

      moveDown: () => {
        const { board, currentPiece, gameStatus } = get();
        if (gameStatus !== "playing" || !currentPiece) return false;

        if (!checkCollision(board, currentPiece, { x: 0, y: 1 })) {
          set({
            currentPiece: {
              ...currentPiece,
              position: { ...currentPiece.position, y: currentPiece.position.y + 1 },
            },
          });
          return true;
        }
        return false;
      },

      rotate: () => {
        const { board, currentPiece, gameStatus } = get();
        if (gameStatus !== "playing" || !currentPiece) return;

        const rotatedShape = rotateMatrix(currentPiece.shape);
        const rotatedPiece = { ...currentPiece, shape: rotatedShape };

        const kicks = [0, -1, 1, -2, 2];
        for (const kick of kicks) {
          if (!checkCollision(board, rotatedPiece, { x: kick, y: 0 })) {
            set({
              currentPiece: {
                ...rotatedPiece,
                position: { ...rotatedPiece.position, x: rotatedPiece.position.x + kick },
              },
            });
            return;
          }
        }
      },

      hardDrop: () => {
        const { board, currentPiece, gameStatus } = get();
        if (gameStatus !== "playing" || !currentPiece) return;

        let dropDistance = 0;
        while (!checkCollision(board, currentPiece, { x: 0, y: dropDistance + 1 })) {
          dropDistance++;
        }

        const droppedPiece = {
          ...currentPiece,
          position: { ...currentPiece.position, y: currentPiece.position.y + dropDistance },
        };

        const newBoard = lockPiece(board, droppedPiece);
        const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);

        const newLines = get().lines + linesCleared;
        const newLevel = calculateLevel(newLines);
        const newScore = get().score + calculateScore(linesCleared, get().level) + dropDistance * 2;
        const newBestScore = Math.max(get().bestScore, newScore);

        const nextPiece = get().nextPiece!;
        const newNextPiece = createTetromino(getRandomTetrominoType());

        if (checkCollision(clearedBoard, nextPiece)) {
          set({
            board: clearedBoard,
            currentPiece: null,
            score: newScore,
            bestScore: newBestScore,
            lines: newLines,
            level: newLevel,
            gameStatus: "over",
          });
        } else {
          set({
            board: clearedBoard,
            currentPiece: nextPiece,
            nextPiece: newNextPiece,
            score: newScore,
            bestScore: newBestScore,
            lines: newLines,
            level: newLevel,
          });
        }
      },

      tick: () => {
        const { board, currentPiece, nextPiece, gameStatus } = get();
        if (gameStatus !== "playing" || !currentPiece) return;

        if (!checkCollision(board, currentPiece, { x: 0, y: 1 })) {
          set({
            currentPiece: {
              ...currentPiece,
              position: { ...currentPiece.position, y: currentPiece.position.y + 1 },
            },
          });
        } else {
          const newBoard = lockPiece(board, currentPiece);
          const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);

          const newLines = get().lines + linesCleared;
          const newLevel = calculateLevel(newLines);
          const newScore = get().score + calculateScore(linesCleared, get().level);
          const newBestScore = Math.max(get().bestScore, newScore);

          if (!nextPiece || checkCollision(clearedBoard, nextPiece)) {
            for (let y = 0; y < BOARD_HEIGHT; y++) {
              for (let x = 0; x < BOARD_WIDTH; x++) {
                if (clearedBoard[y][x] !== null && y < 2) {
                  set({
                    board: clearedBoard,
                    currentPiece: null,
                    score: newScore,
                    bestScore: newBestScore,
                    lines: newLines,
                    level: newLevel,
                    gameStatus: "over",
                  });
                  return;
                }
              }
            }
            set({
              board: clearedBoard,
              currentPiece: null,
              score: newScore,
              bestScore: newBestScore,
              lines: newLines,
              level: newLevel,
              gameStatus: "over",
            });
          } else {
            const newNextPiece = createTetromino(getRandomTetrominoType());
            set({
              board: clearedBoard,
              currentPiece: nextPiece,
              nextPiece: newNextPiece,
              score: newScore,
              bestScore: newBestScore,
              lines: newLines,
              level: newLevel,
            });
          }
        }
      },
    }),
    {
      name: "tetris-storage",
      partialize: (state) => ({ bestScore: state.bestScore }),
    }
  )
);
