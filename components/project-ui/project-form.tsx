'use client';

import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea } from '@/components/ui/input-group';
import { useSupabaseUpload } from '@/hooks/use-supabase-upload';
import { uploadProjectImages } from '@/lib/api-fetcher/user/file-upload';
import { createProject } from '@/lib/api-fetcher/user/user-projects';
import { usePublic } from '@/lib/contexts/public-context';
import type { LocationFeature } from '@/lib/types/map';
import type { ProjectFormProps } from '@/lib/types/forms';
import { cn } from '@/lib/utils';
import { projectCreateSchema, type ProjectCreateInput } from '@/lib/validators/user/project';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconAlignLeft, IconClipboardText } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import ImageUpload from '../file-upload-ui/image-upload';
import ProjectLocationPicker from './project-location-picker';

export default function ProjectForm({ onSuccess, className, id, setIsLoading }: ProjectFormProps) {
    const [searchedLocation, setSearchedLocation] = useState<LocationFeature | null>(null);
    const { projects, setProjects, business } = usePublic();

    const form = useForm<ProjectCreateInput>({
        resolver: zodResolver(projectCreateSchema),
        defaultValues: {
            title: '',
            description: '',
            address: '',
            latitude: 0,
            longitude: 0,
            isImagesUploaded: false,
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
    const { files } = dropZoneProps;

    // ------------------------------
    // On submit
    // ------------------------------

    const onSubmit = async (data: ProjectCreateInput) => {
        setIsLoading(true);
        try {
            // Create project
            const created = await createProject(data);

            // Upload images
            const formData = new FormData();
            files.forEach((file) => {
                formData.append('files', file);
            });
            formData.append('projectId', created.id);
            formData.append('businessId', business?.id ?? '');

            const uploadedImages = await uploadProjectImages(formData);
            console.log('uploadedImages', uploadedImages);
            setProjects([...projects, { ...created, project_image: uploadedImages }]);

            // Success
            toast.success('Project created successfully');
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
            form.setValue('address', searchedLocation.properties.name);
        }
    }, [searchedLocation, form]);

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
                    Search for an address or click on the map to set the project location.
                </FieldDescription>
                <ProjectLocationPicker onSearchedLocationChange={setSearchedLocation} />

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
                <ImageUpload dropZoneProps={dropZoneProps} />
                {form.formState.errors.isImagesUploaded && <FieldError errors={[form.formState.errors.isImagesUploaded]} />}
            </Field>
        </form>
    );
}
