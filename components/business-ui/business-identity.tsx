import { Business, Review } from '@/lib/types/db';
import BusinessContact from './business-contact';
import BusinessHeader from './business-header';
import BusinessRate from './business-rate';
import BusinessSocials from './business-socials';
import BusinessTags from './business-tags';

type BusinessIdentityProps = {
    business: Business;
    reviews: Review[];
    isPublic: boolean;
};

export default function BusinessIdentity({ business, reviews, isPublic }: BusinessIdentityProps) {
    return (
        <div className="flex flex-col gap-3">
            <BusinessHeader name={business.name} logo_url={business.logo_url} types={business.types} description={business.description} />
            <BusinessTags project_type_tags={business.project_type_tags} service_type_tags={business.service_type_tags} />
            <BusinessRate slug={business.slug ?? ''} reviews={reviews} isPublic={isPublic} />
            <BusinessSocials
                website_url={business.website_url}
                facebook_url={business.facebook_url}
                instagram_url={business.instagram_url}
                x_url={business.x_url}
                google_map_url={business.google_map_url}
            />
            <BusinessContact phone={business.phone} email={business.email} />
        </div>
    );
}
