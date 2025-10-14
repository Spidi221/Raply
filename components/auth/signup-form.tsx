'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { signUp, signInWithGoogle } from '@/lib/auth/actions'
import { signUpSchema, type SignUpInput } from '@/lib/validators/auth'

interface SignUpFormProps {
  locale: string
}

export function SignUpForm({ locale }: SignUpFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

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

  async function handleGoogleSignIn() {
    try {
      setIsGoogleLoading(true)
      setError(null)
      await signInWithGoogle(locale)
    } catch (err) {
      setError('Failed to sign in with Google')
      console.error('Google sign in error:', err)
      setIsGoogleLoading(false)
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

      <Button type="submit" className="w-full" disabled={isLoading || isGoogleLoading}>
        {isLoading ? 'Creating account...' : 'Create Account'}
      </Button>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      {/* Google Sign In Button */}
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleGoogleSignIn}
        disabled={isLoading || isGoogleLoading}
      >
        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        {isGoogleLoading ? 'Connecting...' : 'Sign up with Google'}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        By signing up, you agree to our Terms of Service and Privacy Policy
      </p>
    </form>
  )
}
