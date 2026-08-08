// Booking slice — bookings persisted in localStorage (no backend)
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Booking = {
  id: string;
  userEmail: string;
  serviceName: string;
  price: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  date: string;
  time: string;
  notes?: string;
  status: "Booked" | "Cancelled";
  createdAt: string;
};

type BookingState = { items: Booking[] };

const isBrowser = typeof window !== "undefined";

const persist = (items: Booking[]) => {
  if (isBrowser) localStorage.setItem("bookings", JSON.stringify(items));
};

const initialState: BookingState = { items: [] };

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    loadBookings(state) {
      if (!isBrowser) return;
      try {
        state.items = JSON.parse(localStorage.getItem("bookings") ?? "[]");
      } catch {
        state.items = [];
      }
    },
    addBooking(state, action: PayloadAction<Booking>) {
      state.items.unshift(action.payload);
      persist(state.items);
    },
    cancelBooking(state, action: PayloadAction<string>) {
      const b = state.items.find((i) => i.id === action.payload);
      if (b) b.status = "Cancelled";
      persist(state.items);
    },
    removeBooking(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
      persist(state.items);
    },
  },
});

export const { loadBookings, addBooking, cancelBooking, removeBooking } =
  bookingSlice.actions;
export default bookingSlice.reducer;
