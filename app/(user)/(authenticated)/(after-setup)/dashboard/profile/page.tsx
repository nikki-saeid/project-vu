'use client';

import DashboardCard from '@/components/dashboard-ui/dashboard-card';
import P from '@/components/typography/P';
import { Input } from '@/components/ui/input';
import { useUser } from '@/lib/contexts/user-context';
import DeleteAccountDialog from './_components/delete-account-dialog';
import UpdatePasswordDialog from './_components/update-password-dialog';
import UpdateProfileDialog from './_components/update-profile-dialog';
import SubNavbar from '@/components/sub-navbar';

export default function Profile() {
    const { user } = useUser();
    const fullName = user?.user_metadata?.full_name?.trim() || '—';

    return (
        <div>
            <SubNavbar />
            <div className="flex flex-col md:gap-6 gap-4 p-4 md:p-6">
                <P className="text-muted-foreground">Manage your account details and security.</P>
                <DashboardCard title="Full name" description="This is the name shown on your account">
                    <div className="flex flex-col gap-2">
                        <div className="self-end">
                            <UpdateProfileDialog />
                        </div>
                        <Input readOnly={true} value={fullName} />
                    </div>
                </DashboardCard>

                <DashboardCard title="Update password" description="You can update your password here.">
                    <div className="flex flex-col gap-2">
                        <div className="self-end">
                            <UpdatePasswordDialog />
                        </div>
                        <Input readOnly={true} type="password" value="********" />
                    </div>
                </DashboardCard>

                <DashboardCard title="Delete account" description="Permanently delete your account. This action is irreversible.">
                    <div className="flex items-center justify-end">
                        <DeleteAccountDialog />
                    </div>
                </DashboardCard>
            </div>
        </div>
    );
}
