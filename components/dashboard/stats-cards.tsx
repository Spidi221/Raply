import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Link as LinkIcon, TrendingUp } from 'lucide-react'

interface StatsCardsProps {
  totalReports: number
  totalAccounts: number
  reportsThisMonth: number
}

export function StatsCards({
  totalReports,
  totalAccounts,
  reportsThisMonth,
}: StatsCardsProps) {
  const stats = [
    {
      title: 'Reports',
      value: totalReports,
      description: 'Generated reports',
      icon: FileText,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Ad Accounts',
      value: totalAccounts,
      description: 'Connected accounts',
      icon: LinkIcon,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'This Month',
      value: reportsThisMonth,
      description: 'Reports this month',
      icon: TrendingUp,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`rounded-full p-2 ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.iconColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
