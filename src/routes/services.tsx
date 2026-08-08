import { createFileRoute } from "@tanstack/react-router";
import ProtectedRoute from "@/components/ProtectedRoute";
import Services from "@/pages/Services";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Book Home Services · ServiceHub" },
      {
        name: "description",
        content:
          "Browse home cleaning, AC repair, plumbing, electrician, appliance repair and painting services with ratings and prices in ₹.",
      },
      { property: "og:title", content: "Book Home Services · ServiceHub" },
      {
        property: "og:description",
        content: "Verified professionals, upfront pricing, doorstep delivery.",
      },
    ],
  }),
  component: () => (
    <ProtectedRoute>
      <Services />
    </ProtectedRoute>
  ),
});
