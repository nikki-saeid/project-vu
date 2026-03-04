'use client';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { onboardingProfileSchema } from '@/lib/validators/user/onboarding';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconUser } from '@tabler/icons-react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/dropzone';
import { useSupabaseUpload } from '@/hooks/use-supabase-upload';

export default function ProfileStep() {
    const form = useForm({
        resolver: zodResolver(onboardingProfileSchema),
        defaultValues: {
            first_name: '',
            last_name: '',
            image_url: '',
        },
    });

    const onSubmit = (data: z.infer<typeof onboardingProfileSchema>) => {
        console.log('Profile data:', data);
        // Handle form submission
    };

    const props = useSupabaseUpload({
        bucketName: 'test',
        path: 'test',
        allowedMimeTypes: ['image/*'],
        maxFiles: 2,
        maxFileSize: 1000 * 1000 * 10, // 10MB,
    });

    return (
        <div className="flex flex-col">
            <form className="flex flex-col gap-4 md:gap-6" id="profile-form" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup className="grid md:grid-cols-3 lg:grid-cols-2 grid-cols-1">
                    <Controller
                        name="first_name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-first-name">First name</FieldLabel>
                                <InputGroup>
                                    <InputGroupAddon>
                                        <IconUser />
                                    </InputGroupAddon>
                                    <InputGroupInput
                                        {...field}
                                        id="form-first-name"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter your first name"
                                        autoComplete="on"
                                    />
                                </InputGroup>
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        name="last_name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-last-name">Last name</FieldLabel>
                                <InputGroup>
                                    <InputGroupAddon>
                                        <IconUser />
                                    </InputGroupAddon>
                                    <InputGroupInput
                                        {...field}
                                        id="form-last-name"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter your last name"
                                        autoComplete="on"
                                    />
                                </InputGroup>
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                </FieldGroup>
                {/* <Controller
                    name="image_url"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="image-url">Image URL</FieldLabel>
                            <InputGroupInput {...field} id="image-url" placeholder="https://example.com/image.jpg" />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                /> */}
                <div className="w-[500px]">
                    <Dropzone {...props}>
                        <DropzoneEmptyState />
                        <DropzoneContent />
                    </Dropzone>
                </div>
                <Button type="submit" className="w-fit">
                    Save Profile
                </Button>
            </form>
        </div>
    );
}
