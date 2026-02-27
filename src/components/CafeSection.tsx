import { Coffee, Minus, Plus } from "lucide-react";
import { CafeItem } from "@/data/menu";

interface Props {
  items: CafeItem[];
  quantities: Record<string, number>;
  onUpdate: (id: string, delta: number) => void;
}

const CafeSection = ({ items, quantities, onUpdate }: Props) => {
  return (
    <section className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Coffee className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">Coffee & Treats</h2>
      </div>
      <div className="space-y-3">
        {items.map((item) => {
          const qty = quantities[item.id] || 0;
          return (
            <div
              key={item.id}
              className={`glass-card-hover p-4 flex items-center justify-between transition-all duration-200 ${
                qty > 0 ? "border-primary/50 bg-primary/5" : ""
              }`}
            >
              <div>
                <p className="font-medium text-foreground">{item.name}</p>
                <p className={`text-lg font-semibold ${qty > 0 ? "text-primary" : "text-foreground"}`}>
                  ${item.price.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onUpdate(item.id, -1)}
                  disabled={qty === 0}
                  className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-foreground hover:bg-secondary/80 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-6 text-center font-semibold text-foreground tabular-nums">{qty}</span>
                <button
                  onClick={() => onUpdate(item.id, 1)}
                  className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-all"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CafeSection;
