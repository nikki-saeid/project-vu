'use client';

import { usePublic } from '@/lib/contexts/public-context';
import ProjectsTabs from '../project-ui/projects-tabs';
import { Separator } from '../ui/separator';
import BusinessContact from './business-contact';
import BusinessHeader from './business-header';
import BusinessSocials from './business-socials';
import BusinessProfileSkeleton from '../skeleton-ui/business-profile-skeleton';
import { Suspense } from 'react';

export default function BusinessProfile() {
    const { business } = usePublic();

    return !business ? (
        <BusinessProfileSkeleton />
    ) : (
        <Suspense fallback={<BusinessProfileSkeleton />}>
            <section>
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        <BusinessHeader />
                        <BusinessSocials />
                        <BusinessContact />
                    </div>
                    <Separator />
                    <ProjectsTabs />
                </div>
            </section>
        </Suspense>
    );
}
