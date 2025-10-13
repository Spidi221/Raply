import { createClient } from '@/lib/supabase/server'

/**
 * Check if the current authenticated user has admin role
 *
 * Admin users have:
 * - Unlimited ad accounts
 * - Unlimited reports per month
 * - Full AI features enabled
 * - Access to all user data (for support)
 * - User management capabilities
 * - System analytics access
 *
 * @returns Promise<boolean> - true if user is admin, false otherwise
 */
export async function isAdmin(): Promise<boolean> {
  try {
    const supabase = await createClient()

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return false
    }

    // Check user role in public.users table
    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (error || !data) {
      return false
    }

    return data.role === 'admin'
  } catch (error) {
    console.error('Error checking admin status:', error)
    return false
  }
}

/**
 * Get current user with role information
 *
 * @returns User object with role or null if not authenticated
 */
export async function getCurrentUserWithRole() {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return null
    }

    // Get user profile with role
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error || !data) {
      return null
    }

    return {
      ...user,
      profile: data,
    }
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

/**
 * Require admin role - throws error if user is not admin
 * Use this in API routes and server actions
 */
export async function requireAdmin() {
  const admin = await isAdmin()

  if (!admin) {
    throw new Error('Unauthorized: Admin access required')
  }
}
