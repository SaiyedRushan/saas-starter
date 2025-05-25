import type React from 'react'

import DashboardSidebar from '@/components/dashboard/dashboard-sidebar'
import {SidebarProvider} from '@/components/ui/sidebar'

export default async function DashboardLayout({children}: {children: React.ReactNode}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* <SidebarProvider> */}
      {/* <DashboardSidebar /> */}
      <div className="flex-1 p-6 md:p-8 container">{children}</div>
      {/* </SidebarProvider> */}
    </div>
  )
}
