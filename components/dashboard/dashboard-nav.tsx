'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  FileText,
  Link as LinkIcon,
  Settings,
  ShieldCheck,
  LogOut,
} from 'lucide-react'
import type { User } from '@supabase/supabase-js'
import { signOut } from '@/lib/auth/actions'

interface DashboardNavProps {
  user: User
  isAdmin: boolean
}

export function DashboardNav({ user, isAdmin }: DashboardNavProps) {
  const pathname = usePathname()
  const t = useTranslations('dashboard.nav')
  const locale = useLocale()

  const navItems = [
    {
      href: `/${locale}/dashboard`,
      label: t('dashboard'),
      icon: LayoutDashboard,
    },
    {
      href: `/${locale}/reports`,
      label: t('reports'),
      icon: FileText,
    },
    {
      href: `/${locale}/integrations`,
      label: t('integrations'),
      icon: LinkIcon,
    },
    {
      href: `/${locale}/settings`,
      label: t('settings'),
      icon: Settings,
    },
  ]

  // Add admin link for admin users
  if (isAdmin) {
    navItems.push({
      href: `/${locale}/admin`,
      label: t('admin'),
      icon: ShieldCheck,
    })
  }

  async function handleSignOut() {
    await signOut()
  }

  return (
    <aside className="w-64 border-r bg-background">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b px-6">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary" />
            <span className="text-xl font-bold">Raply</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* User Section */}
        <div className="border-t p-4">
          <div className="mb-3 flex items-center gap-3 px-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
              {user.email?.[0]?.toUpperCase()}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium">{user.email}</p>
              {isAdmin && (
                <p className="text-xs text-muted-foreground">Admin</p>
              )}
            </div>
          </div>
          <form action={handleSignOut}>
            <Button
              type="submit"
              variant="ghost"
              className="w-full justify-start text-muted-foreground"
              size="sm"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </form>
        </div>
      </div>
    </aside>
  )
}
