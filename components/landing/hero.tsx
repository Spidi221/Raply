'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'

export function Hero() {
  const t = useTranslations('hero')

  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Left Column - Content */}
          <div className="flex flex-col justify-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center space-x-2 rounded-full border border-border bg-muted px-4 py-2 text-sm font-medium text-foreground w-fit">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>{t('badge')}</span>
            </div>

            {/* Headline */}
            <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              {t('headline')}{' '}
              <span className="text-primary">{t('headlineHighlight')}</span>
            </h1>

            {/* Subheadline */}
            <p className="mb-8 text-lg text-muted-foreground sm:text-xl lg:text-2xl">
              {t('subheadline')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button asChild size="lg" className="text-base">
                <Link href="/signup">
                  {t('ctaPrimary')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base">
                <Link href="#how-it-works">{t('ctaSecondary')}</Link>
              </Button>
            </div>

            {/* Social Proof */}
            <div className="mt-8 flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <span className="font-semibold text-foreground">{t('socialProof1Label')}</span>
                <span className="ml-2">{t('socialProof1Text')}</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center">
                <span className="font-semibold text-foreground">{t('socialProof2Label')}</span>
                <span className="ml-2">{t('socialProof2Text')}</span>
              </div>
            </div>
          </div>

          {/* Right Column - Dashboard Preview Image Placeholder */}
          <div className="relative lg:h-[600px]">
            <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 p-8">
              <div className="text-center">
                <div className="mb-4 text-6xl">📊</div>
                <p className="text-sm text-muted-foreground">
                  {t('dashboardPreview')}
                  <br />
                  {t('dashboardPreviewSubtext')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
