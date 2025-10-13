'use client'

import { Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/providers/theme-provider'
import { cn } from '@/lib/utils'

interface TopBarProps {
  title?: string
  subtitle?: string
}

export function TopBar({ title, subtitle }: TopBarProps) {
  const { theme, setTheme, resolvedTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Title Section */}
        <div>
          {title && <h1 className="text-lg font-semibold">{title}</h1>}
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>

        {/* Actions Section */}
        <div className="flex items-center gap-2">
          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className={cn(
              'relative h-9 w-9 transition-transform duration-300',
              'hover:bg-muted hover:scale-110'
            )}
            title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <Sun
              className={cn(
                'h-5 w-5 transition-all duration-300',
                resolvedTheme === 'dark'
                  ? 'rotate-90 scale-0'
                  : 'rotate-0 scale-100'
              )}
            />
            <Moon
              className={cn(
                'absolute h-5 w-5 transition-all duration-300',
                resolvedTheme === 'dark'
                  ? 'rotate-0 scale-100'
                  : '-rotate-90 scale-0'
              )}
            />
          </Button>
        </div>
      </div>
    </div>
  )
}
