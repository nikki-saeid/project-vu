'use client';

import { BUSINESS_TYPE } from '@/lib/constants/user-dashboard';
import { usePublic } from '@/lib/contexts/public-context';
import ProjectsTabs from '../project-ui/projects-tabs';
import { Separator } from '../ui/separator';
import BusinessContact from './business-contact';
import BusinessHeader from './business-header';
import BusinessSocials from './business-socials';

const demoBusinessProfile = {
    name: 'Golden Gate Builders',
    type: BUSINESS_TYPE[2],
    description:
        'Golden Gate Builders is a full-service construction and renovation company based in San Francisco. We specialize in residential remodeling, custom home building, and sustainable construction solutions. Our team focuses on high-quality craftsmanship, transparent communication, and delivering projects on time and within budget.',

    phone: '+1 415 555 3821',

    website_url: 'https://goldengatebuilders.com',

    instagram_url: 'https://instagram.com/goldengatebuilders',

    facebook_url: 'https://facebook.com/goldengatebuilders',

    x_url: 'https://x.com/goldengatebuild',

    logo_url:
        'https://img.freepik.com/premium-vector/construction-building-real-estate-repair-vector-logo-design_1295800-312.jpg?semt=ais_rp_50_assets&w=740&q=80',
    slug: 'golden-gate-builders',
    email: 'info@goldengatebuilders.com',
};

export default function BusinessProfile() {
    const { business } = usePublic();
    const { name, logo_url, type, description, facebook_url, instagram_url, x_url, website_url, email, phone } = demoBusinessProfile;

    // business ?? {
    //     name: null,
    //     logo_url: null,
    //     type: null,
    //     description: null,
    //     facebook_url: null,
    //     instagram_url: null,
    //     x_url: null,
    //     website_url: null,
    //     email: undefined,
    //     phone: null,
    // };

    const socials = Boolean(x_url) || Boolean(facebook_url) || Boolean(instagram_url) || Boolean(website_url);

    return (
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
    );
}
