import Link from 'next/link'
import {Check} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card'

const pricingPlans = [
  {
    name: 'Basic',
    description: 'Essential features for small teams',
    price: '$9',
    features: ['Up to 5 users', 'Basic analytics', '24/7 support', '1GB storage'],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    description: 'Perfect for growing businesses',
    price: '$29',
    features: ['Up to 20 users', 'Advanced analytics', 'Priority support', '10GB storage', 'Custom integrations'],
    cta: 'Get Started',
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'For large organizations with advanced needs',
    price: '$99',
    features: ['Unlimited users', 'Enterprise analytics', 'Dedicated support', 'Unlimited storage', 'Custom integrations', 'Advanced security'],
    cta: 'Contact Sales',
    popular: false,
  },
]

export default function PricingPage() {
  return (
    <div className="container py-12 md:py-24 lg:py-32">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Pricing Plans</h1>
        <p className="mt-4 max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">Choose the perfect plan for your needs. All plans include a 14-day free trial.</p>
      </div>
      <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
        {pricingPlans.map((plan) => (
          <Card key={plan.name} className={`flex flex-col ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
            {plan.popular && <div className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">Popular</div>}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                {plan.price}
                <span className="ml-1 text-2xl font-medium text-gray-500">/month</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                <Link href={plan.name === 'Enterprise' ? '/contact' : '/signup'}>{plan.cta}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
