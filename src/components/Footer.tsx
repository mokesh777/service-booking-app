/** Simple site footer */
export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-8 text-sm text-muted-foreground sm:flex-row">
        <p className="font-semibold text-foreground">ServiceHub</p>
        <p>Trusted home services at your doorstep · Made in India</p>
        <p>© {new Date().getFullYear()} ServiceHub</p>
      </div>
    </footer>
  );
}
