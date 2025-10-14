'use client'

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useState } from 'react'

interface ConnectGoogleButtonProps {
  locale: string
  label: string
}

export function ConnectGoogleButton({ locale, label }: ConnectGoogleButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  function handleConnect() {
    try {
      setIsLoading(true)

      // Build Google OAuth URL
      const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
      const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI

      if (!googleClientId || !redirectUri) {
        console.error('Google OAuth configuration missing')
        alert('Google Ads integration is not configured. Please contact support.')
        setIsLoading(false)
        return
      }

      // State parameter to preserve locale through OAuth flow
      const state = encodeURIComponent(JSON.stringify({ locale }))

      // Google OAuth scopes needed for Google Ads API
      const scopes = [
        'https://www.googleapis.com/auth/adwords', // Google Ads API access
        'openid',                                    // OpenID Connect
        'email',                                      // User email
        'profile',                                    // User profile
      ].join(' ')

      const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
      authUrl.searchParams.set('client_id', googleClientId)
      authUrl.searchParams.set('redirect_uri', redirectUri)
      authUrl.searchParams.set('response_type', 'code')
      authUrl.searchParams.set('scope', scopes)
      authUrl.searchParams.set('state', state)
      authUrl.searchParams.set('access_type', 'offline') // Request refresh token
      authUrl.searchParams.set('prompt', 'consent')      // Force consent screen

      // Redirect to Google authorization
      window.location.href = authUrl.toString()
    } catch (error) {
      console.error('Error initiating Google OAuth:', error)
      alert('Failed to connect to Google Ads. Please try again.')
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
