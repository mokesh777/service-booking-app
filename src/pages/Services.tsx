"use client";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import BookingModal from "@/components/BookingModal";
import { services, categories, type Service } from "@/data/services";

/** Services listing with search + category filter */
export default function Services() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<Service | null>(null);

  const filtered = useMemo(
    () =>
      services.filter(
        (s) =>
          (category === "All" || s.category === category) &&
          (s.name.toLowerCase().includes(query.toLowerCase()) ||
            s.description.toLowerCase().includes(query.toLowerCase())),
      ),
    [query, category],
  );

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-5 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Home services, on demand
        </h1>
        <p className="mt-2 text-muted-foreground">
          Verified professionals, upfront pricing, doorstep delivery.
        </p>
      </header>

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services…"
            className="w-full rounded-full border border-input bg-card py-3 pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                category === c
                  ? "bg-gradient-brand text-primary-foreground"
                  : "border border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">
          No services match your search.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <ServiceCard key={s.id} service={s} onBook={setSelected} />
          ))}
        </div>
      )}

      {selected && (
        <BookingModal service={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
