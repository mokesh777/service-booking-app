"use client";
import { useEffect, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAppSelector } from "@/redux/store";

/** Blocks rendering until an authenticated user exists in the store */
export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const user = useAppSelector((s) => s.auth.currentUser);
  const hydrated = useAppSelector((s) => s.auth.hydrated);
  const navigate = useNavigate();

  useEffect(() => {
    if (hydrated && !user) navigate({ to: "/", replace: true });
  }, [hydrated, user, navigate]);

  if (!hydrated || !user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-muted-foreground">
        Checking your session…
      </div>
    );
  }
  return <>{children}</>;
}
