import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ReportsListV2 } from '@/components/dashboard/reports-list-v2'
import { EmptyState } from '@/components/dashboard/empty-state'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getReports } from '@/lib/db/queries'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

export const metadata = {
  title: 'Reports | Raply',
  description: 'View and manage your advertising reports',
}

function ReportsListSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-muted animate-pulse rounded-lg" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-48 bg-muted animate-pulse rounded" />
                <div className="h-3 w-64 bg-muted animate-pulse rounded" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

async function ReportsContent({ userId, locale }: { userId: string; locale: string }) {
  const t = await getTranslations('dashboard.reports')
  const { data: reports } = await getReports(userId)

  if (!reports || reports.length === 0) {
    return (
      <EmptyState
        locale={locale}
        title={t('emptyStateHeading')}
        description={t('emptyStateDescription')}
        actionLabel={t('createFirstReport')}
        actionHref={`/${locale}/reports/new`}
      />
    )
  }

  return <ReportsListV2 reports={reports} locale={locale} />
}

export default async function ReportsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = await createClient()
  const t = await getTranslations('dashboard.reports')

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/${locale}/signin`)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">{t('heading')}</h1>
          <p className="mt-2 text-muted-foreground">{t('subheading')}</p>
        </div>
        <Link href={`/${locale}/reports/new`}>
          <Button size="lg">
            <Plus className="mr-2 h-5 w-5" />
            {t('createReportButton')}
          </Button>
        </Link>
      </div>

      {/* Reports List */}
      <Suspense fallback={<ReportsListSkeleton />}>
        <ReportsContent userId={user.id} locale={locale} />
      </Suspense>
    </div>
  )
}
