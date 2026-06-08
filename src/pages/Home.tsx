import { useEffect, useState } from "react";
import { useGameStore } from "../store/gameStore";
import { BoardComponent } from "../components/Board";
import { ScorePanel } from "../components/ScorePanel";
import { Modal } from "../components/Modal";
import { LEVELS } from "../utils/levels";

export const Home = () => {
  const {
    board,
    score,
    bestScore,
    currentLevel,
    totalLevels,
    lives,
    maxLives,
    gameStatus,
    wrongClickedIds,
    correctClickedIds,
    remainingWrongs,
    timeLeft,
    maxTime,
    gameOverReason,
    handleCellClick,
    nextLevel,
    resetGame,
    tick,
  } = useGameStore();

  const [showLevelComplete, setShowLevelComplete] = useState(false);

  useEffect(() => {
    if (gameStatus !== "playing") return;
    if (showLevelComplete) return;

    const timer = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStatus, showLevelComplete, tick]);

  useEffect(() => {
    if (
      gameStatus === "playing" &&
      remainingWrongs === 0 &&
      currentLevel < totalLevels
    ) {
      setShowLevelComplete(true);
    }
  }, [remainingWrongs, gameStatus, currentLevel, totalLevels]);

  const handleNextLevel = () => {
    setShowLevelComplete(false);
    nextLevel();
  };

  const handleRestart = () => {
    setShowLevelComplete(false);
    resetGame();
  };

  const currentLevelData = LEVELS[currentLevel - 1];

  const getOverModalContent = () => {
    if (gameOverReason === "time") {
      return {
        title: "时间到！",
        subtitle: "倒计时结束，挑战失败",
        accentClass: "bg-wrong-cell",
      };
    }
    return {
      title: "游戏结束",
      subtitle: "机会已用完，再接再厉！",
      accentClass: "bg-wrong-cell",
    };
  };

  const overContent = getOverModalContent();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-5xl font-black text-text-dark tracking-tight leading-none">
              文字找茬
            </h1>
            <p className="text-sm text-text-dark/60 mt-2">
              找出所有不同的错别字！
            </p>
          </div>
          <ScorePanel
            score={score}
            bestScore={bestScore}
            currentLevel={currentLevel}
            totalLevels={totalLevels}
            lives={lives}
            maxLives={maxLives}
            timeLeft={timeLeft}
            maxTime={maxTime}
          />
        </div>

        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="text-xs text-text-dark/60">
            <p className="font-semibold">本关提示：</p>
            <p>
              找出"<span className="font-bold text-accent">{currentLevelData?.wrongChar}</span>"字，
              共 {currentLevelData?.wrongCount} 个 · 限时 {maxTime} 秒
            </p>
          </div>
          <button
            onClick={handleRestart}
            className="px-5 py-2.5 bg-board hover:bg-board/90 text-white font-bold rounded-lg transition-all active:scale-95 shadow-md"
          >
            重新开始
          </button>
        </div>

        <BoardComponent
          board={board}
          onCellClick={handleCellClick}
          wrongClickedIds={wrongClickedIds}
          correctClickedIds={correctClickedIds}
          disabled={gameStatus !== "playing" || showLevelComplete}
        />

        <div className="text-center text-xs text-text-dark/50">
          <p>点击错别字得分 · 剩余时间加分 · 共 {totalLevels} 关</p>
        </div>
      </div>

      {showLevelComplete && (
        <Modal
          title={`🎉 第 ${currentLevel} 关通过！`}
          subtitle="干得漂亮！准备进入下一关"
          buttonText="下一关"
          onClose={handleNextLevel}
          secondaryButtonText="重新开始"
          onSecondary={handleRestart}
          accentClass="bg-accent"
        />
      )}

      {gameStatus === "won" && (
        <Modal
          title="🏆 恭喜通关！"
          subtitle="你成功找出了所有错别字！"
          score={score}
          buttonText="再来一局"
          onClose={handleRestart}
          accentClass="bg-tile-2048"
        />
      )}

      {gameStatus === "over" && (
        <Modal
          title={overContent.title}
          subtitle={overContent.subtitle}
          score={score}
          buttonText="重新开始"
          onClose={handleRestart}
          accentClass={overContent.accentClass}
        />
      )}
    </div>
  );
};

export default Home;
