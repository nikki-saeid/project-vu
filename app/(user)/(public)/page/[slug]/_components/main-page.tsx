'use client';

import BusinessProfile from '@/components/business-ui/business-profile';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { usePublic } from '@/lib/contexts/public-context';
import { IconAlertTriangle } from '@tabler/icons-react';

export default function MainPage() {
    const { business, projects } = usePublic();

    return (
        <div className="flex flex-col gap-4 md:gap-6">
            {business?.page_status === 'draft' && (
                <Alert className="border-amber-200 bg-amber-50 text-amber-800 flex items-center gap-2">
                    <IconAlertTriangle />
                    <div className="flex-1">
                        <AlertTitle>The portfolio is not live yet.</AlertTitle>
                        <AlertDescription className="text-amber-800">
                            In order to show the portfolio publicly, you need to publish it.
                        </AlertDescription>
                    </div>
                </Alert>
            )}
            <BusinessProfile business={business} projects={projects} isPublic={true} />;
        </div>
    );
}
