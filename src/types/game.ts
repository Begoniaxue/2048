export type CardType = "chicken" | "duck" | "goose" | "sheep" | "cow" | "pig";

export interface Card {
  id: string;
  type: CardType;
  layer: number;
  x: number;
  y: number;
  isBlocked: boolean;
  isRemoved: boolean;
}

export type GameStatus = "idle" | "playing" | "won" | "lost";

export interface GameState {
  cards: Card[];
  slot: (Card | null)[];
  gameStatus: GameStatus;
  steps: number;
  eliminatedCount: number;
  totalCards: number;
}

export const SLOT_SIZE = 7;
export const TOTAL_LAYERS = 3;
export const CARDS_PER_TYPE = 6;

export const CARD_EMOJIS: Record<CardType, string> = {
  chicken: "🐔",
  duck: "🦆",
  goose: "🦢",
  sheep: "🐑",
  cow: "🐄",
  pig: "🐷",
};

export const CARD_NAMES: Record<CardType, string> = {
  chicken: "小鸡",
  duck: "小鸭",
  goose: "白鹅",
  sheep: "绵羊",
  cow: "奶牛",
  pig: "小猪",
};

export const CARD_COLORS: Record<CardType, string> = {
  chicken: "bg-yellow-100 border-yellow-300",
  duck: "bg-blue-100 border-blue-300",
  goose: "bg-white border-gray-300",
  sheep: "bg-gray-100 border-gray-400",
  cow: "bg-amber-100 border-amber-300",
  pig: "bg-pink-100 border-pink-300",
};

export const CARD_TYPES: CardType[] = ["chicken", "duck", "goose", "sheep", "cow", "pig"];
