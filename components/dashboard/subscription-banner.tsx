import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

interface SubscriptionBannerProps {
  locale: string
  message: string
  actionLabel: string
  actionHref: string
}

export function SubscriptionBanner({
  locale,
  message,
  actionLabel,
  actionHref,
}: SubscriptionBannerProps) {
  return (
    <div className="mb-6 rounded-lg border border-orange-200 bg-orange-50 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-orange-600" />
          <p className="text-sm text-orange-900">{message}</p>
        </div>
        <Link href={`/${locale}${actionHref}`}>
          <Button variant="default" size="sm">
            {actionLabel}
          </Button>
        </Link>
      </div>
    </div>
  )
}
