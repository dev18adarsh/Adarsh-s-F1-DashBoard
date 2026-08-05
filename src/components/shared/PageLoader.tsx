export function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="relative size-10 animate-spin rounded-full border-2 border-primary border-t-primary/30" />
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    </div>
  )
}
