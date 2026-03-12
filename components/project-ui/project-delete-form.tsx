'use clien';

import { deleteProject } from '@/lib/api-fetcher/user/user-projects';
import type { ProjectDeleteFormProps } from '@/lib/types/forms';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import P from '../typography/P';
import { usePublic } from '@/lib/contexts/public-context';

export default function ProjectDeleteForm({ onSuccess, id, setIsLoading }: ProjectDeleteFormProps) {
    const { projects, setProjects } = usePublic();
    const form = useForm({});

    const onSubmit = async () => {
        setIsLoading(true);
        try {
            await deleteProject(id);
            toast.success('Project deleted successfully');
            onSuccess?.();
            setProjects(projects.filter((project) => project.id !== id));
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'An error occurred while deleting your project');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form id={id} onSubmit={form.handleSubmit(onSubmit)}>
            <P className="text-destructive">Are you sure you want to delete this project?</P>
        </form>
    );
}
