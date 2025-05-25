'use client'

import {useState} from 'react'
import Link from 'next/link'
import {usePathname, useRouter} from 'next/navigation'
import {BarChart3, CreditCard, Home, LogOut, Package, Settings, Users} from 'lucide-react'
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import {Button} from '@/components/ui/button'
import {Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger} from '@/components/ui/sidebar'
import {toast} from 'sonner'

export default function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      await supabase.auth.signOut()
      router.push('/')
      router.refresh()
      toast.success('Logged out successfully')
    } catch (error) {
      toast.error('Error logging out')
    } finally {
      setIsLoggingOut(false)
    }
  }

  const navItems = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: Home,
    },
    {
      title: 'Analytics',
      href: '/dashboard/analytics',
      icon: BarChart3,
    },
    {
      title: 'Customers',
      href: '/dashboard/customers',
      icon: Users,
    },
    {
      title: 'Products',
      href: '/dashboard/products',
      icon: Package,
    },
    {
      title: 'Billing',
      href: '/dashboard/billing',
      icon: CreditCard,
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: Settings,
    },
  ]

  return (
    <Sidebar className="mt-[64px] h-[calc(100vh-64px)]">
      <SidebarHeader className="border-b p-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold">SaaS Platform</span>
        </Link>
        <div className="md:hidden">
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4 my-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <Button variant="ghost" className="w-full justify-start" onClick={handleLogout} disabled={isLoggingOut}>
          <LogOut className="mr-2 h-5 w-5" />
          {isLoggingOut ? 'Logging out...' : 'Log out'}
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
