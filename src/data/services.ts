// Static service catalogue (no backend / no API)
import {
  Sparkles,
  AirVent,
  Wrench,
  Zap,
  WashingMachine,
  PaintRoller,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  id: string;
  name: string;
  description: string;
  price: number; // in INR
  duration: string;
  rating: number;
  category: string;
  icon: LucideIcon;
};

export const categories = [
  "All",
  "Cleaning",
  "Appliances",
  "Repairs",
  "Home Improvement",
];

export const services: Service[] = [
  {
    id: "home-cleaning",
    name: "Home Cleaning",
    description:
      "Deep cleaning for your entire home with eco-friendly products and trained staff.",
    price: 1499,
    duration: "3 hrs",
    rating: 4.8,
    category: "Cleaning",
    icon: Sparkles,
  },
  {
    id: "ac-repair",
    name: "AC Repair",
    description:
      "Diagnosis, gas refill and servicing for split, window and cassette air conditioners.",
    price: 899,
    duration: "1.5 hrs",
    rating: 4.7,
    category: "Appliances",
    icon: AirVent,
  },
  {
    id: "plumbing",
    name: "Plumbing",
    description:
      "Leak fixes, tap and pipe installation, drainage cleaning by certified plumbers.",
    price: 599,
    duration: "1 hr",
    rating: 4.6,
    category: "Repairs",
    icon: Wrench,
  },
  {
    id: "electrician",
    name: "Electrician",
    description:
      "Wiring, switchboards, fan and light fitting with complete safety checks.",
    price: 649,
    duration: "1 hr",
    rating: 4.7,
    category: "Repairs",
    icon: Zap,
  },
  {
    id: "appliance-repair",
    name: "Appliance Repair",
    description:
      "Washing machine, refrigerator and microwave repair with genuine spare parts.",
    price: 799,
    duration: "2 hrs",
    rating: 4.5,
    category: "Appliances",
    icon: WashingMachine,
  },
  {
    id: "painting",
    name: "Painting",
    description:
      "Interior and exterior painting with premium emulsions and clean finishing.",
    price: 4999,
    duration: "2 days",
    rating: 4.9,
    category: "Home Improvement",
    icon: PaintRoller,
  },
];
