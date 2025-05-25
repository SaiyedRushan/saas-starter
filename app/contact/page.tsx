'use client'

import {useState} from 'react'
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
import {Button} from '@/components/ui/button'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import {toast} from 'sonner'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  subject: z.string().min(5, {
    message: 'Subject must be at least 5 characters.',
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }),
})

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast.success('Message sent!')
      form.reset()
    }, 1000)
  }

  return (
    <div className="container py-12 md:py-24 lg:py-32">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Contact Us</h1>
          <p className="text-gray-500 md:text-xl dark:text-gray-400">Have questions or need help? We're here for you.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold">Email</h3>
              <p className="text-gray-500 dark:text-gray-400">support@saasplatform.com</p>
            </div>
            <div>
              <h3 className="text-lg font-bold">Phone</h3>
              <p className="text-gray-500 dark:text-gray-400">+1 (555) 123-4567</p>
            </div>
            <div>
              <h3 className="text-lg font-bold">Address</h3>
              <p className="text-gray-500 dark:text-gray-400">
                123 SaaS Street
                <br />
                San Francisco, CA 94103
                <br />
                United States
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold">Office Hours</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Monday - Friday: 9am - 5pm PST
                <br />
                Saturday - Sunday: Closed
              </p>
            </div>
          </div>

          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Subject" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Your message" className="min-h-[120px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
