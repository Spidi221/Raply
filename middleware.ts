import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import createIntlMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

// Create the i18n middleware
const intlMiddleware = createIntlMiddleware(routing)

export async function middleware(request: NextRequest) {
  // First, handle i18n routing
  const intlResponse = intlMiddleware(request)

  // Then, handle Supabase session
  const supabaseResponse = await updateSession(request)

  // Merge headers from both middlewares
  if (intlResponse && intlResponse.headers) {
    // Copy headers from Supabase response to i18n response
    supabaseResponse.headers.forEach((value, key) => {
      intlResponse.headers.set(key, value)
    })
    return intlResponse
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - files with extensions
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
