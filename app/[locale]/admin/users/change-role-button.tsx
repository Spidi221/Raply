'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Shield, ShieldOff } from 'lucide-react'
import { changeUserRole } from './actions'

type User = {
  id: string
  email: string
  role: 'user' | 'admin'
}

export function ChangeRoleButton({ user }: { user: User }) {
  const [isLoading, setIsLoading] = useState(false)

  async function handleChangeRole() {
    if (isLoading) return

    // Confirm action
    const newRole = user.role === 'admin' ? 'user' : 'admin'
    const message =
      newRole === 'admin'
        ? `Promote ${user.email} to admin? They will have unlimited access to all features.`
        : `Demote ${user.email} to regular user? They will lose admin privileges.`

    if (!confirm(message)) return

    setIsLoading(true)

    try {
      const result = await changeUserRole(user.id, newRole)

      if (result.success) {
        // Success - page will revalidate
      } else {
        alert(`Error: ${result.error}`)
      }
    } catch (error) {
      console.error('Error changing role:', error)
      alert('An error occurred while changing the role')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleChangeRole}
      disabled={isLoading}
    >
      {isLoading ? (
        'Updating...'
      ) : user.role === 'admin' ? (
        <>
          <ShieldOff className="mr-2 h-4 w-4" />
          Remove Admin
        </>
      ) : (
        <>
          <Shield className="mr-2 h-4 w-4" />
          Make Admin
        </>
      )}
    </Button>
  )
}
