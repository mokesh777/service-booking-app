"use client";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { CalendarDays, Clock, MapPin, IndianRupee, Trash2, Ban } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { cancelBooking, removeBooking } from "@/redux/bookingSlice";

/** Bookings of the logged-in user */
export default function MyBookings() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.currentUser);
  const bookings = useAppSelector((s) =>
    s.bookings.items.filter((b) => b.userEmail === user?.email),
  );

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-5 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">My Bookings</h1>
      <p className="mt-2 text-muted-foreground">
        Track, cancel or delete your service requests.
      </p>

      {bookings.length === 0 ? (
        <div className="mt-12 rounded-3xl border border-dashed border-border bg-card p-12 text-center">
          <p className="text-muted-foreground">You have no bookings yet.</p>
          <Link
            to="/services"
            className="mt-4 inline-block rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Browse services
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {bookings.map((b) => (
            <article
              key={b.id}
              className="rounded-2xl border border-border bg-card p-5 shadow-soft transition-shadow hover:shadow-brand"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-semibold text-foreground">{b.serviceName}</h2>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    b.status === "Booked"
                      ? "bg-primary/10 text-primary"
                      : "bg-destructive/10 text-destructive"
                  }`}
                >
                  {b.status}
                </span>
              </div>

              <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" /> {b.date}
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="h-4 w-4" /> {b.time}
                </p>
                <p className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {b.address}
                </p>
                <p className="flex items-center gap-1 font-semibold text-foreground">
                  <IndianRupee className="h-4 w-4" />
                  {b.price.toLocaleString("en-IN")}
                </p>
                {b.notes && <p className="italic">“{b.notes}”</p>}
              </div>

              <div className="mt-4 flex gap-2">
                {b.status === "Booked" && (
                  <button
                    onClick={() => {
                      dispatch(cancelBooking(b.id));
                      toast("Booking cancelled");
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    <Ban className="h-4 w-4" /> Cancel
                  </button>
                )}
                <button
                  onClick={() => {
                    dispatch(removeBooking(b.id));
                    toast("Booking deleted");
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/20"
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
