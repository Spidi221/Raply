'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { signUp } from '@/lib/auth/actions'
import { signUpSchema, type SignUpInput } from '@/lib/validators/auth'

interface SignUpFormProps {
  locale: string
}

export function SignUpForm({ locale }: SignUpFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(data: SignUpInput) {
    try {
      setIsLoading(true)
      setError(null)
      setSuccess(null)

      const result = await signUp(data)

      if (!result.success) {
        setError(result.error || 'Failed to sign up')
        return
      }

      // If email confirmation is required
      if (result.requiresEmailConfirmation) {
        setSuccess(result.message || 'Please check your email to confirm your account')
        form.reset()
        return
      }

      // Redirect to dashboard if no confirmation needed
      router.push(`/${locale}/dashboard`)
      router.refresh()
    } catch (err) {
      setError('An unexpected error occurred')
      console.error('Sign up error:', err)
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

      {success && (
        <div className="rounded-md bg-green-50 p-3 text-sm text-green-600">
          {success}
        </div>
      )}

      <FormItem>
        <FormLabel htmlFor="email">Email</FormLabel>
        <FormControl>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            disabled={isLoading}
            {...form.register('email')}
          />
        </FormControl>
        {form.formState.errors.email && (
          <FormMessage>{form.formState.errors.email.message}</FormMessage>
        )}
      </FormItem>

      <FormItem>
        <FormLabel htmlFor="password">Password</FormLabel>
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
        <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
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
        {isLoading ? 'Creating account...' : 'Create Account'}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        By signing up, you agree to our Terms of Service and Privacy Policy
      </p>
    </form>
  )
}
