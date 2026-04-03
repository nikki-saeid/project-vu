'use client';

import BusinessProfile from '@/components/business-ui/business-profile';
import LiveButton from './_components/live-button';
import { useDashboard } from '@/lib/contexts/dashboard-context';
import EditPageDialog from './_components/edit-page-dialog';
import ShareButtons from './_components/share-buttons';

export default function LivePage() {
    const { business, projects } = useDashboard();

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-end gap-2">
                <LiveButton />
                <ShareButtons />
                <EditPageDialog />
            </div>
            <div className="border p-4 rounded-lg md:p-6">
                <BusinessProfile business={business} projects={projects} isPublic={false} />
            </div>
        </div>
    );
}
