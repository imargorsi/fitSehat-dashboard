export default function DashboardLoading() {
  return (
    <div className="mx-auto w-full max-w-3xl pt-8" aria-hidden>
      <div className="h-8 w-40 rounded-full bg-muted/60" />
      <div className="mt-4 h-24 rounded-[1.75rem] bg-muted/40" />
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="h-40 rounded-[1.75rem] bg-muted/35" />
        <div className="h-40 rounded-[1.75rem] bg-muted/35" />
      </div>
    </div>
  );
}
