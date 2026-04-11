'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import DialogForm from '../dialog-form';
import ProjectForm from './project-form';
import type { Project } from '@/lib/types/db';
import type { ProjectWithLatLng } from '@/lib/types/api';
import ProjectDeleteForm from './project-delete-form';

export default function ProjectCardAction({ project }: { project: Project }) {
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon-xs" className="rounded-full">
                        <IconDotsVertical className="size-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-35">
                    <DropdownMenuItem onSelect={() => setEditDialogOpen(true)}>
                        <IconEdit className="size-4" />
                        Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem variant="destructive" onSelect={() => setDeleteDialogOpen(true)}>
                        <IconTrash className="size-4 " />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DialogForm
                title="Edit Project"
                action={(id, isLoading) => (
                    <Button type="submit" form={id} disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save'}
                    </Button>
                )}
                form={(id, setIsLoading) => (
                    <ProjectForm
                        id={id}
                        project={project as ProjectWithLatLng}
                        setIsLoading={setIsLoading}
                        onSuccess={() => setEditDialogOpen(false)}
                    />
                )}
                id="edit-project"
                open={editDialogOpen}
                onOpenChange={setEditDialogOpen}
            />
            <DialogForm
                title="Delete Project"
                action={(id, isLoading) => (
                    <Button type="submit" variant="destructive" form={id} disabled={isLoading}>
                        {isLoading ? 'Deleting project...' : 'Delete Project'}
                    </Button>
                )}
                form={(id, setIsLoading) => (
                    <ProjectDeleteForm id={id} setIsLoading={setIsLoading} onSuccess={() => setDeleteDialogOpen(false)} />
                )}
                id={project.id}
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
            />
        </>
    );
}
