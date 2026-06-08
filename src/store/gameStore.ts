import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CharBoard, GameStatus, GameOverReason } from "../types/game";
import { LEVELS } from "../utils/levels";
import { generateBoard, getTotalWrongInBoard } from "../utils/gameLogic";

interface GameStore {
  currentLevel: number;
  score: number;
  bestScore: number;
  lives: number;
  maxLives: number;
  totalLevels: number;
  board: CharBoard;
  gameStatus: GameStatus;
  wrongClickedIds: number[];
  correctClickedIds: number[];
  remainingWrongs: number;
  timeLeft: number;
  maxTime: number;
  gameOverReason: GameOverReason;
  resetGame: () => void;
  handleCellClick: (cellId: number, isWrong: boolean) => void;
  nextLevel: () => void;
  tick: () => void;
}

const MAX_LIVES = 3;
const TOTAL_LEVELS = LEVELS.length;
const SCORE_PER_CORRECT = 100;
const SCORE_PER_LEVEL_BONUS = 50;
const MAX_TIME = 15;

const initGame = () => {
  const firstLevel = LEVELS[0];
  const board = generateBoard(firstLevel);
  return {
    currentLevel: 1,
    score: 0,
    lives: MAX_LIVES,
    maxLives: MAX_LIVES,
    totalLevels: TOTAL_LEVELS,
    board,
    gameStatus: "playing" as GameStatus,
    wrongClickedIds: [] as number[],
    correctClickedIds: [] as number[],
    remainingWrongs: getTotalWrongInBoard(board),
    timeLeft: MAX_TIME,
    maxTime: MAX_TIME,
    gameOverReason: null as GameOverReason,
  };
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...initGame(),
      bestScore: 0,

      resetGame: () => {
        set({
          ...initGame(),
        });
      },

      tick: () => {
        const { gameStatus, timeLeft, remainingWrongs, currentLevel, totalLevels } = get();
        if (gameStatus !== "playing") return;
        if (remainingWrongs === 0 && currentLevel < totalLevels) return;

        const newTimeLeft = timeLeft - 1;
        if (newTimeLeft <= 0) {
          set({
            timeLeft: 0,
            gameStatus: "over",
            gameOverReason: "time",
          });
        } else {
          set({ timeLeft: newTimeLeft });
        }
      },

      handleCellClick: (cellId: number, isWrong: boolean) => {
        const {
          gameStatus,
          wrongClickedIds,
          correctClickedIds,
          lives,
          score,
          currentLevel,
          remainingWrongs,
          bestScore,
        } = get();

        if (gameStatus !== "playing") return;
        if (wrongClickedIds.includes(cellId) || correctClickedIds.includes(cellId)) return;

        if (isWrong) {
          const newCorrectClickedIds = [...correctClickedIds, cellId];
          const newRemainingWrongs = remainingWrongs - 1;
          const newScore = score + SCORE_PER_CORRECT;

          if (newRemainingWrongs <= 0) {
            const timeBonus = Math.floor(get().timeLeft * 10);
            const levelBonus = SCORE_PER_LEVEL_BONUS * lives;
            const finalLevelScore = newScore + levelBonus + timeBonus;
            const newBestScore = Math.max(bestScore, finalLevelScore);

            if (currentLevel >= TOTAL_LEVELS) {
              set({
                correctClickedIds: newCorrectClickedIds,
                remainingWrongs: 0,
                score: finalLevelScore,
                gameStatus: "won",
                bestScore: newBestScore,
              });
            } else {
              set({
                correctClickedIds: newCorrectClickedIds,
                remainingWrongs: 0,
                score: finalLevelScore,
                bestScore: newBestScore,
              });
            }
          } else {
            const newBestScore = Math.max(bestScore, newScore);
            set({
              correctClickedIds: newCorrectClickedIds,
              remainingWrongs: newRemainingWrongs,
              score: newScore,
              bestScore: newBestScore,
            });
          }
        } else {
          const newLives = lives - 1;
          const newWrongClickedIds = [...wrongClickedIds, cellId];

          if (newLives <= 0) {
            set({
              wrongClickedIds: newWrongClickedIds,
              lives: 0,
              gameStatus: "over",
              gameOverReason: "lives",
            });
          } else {
            set({
              wrongClickedIds: newWrongClickedIds,
              lives: newLives,
            });
          }
        }
      },

      nextLevel: () => {
        const { currentLevel } = get();
        if (currentLevel >= TOTAL_LEVELS) return;

        const nextLevelIdx = currentLevel;
        const level = LEVELS[nextLevelIdx];
        const newBoard = generateBoard(level);

        set({
          currentLevel: currentLevel + 1,
          board: newBoard,
          wrongClickedIds: [],
          correctClickedIds: [],
          remainingWrongs: getTotalWrongInBoard(newBoard),
          timeLeft: MAX_TIME,
        });
      },
    }),
    {
      name: "char-spot-diff-storage",
      partialize: (state) => ({ bestScore: state.bestScore }),
    }
  )
);
