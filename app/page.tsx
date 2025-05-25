import Link from 'next/link'
import {ArrowRight} from 'lucide-react'
import {Button} from '@/components/ui/button'

// LANDING PAGE
export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">The Ultimate SaaS Platform</h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">Streamline your workflow, boost productivity, and scale your business with our powerful tools.</p>
            </div>
            <div className="space-x-4">
              <Button asChild size="lg">
                <Link href="/signup">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Features</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">Our platform offers everything you need to succeed</p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
            {/* Feature 1 */}
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary">
                  <path d="M12 2v20" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Subscription Management</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Easily manage your subscriptions and payments</p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary">
                  <path d="M20 7h-9" />
                  <path d="M14 17H5" />
                  <circle cx="17" cy="17" r="3" />
                  <circle cx="7" cy="7" r="3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Advanced Analytics</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Gain insights with powerful analytics tools</p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary">
                  <path d="M18 8a6 6 0 0 0-9.33-5" />
                  <path d="m10.67 21.33-.67-1.33" />
                  <path d="M14 16.67V21" />
                  <path d="M18 13.33h4.67" />
                  <path d="M5.33 10.67H1.33" />
                  <path d="M2.67 18.67 6 16" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Seamless Integration</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Connect with your favorite tools and services</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to get started?</h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">Join thousands of satisfied customers today</p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <Button asChild className="w-full" size="lg">
                <Link href="/signup">Sign Up Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
