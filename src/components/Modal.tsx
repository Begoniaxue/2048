interface ModalProps {
  title: string;
  subtitle?: string;
  score?: number;
  steps?: number;
  buttonText: string;
  onClose: () => void;
  secondaryButtonText?: string;
  onSecondary?: () => void;
  accentClass?: string;
  isWin?: boolean;
}

export const Modal = ({
  title,
  subtitle,
  score,
  steps,
  buttonText,
  onClose,
  secondaryButtonText,
  onSecondary,
  accentClass = "bg-accent",
  isWin = false,
}: ModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fade-in p-4">
      <div className="bg-white rounded-xl p-8 shadow-2xl max-w-sm w-full text-center animate-pop">
        <div className={`inline-block px-4 py-1 rounded-full ${accentClass} text-white text-sm font-bold mb-4`}>
          🐑 田园消消乐
        </div>
        <div className="text-6xl mb-4">
          {isWin ? "🎉" : "😢"}
        </div>
        <h2 className="text-3xl font-bold text-text-dark mb-2">{title}</h2>
        {subtitle && <p className="text-text-dark/60 mb-6">{subtitle}</p>}
        {(score !== undefined || steps !== undefined) && (
          <div className="bg-board/10 rounded-lg py-4 mb-6 space-y-2">
            {steps !== undefined && (
              <div>
                <div className="text-xs uppercase tracking-wider text-text-dark/50 mb-1">
                  操作步数
                </div>
                <div className="text-3xl font-bold text-text-dark">{steps}</div>
              </div>
            )}
            {score !== undefined && (
              <div>
                <div className="text-xs uppercase tracking-wider text-text-dark/50 mb-1">
                  最佳成绩
                </div>
                <div className="text-3xl font-bold text-accent">{score}</div>
              </div>
            )}
          </div>
        )}
        <div className="flex flex-col gap-2">
          {secondaryButtonText && onSecondary && (
            <button
              onClick={onSecondary}
              className="w-full py-3 bg-board-cell hover:bg-board-cell/80 text-text-dark font-bold rounded-lg transition-colors active:scale-95"
            >
              {secondaryButtonText}
            </button>
          )}
          <button
            onClick={onClose}
            className="w-full py-3 bg-board hover:bg-board/90 text-white font-bold rounded-lg transition-colors active:scale-95"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};
