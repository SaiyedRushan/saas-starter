import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-24 lg:py-32">
      <div className="mx-auto max-w-3xl space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">About Us</h1>
          <p className="text-gray-500 md:text-xl dark:text-gray-400">We're on a mission to simplify business operations and help companies grow.</p>
        </div>

        <div className="aspect-video overflow-hidden rounded-xl">
          <Image src="/placeholder.svg?height=720&width=1280" alt="Our team" width={1280} height={720} className="object-cover" />
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Our Story</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Founded in 2023, our SaaS platform was born out of the frustration of dealing with complex, disconnected tools. We set out to create a unified solution that would make business operations
            simpler and more efficient.
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Today, we serve thousands of customers worldwide, from small startups to large enterprises. Our team of dedicated professionals is committed to continuous innovation and exceptional
            customer service.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Our Values</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Simplicity</h3>
              <p className="text-gray-500 dark:text-gray-400">We believe in making complex things simple. Our platform is designed to be intuitive and easy to use.</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Innovation</h3>
              <p className="text-gray-500 dark:text-gray-400">We're constantly pushing the boundaries of what's possible to deliver cutting-edge solutions.</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Customer Focus</h3>
              <p className="text-gray-500 dark:text-gray-400">Our customers are at the heart of everything we do. Their success is our success.</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Integrity</h3>
              <p className="text-gray-500 dark:text-gray-400">We operate with transparency and honesty in all our interactions.</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Our Team</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Our diverse team brings together expertise from various fields, including software development, design, marketing, and customer support. We're united by our passion for creating
            exceptional products and delivering outstanding service.
          </p>
        </div>
      </div>
    </div>
  )
}
