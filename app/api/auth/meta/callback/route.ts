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
    console.error('Meta OAuth error:', error, errorDescription)
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
    const tokenResponse = await fetch(
      'https://graph.facebook.com/v18.0/oauth/access_token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: process.env.META_APP_ID!,
          client_secret: process.env.META_APP_SECRET!,
          redirect_uri: `${origin}/api/auth/meta/callback`,
          code,
        }),
      }
    )

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json()
      console.error('Meta token exchange error:', errorData)
      return NextResponse.redirect(
        `${origin}/${locale}/integrations?error=token_exchange_failed`
      )
    }

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token

    // Get user's ad accounts
    const adAccountsResponse = await fetch(
      `https://graph.facebook.com/v18.0/me/adaccounts?fields=id,name,currency,timezone,account_status&access_token=${accessToken}`
    )

    if (!adAccountsResponse.ok) {
      console.error('Failed to fetch ad accounts')
      return NextResponse.redirect(
        `${origin}/${locale}/integrations?error=fetch_accounts_failed`
      )
    }

    const adAccountsData = await adAccountsResponse.json()
    const adAccounts = adAccountsData.data || []

    if (adAccounts.length === 0) {
      return NextResponse.redirect(
        `${origin}/${locale}/integrations?error=no_ad_accounts`
      )
    }

    // Store ad accounts in database
    // For now, store the first active account
    // TODO: Let user select which account to connect
    const firstAccount = adAccounts.find(
      (acc: any) => acc.account_status === 1
    ) || adAccounts[0]

    const { error: insertError } = await supabase.from('ad_accounts').upsert(
      {
        user_id: user.id,
        platform: 'meta',
        platform_account_id: firstAccount.id,
        account_name: firstAccount.name,
        currency: firstAccount.currency || 'USD',
        timezone: firstAccount.timezone || 'UTC',
        access_token: accessToken,
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
      `${origin}/${locale}/integrations?success=meta_connected`
    )
  } catch (error) {
    console.error('Meta OAuth callback error:', error)
    return NextResponse.redirect(
      `${origin}/${locale}/integrations?error=unknown`
    )
  }
}
