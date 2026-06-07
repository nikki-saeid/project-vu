import PublicProviderInner from '@/components/providers-inner/public-provider-inner';
import ReviewsContent from './_components/reviews-content';

type ProjectsPageProps = {
    params: Promise<{ slug: string }>;
};

export default async function Page({ params }: ProjectsPageProps) {
    const {  slug } = await params;

    return (
        <PublicProviderInner slug={slug}>
            <ReviewsContent />
        </PublicProviderInner>
    );
}
