'use client'

import { useTranslations } from 'next-intl'
import { Link2, Settings, Sparkles } from 'lucide-react'

export function HowItWorks() {
  const t = useTranslations('howItWorks')

  const steps = [
    {
      number: 1,
      icon: Link2,
      title: t('step1Title'),
      description: t('step1Description'),
    },
    {
      number: 2,
      icon: Settings,
      title: t('step2Title'),
      description: t('step2Description'),
    },
    {
      number: 3,
      icon: Sparkles,
      title: t('step3Title'),
      description: t('step3Description'),
    },
  ]

  return (
    <section id="how-it-works" className="bg-background py-20 sm:py-32">
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

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line (desktop only) */}
          <div className="absolute left-1/2 top-24 hidden h-px w-full max-w-4xl -translate-x-1/2 bg-border lg:block" />

          <div className="grid gap-12 lg:grid-cols-3 lg:gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="relative text-center">
                  {/* Step Number Badge */}
                  <div className="relative z-10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border-4 border-background bg-primary text-2xl font-bold text-primary-foreground">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                    <Icon className="h-6 w-6 text-foreground" />
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
