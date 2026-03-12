import BusinessProfile from '@/components/business-ui/business-profile';
import PublicProviderInner from '../../_components/public-provider-inner';

type BusinessPageProps = { params: Promise<{ slug: string }>; searchParams: Promise<{ user_view?: string }> };

export default async function BusinessPage({ params, searchParams }: BusinessPageProps) {
    const { slug } = await params;
    const { user_view } = await searchParams;

    return (
        <PublicProviderInner slug={slug} user_view={user_view}>
            <BusinessProfile />
        </PublicProviderInner>
    );
}
