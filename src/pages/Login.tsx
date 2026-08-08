"use client";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { LogIn } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { login, clearError } from "@/redux/authSlice";

/** Login page — validates credentials against users in localStorage */
export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentUser, error } = useAppSelector((s) => s.auth);
  const [form, setForm] = useState({ email: "", password: "" });
  const [localError, setLocalError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (currentUser) navigate({ to: "/services", replace: true });
  }, [currentUser, navigate]);

  useEffect(() => {
    if (submitted && error) {
      setLocalError(error);
      setSubmitted(false);
    }
  }, [submitted, error]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");
    if (!form.email.trim() || !form.password) {
      setLocalError("All fields are required.");
      return;
    }
    dispatch(clearError());
    dispatch(login({ email: form.email.trim(), password: form.password }));
    setSubmitted(true);
    toast.success("Welcome back!", { id: "login" });
  };

  const field =
    "w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary";

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-5 py-14">
      <div className="animate-fade-in rounded-3xl border border-border bg-card p-7 shadow-soft">
        <span className="mb-4 inline-flex rounded-2xl bg-gradient-brand p-3 text-primary-foreground">
          <LogIn className="h-5 w-5" />
        </span>
        <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
        <p className="mb-6 mt-1 text-sm text-muted-foreground">
          Login to book trusted home services.
        </p>

        <form onSubmit={submit} className="grid gap-4">
          <label className="grid gap-1.5 text-sm font-medium">
            Email
            <input
              className={field}
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
            />
          </label>
          <label className="grid gap-1.5 text-sm font-medium">
            Password
            <input
              className={field}
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••"
            />
          </label>

          {localError && (
            <p className="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {localError}
            </p>
          )}

          <button
            type="submit"
            className="rounded-full bg-gradient-brand px-4 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95"
          >
            Login
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          New here?{" "}
          <Link to="/register" className="font-semibold text-primary hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
