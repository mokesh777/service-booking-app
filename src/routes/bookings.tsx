import { createFileRoute } from "@tanstack/react-router";
import ProtectedRoute from "@/components/ProtectedRoute";
import MyBookings from "@/pages/MyBookings";

export const Route = createFileRoute("/bookings")({
  head: () => ({
    meta: [
      { title: "My Bookings · ServiceHub" },
      {
        name: "description",
        content:
          "View, cancel or delete your ServiceHub home service bookings with date, time, address and price details.",
      },
      { property: "og:title", content: "My Bookings · ServiceHub" },
      {
        property: "og:description",
        content: "Manage all your scheduled home service appointments in one place.",
      },
    ],
  }),
  component: () => (
    <ProtectedRoute>
      <MyBookings />
    </ProtectedRoute>
  ),
});
