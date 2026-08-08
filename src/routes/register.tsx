import { createFileRoute } from "@tanstack/react-router";
import Register from "@/pages/Register";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create Account · ServiceHub" },
      {
        name: "description",
        content:
          "Register on ServiceHub to book verified home service professionals with upfront pricing in India.",
      },
      { property: "og:title", content: "Create Account · ServiceHub" },
      {
        property: "og:description",
        content: "Sign up in seconds and book home services at your doorstep.",
      },
    ],
  }),
  component: Register,
});
