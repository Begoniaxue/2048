interface ModalProps {
  title: string;
  subtitle?: string;
  score: number;
  buttonText: string;
  onClose: () => void;
  accentClass?: string;
}

export const Modal = ({
  title,
  subtitle,
  score,
  buttonText,
  onClose,
  accentClass = "bg-tile-2048",
}: ModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in">
      <div className="bg-white rounded-xl p-8 shadow-2xl max-w-sm w-[90%] text-center animate-pop">
        <div className={`inline-block px-4 py-1 rounded-full ${accentClass} text-white text-sm font-bold mb-4`}>
          2048
        </div>
        <h2 className="text-3xl font-bold text-text-dark mb-2">{title}</h2>
        {subtitle && <p className="text-text-dark/60 mb-6">{subtitle}</p>}
        <div className="bg-board/10 rounded-lg py-4 mb-6">
          <div className="text-xs uppercase tracking-wider text-text-dark/50 mb-1">
            最终得分
          </div>
          <div className="text-4xl font-bold text-text-dark">{score}</div>
        </div>
        <button
          onClick={onClose}
          className="w-full py-3 bg-board hover:bg-board/90 text-white font-bold rounded-lg transition-colors active:scale-95"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};
