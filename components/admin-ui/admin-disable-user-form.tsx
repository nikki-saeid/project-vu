'use client';

import { adminDisableUser, getAdminUsers } from '@/lib/api-fetcher/admin/users';
import type { AdminDisableUserFormProps } from '@/lib/types/forms';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import P from '../typography/P';
import { useAdmin } from '@/lib/contexts/admin-context';
import { useSearchParams } from 'next/navigation';

export default function AdminDisableUserForm({ onSuccess, id, setIsLoading, activate }: AdminDisableUserFormProps) {
    const { setUsersWithPagination } = useAdmin();
    const form = useForm({});
    // get page from search params
    const searchParams = useSearchParams();
    const pageQuery = searchParams.get('page');

    // set page state
    const page = pageQuery ? Number(pageQuery) : 1;

    const onSubmit = async () => {
        setIsLoading(true);
        try {
            await adminDisableUser(id, activate);
            toast.success(`User ${activate ? 'activated' : 'deactivated'} successfully`);
            const users = await getAdminUsers(page);
            console.log('users', users);

            setUsersWithPagination(users);
            onSuccess?.();
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : `An error occurred while ${activate ? 'activating' : 'deactivating'} the user`,
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form id={id} onSubmit={form.handleSubmit(onSubmit)}>
            <P className="text-destructive">Are you sure you want to {activate ? 'activate' : 'deactivate'} this user?</P>
        </form>
    );
}
