import { useEffect, useRef } from "react";
import { Direction } from "../types/game";

interface UseTouchOptions {
  onSwipe: (direction: Direction) => void;
  threshold?: number;
}

export const useTouch = <T extends HTMLElement>({
  onSwipe,
  threshold = 30,
}: UseTouchOptions) => {
  const ref = useRef<T | null>(null);
  const startX = useRef<number>(0);
  const startY = useRef<number>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      startX.current = touch.clientX;
      startY.current = touch.clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - startX.current;
      const deltaY = touch.clientY - startY.current;

      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      if (Math.max(absX, absY) < threshold) return;

      if (absX > absY) {
        onSwipe(deltaX > 0 ? "right" : "left");
      } else {
        onSwipe(deltaY > 0 ? "down" : "up");
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
    };

    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchend", handleTouchEnd, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchend", handleTouchEnd);
      el.removeEventListener("touchmove", handleTouchMove);
    };
  }, [onSwipe, threshold]);

  return ref;
};
