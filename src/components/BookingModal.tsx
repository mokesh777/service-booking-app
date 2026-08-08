"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import type { Service } from "@/data/services";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { addBooking } from "@/redux/bookingSlice";

/** Booking form shown in a modal; customer details are auto-filled */
export default function BookingModal({
  service,
  onClose,
}: {
  service: Service;
  onClose: () => void;
}) {
  const user = useAppSelector((s) => s.auth.currentUser);
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({ address: "", date: "", time: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.address.trim()) next['address'] = "Address is required";
    if (!form.date) next['date'] = "Preferred date is required";
    if (!form.time) next['time'] = "Preferred time is required";
    setErrors(next);
    if (Object.keys(next).length || !user) return;

    dispatch(
      addBooking({
        id: crypto.randomUUID(),
        userEmail: user.email,
        serviceName: service.name,
        price: service.price,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: form.address.trim(),
        date: form.date,
        time: form.time,
        notes: form.notes.trim(),
        status: "Booked",
        createdAt: new Date().toISOString(),
      }),
    );
    toast.success(`${service.name} booked successfully!`);
    onClose();
  };

  const field =
    "w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary";
  const readOnly = `${field} bg-muted text-muted-foreground`;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/50 p-0 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="animate-fade-in max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-card p-6 shadow-brand sm:rounded-3xl">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">Book {service.name}</h2>
            <p className="text-sm text-muted-foreground">
              ₹{service.price.toLocaleString("en-IN")} · {service.duration}
            </p>
          </div>
          <button onClick={onClose} aria-label="Close" className="text-muted-foreground hover:text-foreground">
            <X />
          </button>
        </div>

        <form onSubmit={submit} className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm font-medium">
              Customer Name
              <input className={readOnly} value={user?.name ?? ""} readOnly />
            </label>
            <label className="grid gap-1.5 text-sm font-medium">
              Phone
              <input className={readOnly} value={user?.phone ?? ""} readOnly />
            </label>
          </div>

          <label className="grid gap-1.5 text-sm font-medium">
            Email
            <input className={readOnly} value={user?.email ?? ""} readOnly />
          </label>

          <label className="grid gap-1.5 text-sm font-medium">
            Address *
            <textarea
              className={field}
              rows={2}
              value={form.address}
              onChange={(e) => set("address", e.target.value)}
              placeholder="House no, street, city, pincode"
            />
            {errors['address'] && <span className="text-xs text-destructive">{errors['address']}</span>}
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm font-medium">
              Preferred Date *
              <input
                type="date"
                className={field}
                value={form.date}
                onChange={(e) => set("date", e.target.value)}
              />
              {errors['date'] && <span className="text-xs text-destructive">{errors['date']}</span>}
            </label>
            <label className="grid gap-1.5 text-sm font-medium">
              Preferred Time *
              <input
                type="time"
                className={field}
                value={form.time}
                onChange={(e) => set("time", e.target.value)}
              />
              {errors['time'] && <span className="text-xs text-destructive">{errors['time']}</span>}
            </label>
          </div>

          <label className="grid gap-1.5 text-sm font-medium">
            Notes (optional)
            <textarea
              className={field}
              rows={2}
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Anything we should know?"
            />
          </label>

          <button
            type="submit"
            className="mt-1 w-full rounded-full bg-gradient-brand px-4 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}
