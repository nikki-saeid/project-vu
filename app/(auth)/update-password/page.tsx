'use client';

import CardForm from '@/components/card-form';
import Logo from '@/components/logo';
import UpdatePasswordForm from '@/components/profile-ui/update-password-form';
import { Button } from '@/components/ui/button';
import { roleRedirect } from '@/lib/helpers/role-redirect';
import { useRouter } from 'next/navigation';
export default function UpdatePassword() {
    const router = useRouter();

    const handleSuccess = async () => {
        const redirectUrl = await roleRedirect();
        router.push(redirectUrl);
    };
    return (
        <div className="flex flex-col gap-4 items-center">
            <Logo />

            <CardForm
                className="self-stretch"
                action={(id, isLoading) => (
                    <Button type="submit" form={id} disabled={isLoading}>
                        {isLoading ? 'Updating password...' : 'Update password'}
                    </Button>
                )}
                id="update-password-form"
                form={(id, setIsLoading) => <UpdatePasswordForm id={id} setIsLoading={setIsLoading} onSuccess={handleSuccess} />}
                title="Reset your password"
                description="Please enter your new password below."
            />
        </div>
    );
}
