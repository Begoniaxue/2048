import { Card, CardType, CARD_TYPES, CARDS_PER_TYPE, TOTAL_LAYERS, SLOT_SIZE } from "../types/game";

const generateId = () => Math.random().toString(36).substring(2, 9);

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const createCardDeck = (): CardType[] => {
  const deck: CardType[] = [];
  CARD_TYPES.forEach((type) => {
    for (let i = 0; i < CARDS_PER_TYPE; i++) {
      deck.push(type);
    }
  });
  return shuffleArray(deck);
};

const generateLayerPositions = (layer: number, totalCards: number): { x: number; y: number }[] => {
  const positions: { x: number; y: number }[] = [];
  const baseGridSize = Math.ceil(Math.sqrt(totalCards * 1.5));
  const offsetX = layer * 12 + 10;
  const offsetY = layer * 12 + 10;
  const cardSpacing = 52;

  for (let row = 0; row < baseGridSize && positions.length < totalCards; row++) {
    for (let col = 0; col < baseGridSize && positions.length < totalCards; col++) {
      positions.push({
        x: col * cardSpacing + offsetX + (Math.random() - 0.5) * 15,
        y: row * cardSpacing + offsetY + (Math.random() - 0.5) * 15,
      });
    }
  }

  while (positions.length < totalCards) {
    positions.push({
      x: Math.random() * 200 + offsetX,
      y: Math.random() * 200 + offsetY,
    });
  }

  return shuffleArray(positions).slice(0, totalCards);
};

export const createInitialCards = (): Card[] => {
  const deck = createCardDeck();
  const cardsPerLayer = Math.ceil(deck.length / TOTAL_LAYERS);
  const cards: Card[] = [];

  let cardIndex = 0;

  for (let layer = 0; layer < TOTAL_LAYERS; layer++) {
    const layerCardCount = Math.min(cardsPerLayer, deck.length - cardIndex);
    const positions = generateLayerPositions(layer, layerCardCount);

    for (let i = 0; i < layerCardCount && cardIndex < deck.length; i++) {
      const type = deck[cardIndex];
      const pos = positions[i];
      cards.push({
        id: generateId(),
        type,
        layer,
        x: pos.x,
        y: pos.y,
        isBlocked: false,
        isRemoved: false,
      });
      cardIndex++;
    }
  }

  return updateBlockedStatus(cards);
};

const checkOverlap = (card1: Card, card2: Card): boolean => {
  const cardWidth = 52;
  const cardHeight = 52;
  const overlapX = Math.abs(card1.x - card2.x) < cardWidth * 0.7;
  const overlapY = Math.abs(card1.y - card2.y) < cardHeight * 0.7;
  return overlapX && overlapY;
};

export const updateBlockedStatus = (cards: Card[]): Card[] => {
  return cards.map((card) => {
    if (card.isRemoved) return card;

    const isBlocked = cards.some(
      (otherCard) =>
        !otherCard.isRemoved &&
        otherCard.layer > card.layer &&
        checkOverlap(card, otherCard)
    );

    return { ...card, isBlocked };
  });
};

export const addCardToSlot = (slot: (Card | null)[], card: Card): (Card | null)[] => {
  const emptyIndex = slot.findIndex((c) => c === null);
  if (emptyIndex === -1) return slot;

  const newSlot = [...slot];
  const cardType = card.type;

  const typeCount = newSlot.filter((c) => c?.type === cardType).length;

  if (typeCount >= 2) {
    let removed = 0;
    for (let i = 0; i < newSlot.length && removed < 2; i++) {
      if (newSlot[i]?.type === cardType) {
        newSlot[i] = null;
        removed++;
      }
    }
    return newSlot.filter((c) => c !== null).concat(Array(SLOT_SIZE).fill(null)).slice(0, SLOT_SIZE);
  }

  newSlot[emptyIndex] = card;
  return newSlot;
};

export const checkElimination = (slot: (Card | null)[]): { newSlot: (Card | null)[]; eliminated: Card[] } => {
  const typeCounts: Record<string, Card[]> = {};

  slot.forEach((card) => {
    if (card) {
      if (!typeCounts[card.type]) {
        typeCounts[card.type] = [];
      }
      typeCounts[card.type].push(card);
    }
  });

  const eliminated: Card[] = [];
  const newSlot: (Card | null)[] = [...slot];

  Object.keys(typeCounts).forEach((type) => {
    if (typeCounts[type].length >= 3) {
      const toEliminate = typeCounts[type].slice(0, 3);
      toEliminate.forEach((card) => {
        const idx = newSlot.findIndex((c) => c?.id === card.id);
        if (idx !== -1) {
          newSlot[idx] = null;
          eliminated.push(card);
        }
      });
    }
  });

  const compacted = newSlot.filter((c) => c !== null);
  while (compacted.length < SLOT_SIZE) {
    compacted.push(null);
  }

  return { newSlot: compacted, eliminated };
};

export const checkGameOver = (slot: (Card | null)[]): boolean => {
  return slot.every((c) => c !== null);
};

export const checkGameWin = (cards: Card[]): boolean => {
  return cards.every((card) => card.isRemoved);
};
