'use client';

import BusinessProfile from '@/components/business-ui/business-profile';
import WarningAlert from '@/components/warning-alert';
import { usePublic } from '@/lib/contexts/public-context';

export default function MainPage() {
    const { business, projects } = usePublic();

    return (
        <div className="flex flex-col gap-4 md:gap-6">
            {business?.page_status === 'draft' && (
                <WarningAlert
                    title="The portfolio is not live yet."
                    description="In order to show the portfolio publicly, you need to publish it."
                />
            )}
            <BusinessProfile business={business} projects={projects} isPublic={true} />
        </div>
    );
}
