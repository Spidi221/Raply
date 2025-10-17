import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { cookies } from 'next/headers'

const selectAccountSchema = z.object({
  accountIds: z.array(z.string()).min(1, 'At least one account must be selected'),
  platform: z.enum(['meta', 'google']),
})

interface PendingAccountsData {
  platform: 'meta' | 'google'
  accessToken: string
  refreshToken?: string
  accounts: Array<{
    id: string
    name: string
    platform: 'meta' | 'google'
    currency?: string
    timezone?: string
    account_status?: number
  }>
  userId: string
  expiresAt: number
}

export async function POST(request: NextRequest) {
  try {
    // Validate request body
    const body = await request.json()
    const validated = selectAccountSchema.parse(body)

    // Check authentication
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get pending accounts from cookies
    const cookieStore = await cookies()
    const pendingAccountsCookie = cookieStore.get('pending_accounts')

    if (!pendingAccountsCookie) {
      return NextResponse.json(
        { error: 'Session expired. Please reconnect your account.' },
        { status: 400 }
      )
    }

    let pendingAccountsData: PendingAccountsData
    try {
      pendingAccountsData = JSON.parse(pendingAccountsCookie.value)

      // Verify session validity
      if (Date.now() > pendingAccountsData.expiresAt) {
        cookieStore.delete('pending_accounts')
        return NextResponse.json(
          { error: 'Session expired. Please reconnect your account.' },
          { status: 400 }
        )
      }

      // Verify user ID matches
      if (pendingAccountsData.userId !== user.id) {
        cookieStore.delete('pending_accounts')
        return NextResponse.json(
          { error: 'Invalid session' },
          { status: 403 }
        )
      }

      // Verify platform matches
      if (pendingAccountsData.platform !== validated.platform) {
        return NextResponse.json(
          { error: 'Platform mismatch' },
          { status: 400 }
        )
      }
    } catch (error) {
      console.error('Failed to parse pending accounts:', error)
      cookieStore.delete('pending_accounts')
      return NextResponse.json(
        { error: 'Invalid session data' },
        { status: 400 }
      )
    }

    // Find selected accounts from pending data
    const selectedAccounts = pendingAccountsData.accounts.filter((acc) =>
      validated.accountIds.includes(acc.id)
    )

    if (selectedAccounts.length === 0) {
      return NextResponse.json(
        { error: 'No valid accounts selected' },
        { status: 400 }
      )
    }

    // Insert selected accounts into database
    const accountsToInsert = selectedAccounts.map((account) => ({
      user_id: user.id,
      platform: pendingAccountsData.platform,
      platform_account_id: account.id,
      account_name: account.name || account.id,
      currency: account.currency || 'USD',
      timezone: account.timezone || 'UTC',
      access_token: pendingAccountsData.accessToken,
      refresh_token: pendingAccountsData.refreshToken || null,
      status: 'active',
      last_sync_at: new Date().toISOString(),
    }))

    const { error: insertError } = await supabase
      .from('ad_accounts')
      .upsert(accountsToInsert, {
        onConflict: 'user_id,platform,platform_account_id',
      })

    if (insertError) {
      console.error('Failed to insert ad accounts:', insertError)
      return NextResponse.json(
        { error: 'Failed to save accounts' },
        { status: 500 }
      )
    }

    // Clear the pending accounts cookie
    cookieStore.delete('pending_accounts')

    return NextResponse.json({
      success: true,
      message: `Successfully connected ${selectedAccounts.length} account(s)`,
      accountsConnected: selectedAccounts.length,
    })
  } catch (error) {
    // Zod validation error
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.issues },
        { status: 400 }
      )
    }

    // Generic error
    console.error('Select account API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
