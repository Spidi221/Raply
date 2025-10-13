'use client'

import { useTranslations } from 'next-intl'
import { Zap, Brain, BarChart, Clock, FileText, Mail } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Features() {
  const t = useTranslations('features')

  const features = [
    {
      icon: Zap,
      title: t('feature1Title'),
      description: t('feature1Description'),
    },
    {
      icon: Brain,
      title: t('feature2Title'),
      description: t('feature2Description'),
    },
    {
      icon: BarChart,
      title: t('feature3Title'),
      description: t('feature3Description'),
    },
    {
      icon: Clock,
      title: t('feature4Title'),
      description: t('feature4Description'),
    },
    {
      icon: FileText,
      title: t('feature5Title'),
      description: t('feature5Description'),
    },
    {
      icon: Mail,
      title: t('feature6Title'),
      description: t('feature6Description'),
    },
  ]

  return (
    <section id="features" className="bg-muted/30 py-20 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {t('heading')}{' '}
            <span className="text-primary">{t('headingHighlight')}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t('subheading')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="border-border bg-card">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
