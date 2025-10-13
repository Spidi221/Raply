'use client'

import { useTranslations } from 'next-intl'
import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'

export function Testimonials() {
  const t = useTranslations('testimonials')

  const testimonials = [
    {
      quote: t('testimonial1Quote'),
      author: t('testimonial1Author'),
      role: t('testimonial1Role'),
      company: t('testimonial1Company'),
      rating: 5,
    },
    {
      quote: t('testimonial2Quote'),
      author: t('testimonial2Author'),
      role: t('testimonial2Role'),
      company: t('testimonial2Company'),
      rating: 5,
    },
    {
      quote: t('testimonial3Quote'),
      author: t('testimonial3Author'),
      role: t('testimonial3Role'),
      company: t('testimonial3Company'),
      rating: 5,
    },
  ]

  return (
    <section className="bg-background py-20 sm:py-32">
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

        {/* Testimonials Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border bg-card">
              <CardContent className="pt-6">
                {/* Rating */}
                <div className="mb-4 flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-primary text-primary"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="mb-6 text-muted-foreground">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.company}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
