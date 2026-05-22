import { getPublicReviewById } from '@/lib/api-fetcher/user/server/review';
import { Review } from '@/lib/types/db';
import { notFound } from 'next/navigation';
import MainPage from './_component/main-page';

type PublicReviewPageProps = { params: Promise<{ id: string }> };

export default async function Page({ params }: PublicReviewPageProps) {
    const { id } = await params;

    let review: Review | null = null;
    try {
        review = await getPublicReviewById(id);
        if (!review || review.status === 'done') return notFound();
    } catch (error) {
        console.error(error);
        return notFound();
    }

    return <MainPage review={review} />;
}
