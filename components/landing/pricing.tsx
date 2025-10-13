'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'

export function Pricing() {
  const t = useTranslations('pricing')

  const plans = [
    {
      name: t('plan1Name'),
      price: 0,
      period: null,
      description: t('plan1Description'),
      features: [
        t('plan1Feature1'),
        t('plan1Feature2'),
        t('plan1Feature3'),
        t('plan1Feature4'),
        t('plan1Feature5'),
        t('plan1Feature6'),
      ],
      cta: t('plan1Cta'),
      ctaVariant: 'outline' as const,
      highlighted: false,
    },
    {
      name: t('plan2Name'),
      price: 47,
      period: t('period'),
      description: t('plan2Description'),
      features: [
        t('plan2Feature1'),
        t('plan2Feature2'),
        t('plan2Feature3'),
        t('plan2Feature4'),
        t('plan2Feature5'),
        t('plan2Feature6'),
      ],
      cta: t('plan2Cta'),
      ctaVariant: 'outline' as const,
      highlighted: false,
    },
    {
      name: t('plan3Name'),
      price: 87,
      period: t('period'),
      description: t('plan3Description'),
      features: [
        t('plan3Feature1'),
        t('plan3Feature2'),
        t('plan3Feature3'),
        t('plan3Feature4'),
        t('plan3Feature5'),
        t('plan3Feature6'),
        t('plan3Feature7'),
      ],
      cta: t('plan3Cta'),
      ctaVariant: 'default' as const,
      highlighted: true,
    },
    {
      name: t('plan4Name'),
      price: 177,
      period: t('period'),
      description: t('plan4Description'),
      features: [
        t('plan4Feature1'),
        t('plan4Feature2'),
        t('plan4Feature3'),
        t('plan4Feature4'),
        t('plan4Feature5'),
        t('plan4Feature6'),
        t('plan4Feature7'),
        t('plan4Feature8'),
      ],
      cta: t('plan4Cta'),
      ctaVariant: 'outline' as const,
      highlighted: false,
    },
  ]

  return (
    <section id="pricing" className="bg-muted/30 py-20 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {t('heading')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t('subheading')}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative border ${
                plan.highlighted
                  ? 'border-primary shadow-lg ring-2 ring-primary/20'
                  : 'border-border'
              } bg-card`}
            >
              <CardHeader className="pb-8 pt-8">
                <CardTitle className="text-center">
                  <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    {plan.name}
                  </div>
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-extrabold text-foreground">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="ml-1 text-lg text-muted-foreground">
                        {t('currency')}{plan.period}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </CardTitle>
              </CardHeader>

              <CardContent>
                <Button
                  asChild
                  variant={plan.ctaVariant}
                  className="mb-6 w-full"
                  size="lg"
                >
                  <Link href="/signup">{plan.cta}</Link>
                </Button>

                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="mr-3 h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enterprise CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            {t('enterpriseText')}{' '}
            <Link
              href="mailto:contact@raply.app"
              className="font-semibold text-primary hover:underline"
            >
              {t('enterpriseLink')}
            </Link>{' '}
            {t('enterpriseTextEnd')}
          </p>
        </div>
      </div>
    </section>
  )
}
