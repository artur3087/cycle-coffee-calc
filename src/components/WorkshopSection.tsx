import { Wrench } from "lucide-react";
import { WorkshopService } from "@/data/menu";

interface Props {
  services: WorkshopService[];
  selected: Set<string>;
  onToggle: (id: string) => void;
}

const WorkshopSection = ({ services, selected, onToggle }: Props) => {
  return (
    <section className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Wrench className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">Workshop Services</h2>
      </div>
      <div className="space-y-3">
        {services.map((service) => {
          const isSelected = selected.has(service.id);
          return (
            <button
              key={service.id}
              onClick={() => onToggle(service.id)}
              className={`w-full glass-card-hover p-4 flex items-center justify-between text-left transition-all duration-200 ${
                isSelected ? "border-primary/50 bg-primary/5" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                    isSelected
                      ? "bg-primary border-primary"
                      : "border-muted-foreground/40"
                  }`}
                >
                  {isSelected && (
                    <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="font-medium text-foreground">{service.name}</p>
                  <p className="text-sm text-muted-foreground">~{service.timeMinutes} min</p>
                </div>
              </div>
              <span className={`text-lg font-semibold ${isSelected ? "text-primary" : "text-foreground"}`}>
                ${service.price}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default WorkshopSection;
