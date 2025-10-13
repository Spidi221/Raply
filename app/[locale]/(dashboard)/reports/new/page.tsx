import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, FileText, TrendingUp, Users } from 'lucide-react'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

export const metadata = {
  title: 'Create Report | Raply',
  description: 'Create a new advertising report',
}

export default async function NewReportPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = await createClient()
  const t = await getTranslations('dashboard.reportWizard')

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/${locale}/signin`)
  }

  // Template options
  const templates = [
    {
      id: 'leads',
      name: t('templateLeadsName'),
      description: t('templateLeadsDescription'),
      icon: Users,
      metrics: [t('metricLeads'), t('metricCPL'), t('metricConversionRate')],
    },
    {
      id: 'sales',
      name: t('templateSalesName'),
      description: t('templateSalesDescription'),
      icon: TrendingUp,
      metrics: [t('metricRevenue'), t('metricROAS'), t('metricAOV')],
    },
    {
      id: 'reach',
      name: t('templateReachName'),
      description: t('templateReachDescription'),
      icon: FileText,
      metrics: [t('metricImpressions'), t('metricReach'), t('metricCPM')],
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Link href={`/${locale}/reports`}>
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('backToReports')}
          </Button>
        </Link>
        <h1 className="text-4xl font-bold text-foreground">{t('heading')}</h1>
        <p className="mt-2 text-muted-foreground">{t('subheading')}</p>
      </div>

      {/* Coming Soon Notice */}
      <Card className="border-primary/50 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-xl">{t('comingSoonTitle')}</CardTitle>
          <CardDescription>{t('comingSoonDescription')}</CardDescription>
        </CardHeader>
      </Card>

      {/* Template Selection */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">{t('selectTemplateHeading')}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {templates.map((template) => {
            const Icon = template.icon
            return (
              <Card
                key={template.id}
                className="glass hover:scale-[1.02] transition-all duration-300 border-border cursor-not-allowed opacity-70"
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{template.name}</CardTitle>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">
                        {t('keyMetrics')}:
                      </p>
                      <ul className="space-y-1">
                        {template.metrics.map((metric, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-center">
                            <span className="mr-2">•</span>
                            {metric}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button
                      className="w-full"
                      variant="outline"
                      disabled
                    >
                      {t('selectTemplateButton')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Integration Notice */}
      <Card>
        <CardHeader>
          <CardTitle>{t('needIntegrationTitle')}</CardTitle>
          <CardDescription>{t('needIntegrationDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href={`/${locale}/integrations`}>
            <Button variant="outline">
              {t('goToIntegrationsButton')}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
