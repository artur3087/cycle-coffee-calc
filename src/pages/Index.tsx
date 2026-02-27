import { useState, useCallback, useMemo } from "react";
import { Bike } from "lucide-react";
import { workshopServices, cafeItems } from "@/data/menu";
import WorkshopSection from "@/components/WorkshopSection";
import CafeSection from "@/components/CafeSection";
import FloatingTotal from "@/components/FloatingTotal";
import QuoteModal from "@/components/QuoteModal";

const Index = () => {
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());
  const [cafeQuantities, setCafeQuantities] = useState<Record<string, number>>({});
  const [modalOpen, setModalOpen] = useState(false);

  const toggleService = useCallback((id: string) => {
    setSelectedServices((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const updateCafe = useCallback((id: string, delta: number) => {
    setCafeQuantities((prev) => {
      const val = Math.max(0, (prev[id] || 0) + delta);
      return { ...prev, [id]: val };
    });
  }, []);

  const { total, timeMinutes, itemCount, selectedServiceList, cafeOrders } = useMemo(() => {
    let t = 0;
    let time = 0;
    let count = 0;
    const svcList = workshopServices.filter((s) => selectedServices.has(s.id));
    svcList.forEach((s) => {
      t += s.price;
      time += s.timeMinutes;
      count++;
    });
    const orders = cafeItems
      .filter((i) => (cafeQuantities[i.id] || 0) > 0)
      .map((i) => ({ item: i, qty: cafeQuantities[i.id] }));
    orders.forEach(({ item, qty }) => {
      t += item.price * qty;
      count += qty;
    });
    return { total: t, timeMinutes: time, itemCount: count, selectedServiceList: svcList, cafeOrders: orders };
  }, [selectedServices, cafeQuantities]);

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <header className="pt-10 pb-8 px-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="p-2.5 rounded-xl bg-primary/10">
            <Bike className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Global Cycle & Coffee
          </h1>
        </div>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          Build your estimate — pick services and fuel up while you wait.
        </p>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 space-y-10">
        <WorkshopSection services={workshopServices} selected={selectedServices} onToggle={toggleService} />
        <CafeSection items={cafeItems} quantities={cafeQuantities} onUpdate={updateCafe} />
      </main>

      {/* Floating bar */}
      <FloatingTotal total={total} timeMinutes={timeMinutes} itemCount={itemCount} onReview={() => setModalOpen(true)} />

      {/* Modal */}
      <QuoteModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedServices={selectedServiceList}
        cafeOrders={cafeOrders}
        total={total}
        timeMinutes={timeMinutes}
      />
    </div>
  );
};

export default Index;
