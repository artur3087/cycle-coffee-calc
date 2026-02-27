import { Clock, DollarSign } from "lucide-react";

interface Props {
  total: number;
  timeMinutes: number;
  itemCount: number;
  onReview: () => void;
}

const FloatingTotal = ({ total, timeMinutes, itemCount, onReview }: Props) => {
  const hours = Math.floor(timeMinutes / 60);
  const mins = timeMinutes % 60;
  const timeStr = hours > 0 ? `${hours}h ${mins > 0 ? `${mins}m` : ""}` : `${mins}m`;

  return (
    <div className="fixed bottom-0 left-0 right-0 floating-bar z-50 animate-slide-up">
      <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-primary" />
              <span className="text-2xl font-bold text-foreground">${total.toFixed(2)}</span>
            </div>
            {timeMinutes > 0 && (
              <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                <Clock className="w-3.5 h-3.5" />
                <span>{timeStr} service time</span>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={onReview}
          disabled={itemCount === 0}
          className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all whitespace-nowrap"
        >
          Review Quote
        </button>
      </div>
    </div>
  );
};

export default FloatingTotal;
