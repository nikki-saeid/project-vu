'use client';

import P from '@/components/typography/P';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useUser } from '@/lib/contexts/user-context';
import DeleteAccountDialog from './_components/delete-account-dialog';
import UpdatePasswordDialog from './_components/update-password-dialog';
import UpdateProfileDialog from './_components/update-profile-dialog';

export default function Profile() {
    const { user } = useUser();
    const fullName = user?.user_metadata?.full_name?.trim() || '—';

    return (
        <div className="flex flex-col md:gap-6 gap-4">
            <P className="text-muted-foreground">Manage your account details and security.</P>
            <div className="rounded-lg border p-4 md:p-6">
                <Field>
                    <FieldLabel>Full name</FieldLabel>
                    <FieldDescription>This is the name shown on your account.</FieldDescription>
                    <div className="flex flex-col gap-2">
                        <div className="self-end">
                            <UpdateProfileDialog />
                        </div>
                        <Input readOnly={true} value={fullName} />
                    </div>
                </Field>
            </div>
            <div className="rounded-lg border p-4 md:p-6">
                <Field>
                    <FieldLabel>Update password</FieldLabel>
                    <FieldDescription>This is the name shown on your account.</FieldDescription>
                    <div className="flex flex-col gap-2">
                        <div className="self-end">
                            <UpdatePasswordDialog />
                        </div>
                        <Input readOnly={true} type="password" value="********" />
                    </div>
                </Field>
            </div>
            <div className="rounded-lg border p-4 md:p-6">
                <Field>
                    <FieldLabel>Delete account</FieldLabel>
                    <FieldDescription>Permanently delete your account. This action is irreversible.</FieldDescription>
                    <div className="flex items-center justify-end">
                        <DeleteAccountDialog />
                    </div>
                </Field>
            </div>
        </div>
    );
}
