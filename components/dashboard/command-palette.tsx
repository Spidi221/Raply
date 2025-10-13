'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { Command } from 'cmdk'
import {
  LayoutDashboard,
  FileText,
  Link as LinkIcon,
  Settings,
  Plus,
  Search,
  ShieldCheck,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface CommandPaletteProps {
  isAdmin?: boolean
}

export function CommandPalette({ isAdmin = false }: CommandPaletteProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const locale = useLocale()

  // Toggle command palette with Cmd+K / Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const navigate = useCallback(
    (path: string) => {
      setOpen(false)
      router.push(`/${locale}${path}`)
    },
    [router, locale]
  )

  const commands = [
    {
      group: 'Navigation',
      items: [
        {
          icon: LayoutDashboard,
          label: 'Dashboard',
          action: () => navigate('/dashboard'),
        },
        {
          icon: FileText,
          label: 'Reports',
          action: () => navigate('/reports'),
        },
        {
          icon: LinkIcon,
          label: 'Integrations',
          action: () => navigate('/integrations'),
        },
        {
          icon: Settings,
          label: 'Settings',
          action: () => navigate('/settings'),
        },
        ...(isAdmin
          ? [
              {
                icon: ShieldCheck,
                label: 'Admin Panel',
                action: () => navigate('/admin'),
              },
            ]
          : []),
      ],
    },
    {
      group: 'Actions',
      items: [
        {
          icon: Plus,
          label: 'Create New Report',
          action: () => navigate('/reports/new'),
        },
        {
          icon: LinkIcon,
          label: 'Connect Account',
          action: () => navigate('/integrations'),
        },
      ],
    },
  ]

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={() => setOpen(false)}
      />

      {/* Command Palette Modal */}
      <div className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4">
        <Command className="glass rounded-2xl border border-glass-border shadow-2xl overflow-hidden">
          <div className="flex items-center border-b border-glass-border px-4">
            <Search className="h-5 w-5 text-muted-foreground mr-2" />
            <Command.Input
              placeholder="Type a command or search..."
              className="flex h-14 w-full bg-transparent py-4 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
            <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">ESC</span>
            </kbd>
          </div>

          <Command.List className="max-h-[400px] overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
              No results found.
            </Command.Empty>

            {commands.map((group) => (
              <Command.Group
                key={group.group}
                heading={group.group}
                className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-muted-foreground"
              >
                {group.items.map((item) => {
                  const Icon = item.icon
                  return (
                    <Command.Item
                      key={item.label}
                      onSelect={item.action}
                      className={cn(
                        'relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2.5 text-sm outline-none',
                        'hover:bg-muted/50 data-[selected=true]:bg-muted',
                        'transition-colors duration-150'
                      )}
                    >
                      <Icon className="h-4 w-4 mr-3 text-muted-foreground" />
                      <span>{item.label}</span>
                    </Command.Item>
                  )
                })}
              </Command.Group>
            ))}
          </Command.List>

          {/* Footer Hint */}
          <div className="flex items-center justify-between border-t border-glass-border px-4 py-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
                ↑↓
              </kbd>
              <span>Navigate</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
                ↵
              </kbd>
              <span>Select</span>
            </div>
          </div>
        </Command>
      </div>
    </>
  )
}
