'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

interface SetupGoogleCustomerIdProps {
  accountId: string
  currentCustomerId?: string
}

export function SetupGoogleCustomerId({ accountId, currentCustomerId }: SetupGoogleCustomerIdProps) {
  const [customerId, setCustomerId] = useState(currentCustomerId || '')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Format input as user types (add dashes)
  function handleInputChange(value: string) {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '')

    // Limit to 10 digits
    const limited = digits.slice(0, 10)

    // Add dashes: 123-456-7890
    let formatted = limited
    if (limited.length > 6) {
      formatted = `${limited.slice(0, 3)}-${limited.slice(3, 6)}-${limited.slice(6)}`
    } else if (limited.length > 3) {
      formatted = `${limited.slice(0, 3)}-${limited.slice(3)}`
    }

    setCustomerId(formatted)
    setError(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // Validate format
    const isValid = /^\d{3}-\d{3}-\d{4}$/.test(customerId)
    if (!isValid) {
      setError('Customer ID must be 10 digits in format: 123-456-7890')
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch('/api/integrations/update-customer-id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accountId,
          customerId,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update Customer ID')
      }

      // Success - refresh the page
      router.refresh()
    } catch (error) {
      console.error('Update error:', error)
      setError(error instanceof Error ? error.message : 'Failed to update Customer ID')
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-orange-500/50 bg-orange-500/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-orange-500" />
          Setup Required: Google Ads Customer ID
        </CardTitle>
        <CardDescription>
          Enter your Google Ads Customer ID to complete the integration
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customerId">
              Customer ID
            </Label>
            <Input
              id="customerId"
              type="text"
              placeholder="123-456-7890"
              value={customerId}
              onChange={(e) => handleInputChange(e.target.value)}
              disabled={isLoading}
              className="font-mono"
            />
            <p className="text-sm text-muted-foreground">
              Find your Customer ID in the top right corner of Google Ads (format: 123-456-7890)
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          <Button type="submit" disabled={isLoading || !customerId}>
            {isLoading ? 'Updating...' : 'Update Customer ID'}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-muted rounded-lg space-y-2">
          <p className="text-sm font-medium flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            How to find your Customer ID:
          </p>
          <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside ml-6">
            <li>Sign in to your Google Ads account</li>
            <li>Look at the top right corner of the page</li>
            <li>You'll see a 10-digit number in format: 123-456-7890</li>
            <li>Copy and paste it here</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  )
}
