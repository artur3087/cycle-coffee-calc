export interface WorkshopService {
  id: string;
  name: string;
  price: number;
  timeMinutes: number;
}

export interface CafeItem {
  id: string;
  name: string;
  price: number;
}

export const workshopServices: WorkshopService[] = [
  { id: "safety-check", name: "Basic Safety Check", price: 40, timeMinutes: 30 },
  { id: "drivetrain", name: "Drivetrain Clean & Lube", price: 25, timeMinutes: 30 },
  { id: "brake-bleed", name: "Hydraulic Brake Bleed", price: 50, timeMinutes: 45 },
  { id: "wheel-truing", name: "Wheel Truing", price: 35, timeMinutes: 40 },
  { id: "full-overhaul", name: "Full Seasonal Overhaul", price: 120, timeMinutes: 60 },
];

export const cafeItems: CafeItem[] = [
  { id: "flat-white", name: "Flat White", price: 5.5 },
  { id: "espresso", name: "Double Espresso", price: 4.0 },
  { id: "filter", name: "Batch Brew Filter", price: 4.5 },
  { id: "energy-bar", name: "Homemade Energy Bar", price: 3.5 },
  { id: "croissant", name: "Artisan Croissant", price: 4.5 },
];
