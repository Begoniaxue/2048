import { Tetromino, TETROMINO_COLORS } from "../types/game";

interface ScorePanelProps {
  score: number;
  bestScore: number;
  level: number;
  lines: number;
  nextPiece: Tetromino | null;
}

export const ScorePanel = ({
  score,
  bestScore,
  level,
  lines,
  nextPiece,
}: ScorePanelProps) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="grid grid-cols-2 gap-2">
        <StatusCard label="分数" value={score.toString()} accent />
        <StatusCard label="最高分" value={bestScore.toString()} />
        <StatusCard label="等级" value={level.toString()} />
        <StatusCard label="消行" value={lines.toString()} />
      </div>

      <div className="bg-board rounded-lg p-3">
        <div className="text-[11px] uppercase tracking-wider text-text-light/80 font-bold mb-2 text-center">
          下一个
        </div>
        <div className="flex items-center justify-center">
          {nextPiece && <NextPiecePreview piece={nextPiece} />}
        </div>
      </div>
    </div>
  );
};

const NextPiecePreview = ({ piece }: { piece: Tetromino }) => {
  const { shape, type } = piece;
  const colorClass = TETROMINO_COLORS[type];

  return (
    <div
      className="grid gap-0.5"
      style={{
        gridTemplateColumns: `repeat(${shape[0].length}, 1fr)`,
        gridTemplateRows: `repeat(${shape.length}, 1fr)`,
        width: "80px",
        height: "80px",
      }}
    >
      {shape.map((row, y) =>
        row.map((cell, x) => (
          <div
            key={`${y}-${x}`}
            className={`rounded-sm ${
              cell ? `${colorClass} border border-white/30` : "bg-transparent"
            }`}
          />
        ))
      )}
    </div>
  );
};

const StatusCard = ({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) => (
  <div
    className={`rounded-lg px-3 py-2 text-center ${
      accent ? "bg-accent" : "bg-board"
    }`}
  >
    <div className="text-[11px] uppercase tracking-wider text-text-light/80 font-bold">
      {label}
    </div>
    <div className="text-xl font-bold text-text-light">{value}</div>
  </div>
);
