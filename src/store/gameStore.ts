import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Card, GameStatus, SLOT_SIZE } from "../types/game";
import {
  createInitialCards,
  updateBlockedStatus,
  checkElimination,
  checkGameOver,
  checkGameWin,
} from "../utils/gameLogic";

interface GameStore {
  cards: Card[];
  slot: (Card | null)[];
  gameStatus: GameStatus;
  steps: number;
  eliminatedCount: number;
  totalCards: number;
  bestScore: number;
  startGame: () => void;
  resetGame: () => void;
  selectCard: (cardId: string) => void;
}

const initGame = () => {
  const cards = createInitialCards();
  const slot: (Card | null)[] = Array(SLOT_SIZE).fill(null);

  return {
    cards,
    slot,
    gameStatus: "idle" as GameStatus,
    steps: 0,
    eliminatedCount: 0,
    totalCards: cards.length,
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

      resetGame: () => {
        const newState = initGame();
        set({
          ...newState,
          gameStatus: "idle",
        });
      },

      selectCard: (cardId: string) => {
        const { cards, slot, gameStatus, steps, eliminatedCount, totalCards } = get();
        if (gameStatus !== "playing") return;

        const card = cards.find((c) => c.id === cardId);
        if (!card || card.isRemoved || card.isBlocked) return;

        const emptyIndex = slot.findIndex((c) => c === null);
        if (emptyIndex === -1) return;

        const newCards = cards.map((c) =>
          c.id === cardId ? { ...c, isRemoved: true } : c
        );

        const newSlot = [...slot];
        newSlot[emptyIndex] = card;

        const { newSlot: afterElimination, eliminated } = checkElimination(newSlot);

        const updatedCards = updateBlockedStatus(newCards);

        const newEliminatedCount = eliminatedCount + eliminated.length;
        const newSteps = steps + 1;

        const isWin = checkGameWin(updatedCards);
        const isOver = checkGameOver(afterElimination);

        let newStatus: GameStatus = "playing";
        let newBestScore = get().bestScore;

        if (isWin) {
          newStatus = "won";
          newBestScore = Math.max(newBestScore, totalCards - newSteps);
        } else if (isOver) {
          newStatus = "lost";
        }

        set({
          cards: updatedCards,
          slot: afterElimination,
          steps: newSteps,
          eliminatedCount: newEliminatedCount,
          gameStatus: newStatus,
          bestScore: newBestScore,
        });
      },
    }),
    {
      name: "sheep-game-storage",
      partialize: (state) => ({ bestScore: state.bestScore }),
    }
  )
);
