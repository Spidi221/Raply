import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

export const routing = defineRouting({
  // All supported locales
  locales: ['pl', 'en'],

  // Default locale (Polish)
  defaultLocale: 'pl',

  // Never show /pl prefix for Polish
  localePrefix: 'as-needed',
})

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
