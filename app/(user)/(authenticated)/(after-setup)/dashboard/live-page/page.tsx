'use client';

import BusinessProfile from '@/components/business-ui/business-profile';
import SubNavbar from '@/components/sub-navbar';
import { useDashboard } from '@/lib/contexts/dashboard-context';
import ActionMenu from './_components/action-menu';
import LiveButton from './_components/live-button';
import ShareButtons from './_components/share-buttons';

export default function LivePage() {
    const { business, projects } = useDashboard();

    return (
        <div>
            <SubNavbar noBack>
                <div></div>
                <div className="flex justify-end gap-2">
                    <LiveButton />
                    <ShareButtons />
                    <ActionMenu />
                </div>
            </SubNavbar>
            <div className="flex flex-col gap-4 p-4 md:p-6">
                <BusinessProfile business={business} projects={projects} isPublic={false} />
            </div>
        </div>
    );
}
