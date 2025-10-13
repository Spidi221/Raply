import { FileText, Link as LinkIcon, TrendingUp } from 'lucide-react'
import { StatCardV2 } from './stat-card-v2'

interface StatsCardsV2Props {
  totalReports: number
  totalAccounts: number
  reportsThisMonth: number
}

// Mock sparkline data - later can be replaced with real historical data
const generateSparklineData = (baseValue: number, trend: 'up' | 'down' | 'stable') => {
  const data = []
  const points = 7 // 7 days of data

  for (let i = 0; i < points; i++) {
    let value = baseValue

    if (trend === 'up') {
      value = baseValue * (0.7 + (i / points) * 0.3) // Gradual increase
    } else if (trend === 'down') {
      value = baseValue * (1.0 - (i / points) * 0.2) // Gradual decrease
    } else {
      // Stable with minor variations
      value = baseValue * (0.9 + Math.random() * 0.2)
    }

    data.push({ value: Math.round(value) })
  }

  return data
}

export function StatsCardsV2({
  totalReports,
  totalAccounts,
  reportsThisMonth,
}: StatsCardsV2Props) {
  const stats = [
    {
      title: 'Total Reports',
      value: totalReports,
      description: 'Generated reports',
      icon: FileText,
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)', // Blue gradient
      change: 12.5,
      sparklineData: generateSparklineData(totalReports, 'up'),
    },
    {
      title: 'Ad Accounts',
      value: totalAccounts,
      description: 'Connected accounts',
      icon: LinkIcon,
      gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)', // Green gradient
      change: 8.2,
      sparklineData: generateSparklineData(totalAccounts, 'stable'),
    },
    {
      title: 'This Month',
      value: reportsThisMonth,
      description: 'Reports this month',
      icon: TrendingUp,
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)', // Purple gradient
      change: 15.3,
      sparklineData: generateSparklineData(reportsThisMonth, 'up'),
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {stats.map((stat) => (
        <StatCardV2
          key={stat.title}
          title={stat.title}
          value={stat.value}
          description={stat.description}
          icon={stat.icon}
          gradient={stat.gradient}
          change={stat.change}
          sparklineData={stat.sparklineData}
        />
      ))}
    </div>
  )
}
