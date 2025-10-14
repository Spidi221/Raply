'use client'

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useState } from 'react'

interface ConnectMetaButtonProps {
  locale: string
  label: string
}

export function ConnectMetaButton({ locale, label }: ConnectMetaButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  function handleConnect() {
    try {
      setIsLoading(true)

      // Build Meta OAuth URL
      const metaAppId = process.env.NEXT_PUBLIC_META_APP_ID
      const redirectUri = process.env.NEXT_PUBLIC_META_REDIRECT_URI

      if (!metaAppId || !redirectUri) {
        console.error('Meta app configuration missing')
        alert('Meta Ads integration is not configured. Please contact support.')
        setIsLoading(false)
        return
      }

      // State parameter to preserve locale through OAuth flow
      const state = encodeURIComponent(JSON.stringify({ locale }))

      // Meta OAuth scopes needed for Marketing API
      const scopes = [
        'ads_read',           // Read ad account data
        'ads_management',     // Manage ads (for future features)
        'read_insights',      // Access insights/metrics
      ].join(',')

      const authUrl = new URL('https://www.facebook.com/v18.0/dialog/oauth')
      authUrl.searchParams.set('client_id', metaAppId)
      authUrl.searchParams.set('redirect_uri', redirectUri)
      authUrl.searchParams.set('state', state)
      authUrl.searchParams.set('scope', scopes)
      authUrl.searchParams.set('response_type', 'code')

      // Redirect to Meta authorization
      window.location.href = authUrl.toString()
    } catch (error) {
      console.error('Error initiating Meta OAuth:', error)
      alert('Failed to connect to Meta Ads. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <Button
      className="w-full"
      onClick={handleConnect}
      disabled={isLoading}
    >
      <Plus className="mr-2 h-4 w-4" />
      {isLoading ? 'Connecting...' : label}
    </Button>
  )
}
