import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Facebook, Chrome, CheckCircle2, ArrowRight, AlertCircle } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { AccountSelectionForm } from '@/components/integrations/account-selection-form'
import { SetupGoogleCustomerId } from '@/components/integrations/setup-google-customer-id'
import { cookies } from 'next/headers'

export const metadata = {
  title: 'Select Account | Raply',
  description: 'Choose your advertising account',
}

interface AdAccount {
  id: string
  name: string
  platform: 'meta' | 'google'
  currency?: string
  timezone?: string
  account_status?: number
}

interface PendingAccountsData {
  platform: 'meta' | 'google'
  accessToken: string
  refreshToken?: string
  accounts: AdAccount[]
  userId: string
  expiresAt: number
  requiresManualSetup?: boolean
}

export default async function SelectAccountPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ status?: string }>
}) {
  const { locale } = await params
  const { status } = await searchParams
  const supabase = await createClient()
  const t = await getTranslations('dashboard.integrations')

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/${locale}/signin`)
  }

  // Get pending accounts from cookies
  const cookieStore = await cookies()
  const pendingAccountsCookie = cookieStore.get('pending_accounts')

  if (!pendingAccountsCookie) {
    // No pending accounts data - redirect back to integrations
    redirect(`/${locale}/integrations`)
  }

  let pendingAccountsData: PendingAccountsData
  try {
    pendingAccountsData = JSON.parse(pendingAccountsCookie.value)

    // Check if data expired
    if (Date.now() > pendingAccountsData.expiresAt) {
      // Clear expired cookie
      cookieStore.delete('pending_accounts')
      redirect(`/${locale}/integrations?error=session_expired`)
    }

    // Verify user ID matches
    if (pendingAccountsData.userId !== user.id) {
      cookieStore.delete('pending_accounts')
      redirect(`/${locale}/integrations?error=invalid_session`)
    }
  } catch (error) {
    console.error('Failed to parse pending accounts:', error)
    cookieStore.delete('pending_accounts')
    redirect(`/${locale}/integrations?error=invalid_session`)
  }

  const platform = pendingAccountsData.platform
  const pendingAccounts = pendingAccountsData.accounts
  const platformName = platform === 'meta' ? 'Meta Ads' : 'Google Ads'
  const PlatformIcon = platform === 'meta' ? Facebook : Chrome
  const platformColor = platform === 'meta' ? '#1877F2' : '#4285F4'

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      {/* Header */}
      <div className="mb-8 text-center">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
          style={{ backgroundColor: `${platformColor}15` }}
        >
          <PlatformIcon className="w-8 h-8" style={{ color: platformColor }} />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-2">
          {t('selectAccountTitle', { platform: platformName })}
        </h1>
        <p className="text-lg text-muted-foreground">
          {t('selectAccountDescription')}
        </p>
      </div>

      {/* Info Card */}
      <Card className="mb-6 border-blue-500/50 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CheckCircle2 className="h-5 w-5 text-blue-500" />
            {t('authenticationSuccessful')}
          </CardTitle>
          <CardDescription>
            {t('foundAccountsCount', { count: pendingAccounts.length })}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Account Selection or Manual Setup */}
      <div className="space-y-4 mb-8">
        {pendingAccountsData.requiresManualSetup ? (
          <>
            {/* Manual Setup Required (Google Ads API failed) */}
            <Card className="border-orange-500/50 bg-orange-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                  {t('manualSetupRequired')}
                </CardTitle>
                <CardDescription>
                  {t('manualSetupDescription')}
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Manual Customer ID input component */}
            <SetupGoogleCustomerId
              accountId="temp_id"
              currentCustomerId={undefined}
            />
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold">{t('selectAccountsLabel')}</h2>

            <AccountSelectionForm
              accounts={pendingAccounts}
              platform={platform}
              locale={locale}
            />

            {/* Help Text */}
            <div className="mt-8 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>{t('note')}:</strong> {t('multiAccountHelp')}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
