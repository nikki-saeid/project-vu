'use clien';

import { deleteUser } from '@/lib/api-fetcher/user/client/profile';
import { createClient } from '@/lib/supabase/client';
import type { BusinessDeleteFormProps } from '@/lib/types/forms';
import { businessDeleteSchema } from '@/lib/validators/user/business-profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconTrash } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import P from '../typography/P';
import { Field, FieldDescription, FieldError, FieldLabel } from '../ui/field';
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/input-group';

export default function BusinessDeleteForm({ onSuccess, id, setIsLoading }: BusinessDeleteFormProps) {
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(businessDeleteSchema),
        defaultValues: {
            confirm: '',
        },
    });

    const onSubmit = async () => {
        setIsLoading(true);
        try {
            await deleteUser();
            toast.success('Account deleted successfully');
            onSuccess?.();
            const supabase = createClient();
            await supabase.auth.signOut();
            router.push('/login');
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'An error occurred while deleting your account');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="flex flex-col gap-4 md:gap-6" id={id} onSubmit={form.handleSubmit(onSubmit)}>
            <Controller
                name="confirm"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <P className="text-destructive">
                            This action is permanent. Your account will be deleted and you will be signed out. <br />
                        </P>
                        <FieldLabel htmlFor="delete-confirm">Type DELETE to confirm</FieldLabel>
                        <FieldDescription>This helps prevent accidental deletions.</FieldDescription>
                        <InputGroup>
                            <InputGroupInput
                                {...field}
                                id="delete-confirm"
                                aria-invalid={fieldState.invalid}
                                placeholder="DELETE"
                                autoComplete="on"
                            />
                            <InputGroupAddon>
                                <IconTrash />
                            </InputGroupAddon>
                        </InputGroup>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />
        </form>
    );
}
