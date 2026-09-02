export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-5 pb-4 sm:gap-8 sm:pb-6" aria-hidden>
      <div className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,7fr)_minmax(16rem,3fr)]">
        <div className="h-52 animate-pulse rounded-[1.75rem] bg-muted/40 sm:h-56" />
        <div className="h-52 animate-pulse rounded-[1.75rem] bg-muted/35 sm:h-56" />
      </div>
      <div className="grid min-w-0 grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <div className="h-36 animate-pulse rounded-[1.75rem] bg-muted/35" />
        <div className="h-36 animate-pulse rounded-[1.75rem] bg-muted/35" />
        <div className="h-36 animate-pulse rounded-[1.75rem] bg-muted/35" />
        <div className="h-36 animate-pulse rounded-[1.75rem] bg-muted/35" />
      </div>
      <div className="grid min-w-0 gap-5 lg:grid-cols-2">
        <div className="h-44 animate-pulse rounded-[1.75rem] bg-muted/30" />
        <div className="h-44 animate-pulse rounded-[1.75rem] bg-muted/30" />
      </div>
    </div>
  );
}
