import { Link } from "@tanstack/react-router";

/** 404 page */
export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-1 items-center justify-center px-5 text-center">
      <div>
        <p className="bg-gradient-brand bg-clip-text text-7xl font-extrabold text-transparent">
          404
        </p>
        <h1 className="mt-3 text-xl font-semibold text-foreground">Page not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
}
