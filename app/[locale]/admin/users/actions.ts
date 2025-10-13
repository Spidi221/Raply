'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/utils/auth'

export async function changeUserRole(userId: string, newRole: 'user' | 'admin') {
  try {
    // Verify admin access
    await requireAdmin()

    const supabase = await createClient()

    // Update user role
    const { error } = await supabase
      .from('users')
      .update({ role: newRole })
      .eq('id', userId)

    if (error) {
      console.error('Error updating user role:', error)
      return { success: false, error: 'Failed to update user role' }
    }

    // Revalidate the users page
    revalidatePath('/admin/users')

    return { success: true }
  } catch (error) {
    console.error('Error in changeUserRole:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
