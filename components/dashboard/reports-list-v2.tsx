import { ReportCardV2 } from './report-card-v2'
import type { ReportWithAccount } from '@/lib/types'

interface ReportsListV2Props {
  reports: ReportWithAccount[]
  locale: string
  limit?: number
}

export function ReportsListV2({ reports, locale, limit }: ReportsListV2Props) {
  const displayReports = limit ? reports.slice(0, limit) : reports

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
      {displayReports.map((report) => (
        <ReportCardV2 key={report.id} report={report} locale={locale} />
      ))}
    </div>
  )
}
