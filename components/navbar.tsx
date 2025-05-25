'use client'

import {useState, useEffect} from 'react'
import Link from 'next/link'
import {usePathname, useRouter} from 'next/navigation'
import {Menu, X} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {ThemeToggle} from '@/components/theme-toggle'
import {createClient} from '@/utils/supabase/client'
import {DropdownMenu, DropdownMenuTrigger} from '@/components/ui/dropdown-menu'
import {Avatar, AvatarImage, AvatarFallback} from '@/components/ui/avatar'
import {DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem} from '@/components/ui/dropdown-menu'
import {LucideUser, LogOut} from 'lucide-react'
import {Tables} from '@/types/supabase.types'
import {User} from '@supabase/supabase-js'

type UserData = Tables<'users'> & {
  authUser: User | null
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const pathname = usePathname()
  const supabase = createClient()

  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    setIsLoggingOut(true)
    await supabase.auth.signOut()
    router.push('/')
    setIsLoggingOut(false)
  }

  useEffect(() => {
    const checkSessionAndRetrieveUser = async () => {
      const {
        data: {session},
      } = await supabase.auth.getSession()
      setIsLoggedIn(!!session)
      if (session) {
        const {data: userMetadata} = await supabase.from('users').select('*').eq('id', session.user.id).single()
        setUserData({...userMetadata, authUser: session.user} as UserData)
      }
    }

    checkSessionAndRetrieveUser()

    const {
      data: {subscription},
    } = supabase.auth.onAuthStateChange(() => {
      checkSessionAndRetrieveUser()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase.auth])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  if (pathname.startsWith('/login') || pathname.startsWith('/signup') || pathname.startsWith('/forgot-password')) {
    return null
  }

  // Don't show main navbar on dashboard
  if (pathname.startsWith('/dashboard')) {
    return (
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold">EduGenius</span>
          </Link>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <UserDropdown user={userData} handleLogout={handleLogout} isLoggingOut={isLoggingOut} />
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold">EduGenius</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className={`text-sm font-medium transition-colors hover:text-primary ${pathname === '/' ? 'text-primary' : 'text-muted-foreground'}`}>
            Home
          </Link>
          <Link href="/pricing" className={`text-sm font-medium transition-colors hover:text-primary ${pathname === '/pricing' ? 'text-primary' : 'text-muted-foreground'}`}>
            Pricing
          </Link>
          <Link href="/about" className={`text-sm font-medium transition-colors hover:text-primary ${pathname === '/about' ? 'text-primary' : 'text-muted-foreground'}`}>
            About
          </Link>
          <Link href="/contact" className={`text-sm font-medium transition-colors hover:text-primary ${pathname === '/contact' ? 'text-primary' : 'text-muted-foreground'}`}>
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          {isLoggedIn ? (
            <Button asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex md:hidden items-center space-x-4">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-b">
          <div className="container py-4 space-y-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className={`text-sm font-medium transition-colors hover:text-primary ${pathname === '/' ? 'text-primary' : 'text-muted-foreground'}`}>
                Home
              </Link>
              <Link href="/pricing" className={`text-sm font-medium transition-colors hover:text-primary ${pathname === '/pricing' ? 'text-primary' : 'text-muted-foreground'}`}>
                Pricing
              </Link>
              <Link href="/about" className={`text-sm font-medium transition-colors hover:text-primary ${pathname === '/about' ? 'text-primary' : 'text-muted-foreground'}`}>
                About
              </Link>
              <Link href="/contact" className={`text-sm font-medium transition-colors hover:text-primary ${pathname === '/contact' ? 'text-primary' : 'text-muted-foreground'}`}>
                Contact
              </Link>
            </nav>
            <div className="flex flex-col space-y-2">
              {isLoggedIn ? (
                <Button asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button variant="outline" asChild>
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

function UserDropdown({user, handleLogout, isLoggingOut}: {user: UserData | null; handleLogout: () => void; isLoggingOut: boolean}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.avatar_url || ''} alt={user?.full_name || ''} />
            <AvatarFallback>{user?.full_name?.charAt(0) || ''}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.full_name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user?.authUser?.email || 'No email'}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard/profile">
            <LucideUser className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} disabled={isLoggingOut} className="text-destructive focus:text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          <span>{isLoggingOut ? 'Logging out...' : 'Log out'}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
