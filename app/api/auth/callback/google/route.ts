import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const error = requestUrl.searchParams.get('error')
  const errorDescription = requestUrl.searchParams.get('error_description')
  const state = requestUrl.searchParams.get('state')
  const origin = requestUrl.origin

  // Parse state to get locale
  let locale = 'en'
  try {
    if (state) {
      const stateData = JSON.parse(decodeURIComponent(state))
      locale = stateData.locale || 'en'
    }
  } catch (e) {
    console.error('Failed to parse state:', e)
  }

  // Handle OAuth errors
  if (error) {
    console.error('Google OAuth error:', error, errorDescription)
    return NextResponse.redirect(
      `${origin}/${locale}/integrations?error=${encodeURIComponent(error)}`
    )
  }

  if (!code) {
    return NextResponse.redirect(
      `${origin}/${locale}/integrations?error=no_code`
    )
  }

  try {
    const supabase = await createClient()

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.redirect(`${origin}/${locale}/signin?error=unauthenticated`)
    }

    // Exchange code for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        code,
        grant_type: 'authorization_code',
        redirect_uri: `${origin}/api/auth/callback/google`,
      }),
    })

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json()
      console.error('Google token exchange error:', errorData)
      return NextResponse.redirect(
        `${origin}/${locale}/integrations?error=token_exchange_failed`
      )
    }

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token
    const refreshToken = tokenData.refresh_token

    // Get user's Google Ads accounts
    // Note: Google Ads API requires manager account (MCC) access
    // For now, we'll use a simple approach - user provides Customer ID manually
    // or we fetch it from Google Ads API

    // Fetch accessible customers using Google Ads API
    const customersResponse = await fetch(
      'https://googleads.googleapis.com/v17/customers:listAccessibleCustomers',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'developer-token': process.env.GOOGLE_ADS_DEVELOPER_TOKEN || '',
        },
      }
    )

    if (!customersResponse.ok) {
      const errorData = await customersResponse.text()
      console.error('Failed to fetch Google Ads customers:', errorData)

      // If we can't fetch customers, still save the connection
      // User can manually provide Customer ID later
      const { error: insertError } = await supabase.from('ad_accounts').upsert(
        {
          user_id: user.id,
          platform: 'google',
          platform_account_id: 'setup_required',
          account_name: 'Google Ads (setup required)',
          currency: 'USD',
          timezone: 'UTC',
          access_token: accessToken,
          refresh_token: refreshToken,
          status: 'error',
          last_sync_at: new Date().toISOString(),
        },
        {
          onConflict: 'user_id,platform,platform_account_id',
        }
      )

      if (insertError) {
        console.error('Failed to store ad account:', insertError)
        return NextResponse.redirect(
          `${origin}/${locale}/integrations?error=database_error`
        )
      }

      return NextResponse.redirect(
        `${origin}/${locale}/integrations?success=google_connected&status=setup_required`
      )
    }

    const customersData = await customersResponse.json()
    const customerIds = customersData.resourceNames || []

    if (customerIds.length === 0) {
      return NextResponse.redirect(
        `${origin}/${locale}/integrations?error=no_google_ads_accounts`
      )
    }

    // Extract customer ID from resource name (format: "customers/1234567890")
    const firstCustomerId = customerIds[0].split('/')[1]

    // Store the first accessible customer
    // TODO: Let user select which customer to connect
    const { error: insertError } = await supabase.from('ad_accounts').upsert(
      {
        user_id: user.id,
        platform: 'google',
        platform_account_id: firstCustomerId,
        account_name: `Google Ads ${firstCustomerId}`,
        currency: 'USD',
        timezone: 'UTC',
        access_token: accessToken,
        refresh_token: refreshToken,
        status: 'active',
        last_sync_at: new Date().toISOString(),
      },
      {
        onConflict: 'user_id,platform,platform_account_id',
      }
    )

    if (insertError) {
      console.error('Failed to store ad account:', insertError)
      return NextResponse.redirect(
        `${origin}/${locale}/integrations?error=database_error`
      )
    }

    // Success! Redirect to integrations page
    return NextResponse.redirect(
      `${origin}/${locale}/integrations?success=google_connected`
    )
  } catch (error) {
    console.error('Google OAuth callback error:', error)
    return NextResponse.redirect(
      `${origin}/${locale}/integrations?error=unknown`
    )
  }
}
