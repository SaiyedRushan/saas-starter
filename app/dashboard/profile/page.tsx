'use client'

import {useEffect, useState} from 'react'
import {Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {Avatar, AvatarImage, AvatarFallback} from '@/components/ui/avatar'
import {Tables} from '@/types/supabase.types'
import {useRouter} from 'next/navigation'
import Link from 'next/link'
import {createClient} from '@/utils/supabase/client'

// Pricing plans (reuse from pricing page)
const pricingPlans = [
  {
    name: 'Basic',
    description: 'Essential features for small teams',
    price: '$9',
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    description: 'Perfect for growing businesses',
    price: '$29',
    cta: 'Get Started',
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'For large organizations with advanced needs',
    price: '$99',
    cta: 'Contact Sales',
    popular: false,
  },
]

type UserRow = Tables<'users'>
type SubscriptionRow = Tables<'subscriptions'>

export default function ProfilePage() {
  const [user, setUser] = useState<UserRow | null>(null)
  const [subscription, setSubscription] = useState<SubscriptionRow | null>(null)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({full_name: '', avatar_url: ''})
  const [billing, setBilling] = useState({billing_address: '', payment_method: ''})
  const [saving, setSaving] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true)
      const {
        data: {session},
      } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
        return
      }
      const {data: userData} = await supabase.from('users').select('*').eq('id', session.user.id).single()
      setUser(userData)
      setForm({
        full_name: userData?.full_name || '',
        avatar_url: userData?.avatar_url || '',
      })
      setBilling({
        billing_address: userData?.billing_address ? JSON.stringify(userData.billing_address) : '',
        payment_method: userData?.payment_method ? JSON.stringify(userData.payment_method) : '',
      })
      // Fetch subscription
      const {data: sub} = await supabase.from('subscriptions').select('*').eq('user_id', session.user.id).single()
      setSubscription(sub)
      setLoading(false)
    }
    fetchProfile()
    // eslint-disable-next-line
  }, [])

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBilling({...billing, [e.target.name]: e.target.value})
  }

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await supabase
      .from('users')
      .update({
        full_name: form.full_name,
        avatar_url: form.avatar_url,
      })
      .eq('id', user?.id)
    setSaving(false)
  }

  const handleBillingSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await supabase
      .from('users')
      .update({
        billing_address: billing.billing_address,
        payment_method: billing.payment_method,
      })
      .eq('id', user?.id)
    setSaving(false)
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Profile Info */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>Manage your personal information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileSave} className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={form.avatar_url || ''} alt={form.full_name || ''} />
                <AvatarFallback>{form.full_name?.charAt(0) || ''}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <Input name="full_name" value={form.full_name} onChange={handleProfileChange} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Avatar URL</label>
              <Input name="avatar_url" value={form.avatar_url} onChange={handleProfileChange} />
            </div>
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
            <div>
              <Link href="/forgot-password" className="text-xs text-primary underline">
                Change password
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Billing Info */}
      <Card>
        <CardHeader>
          <CardTitle>Billing Information</CardTitle>
          <CardDescription>Manage your billing address and payment method</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleBillingSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Billing Address (JSON)</label>
              <Input name="billing_address" value={billing.billing_address} onChange={handleBillingChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Payment Method (JSON)</label>
              <Input name="payment_method" value={billing.payment_method} onChange={handleBillingChange} />
            </div>
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
          <div className="text-xs text-muted-foreground mt-2">(Integrate with Stripe for real payment method management)</div>
        </CardContent>
      </Card>

      {/* Plan Management */}
      <Card>
        <CardHeader>
          <CardTitle>Plan & Subscription</CardTitle>
          <CardDescription>View or upgrade your current plan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="font-medium">
              Current Plan: <span className="text-primary">{subscription?.status ? subscription.status : 'No active subscription'}</span>
            </div>
            <div className="text-sm text-muted-foreground">Next billing date: {subscription?.current_period_end ? new Date(subscription.current_period_end).toLocaleDateString() : '-'}</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pricingPlans.map((plan) => (
              <Card key={plan.name} className={`border ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                {plan.popular && <div className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">Popular</div>}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4 flex items-baseline text-3xl font-extrabold">
                    {plan.price}
                    <span className="ml-1 text-base font-medium text-gray-500">/month</span>
                  </div>
                </CardHeader>
                <CardFooter>
                  <Button className="w-full" variant={plan.popular ? 'default' : 'outline'} disabled={subscription?.status === plan.name.toLowerCase()}>
                    {subscription?.status === plan.name.toLowerCase() ? 'Current Plan' : plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Billing Activity (Placeholder) */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Billing Activity</CardTitle>
          <CardDescription>See your recent plan and billing changes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div>No recent billing activity. (Integrate with billing events for real data)</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
