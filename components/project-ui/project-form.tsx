'use client';

import { Calendar } from '@/components/ui/calendar';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea } from '@/components/ui/input-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useSupabaseUpload } from '@/hooks/use-supabase-upload';
import { createProject, updateProject } from '@/lib/api-fetcher/user/client/projects';
import { getUserProjects } from '@/lib/api-fetcher/user/server/projects';
import { useDashboard } from '@/lib/contexts/dashboard-context';
import { compressImage } from '@/lib/helpers/image-compression';
import { projectToLocationFeature } from '@/lib/helpers/project-map';
import type { ProjectFormProps } from '@/lib/types/forms';
import type { LocationFeature } from '@/lib/types/map';
import { cn } from '@/lib/utils/classes-merge';
import { projectCreateSchema, type ProjectCreateInput } from '@/lib/validators/user/project';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconAlignLeft, IconCalendar, IconClipboardText, IconRectangle, IconRulerMeasure } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import type { FileError } from 'react-dropzone';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import ImageUpload from '../file-upload-ui/image-upload';
import ProjectLocationPicker from './project-location-picker';
import { format } from 'date-fns';
import { Button } from '../ui/button';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

type FileWithPreview = File & { preview?: string; errors: readonly FileError[] };
const MAX_IMAGES = 5;

export default function ProjectForm({ onSuccess, className, id, setIsLoading, project }: ProjectFormProps) {
    const [searchedLocation, setSearchedLocation] = useState<LocationFeature | null>(null);
    const { setProjects } = useDashboard();

    const form = useForm<ProjectCreateInput>({
        resolver: zodResolver(projectCreateSchema),
        defaultValues: {
            title: project?.title ?? '',
            description: project?.description ?? '',
            address: project?.address ?? '',
            latitude: project?.lat ?? 0,
            longitude: project?.lng ?? 0,
            isImagesUploaded: project?.images_urls?.length ? project?.images_urls?.length > 0 : false,
            made_at: project?.made_at ? new Date(project?.made_at) : undefined,
            size: project?.size ?? '',
        },
    });

    // ------------------------------
    // Upload image
    // ------------------------------
    const dropZoneProps = useSupabaseUpload({
        allowedMimeTypes: ['image/*'],
        maxFiles: MAX_IMAGES,
        maxFileSize: 5 * 1000 * 1000,
    });
    const { files, setFiles, errors } = dropZoneProps;

    // set project images to the dropzone
    useEffect(() => {
        if (!project?.images_urls?.length) {
            setFiles([]);
            return;
        }

        const controller = new AbortController();
        let cancelled = false;

        (async () => {
            const fetchedFiles = await Promise.all(
                project.images_urls
                    ? project.images_urls.map(async (image, idx) => {
                          try {
                              const response = await fetch(image, { signal: controller.signal });
                              const blob = await response.blob();
                              const urlName = (() => {
                                  try {
                                      return new URL(image).pathname.split('/').pop();
                                  } catch {
                                      return image.split('/').pop();
                                  }
                              })();
                              const filename = urlName && urlName.length > 0 ? urlName : `project-image-${image ?? idx}.jpg`;
                              const file = new File([blob], filename, { type: blob.type || 'image/jpeg' }) as FileWithPreview;
                              file.preview = URL.createObjectURL(file);
                              file.errors = [];
                              return file as FileWithPreview;
                          } catch {
                              // If the fetch fails (CORS/offline), still create a placeholder so the UI shows "existing" images.
                              const file = new File([image], `project-image-${image ?? idx}.txt`, {
                                  type: 'text/plain',
                              }) as FileWithPreview;
                              file.preview = undefined;
                              file.errors = [];
                              return file as FileWithPreview;
                          }
                      })
                    : [],
            );

            if (!cancelled) setFiles(fetchedFiles);
        })();

        return () => {
            cancelled = true;
            controller.abort();
        };
    }, [project?.images_urls, setFiles]);

    // ------------------------------
    // On submit
    // ------------------------------

    const handleAdd = async (data: ProjectCreateInput) => {
        // Upload images
        const formData = new FormData();
        const compressedImages = await Promise.all(files.map((file) => compressImage(file)));
        compressedImages.forEach((img) => {
            formData.append('images', img);
        });

        // body
        const body = JSON.stringify({
            title: data.title,
            description: data.description,
            address: data.address,
            latitude: data.latitude,
            longitude: data.longitude,
            size: data.size,
            made_at: data.made_at,
        });
        formData.append('body', body);

        // Create project
        const created = await createProject(formData);
        toast.success(created.message);
    };

    const handleUpdate = async (data: ProjectCreateInput) => {
        // Upload images
        const formData = new FormData();
        const compressedImages = await Promise.all(files.map((file) => compressImage(file)));
        compressedImages.forEach((img) => {
            formData.append('images', img);
        });

        // body
        const body = JSON.stringify({
            title: data.title,
            description: data.description,
            address: data.address,
            latitude: data.latitude,
            longitude: data.longitude,
            size: data.size,
            made_at: data.made_at,
        });
        formData.append('body', body);

        // Create project
        const updated = await updateProject(formData, project?.id ?? '');
        toast.success(updated.message);
    };
    const onSubmit = async (data: ProjectCreateInput) => {
        if (errors.length === 0 && files.length <= MAX_IMAGES) {
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

    useEffect(() => {
        const firstError = Object.keys(form.formState.errors)[0];
        if (!firstError) return;

        if (firstError === 'isImagesUploaded') {
            const el = document.getElementById('project-images');
            el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
    }, [form.formState.errors]);

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
                <FieldDescription id="project-images">Upload images for your project.</FieldDescription>
                <ImageUpload dropZoneProps={dropZoneProps} isLogo={false} />
                {form.formState.errors.isImagesUploaded && <FieldError errors={[form.formState.errors.isImagesUploaded]} />}
            </Field>

            <Controller
                name="made_at"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="project-made-at">
                            Created On <i>(optional)</i>
                        </FieldLabel>
                        <Select>
                            {/* <SelectTrigger asChild>
                                    <Button variant="outline" id="date-picker-simple" className="justify-start font-normal text-foreground">
                                        <IconCalendar />
                                        {field.value ? (
                                            format(field.value, 'YY')
                                        ) : (
                                            <span className="text-muted-foreground">Pick a date</span>
                                        )}
                                    </Button>
                            </SelectTrigger>
                            <SelectContent className="z-1000">
                                <SelectGroup>
                                    <SelectLabel>Fruits</SelectLabel>
                                    <SelectItem value="apple">Apple</SelectItem>
                                    <SelectItem value="banana">Banana</SelectItem>
                                    <SelectItem value="blueberry">Blueberry</SelectItem>
                                    <SelectItem value="grapes">Grapes</SelectItem>
                                    <SelectItem value="pineapple">Pineapple</SelectItem>
                                </SelectGroup>
                            </SelectContent> */}
                        </Select>
                        {/* YEARS */}
                        {/* <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" id="date-picker-simple" className="justify-start font-normal text-foreground">
                                    <IconCalendar />
                                    {field.value ? format(field.value, 'YY') : <span className="text-muted-foreground">Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 z-1000" align="start">
                                <Calendar
                                    captionLayout="dropdown-years"
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    defaultMonth={new Date()}
                                />
                            </PopoverContent>
                        </Popover> */}
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            <Controller
                name="size"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="project-size">
                            Size <i>(optional)</i>
                        </FieldLabel>
                        <InputGroup>
                            <InputGroupAddon>
                                <IconRulerMeasure className="size-4" />
                            </InputGroupAddon>
                            <InputGroupInput
                                {...field}
                                id="project-size"
                                aria-invalid={fieldState.invalid}
                                placeholder="Project size en sqm"
                                autoComplete="off"
                            />
                            <InputGroupAddon align="inline-end">
                                <span className="">sqm</span>
                            </InputGroupAddon>
                        </InputGroup>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />
        </form>
    );
}
