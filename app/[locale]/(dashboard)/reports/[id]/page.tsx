import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Download, Mail, Share2 } from 'lucide-react'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

export const metadata = {
  title: 'Report Details | Raply',
  description: 'View report details and insights',
}

export default async function ReportDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}) {
  const { locale, id } = await params
  const supabase = await createClient()
  const t = await getTranslations('dashboard.reportDetail')

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/${locale}/signin`)
  }

  // Fetch report
  const { data: report, error } = await supabase
    .from('reports')
    .select(`
      *,
      ad_account:ad_accounts(name, platform)
    `)
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (error || !report) {
    notFound()
  }

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
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">{report.name}</h1>
            <p className="mt-2 text-muted-foreground">
              {t('createdOn')}: {new Date(report.created_at).toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              <Download className="mr-2 h-4 w-4" />
              {t('downloadPDF')}
            </Button>
            <Button variant="outline" size="sm" disabled>
              <Mail className="mr-2 h-4 w-4" />
              {t('sendEmail')}
            </Button>
            <Button variant="outline" size="sm" disabled>
              <Share2 className="mr-2 h-4 w-4" />
              {t('share')}
            </Button>
          </div>
        </div>
      </div>

      {/* Report Metadata */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t('platform')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {report.ad_account?.platform || 'N/A'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t('account')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {report.ad_account?.name || 'N/A'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t('status')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold capitalize">{report.status}</p>
          </CardContent>
        </Card>
      </div>

      {/* Coming Soon Notice */}
      <Card className="border-primary/50 bg-primary/5">
        <CardHeader>
          <CardTitle>{t('comingSoonTitle')}</CardTitle>
          <CardDescription>{t('comingSoonDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {t('comingSoonDetails')}
          </p>
        </CardContent>
      </Card>

      {/* Report Content Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>{t('reportContentTitle')}</CardTitle>
          <CardDescription>{t('reportContentDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
            <p className="text-muted-foreground">
              {t('reportContentPlaceholder')}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
