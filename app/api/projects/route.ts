import {NextRequest, NextResponse} from 'next/server'
import {createClient} from '@/utils/supabase/server'

export async function GET(req: NextRequest, res: NextResponse) {
  const supabase = await createClient()
  const {
    data: {user},
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401})
  }

  const {data, error} = await supabase.from('projects').select('*').eq('user_id', user.id)

  if (error) return NextResponse.json({error: error.message}, {status: 500})

  return NextResponse.json(data)
}
