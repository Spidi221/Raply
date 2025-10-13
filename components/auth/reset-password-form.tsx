'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { updatePassword } from '@/lib/auth/actions'

const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

type ResetPasswordFormInput = z.infer<typeof resetPasswordSchema>

export function ResetPasswordForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<ResetPasswordFormInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(data: ResetPasswordFormInput) {
    try {
      setIsLoading(true)
      setError(null)

      const result = await updatePassword(data.password)

      if (!result.success) {
        setError(result.error || 'Failed to update password')
        return
      }

      // Redirect to signin on success
      router.push('/signin?password-reset=success')
    } catch (err) {
      setError('An unexpected error occurred')
      console.error('Password update error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <FormItem>
        <FormLabel htmlFor="password">New Password</FormLabel>
        <FormControl>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            disabled={isLoading}
            {...form.register('password')}
          />
        </FormControl>
        {form.formState.errors.password && (
          <FormMessage>{form.formState.errors.password.message}</FormMessage>
        )}
        <p className="text-xs text-muted-foreground mt-1">
          At least 8 characters with uppercase, lowercase, and number
        </p>
      </FormItem>

      <FormItem>
        <FormLabel htmlFor="confirmPassword">Confirm New Password</FormLabel>
        <FormControl>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            disabled={isLoading}
            {...form.register('confirmPassword')}
          />
        </FormControl>
        {form.formState.errors.confirmPassword && (
          <FormMessage>{form.formState.errors.confirmPassword.message}</FormMessage>
        )}
      </FormItem>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Updating...' : 'Update Password'}
      </Button>
    </form>
  )
}
