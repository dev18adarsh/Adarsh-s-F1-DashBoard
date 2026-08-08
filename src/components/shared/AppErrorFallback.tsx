import { ErrorState } from '@/components/ui'

interface AppErrorFallbackProps {
  error: Error
  onReset: () => void
}

export function AppErrorFallback({ error, onReset }: AppErrorFallbackProps) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border bg-card/80 shadow-soft backdrop-blur-xl">
        <ErrorState title="Something went wrong" error={error} retry={onReset} className="py-10" />
      </div>
    </div>
  )
}
