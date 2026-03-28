'use client';

import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { profileSchema } from '@/lib/validators/user/profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconUser } from '@tabler/icons-react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/input-group';
import { useUser } from '@/lib/contexts/user-context';
import { updateUser } from '@/lib/api-fetcher/user/client/profile';

type UpdateProfileFormProps = {
    id: string;
    setIsLoading: (v: boolean) => void;
    onSuccess?: () => void;
};

export default function UpdateProfileForm({ id, setIsLoading, onSuccess }: UpdateProfileFormProps) {
    const { user, setUser } = useUser();

    // Define the form schema using zod
    const form = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            full_name: user?.user_metadata?.full_name ?? '',
        },
    });

    // ------------------------------
    // On submit
    // ------------------------------
    const onSubmit = async (data: z.infer<typeof profileSchema>) => {
        setIsLoading(true);
        try {
            const response = await updateUser(data);
            setUser(response.data);
            toast.success(response.message);
            onSuccess?.();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'An error occurred while updating your profile');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form id={id} onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <Controller
                    name="full_name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-full-name">Full name</FieldLabel>
                            <InputGroup>
                                <InputGroupAddon>
                                    <IconUser />
                                </InputGroupAddon>
                                <InputGroupInput
                                    {...field}
                                    id="form-full-name"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter your full name"
                                    autoComplete="on"
                                />
                            </InputGroup>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
            </FieldGroup>
        </form>
    );
}
