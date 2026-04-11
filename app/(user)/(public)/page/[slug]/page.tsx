import PublicProviderInner from '@/components/providers-inner/public-provider-inner';
import MainPage from './_components/main-page';

type BusinessPageProps = { params: Promise<{ slug: string }> };

export default async function BusinessPage({ params }: BusinessPageProps) {
    const { slug } = await params;

    return (
        <PublicProviderInner slug={slug}>
            <MainPage slug={slug} />
        </PublicProviderInner>
    );
}
