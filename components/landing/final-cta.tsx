'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function FinalCTA() {
  const t = useTranslations('finalCta')

  return (
    <section className="bg-foreground py-20 sm:py-32">
      <div className="container mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-6 text-4xl font-bold tracking-tight text-background sm:text-5xl lg:text-6xl">
          {t('heading')}
        </h2>
        <p className="mb-10 text-lg text-background/80 sm:text-xl">
          {t('subheading')}
        </p>
        <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button
            asChild
            size="lg"
            className="bg-background text-foreground hover:bg-background/90"
          >
            <Link href="/signup">
              {t('ctaPrimary')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-background/20 text-background hover:bg-background/10 hover:text-background"
          >
            <Link href="#pricing">{t('ctaSecondary')}</Link>
          </Button>
        </div>
        <p className="mt-6 text-sm text-background/60">
          {t('footnote')}
        </p>
      </div>
    </section>
  )
}
