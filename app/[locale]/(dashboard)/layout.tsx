import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { DashboardNav } from '@/components/dashboard/dashboard-nav'
import { isAdmin } from '@/lib/utils/auth'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/signin')
  }

  const admin = await isAdmin()

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Navigation */}
      <DashboardNav user={user} isAdmin={admin} />

      {/* Main Content */}
      <main className="flex-1 bg-muted/10">
        <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
}
