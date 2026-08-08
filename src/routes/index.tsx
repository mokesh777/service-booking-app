import { createFileRoute } from "@tanstack/react-router";
import Login from "@/pages/Login";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Login · ServiceHub Home Services Booking" },
      {
        name: "description",
        content:
          "Login to ServiceHub to book cleaning, AC repair, plumbing, electrician and painting services at your doorstep.",
      },
      { property: "og:title", content: "Login · ServiceHub Home Services Booking" },
      {
        property: "og:description",
        content: "Book trusted home services in minutes with ServiceHub.",
      },
    ],
  }),
  component: Login,
});
