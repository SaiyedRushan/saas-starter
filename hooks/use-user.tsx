import {createClient} from '@/utils/supabase/client'
import {useEffect, useState} from 'react'
import {User} from '@supabase/supabase-js'

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient()
      const {data: user} = await supabase.auth.getUser()
      setUser(user?.user)
    }
    fetchUser()
  }, [])
  return user
}
