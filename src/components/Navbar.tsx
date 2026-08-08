"use client";
import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, LogOut, CalendarCheck, Sparkles } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { logout } from "@/redux/authSlice";

/** Responsive gradient navigation bar */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const user = useAppSelector((s) => s.auth.currentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });

  const handleLogout = () => {
    dispatch(logout());
    navigate({ to: "/" });
  };

  const links = user
    ? [
        { to: "/services", label: "Services" },
        { to: "/bookings", label: "My Bookings" },
      ]
    : [
        { to: "/", label: "Login" },
        { to: "/register", label: "Register" },
      ];

  return (
    <header className="sticky top-0 z-40 bg-gradient-brand shadow-brand">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link
          to={user ? "/services" : "/"}
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-primary-foreground"
        >
          <Sparkles className="h-5 w-5" />
          ServiceHub
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`rounded-full px-4 py-2 text-sm font-medium text-primary-foreground/85 transition-colors hover:bg-primary-foreground/15 hover:text-primary-foreground ${
                path === l.to ? "bg-primary-foreground/20 text-primary-foreground" : ""
              }`}
            >
              {l.label}
            </Link>
          ))}
          {user && (
            <>
              <span className="ml-2 hidden text-sm text-primary-foreground/80 lg:inline">
                Hi, {user.name.split(" ")[0]}
              </span>
              <button
                onClick={handleLogout}
                className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-primary-foreground px-4 py-2 text-sm font-semibold text-primary transition-transform hover:scale-105"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </>
          )}
        </div>

        <button
          className="text-primary-foreground md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="animate-fade-in border-t border-primary-foreground/15 px-5 pb-4 md:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-primary-foreground/90 hover:bg-primary-foreground/10"
            >
              {l.label}
            </Link>
          ))}
          {user && (
            <button
              onClick={handleLogout}
              className="mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-primary-foreground px-4 py-2 text-sm font-semibold text-primary"
            >
              <CalendarCheck className="h-4 w-4" /> Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}
