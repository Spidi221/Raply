import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin

  // Extract locale from URL path
  const pathSegments = requestUrl.pathname.split('/').filter(Boolean)
  const locale = pathSegments[0] || 'en'

  if (code) {
    const supabase = await createClient()

    // Exchange the code for a session
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error('OAuth callback error:', error)
      // Redirect to sign in with error
      return NextResponse.redirect(`${origin}/${locale}/signin?error=oauth_failed`)
    }
  }

  // Successful auth - redirect to dashboard
  return NextResponse.redirect(`${origin}/${locale}/dashboard`)
}
