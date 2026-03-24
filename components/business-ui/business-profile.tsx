'use client';

import { Business } from '@/lib/types/db';
import { Suspense } from 'react';
import ProjectsTabs from '../project-ui/projects-tabs';
import BusinessProfileSkeleton from '../skeleton-ui/business-profile-skeleton';
import { Separator } from '../ui/separator';
import BusinessContact from './business-contact';
import BusinessHeader from './business-header';
import BusinessSocials from './business-socials';
import { ProjectWithImages } from '@/lib/types/api';

type BusinessProfileProps = {
    business: Business | null;
    projects: ProjectWithImages[];
    isPublic: boolean;
};

export default function BusinessProfile({ business, projects, isPublic }: BusinessProfileProps) {
    return !business ? (
        <BusinessProfileSkeleton />
    ) : (
        <Suspense fallback={<BusinessProfileSkeleton />}>
            <section>
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        <BusinessHeader
                            name={business.name}
                            logo_url={business.logo_url}
                            type={business.type}
                            description={business.description}
                        />
                        <BusinessSocials
                            website_url={business.website_url}
                            facebook_url={business.facebook_url}
                            instagram_url={business.instagram_url}
                            x_url={business.x_url}
                        />
                        <BusinessContact phone={business.phone} email={business.email} />
                    </div>
                    <Separator />
                    <ProjectsTabs projects={projects} isPublic={isPublic} />
                </div>
            </section>
        </Suspense>
    );
}
