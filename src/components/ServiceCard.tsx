import { Clock, Star, IndianRupee } from "lucide-react";
import type { Service } from "@/data/services";

/** Single service card with hover animation */
export default function ServiceCard({
  service,
  onBook,
}: {
  service: Service;
  onBook: (s: Service) => void;
}) {
  const Icon = service.icon;
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-brand">
      <div className="flex h-32 items-center justify-center bg-gradient-brand-soft">
        <span className="rounded-2xl bg-card/85 p-4 text-primary shadow-soft transition-transform duration-300 group-hover:scale-110">
          <Icon className="h-9 w-9" />
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-foreground">{service.name}</h3>
          <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-xs font-semibold text-accent-foreground">
            <Star className="h-3 w-3 fill-current text-accent" />
            {service.rating}
          </span>
        </div>

        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
          {service.description}
        </p>

        <div className="flex items-center justify-between text-sm">
          <span className="inline-flex items-center font-bold text-foreground">
            <IndianRupee className="h-4 w-4" />
            {service.price.toLocaleString("en-IN")}
          </span>
          <span className="inline-flex items-center gap-1 text-muted-foreground">
            <Clock className="h-4 w-4" /> {service.duration}
          </span>
        </div>

        <button
          onClick={() => onBook(service)}
          className="mt-1 w-full rounded-full bg-gradient-brand px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02] active:scale-95"
        >
          Book Now
        </button>
      </div>
    </article>
  );
}
