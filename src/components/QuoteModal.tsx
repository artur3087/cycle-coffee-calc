import { X, Printer, Clock } from "lucide-react";
import { WorkshopService, CafeItem } from "@/data/menu";

interface Props {
  open: boolean;
  onClose: () => void;
  selectedServices: WorkshopService[];
  cafeOrders: { item: CafeItem; qty: number }[];
  total: number;
  timeMinutes: number;
}

const QuoteModal = ({ open, onClose, selectedServices, cafeOrders, total, timeMinutes }: Props) => {
  if (!open) return null;

  const hours = Math.floor(timeMinutes / 60);
  const mins = timeMinutes % 60;
  const timeStr = hours > 0 ? `${hours}h ${mins > 0 ? `${mins}m` : ""}` : mins > 0 ? `${mins}m` : "—";

  const handlePrint = () => window.print();

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div
        className="glass-card relative w-full max-w-lg max-h-[85vh] overflow-y-auto p-6 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Quote Summary</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        {selectedServices.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Workshop</h3>
            <div className="space-y-2">
              {selectedServices.map((s) => (
                <div key={s.id} className="flex justify-between text-foreground">
                  <span>{s.name}</span>
                  <span className="font-medium">${s.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {cafeOrders.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Café</h3>
            <div className="space-y-2">
              {cafeOrders.map(({ item, qty }) => (
                <div key={item.id} className="flex justify-between text-foreground">
                  <span>
                    {item.name} <span className="text-muted-foreground">×{qty}</span>
                  </span>
                  <span className="font-medium">${(item.price * qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-border pt-4 space-y-3">
          <div className="flex justify-between text-lg font-bold text-foreground">
            <span>Total</span>
            <span className="text-primary">${total.toFixed(2)}</span>
          </div>
          {timeMinutes > 0 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Estimated Service Time: {timeStr}</span>
            </div>
          )}
        </div>

        <button
          onClick={handlePrint}
          className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all"
        >
          <Printer className="w-4 h-4" />
          Print / Save
        </button>
      </div>
    </div>
  );
};

export default QuoteModal;
