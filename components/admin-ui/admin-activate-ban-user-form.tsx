'use client';

import { adminActivateUser, adminBanUser } from '@/lib/api-fetcher/admin/client/users';
import { useAdmin } from '@/lib/contexts/admin-context';
import type { AdminDisableUserFormProps } from '@/lib/types/forms';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import P from '../typography/P';

export default function AdminActivateBanUserForm({ onSuccess, id, setIsLoading, activate }: AdminDisableUserFormProps) {
    const { setUsersWithPagination, usersWithPagination } = useAdmin();
    const form = useForm({});

    const onSubmit = async () => {
        setIsLoading(true);
        try {
            const response = activate ? await adminActivateUser(id) : await adminBanUser(id);
            toast.success(response.message);

            if (usersWithPagination) {
                setUsersWithPagination({
                    ...usersWithPagination,
                    users: usersWithPagination.users.map((user) => (user.id === id && response.data ? response.data : user)),
                });
            }

            onSuccess?.();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : `An error occurred while ${activate ? 'activating' : 'banning'} the user`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form id={id} onSubmit={form.handleSubmit(onSubmit)}>
            <P className="text-destructive">Are you sure you want to {activate ? 'activate' : 'ban'} this user?</P>
        </form>
    );
}
