'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sparkles, TrendingUp, AlertCircle, Lightbulb, X, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Insight {
  id: string
  type: 'success' | 'warning' | 'info'
  title: string
  description: string
  action?: string
}

const MOCK_INSIGHTS: Insight[] = [
  {
    id: '1',
    type: 'success',
    title: 'Strong Performance Detected',
    description: 'Your Facebook campaign "Summer Sale" has 23% higher CTR than average. Consider increasing budget.',
    action: 'Increase Budget',
  },
  {
    id: '2',
    type: 'warning',
    title: 'Budget Optimization Needed',
    description: 'Google Ads campaign is spending 80% of daily budget in first 6 hours. Adjust ad schedule for better distribution.',
    action: 'Adjust Schedule',
  },
  {
    id: '3',
    type: 'info',
    title: 'New Audience Opportunity',
    description: 'Similar audience segment shows 3x higher conversion rate. Test new targeting options.',
    action: 'Explore Audiences',
  },
]

const INSIGHT_STYLES = {
  success: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    icon: 'text-green-600 dark:text-green-400',
    iconBg: 'bg-green-500/10',
  },
  warning: {
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    icon: 'text-orange-600 dark:text-orange-400',
    iconBg: 'bg-orange-500/10',
  },
  info: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    icon: 'text-blue-600 dark:text-blue-400',
    iconBg: 'bg-blue-500/10',
  },
}

const ICON_MAP = {
  success: TrendingUp,
  warning: AlertCircle,
  info: Lightbulb,
}

export function AIInsights() {
  const [insights, setInsights] = useState(MOCK_INSIGHTS)
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set())

  const handleDismiss = (id: string) => {
    setDismissedIds((prev) => new Set(prev).add(id))
  }

  const handleApply = (id: string) => {
    // In real app, this would trigger the actual action
    console.log('Apply insight:', id)
    setDismissedIds((prev) => new Set(prev).add(id))
  }

  const visibleInsights = insights.filter((insight) => !dismissedIds.has(insight.id))

  if (visibleInsights.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/10">
          <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">AI Insights</h2>
          <p className="text-sm text-muted-foreground">
            Personalized recommendations based on your campaign data
          </p>
        </div>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleInsights.map((insight) => {
          const styles = INSIGHT_STYLES[insight.type]
          const Icon = ICON_MAP[insight.type]

          return (
            <div
              key={insight.id}
              className={cn(
                'glass rounded-2xl p-5 border',
                styles.bg,
                styles.border,
                'transition-all duration-300 hover:scale-[1.02]'
              )}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className={cn('p-2 rounded-lg', styles.iconBg)}>
                  <Icon className={cn('h-5 w-5', styles.icon)} />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 -mr-2 -mt-2"
                  onClick={() => handleDismiss(insight.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Content */}
              <div className="space-y-2 mb-4">
                <h3 className="font-semibold text-sm">{insight.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {insight.description}
                </p>
              </div>

              {/* Actions */}
              {insight.action && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="default"
                    className="flex-1 h-8 text-xs"
                    onClick={() => handleApply(insight.id)}
                  >
                    <Check className="h-3 w-3 mr-1" />
                    {insight.action}
                  </Button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
