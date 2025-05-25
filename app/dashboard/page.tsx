'use client'
import {useState} from 'react'
import useSWR from 'swr'
import {createClient} from '@/utils/supabase/client'
import {Tables} from '@/types/supabase.types'
import {ProjectCard, EmptyProjectCard, ProjectCardSkeleton} from '@/components/dashboard/project-card'
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter} from '@/components/ui/dialog'
import {Label} from '@/components/ui/label'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import {Button} from '@/components/ui/button'
import {Checkbox} from '@/components/ui/checkbox'
import {useRouter} from 'next/navigation'
import {useUser} from '@/hooks/use-user'

export default function DashboardPage() {
  const supabase = createClient()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [projectToEdit, setProjectToEdit] = useState<Tables<'projects'> | null>(null)
  const user = useUser()

  const {data: projects, mutate: mutateProjects} = useSWR<Tables<'projects'>[]>('/api/projects')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const name = formData.get('name')
    const description = formData.get('description')
    const tag = formData.get('tag')
    const is_active = formData.get('is_active')
    if (projectToEdit) {
      const {error} = await supabase
        .from('projects')
        .update({
          name: name as string,
          description: description as string,
          tag: tag as string,
          is_active: is_active === 'true',
          user_id: user?.id,
        })
        .eq('id', projectToEdit.id)
      if (error) console.error(error)
      setIsDialogOpen(false)
      setProjectToEdit(null)
      mutateProjects()
    } else {
      const {error} = await supabase.from('projects').insert({
        name: name as string,
        description: description as string,
        tag: tag as string,
        is_active: is_active === 'true',
        user_id: user?.id,
      })
      if (error) console.error(error)
      setIsDialogOpen(false)
      mutateProjects()
    }
  }

  const handleEdit = async (project: Tables<'projects'>) => {
    setIsDialogOpen(true)
    setProjectToEdit(project)
  }

  const handleDelete = async (project: Tables<'projects'>) => {
    const {error} = await supabase.from('projects').delete().eq('id', project.id)
    if (error) console.error(error)
    mutateProjects()
  }

  const handleView = async (project: Tables<'projects'>) => {
    router.push(`/dashboard/projects/${project.id}`)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects == null
          ? [...Array(3)].map((_, i) => <ProjectCardSkeleton key={i} />)
          : projects?.map((project) => <ProjectCard key={project.id} project={project} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />)}
        <EmptyProjectCard onCreateProject={() => setIsDialogOpen(true)} />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{projectToEdit ? 'Edit Project' : 'Create New Project'}</DialogTitle>
            <DialogDescription>{projectToEdit ? 'Edit the project details.' : 'Add a new project to your dashboard.'}</DialogDescription>
          </DialogHeader>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input id="name" placeholder="Enter project name" name="name" defaultValue={projectToEdit?.name} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter project description" className="resize-none" name="description" defaultValue={projectToEdit?.description || ''} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tag">Tag</Label>
              <Input id="tag" placeholder="Enter project tag" name="tag" defaultValue={projectToEdit?.tag || ''} />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="is_active" name="is_active" defaultChecked={projectToEdit?.is_active || false} value="true" />
              <Label htmlFor="is_active">Active Project</Label>
            </div>

            <DialogFooter>
              <Button type="submit">{projectToEdit ? 'Update Project' : 'Create Project'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
