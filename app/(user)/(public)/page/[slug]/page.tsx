import PublicProviderInner from '@/components/providers-inner/public-provider-inner';
import MainPage from './_components/main-page';
import { getPublicBusinessBySlug } from '@/lib/api-fetcher/user/server/business';
import { Business } from '@/lib/types/db';

type BusinessPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: BusinessPageProps) {
    const { slug } = await params;
    let business: Business | null = null;

    try {
        business = await getPublicBusinessBySlug(slug);
    } catch (error) {}

    return business
        ? {
              title: business.name,
              description: business.description,
              icons: {
                  icon: business.favicon_url ?? '/favicon.ico',
              },
          }
        : null;
}

export default async function BusinessPage({ params }: BusinessPageProps) {
    const { slug } = await params;

    return (
        <PublicProviderInner slug={slug}>
            <MainPage slug={slug} />
        </PublicProviderInner>
    );
}
