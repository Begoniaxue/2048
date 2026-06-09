import { CARD_EMOJIS, CARD_TYPES } from "../types/game";

interface ScorePanelProps {
  steps: number;
  eliminatedCount: number;
  totalCards: number;
  bestScore: number;
}

export const ScorePanel = ({ steps, eliminatedCount, totalCards, bestScore }: ScorePanelProps) => {
  const progress = totalCards > 0 ? Math.round((eliminatedCount / totalCards) * 100) : 0;
  const remaining = totalCards - eliminatedCount;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gradient-to-r from-amber-700 to-amber-800 rounded-xl p-4 shadow-lg">
        <div className="flex justify-between items-center mb-3">
          <div className="text-center">
            <div className="text-xs text-amber-200 uppercase tracking-wider">步数</div>
            <div className="text-2xl font-bold text-white">{steps}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-amber-200 uppercase tracking-wider">剩余</div>
            <div className="text-2xl font-bold text-white">{remaining}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-amber-200 uppercase tracking-wider">最佳</div>
            <div className="text-2xl font-bold text-yellow-300">{bestScore}</div>
          </div>
        </div>

        <div className="mb-3">
          <div className="flex justify-between text-xs text-amber-200 mb-1">
            <span>进度</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-amber-900/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-green-400 transition-all duration-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex justify-center gap-2">
          {CARD_TYPES.map((type) => (
            <div key={type} className="text-lg" title={type}>
              {CARD_EMOJIS[type]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
