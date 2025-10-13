import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { User, Bell, CreditCard, Shield, Trash2 } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

export const metadata = {
  title: 'Settings | Raply',
  description: 'Manage your account settings and preferences',
}

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = await createClient()
  const t = await getTranslations('dashboard.settings')

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/${locale}/signin`)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">{t('heading')}</h1>
        <p className="mt-2 text-muted-foreground">{t('subheading')}</p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>{t('profileTitle')}</CardTitle>
              <CardDescription>{t('profileDescription')}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t('emailLabel')}</Label>
            <Input
              id="email"
              type="email"
              value={user.email || ''}
              disabled
              className="bg-muted"
            />
            <p className="text-xs text-muted-foreground">{t('emailHelp')}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">{t('nameLabel')}</Label>
            <Input
              id="name"
              type="text"
              placeholder={t('namePlaceholder')}
              disabled
            />
          </div>
          <Button disabled>{t('saveProfileButton')}</Button>
        </CardContent>
      </Card>

      <Separator />

      {/* Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <CardTitle>{t('notificationsTitle')}</CardTitle>
              <CardDescription>{t('notificationsDescription')}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{t('emailNotificationsLabel')}</p>
                <p className="text-sm text-muted-foreground">{t('emailNotificationsHelp')}</p>
              </div>
              <Button variant="outline" size="sm" disabled>
                {t('enableButton')}
              </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{t('reportAlertsLabel')}</p>
                <p className="text-sm text-muted-foreground">{t('reportAlertsHelp')}</p>
              </div>
              <Button variant="outline" size="sm" disabled>
                {t('enableButton')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Subscription */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/10">
              <CreditCard className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <CardTitle>{t('subscriptionTitle')}</CardTitle>
              <CardDescription>{t('subscriptionDescription')}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="font-semibold text-lg">{t('freePlanName')}</p>
              <p className="text-sm text-muted-foreground mt-1">{t('freePlanDescription')}</p>
            </div>
            <Button disabled>{t('upgradeButton')}</Button>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Security */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-500/10">
              <Shield className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <CardTitle>{t('securityTitle')}</CardTitle>
              <CardDescription>{t('securityDescription')}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{t('passwordLabel')}</Label>
            <Button variant="outline" disabled>
              {t('changePasswordButton')}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Danger Zone */}
      <Card className="border-destructive/50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/10">
              <Trash2 className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <CardTitle className="text-destructive">{t('dangerZoneTitle')}</CardTitle>
              <CardDescription>{t('dangerZoneDescription')}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" disabled>
            {t('deleteAccountButton')}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
