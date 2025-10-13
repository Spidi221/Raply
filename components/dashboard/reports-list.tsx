import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FileText, ExternalLink, Calendar } from 'lucide-react'
import type { ReportWithAccount } from '@/lib/types'

interface ReportsListProps {
  reports: ReportWithAccount[]
  locale: string
  limit?: number
}

export function ReportsList({ reports, locale, limit }: ReportsListProps) {
  const displayReports = limit ? reports.slice(0, limit) : reports

  return (
    <div className="space-y-4">
      {displayReports.map((report) => (
        <Card key={report.id}>
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-primary/10 p-3">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{report.name}</h3>
                  <Badge variant="secondary">{report.template_type}</Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(report.created_at).toLocaleDateString()}
                  </span>
                  {report.ad_account && (
                    <span>{report.ad_account.account_name}</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {report.date_from} → {report.date_to}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href={`/${locale}/reports/${report.id}`}>
                <Button variant="outline" size="sm">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
