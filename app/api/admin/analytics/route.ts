import { SuccessResponse } from '@/lib/helpers/api-response';
import { errorHandler } from '@/lib/helpers/error-handler';
import { createClient } from '@/lib/supabase/server';
import { AdminAnalyticsResponse } from '@/lib/types/api';

export async function GET() {
    try {
        const supabase = await createClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return errorHandler({
                error: new Error('You must be signed in'),
            });
        }

        if (user.app_metadata?.role !== 'admin') {
            return errorHandler({
                error: new Error('You are not authorized to access this resource'),
            });
        }

        const { count: activeSubscriptions, error: activeSubscriptionsError } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('is_active', true);

        if (activeSubscriptionsError) return errorHandler({ error: activeSubscriptionsError });

        return new SuccessResponse<AdminAnalyticsResponse>('Users fetched successfully', {
            activeSubscriptions: activeSubscriptions ?? 0,
        }).send();
    } catch (error) {
        return errorHandler({ error });
    }
}
