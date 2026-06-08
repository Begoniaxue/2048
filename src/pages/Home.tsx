import { useCallback } from "react";
import { useGameStore } from "../store/gameStore";
import { useKeyboard } from "../hooks/useKeyboard";
import { BoardComponent } from "../components/Board";
import { ScorePanel } from "../components/ScorePanel";
import { Modal } from "../components/Modal";
import { Direction } from "../types/game";

export const Home = () => {
  const { board, score, bestScore, gameStatus, handleMove, resetGame } =
    useGameStore();

  const onMove = useCallback(
    (direction: Direction) => {
      handleMove(direction);
    },
    [handleMove]
  );

  useKeyboard(onMove);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-6xl font-black text-text-dark tracking-tight leading-none">
              2048
            </h1>
            <p className="text-sm text-text-dark/60 mt-2">
              合并数字，达到 2048！
            </p>
          </div>
          <ScorePanel score={score} bestScore={bestScore} />
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xs text-text-dark/60">
            <p className="font-semibold">玩法说明：</p>
            <p>键盘方向键 或 滑动屏幕</p>
          </div>
          <button
            onClick={resetGame}
            className="px-5 py-2.5 bg-board hover:bg-board/90 text-white font-bold rounded-lg transition-all active:scale-95 shadow-md"
          >
            新游戏
          </button>
        </div>

        <BoardComponent board={board} onSwipe={onMove} />

        <div className="text-center text-xs text-text-dark/50">
          <p>合成 2048 即为通关 · 棋盘填满无法移动则游戏结束</p>
        </div>
      </div>

      {gameStatus === "won" && (
        <Modal
          title="🎉 恭喜通关！"
          subtitle="你成功合成了 2048！"
          score={score}
          buttonText="再来一局"
          onClose={resetGame}
          accentClass="bg-tile-2048"
        />
      )}

      {gameStatus === "over" && (
        <Modal
          title="游戏结束"
          subtitle="棋盘已满，没有可合并的方块了"
          score={score}
          buttonText="重新开始"
          onClose={resetGame}
          accentClass="bg-tile-64"
        />
      )}
    </div>
  );
};

export default Home;
