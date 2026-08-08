"use client";
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { UserPlus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { register } from "@/redux/authSlice";


/** Reusable labelled text input */
function Field({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
}: {
  label: string;
  type?: string | undefined;
  placeholder?: string | undefined;
  value: string;
  onChange: (v: string) => void;
  error?: string | undefined;
}) {
  return (
    <label className="grid gap-1.5 text-sm font-medium">
      {label}
      <input
        className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary"
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {error && <span className="text-xs text-destructive">{error}</span>}
    </label>
  );
}

/** Registration page with full client-side validation */
export default function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const users = useAppSelector((s) => s.auth.users);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!form.name.trim()) err['name'] = "Full name is required";
    if (!form.email.trim()) err['email'] = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      err['email'] = "Enter a valid email address";
    if (!form.phone.trim()) err['phone'] = "Phone number is required";
    else if (!/^\d{10}$/.test(form.phone.trim()))
      err['phone'] = "Phone number must be exactly 10 digits";
    if (!form.password) err['password'] = "Password is required";
    else if (form.password.length < 6)
      err['password'] = "Password must be at least 6 characters";
    if (!form.confirm) err['confirm'] = "Please confirm your password";
    else if (form.password !== form.confirm) err['confirm'] = "Passwords do not match";

    if (
      !err['email'] &&
      users.some((u) => u.email.toLowerCase() === form.email.trim().toLowerCase())
    )
      err['email'] = "An account with this email already exists";

    setErrors(err);
    if (Object.keys(err).length) return;

    dispatch(
      register({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        password: form.password,
      }),
    );
    toast.success("Account created! Please login.");
    navigate({ to: "/" });
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-5 py-14">
      <div className="animate-fade-in rounded-3xl border border-border bg-card p-7 shadow-soft">
        <span className="mb-4 inline-flex rounded-2xl bg-gradient-brand p-3 text-primary-foreground">
          <UserPlus className="h-5 w-5" />
        </span>
        <h1 className="text-2xl font-bold text-foreground">Create your account</h1>
        <p className="mb-6 mt-1 text-sm text-muted-foreground">
          Book cleaning, repairs and more in minutes.
        </p>

        <form onSubmit={submit} className="grid gap-4">
          <Field label="Full Name" placeholder="Aarav Sharma" value={form.name} onChange={(v) => set("name", v)} error={errors['name']} />
          <Field label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={(v) => set("email", v)} error={errors['email']} />
          <Field label="Phone Number" placeholder="9876543210" value={form.phone} onChange={(v) => set("phone", v)} error={errors['phone']} />
          <Field label="Password" type="password" placeholder="••••••" value={form.password} onChange={(v) => set("password", v)} error={errors['password']} />
          <Field label="Confirm Password" type="password" placeholder="••••••" value={form.confirm} onChange={(v) => set("confirm", v)} error={errors['confirm']} />

          <button
            type="submit"
            className="rounded-full bg-gradient-brand px-4 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95"
          >
            Register
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          Already registered?{" "}
          <Link to="/" className="font-semibold text-primary hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
