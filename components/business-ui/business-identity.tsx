import { Business } from '@/lib/types/db';
import BusinessContact from './business-contact';
import BusinessHeader from './business-header';
import BusinessSocials from './business-socials';
import BusinessTags from './business-tags';

type BusinessIdentityProps = {
    business: Business;
};

export default function BusinessIdentity({ business }: BusinessIdentityProps) {
    return (
        <div className="flex flex-col gap-4">
            <BusinessHeader name={business.name} logo_url={business.logo_url} type={business.type} description={business.description} />
            <BusinessTags project_type_tags={business.project_type_tags} service_type_tags={business.service_type_tags} />
            <BusinessSocials
                website_url={business.website_url}
                facebook_url={business.facebook_url}
                instagram_url={business.instagram_url}
                x_url={business.x_url}
            />
            <BusinessContact phone={business.phone} email={business.email} />
        </div>
    );
}
