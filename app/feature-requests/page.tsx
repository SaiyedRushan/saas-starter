'use client'

import {useEffect, useState} from 'react'
import {createClient} from '@/utils/supabase/client'
import {Card, CardContent} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import {Badge} from '@/components/ui/badge'
import {ChevronUp, Plus, Bug, Lightbulb} from 'lucide-react'
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import {Label} from '@/components/ui/label'
import {Tables} from '@/types/supabase.types'
import {useUser} from '@/hooks/use-user'

export default function FeatureRequestsPage() {
  const supabase = createClient()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newRequest, setNewRequest] = useState({
    title: '',
    description: '',
    type: 'feature' as 'feature' | 'bug',
  })
  const [featureRequests, setFeatureRequests] = useState<Tables<'feature_requests'>[] | null>(null)
  const [userVotedIds, setUserVotedIds] = useState<string[]>([])

  const fetchFeatureRequests = async () => {
    const {data: requests, error: requestsError} = await supabase.from('feature_requests').select('*')
    if (requestsError) console.error(requestsError)
    setFeatureRequests(requests)
  }

  const user = useUser()

  useEffect(() => {
    fetchFeatureRequests()
  }, [])

  const fetchUserVotedIds = async () => {
    if (!user) return
    const {data: votes, error: votesError} = await supabase.from('votes').select('feature_request_id').eq('user_id', user.id)
    if (votesError) console.error(votesError)
    setUserVotedIds(votes?.map((vote) => vote.feature_request_id) ?? [])
  }

  useEffect(() => {
    if (!user) return
    fetchUserVotedIds()
  }, [user])

  const handleVote = async (requestId: string) => {
    if (!user) return

    try {
      if (userVotedIds.includes(requestId)) {
        await supabase.from('votes').delete().eq('feature_request_id', requestId).eq('user_id', user.id)
      } else {
        await supabase.from('votes').insert([
          {
            feature_request_id: requestId,
            user_id: user.id,
          },
        ])
      }
      fetchFeatureRequests()
      fetchUserVotedIds()
    } catch (error) {
      console.error('Error voting:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    try {
      const {error} = await supabase.from('feature_requests').insert([
        {
          title: newRequest.title,
          description: newRequest.description,
          type: newRequest.type,
          author_id: user.id,
          author_email: user.email,
          vote_count: 0,
        },
      ])

      if (error) throw error

      // Reset form and close dialog
      setNewRequest({title: '', description: '', type: 'feature'})
      setIsDialogOpen(false)
      fetchFeatureRequests()
    } catch (error) {
      console.error('Error submitting request:', error)
    }
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Feature Requests & Bug Reports</h1>
          <p className="text-muted-foreground mt-2">Vote on existing requests or submit new ones to help prioritize development</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild disabled={!user}>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Submit Request
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Submit New Request</DialogTitle>
              <DialogDescription>Share your feature ideas or report bugs to help improve the platform</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select value={newRequest.type} onValueChange={(value: 'feature' | 'bug') => setNewRequest((prev) => ({...prev, type: value}))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="bug">Bug Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={newRequest.title} onChange={(e) => setNewRequest((prev) => ({...prev, title: e.target.value}))} placeholder="Brief description of your request" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newRequest.description}
                  onChange={(e) => setNewRequest((prev) => ({...prev, description: e.target.value}))}
                  placeholder="Provide more details about your request"
                  rows={4}
                  required
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Submit Request</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {featureRequests === null ? (
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4">
          {featureRequests?.map((request) => (
            <Card key={request.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      {request.type === 'feature' ? <Lightbulb className="h-4 w-4 text-blue-500" /> : <Bug className="h-4 w-4 text-red-500" />}
                      <Badge variant={request.type === 'feature' ? 'default' : 'destructive'}>{request.type === 'feature' ? 'Feature' : 'Bug'}</Badge>
                      <span className="text-sm text-muted-foreground">by {request.author_email}</span>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold">{request.title}</h3>
                      <p className="text-muted-foreground mt-1">{request.description}</p>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      {new Date(request.created_at ?? '').toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <Button variant={userVotedIds.includes(request.id) ? 'default' : 'outline'} size="sm" onClick={() => handleVote(request.id)} className="h-8 w-8 p-0" disabled={!user}>
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium">{request.vote_count}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {featureRequests?.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No feature requests or bug reports yet. Be the first to submit one!</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
