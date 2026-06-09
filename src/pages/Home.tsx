import { useEffect, useCallback, useRef } from "react";
import { useGameStore } from "../store/gameStore";
import { BoardComponent } from "../components/Board";
import { ScorePanel } from "../components/ScorePanel";
import { Modal } from "../components/Modal";
import { getDropSpeed } from "../utils/gameLogic";

export const Home = () => {
  const {
    board,
    currentPiece,
    nextPiece,
    score,
    bestScore,
    level,
    lines,
    gameStatus,
    startGame,
    pauseGame,
    resumeGame,
    resetGame,
    moveLeft,
    moveRight,
    moveDown,
    rotate,
    hardDrop,
    tick,
  } = useGameStore();

  const gameLoopRef = useRef<number | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (gameStatus === "over" || gameStatus === "idle") return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          moveLeft();
          break;
        case "ArrowRight":
          e.preventDefault();
          moveRight();
          break;
        case "ArrowDown":
          e.preventDefault();
          moveDown();
          break;
        case "ArrowUp":
          e.preventDefault();
          rotate();
          break;
        case " ":
          e.preventDefault();
          hardDrop();
          break;
        case "p":
        case "P":
          e.preventDefault();
          if (gameStatus === "playing") {
            pauseGame();
          } else if (gameStatus === "paused") {
            resumeGame();
          }
          break;
        case "Escape":
          e.preventDefault();
          if (gameStatus === "playing") {
            pauseGame();
          } else if (gameStatus === "paused") {
            resumeGame();
          }
          break;
      }
    },
    [gameStatus, moveLeft, moveRight, moveDown, rotate, hardDrop, pauseGame, resumeGame]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (gameStatus === "playing") {
      const speed = getDropSpeed(level);
      gameLoopRef.current = window.setInterval(() => {
        tick();
      }, speed);

      return () => {
        if (gameLoopRef.current) {
          clearInterval(gameLoopRef.current);
        }
      };
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
    }
  }, [gameStatus, level, tick]);

  const handleStart = () => {
    startGame();
  };

  const handleRestart = () => {
    resetGame();
    setTimeout(() => startGame(), 0);
  };

  const handleResume = () => {
    resumeGame();
  };

  const handlePause = () => {
    pauseGame();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6">
        <div className="flex flex-col items-center gap-4">
          <div>
            <h1 className="text-5xl font-black text-white tracking-tight leading-none text-center">
              俄罗斯方块
            </h1>
            <p className="text-sm text-white/60 mt-2 text-center">
              TETRIS
            </p>
          </div>

          <BoardComponent board={board} currentPiece={currentPiece} />

          <div className="flex gap-2">
            {gameStatus === "playing" && (
              <button
                onClick={handlePause}
                className="px-6 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-white font-bold rounded-lg transition-all active:scale-95 shadow-md"
              >
                暂停
              </button>
            )}
            {gameStatus === "paused" && (
              <button
                onClick={handleResume}
                className="px-6 py-2.5 bg-green-500 hover:bg-green-400 text-white font-bold rounded-lg transition-all active:scale-95 shadow-md"
              >
                继续
              </button>
            )}
            {(gameStatus === "playing" || gameStatus === "paused") && (
              <button
                onClick={handleRestart}
                className="px-6 py-2.5 bg-red-500 hover:bg-red-400 text-white font-bold rounded-lg transition-all active:scale-95 shadow-md"
              >
                重新开始
              </button>
            )}
          </div>

          <div className="lg:hidden">
            <ScorePanel
              score={score}
              bestScore={bestScore}
              level={level}
              lines={lines}
              nextPiece={nextPiece}
            />
          </div>

          <div className="text-center text-xs text-white/50 max-w-xs">
            <p className="mb-1">
              <span className="font-bold">←→</span> 左右移动 ·{" "}
              <span className="font-bold">↓</span> 加速下落 ·{" "}
              <span className="font-bold">↑</span> 旋转
            </p>
            <p>
              <span className="font-bold">空格</span> 直接落下 ·{" "}
              <span className="font-bold">P/Esc</span> 暂停
            </p>
          </div>
        </div>

        <div className="hidden lg:block w-64">
          <ScorePanel
            score={score}
            bestScore={bestScore}
            level={level}
            lines={lines}
            nextPiece={nextPiece}
          />

          <div className="mt-4 bg-board rounded-lg p-4">
            <div className="text-[11px] uppercase tracking-wider text-text-light/80 font-bold mb-3">
              操作说明
            </div>
            <div className="text-sm text-text-light space-y-1">
              <p>
                <span className="font-bold">← →</span> 左右移动
              </p>
              <p>
                <span className="font-bold">↓</span> 加速下落
              </p>
              <p>
                <span className="font-bold">↑</span> 旋转方块
              </p>
              <p>
                <span className="font-bold">空格</span> 直接落下
              </p>
              <p>
                <span className="font-bold">P / Esc</span> 暂停游戏
              </p>
            </div>
          </div>

          <div className="mt-4 bg-board rounded-lg p-4">
            <div className="text-[11px] uppercase tracking-wider text-text-light/80 font-bold mb-3">
              计分规则
            </div>
            <div className="text-sm text-text-light space-y-1">
              <p>消1行: 100 × 等级</p>
              <p>消2行: 300 × 等级</p>
              <p>消3行: 500 × 等级</p>
              <p>消4行: 800 × 等级</p>
              <p>硬降落: 每格 +2分</p>
            </div>
          </div>
        </div>
      </div>

      {gameStatus === "idle" && (
        <Modal
          title="准备开始"
          subtitle="经典俄罗斯方块，等你来挑战！"
          buttonText="开始游戏"
          onClose={handleStart}
          accentClass="bg-cyan-500"
        />
      )}

      {gameStatus === "paused" && (
        <Modal
          title="游戏暂停"
          subtitle="休息一下，随时可以继续"
          buttonText="继续游戏"
          onClose={handleResume}
          secondaryButtonText="重新开始"
          onSecondary={handleRestart}
          accentClass="bg-yellow-500"
        />
      )}

      {gameStatus === "over" && (
        <Modal
          title="游戏结束"
          subtitle="方块已触顶，再接再厉！"
          score={score}
          buttonText="再来一局"
          onClose={handleRestart}
          accentClass="bg-red-500"
        />
      )}
    </div>
  );
};

export default Home;
