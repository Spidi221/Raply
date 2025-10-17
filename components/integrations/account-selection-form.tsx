'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Facebook, Chrome, CheckCircle2, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AdAccount {
  id: string
  name: string
  platform: 'meta' | 'google'
  currency?: string
  timezone?: string
  account_status?: number
}

interface AccountSelectionFormProps {
  accounts: AdAccount[]
  platform: 'meta' | 'google'
  locale: string
}

export function AccountSelectionForm({
  accounts,
  platform,
  locale,
}: AccountSelectionFormProps) {
  const [selectedAccounts, setSelectedAccounts] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const PlatformIcon = platform === 'meta' ? Facebook : Chrome
  const platformColor = platform === 'meta' ? '#1877F2' : '#4285F4'

  function toggleAccount(accountId: string) {
    const newSelection = new Set(selectedAccounts)
    if (newSelection.has(accountId)) {
      newSelection.delete(accountId)
    } else {
      newSelection.add(accountId)
    }
    setSelectedAccounts(newSelection)
    setError(null)
  }

  async function handleSubmit() {
    if (selectedAccounts.size === 0) {
      setError('Please select at least one account')
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch('/api/integrations/select-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accountIds: Array.from(selectedAccounts),
          platform,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to connect accounts')
      }

      // Success! Redirect to integrations page
      router.push(`/${locale}/integrations?success=${platform}_connected`)
      router.refresh()
    } catch (error) {
      console.error('Account selection error:', error)
      setError(error instanceof Error ? error.message : 'Failed to connect accounts')
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Account Cards */}
      {accounts.map((account) => {
        const isSelected = selectedAccounts.has(account.id)
        const isActive = account.account_status === 1 || account.account_status === undefined

        return (
          <Card
            key={account.id}
            className={cn(
              'cursor-pointer transition-all duration-200',
              isSelected
                ? 'border-2 ring-2 ring-primary/20'
                : 'border hover:border-primary/50',
              !isActive && 'opacity-60'
            )}
            onClick={() => isActive && toggleAccount(account.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                {/* Left: Icon + Info */}
                <div className="flex items-start gap-4 flex-1">
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: `${platformColor}15` }}
                  >
                    <PlatformIcon
                      className="h-6 w-6"
                      style={{ color: platformColor }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg truncate">
                        {account.name}
                      </h3>
                      {isActive ? (
                        <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-gray-500/10 text-gray-600 border-gray-500/20">
                          Inactive
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground mb-2">
                      {account.id}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {account.currency && (
                        <span className="flex items-center gap-1">
                          💰 {account.currency}
                        </span>
                      )}
                      {account.timezone && (
                        <span className="flex items-center gap-1">
                          🌍 {account.timezone}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Checkbox */}
                <div className="flex items-center">
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => isActive && toggleAccount(account.id)}
                    disabled={!isActive}
                    className="h-5 w-5"
                  />
                </div>
              </div>

              {!isActive && (
                <p className="mt-3 text-sm text-muted-foreground">
                  This account is inactive and cannot be connected
                </p>
              )}
            </CardContent>
          </Card>
        )
      })}

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-4 pt-4">
        <Button
          variant="outline"
          onClick={() => router.push(`/${locale}/integrations`)}
          disabled={isLoading}
        >
          Cancel
        </Button>

        <div className="flex items-center gap-2">
          {selectedAccounts.size > 0 && (
            <span className="text-sm text-muted-foreground">
              {selectedAccounts.size} account{selectedAccounts.size > 1 ? 's' : ''} selected
            </span>
          )}
          <Button
            onClick={handleSubmit}
            disabled={selectedAccounts.size === 0 || isLoading}
            className="min-w-[150px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                Connect Account{selectedAccounts.size > 1 ? 's' : ''}
                <CheckCircle2 className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
