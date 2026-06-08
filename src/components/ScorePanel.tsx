interface ScorePanelProps {
  score: number;
  bestScore: number;
}

export const ScorePanel = ({ score, bestScore }: ScorePanelProps) => {
  return (
    <div className="flex gap-2">
      <ScoreCard label="分数" value={score} />
      <ScoreCard label="最高分" value={bestScore} />
    </div>
  );
};

const ScoreCard = ({ label, value }: { label: string; value: number }) => (
  <div className="bg-board rounded-md px-4 py-2 text-center min-w-[90px]">
    <div className="text-[11px] uppercase tracking-wider text-text-light/80 font-bold">
      {label}
    </div>
    <div className="text-xl font-bold text-text-light">{value}</div>
  </div>
);
