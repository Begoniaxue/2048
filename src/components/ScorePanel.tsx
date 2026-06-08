interface ScorePanelProps {
  score: number;
  bestScore: number;
  currentLevel: number;
  totalLevels: number;
  lives: number;
  maxLives: number;
  timeLeft: number;
  maxTime: number;
}

export const ScorePanel = ({
  score,
  bestScore,
  currentLevel,
  totalLevels,
  lives,
  maxLives,
  timeLeft,
  maxTime,
}: ScorePanelProps) => {
  const isUrgent = timeLeft <= 5;

  return (
    <div className="flex flex-wrap gap-2 justify-end">
      <StatusCard label="关卡" value={`${currentLevel}/${totalLevels}`} accent />
      <StatusCard
        label="时间"
        value={`${timeLeft}s`}
        danger={isUrgent}
        pulse={isUrgent}
      />
      <StatusCard label="分数" value={score.toString()} />
      <StatusCard label="最高分" value={bestScore.toString()} />
      <LivesCard lives={lives} maxLives={maxLives} />
    </div>
  );
};

const StatusCard = ({
  label,
  value,
  accent = false,
  danger = false,
  pulse = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
  danger?: boolean;
  pulse?: boolean;
}) => (
  <div
    className={`rounded-md px-4 py-2 text-center min-w-[80px] transition-colors ${
      accent
        ? "bg-accent"
        : danger
          ? "bg-wrong-cell"
          : "bg-board"
    } ${pulse ? "animate-pulse" : ""}`}
  >
    <div className="text-[11px] uppercase tracking-wider text-text-light/80 font-bold">
      {label}
    </div>
    <div className="text-xl font-bold text-text-light">{value}</div>
  </div>
);

const LivesCard = ({ lives, maxLives }: { lives: number; maxLives: number }) => (
  <div className="rounded-md px-4 py-2 text-center min-w-[80px] bg-board">
    <div className="text-[11px] uppercase tracking-wider text-text-light/80 font-bold">
      机会
    </div>
    <div className="text-xl font-bold flex justify-center gap-1 mt-0.5">
      {Array.from({ length: maxLives }).map((_, i) => (
        <span
          key={i}
          className={`transition-all duration-200 ${
            i < lives ? "text-red-400 scale-100" : "text-text-light/30 scale-75"
          }`}
        >
          ♥
        </span>
      ))}
    </div>
  </div>
);
