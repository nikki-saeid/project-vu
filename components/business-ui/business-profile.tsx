import { getUserBusiness } from '@/lib/api-fetcher/user-business';
import Container from '../ui/container';
import { Separator } from '../ui/separator';
import BusinessHeader from './business-header';
import BusinessSocials from './business-socials';
import ProjectsTabs from './projects-tabs';
import BusinessContact from './business-contact';

export default async function BusinessProfile() {
    const businessProfile = await getUserBusiness();
    const { name, logo_url, type, description, facebook_url, instagram_url, website_url, email, phone } = businessProfile ?? {
        name: null,
        logo_url: null,
        type: null,
        description: null,
        facebook_url: null,
        instagram_url: null,
        website_url: null,
        email: null,
        phone: null,
    };

    return (
        <section>
            <Container className="w-full">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        <BusinessHeader name={name} logo_url={logo_url} type={type} description={description} />
                        <BusinessSocials website_url={website_url} facebook_url={facebook_url} instagram_url={instagram_url} />
                        <BusinessContact />
                    </div>
                    <Separator />
                    <ProjectsTabs />
                </div>
            </Container>
        </section>
    );
}
