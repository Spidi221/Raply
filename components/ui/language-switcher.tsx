'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/routing'
import { localeNames, type Locale } from '@/i18n/config'
import { Button } from '@/components/ui/button'
import { Globe } from 'lucide-react'

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleLocaleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-muted-foreground" />
      <div className="flex items-center gap-1">
        {Object.entries(localeNames).map(([key, name]) => (
          <Button
            key={key}
            variant={locale === key ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleLocaleChange(key as Locale)}
            className="h-8 px-2 text-xs"
          >
            {name}
          </Button>
        ))}
      </div>
    </div>
  )
}
