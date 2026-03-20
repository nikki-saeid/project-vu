'use client';

import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea } from '@/components/ui/input-group';
import { useSupabaseUpload } from '@/hooks/use-supabase-upload';
import { uploadProjectImages } from '@/lib/api-fetcher/user/file-upload';
import { createProject, getUserProjects, updateProject } from '@/lib/api-fetcher/user/user-projects';
import { usePublic } from '@/lib/contexts/public-context';
import type { ProjectFormProps } from '@/lib/types/forms';
import type { LocationFeature } from '@/lib/types/map';
import { cn } from '@/lib/utils';
import { projectCreateSchema, type ProjectCreateInput } from '@/lib/validators/user/project';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconAlignLeft, IconClipboardText } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import type { FileError } from 'react-dropzone';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import ImageUpload from '../file-upload-ui/image-upload';
import ProjectLocationPicker from './project-location-picker';
import { projectToLocationFeature } from '@/lib/helpers/project-map';

type FileWithPreview = File & { preview?: string; errors: readonly FileError[] };

export default function ProjectForm({ onSuccess, className, id, setIsLoading, project }: ProjectFormProps) {
    const [searchedLocation, setSearchedLocation] = useState<LocationFeature | null>(null);
    const { setProjects, business } = usePublic();

    const form = useForm<ProjectCreateInput>({
        resolver: zodResolver(projectCreateSchema),
        defaultValues: {
            title: project?.title ?? '',
            description: project?.description ?? '',
            address: project?.address ?? '',
            latitude: project?.lat ?? 0,
            longitude: project?.lng ?? 0,
            isImagesUploaded: project?.project_image?.length ? project?.project_image?.length > 0 : false,
        },
    });

    // ------------------------------
    // Upload image
    // ------------------------------
    const dropZoneProps = useSupabaseUpload({
        allowedMimeTypes: ['image/*'],
        maxFiles: 10,
        maxFileSize: 5 * 1000 * 1000,
    });
    const { files, setFiles } = dropZoneProps;

    // set project images to the dropzone
    useEffect(() => {
        if (!project?.project_image?.length) {
            setFiles([]);
            return;
        }

        const controller = new AbortController();
        let cancelled = false;

        (async () => {
            const fetchedFiles = await Promise.all(
                project.project_image.map(async (image, idx) => {
                    try {
                        const response = await fetch(image.image_url, { signal: controller.signal });
                        const blob = await response.blob();
                        const urlName = (() => {
                            try {
                                return new URL(image.image_url).pathname.split('/').pop();
                            } catch {
                                return image.image_url.split('/').pop();
                            }
                        })();
                        const filename = urlName && urlName.length > 0 ? urlName : `project-image-${image.id ?? idx}.jpg`;
                        const file = new File([blob], filename, { type: blob.type || 'image/jpeg' }) as FileWithPreview;
                        file.preview = URL.createObjectURL(file);
                        file.errors = [];
                        return file as FileWithPreview;
                    } catch {
                        // If the fetch fails (CORS/offline), still create a placeholder so the UI shows "existing" images.
                        const file = new File([image.image_url], `project-image-${image.id ?? idx}.txt`, {
                            type: 'text/plain',
                        }) as FileWithPreview;
                        file.preview = undefined;
                        file.errors = [];
                        return file as FileWithPreview;
                    }
                }),
            );

            if (!cancelled) setFiles(fetchedFiles);
        })();

        return () => {
            cancelled = true;
            controller.abort();
        };
    }, [project?.project_image, setFiles]);

    // ------------------------------
    // On submit
    // ------------------------------

    const handleAdd = async (data: ProjectCreateInput) => {
        // Create project
        const created = await createProject(data);

        // Upload images
        const formData = new FormData();
        files.forEach((file) => {
            formData.append('files', file);
        });
        formData.append('projectId', created.id);
        formData.append('businessId', business?.id ?? '');

        await uploadProjectImages(formData);
        toast.success('Project created successfully');
    };

    const handleUpdate = async (data: ProjectCreateInput) => {
        // Create project
        const updated = await updateProject(data, project?.id ?? '');

        // Upload images
        const formData = new FormData();
        files.forEach((file) => {
            formData.append('files', file);
        });
        formData.append('projectId', updated.id);
        formData.append('businessId', business?.id ?? '');

        await uploadProjectImages(formData);
        toast.success('Project updated successfully');
    };
    const onSubmit = async (data: ProjectCreateInput) => {
        setIsLoading(true);
        try {
            if (!project) {
                await handleAdd(data);
            } else {
                await handleUpdate(data);
            }

            const newProject = await getUserProjects();
            setProjects(newProject);

            // Success
            form.reset();
            onSuccess?.();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to create project');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (searchedLocation) {
            form.setValue('latitude', searchedLocation.geometry.coordinates[1]);
            form.setValue('longitude', searchedLocation.geometry.coordinates[0]);
            form.setValue(
                'address',
                searchedLocation.properties.full_address || searchedLocation.properties.address || searchedLocation.properties.name,
            );
        }
    }, [searchedLocation, form]);

    useEffect(() => {
        if (project) {
            const location = projectToLocationFeature(project);
            if (location) {
                setSearchedLocation(location);
            }
        }
    }, [project]);

    useEffect(() => {
        if (files.length > 0) {
            form.setValue('isImagesUploaded', true);
        } else {
            form.setValue('isImagesUploaded', false);
        }
    }, [files, form]);

    return (
        <form id={id} className={cn('flex flex-col gap-4 md:gap-6', className)} onSubmit={form.handleSubmit(onSubmit)}>
            <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="project-title">Title</FieldLabel>
                        <InputGroup>
                            <InputGroupAddon>
                                <IconClipboardText className="size-4" />
                            </InputGroupAddon>
                            <InputGroupInput
                                {...field}
                                id="project-title"
                                aria-invalid={fieldState.invalid}
                                placeholder="Project title"
                                autoComplete="off"
                            />
                        </InputGroup>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="project-description">Description</FieldLabel>
                        <InputGroup>
                            <InputGroupTextarea
                                {...field}
                                id="project-description"
                                aria-invalid={fieldState.invalid}
                                placeholder="Describe your project"
                                autoComplete="off"
                            />
                            <InputGroupAddon>
                                <IconAlignLeft className="size-4" />
                            </InputGroupAddon>
                        </InputGroup>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            <Field data-invalid={!!form.formState.errors.address || !!form.formState.errors.latitude || !!form.formState.errors.longitude}>
                <FieldLabel htmlFor="project-address">Location</FieldLabel>
                <FieldDescription className="data-[invalid=true]:text-destructive">
                    Search for an address to set the project location.
                </FieldDescription>
                <ProjectLocationPicker onEditLocation={searchedLocation ?? undefined} onSearchedLocationChange={setSearchedLocation} />

                {(form.formState.errors.address || form.formState.errors.latitude || form.formState.errors.longitude) && (
                    <FieldError
                        errors={[form.formState.errors.address, form.formState.errors.latitude, form.formState.errors.longitude].filter(
                            Boolean,
                        )}
                    />
                )}
            </Field>

            <Field data-invalid={!!form.formState.errors.isImagesUploaded}>
                <FieldLabel htmlFor="project-images">Images</FieldLabel>
                <FieldDescription>Upload images for your project.</FieldDescription>
                <ImageUpload dropZoneProps={dropZoneProps} isLogo={false} />
                {form.formState.errors.isImagesUploaded && <FieldError errors={[form.formState.errors.isImagesUploaded]} />}
            </Field>
        </form>
    );
}
