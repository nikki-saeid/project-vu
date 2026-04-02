import { useDashboard } from '@/lib/contexts/dashboard-context';
import { createClient } from '@/lib/supabase/client';
import type { Subscription } from '@/lib/types/db';
import { RealtimeChannel, RealtimePostgresUpdatePayload } from '@supabase/supabase-js';
import { useEffect } from 'react';

export function useSubscriptionChannel() {
    const { subscription, setSubscription } = useDashboard();
    const subscriptionId = subscription?.id;

    useEffect(() => {
        let channel: RealtimeChannel | undefined;

        const init = () => {
            const supabase = createClient();

            channel = supabase
                .channel('subscription_update')
                .on(
                    'postgres_changes',
                    {
                        event: 'UPDATE',
                        schema: 'public',
                        table: 'subscriptions',
                        filter: `id=eq.${subscriptionId}`,
                    },
                    (payload: RealtimePostgresUpdatePayload<Subscription>) => {
                        if (!payload.errors) {
                            setSubscription(payload.new);
                        }
                    },
                )
                .subscribe();
        };

        init();

        return () => {
            if (channel) channel.unsubscribe();
        };
    }, [subscriptionId, setSubscription]);

    return subscription;
}
