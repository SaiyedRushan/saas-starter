import React, {useState} from 'react'
import {Calendar, Tag, User, Plus, MoreVertical, Edit, Trash2, Eye, ExternalLink} from 'lucide-react'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {Tables} from '@/types/supabase.types'
import {formatDate} from '@/lib/utils'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator} from '@/components/ui/dropdown-menu'
import {Button} from '../ui/button'

interface ProjectCardProps {
  project: Tables<'projects'>
  onEdit: (project: Tables<'projects'>) => void
  onDelete: (project: Tables<'projects'>) => void
  onView: (project: Tables<'projects'>) => void
}

export const ProjectCard = ({project, onEdit, onDelete, onView}: ProjectCardProps) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  return (
    <Card className="hover:shadow-md hover:bg-primary/10 transition-all duration-200 max-w-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2">{project.name}</CardTitle>
            <CardDescription>{project.description}</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(project)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit project
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onDelete(project)} className="text-destructive focus:text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Tag */}
        <div className="flex items-center">
          <Tag className="w-4 h-4 text-muted-foreground mr-2" />
          <Badge variant="outline" className="text-xs">
            {project.tag}
          </Badge>
        </div>

        {/* Footer with dates and user */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
          <div className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            <span>Created {formatDate(project.created_at || '')}</span>
          </div>
          <div className="pt-2">
            <Button onClick={() => onView(project)} variant="default" size="sm" className="w-full">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Project
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Loading Skeleton Card Component
export const ProjectCardSkeleton = () => {
  return (
    <Card className="animate-pulse">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <div className="h-6 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-full"></div>
          </div>
          <div className="h-6 bg-muted rounded-full w-16"></div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Tag skeleton */}
        <div className="flex items-center">
          <div className="w-4 h-4 bg-muted rounded mr-2"></div>
          <div className="h-6 bg-muted rounded w-20"></div>
        </div>

        {/* Footer skeleton */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-muted rounded mr-1"></div>
              <div className="h-3 bg-muted rounded w-24"></div>
            </div>
            <div className="h-3 bg-muted rounded w-20"></div>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-muted rounded mr-1"></div>
            <div className="h-3 bg-muted rounded w-16"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Empty State Card Component
export const EmptyProjectCard = ({onCreateProject}: {onCreateProject: () => void}) => {
  return (
    <Card className="border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/40 transition-colors duration-200 cursor-pointer group" onClick={onCreateProject}>
      <CardContent className="flex flex-col items-center justify-center py-12 px-6">
        <div className="w-12 h-12 rounded-full border-2 border-dashed border-muted-foreground/25 group-hover:border-muted-foreground/40 flex items-center justify-center mb-4 transition-colors duration-200">
          <Plus className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
        </div>
        <h3 className="text-lg font-semibold text-muted-foreground group-hover:text-foreground transition-colors duration-200 mb-2">Create a new project</h3>
      </CardContent>
    </Card>
  )
}
