import { adminGetAnalyticsRevenueByMonth } from '@/lib/api-fetcher/admin/server/analytics';
import RevenueCardContent from './revenue-card-content';

export default async function RevenueCard() {
    const initialData = await adminGetAnalyticsRevenueByMonth(new Date().getMonth());

    return <RevenueCardContent initialData={initialData ?? 0} />;
}
