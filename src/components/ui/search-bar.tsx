import * as React from 'react'
import { Search, X } from 'lucide-react'

import { cn } from '@/utils'

interface SearchBarProps extends Omit<React.ComponentProps<'input'>, 'onChange' | 'value'> {
  value?: string
  onValueChange?: (value: string) => void
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  showShortcut?: boolean
  containerClassName?: string
}

export function SearchBar({
  className,
  containerClassName,
  value,
  onValueChange,
  onChange,
  showShortcut = true,
  ...props
}: SearchBarProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <div className={cn('group relative flex items-center', containerClassName)}>
      <Search className="pointer-events-none absolute left-3.5 size-4 text-muted-foreground/70 transition-colors group-focus-within:text-teal-strong" />
      <input
        ref={inputRef}
        type="text"
        aria-label="Search races, drivers and teams"
        value={value}
        onChange={(event) => {
          onChange?.(event)
          onValueChange?.(event.target.value)
        }}
        className={cn(
          'h-9 w-full rounded-full border border-input bg-card/60 pr-8 pl-9 text-sm text-foreground shadow-soft backdrop-blur-xl transition-all duration-300 outline-none placeholder:text-muted-foreground/60 hover:border-border focus:border-teal/60 focus:bg-card focus:ring-4 focus:ring-teal/15',
          className,
        )}
        {...props}
      />
      {value ? (
        <button
          type="button"
          onClick={() => onValueChange?.('')}
          aria-label="Clear search"
          className="absolute right-2.5 flex size-5 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <X className="size-3.5" />
        </button>
      ) : showShortcut ? (
        <kbd className="pointer-events-none absolute right-2.5 hidden rounded-md border border-border bg-background/60 px-1.5 py-0.5 font-sans text-[10px] font-medium text-muted-foreground select-none sm:inline-flex">
          ⌘K
        </kbd>
      ) : null}
    </div>
  )
}
