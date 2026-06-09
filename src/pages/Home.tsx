import { useGameStore } from "../store/gameStore";
import { BoardComponent } from "../components/Board";
import { Slot } from "../components/Slot";
import { ScorePanel } from "../components/ScorePanel";
import { Modal } from "../components/Modal";

export const Home = () => {
  const {
    cards,
    slot,
    gameStatus,
    steps,
    eliminatedCount,
    totalCards,
    bestScore,
    startGame,
    resetGame,
    selectCard,
  } = useGameStore();

  const handleStart = () => {
    startGame();
  };

  const handleRestart = () => {
    resetGame();
    setTimeout(() => startGame(), 0);
  };

  const getStatusTip = () => {
    const slotFilled = slot.filter((c) => c !== null).length;
    if (slotFilled >= 5) {
      return { text: "⚠️ 卡槽快满了！", color: "text-red-300" };
    }
    if (slotFilled >= 3) {
      return { text: "💡 注意消除相同卡牌", color: "text-yellow-300" };
    }
    const remaining = totalCards - eliminatedCount;
    if (remaining <= 6) {
      return { text: "✨ 即将通关！加油！", color: "text-green-300" };
    }
    return { text: "🎮 点击未被遮挡的卡牌", color: "text-white/70" };
  };

  const statusTip = getStatusTip();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 via-green-700 to-emerald-800 flex flex-col items-center p-4 overflow-x-hidden">
      <div className="w-full max-w-md flex flex-col items-center gap-4">
        <div className="text-center">
          <h1 className="text-4xl font-black text-white tracking-tight leading-none drop-shadow-lg">
            🐑 田园消消乐
          </h1>
          <p className="text-sm text-white/60 mt-1">
            匹配三张相同的卡牌消除它们
          </p>
        </div>

        <ScorePanel
          steps={steps}
          eliminatedCount={eliminatedCount}
          totalCards={totalCards}
          bestScore={bestScore}
        />

        <div className={`text-center text-sm ${statusTip.color} font-medium`}>
          {statusTip.text}
        </div>

        <BoardComponent cards={cards} onCardClick={selectCard} />

        <Slot slot={slot} />

        {gameStatus === "playing" && (
          <div className="flex gap-2">
            <button
              onClick={handleRestart}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-lg transition-all active:scale-95 shadow-lg"
            >
              🔄 重新开局
            </button>
          </div>
        )}

        <div className="text-center text-xs text-white/50 max-w-xs mt-2">
          <p>
            💡 游戏规则：点击未被遮挡的卡牌将其放入底部卡槽，
            集齐三张相同的卡牌会自动消除。
          </p>
          <p className="mt-1">
            清空所有卡牌即可通关，卡槽占满则游戏失败。
          </p>
        </div>
      </div>

      {gameStatus === "idle" && (
        <Modal
          title="准备好了吗？"
          subtitle="收集三张相同的田园卡牌即可消除，清空全部卡牌通关！"
          buttonText="开始游戏"
          onClose={handleStart}
          accentClass="bg-green-500"
          isWin={true}
        />
      )}

      {gameStatus === "won" && (
        <Modal
          title="恭喜通关！"
          subtitle="你成功消除了所有卡牌，太厉害了！"
          steps={steps}
          score={bestScore}
          buttonText="再来一局"
          onClose={handleRestart}
          secondaryButtonText="返回首页"
          onSecondary={resetGame}
          accentClass="bg-green-500"
          isWin={true}
        />
      )}

      {gameStatus === "lost" && (
        <Modal
          title="游戏结束"
          subtitle="卡槽已满，无法继续放置卡牌了"
          steps={steps}
          buttonText="再来一局"
          onClose={handleRestart}
          secondaryButtonText="返回首页"
          onSecondary={resetGame}
          accentClass="bg-red-500"
          isWin={false}
        />
      )}
    </div>
  );
};

export default Home;
