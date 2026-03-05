import AvatarUpload from '@/components/business-ui/avatar-upload';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { BUSINESS_TYPE } from '@/lib/constants/user-dashboard';
import { onboardingProfileSchema } from '@/lib/validators/user/onboarding';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconUser } from '@tabler/icons-react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

export default function BusinessForm() {
    const form = useForm({
        resolver: zodResolver(onboardingProfileSchema),
        defaultValues: {
            name: '',
            type: BUSINESS_TYPE[0],
            description: '',
            phone: '',
            website_url: '',
            facebook_url: '',
            instagram_url: '',
        },
    });

    const onSubmit = (data: z.infer<typeof onboardingProfileSchema>) => {
        console.log('Profile data:', data);
        // Handle form submission

        //     "slug" "text" NOT NULL,
        //     "logo_url" "text",
    };

    return (
        <form className="flex flex-col gap-4 md:gap-6" id="profile-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <AvatarUpload />
                <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-business-name">Business name</FieldLabel>
                            <InputGroup>
                                <InputGroupAddon>
                                    <IconUser />
                                </InputGroupAddon>
                                <InputGroupInput
                                    {...field}
                                    id="form-business-name"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter your business name"
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

            <Button type="submit" className="w-fit">
                Save Profile
            </Button>
        </form>
    );
}
