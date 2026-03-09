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
    const { name, logo_url, type, description, facebook_url, instagram_url, x_url, website_url, email, phone } = business ?? {
        name: null,
        logo_url: null,
        type: null,
        description: null,
        facebook_url: null,
        instagram_url: null,
        x_url: null,
        website_url: null,
        email: undefined,
        phone: null,
    };

    const socials = Boolean(x_url) || Boolean(facebook_url) || Boolean(instagram_url) || Boolean(website_url);

    return !business ? (
        <BusinessProfileSkeleton />
    ) : (
        <Suspense fallback={<BusinessProfileSkeleton />}>
            <section>
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        <BusinessHeader name={name} logo_url={logo_url} type={type} description={description} />
                        {socials && (
                            <BusinessSocials
                                x_url={x_url}
                                website_url={website_url}
                                facebook_url={facebook_url}
                                instagram_url={instagram_url}
                            />
                        )}
                        <BusinessContact phone={phone} email={email} />
                    </div>
                    <Separator />
                    <ProjectsTabs />
                </div>
            </section>
        </Suspense>
    );
}
