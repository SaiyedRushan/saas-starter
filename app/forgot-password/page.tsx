'use client'

import {useState} from 'react'
import Link from 'next/link'
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
import {Button} from '@/components/ui/button'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {toast} from 'sonner'
import {createClient} from '@/utils/supabase/client'

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
})

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const supabase = createClient()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const {error} = await supabase.auth.resetPasswordForEmail(values.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) {
        throw error
      }

      setIsSubmitted(true)
      toast.success('Password reset email sent')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Forgot Password</h1>
          <p className="text-sm text-muted-foreground">Enter your email to receive a password reset link</p>
        </div>

        {isSubmitted ? (
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-md text-center">
              <p className="text-sm">We&apos;ve sent a password reset link to your email. Please check your inbox.</p>
            </div>
            <Button asChild className="w-full">
              <Link href="/login">Back to Login</Link>
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>
          </Form>
        )}

        <div className="text-center text-sm">
          <Link href="/login" className="text-primary hover:underline">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  )
}
