import { useDashboard } from '@/lib/contexts/dashboard-context';
import { useUser } from '@/lib/contexts/user-context';
import { createClient } from '@/lib/supabase/client';
import type { Subscription } from '@/lib/types/db';

import { RealtimeChannel, RealtimePostgresChangesPayload } from '@supabase/supabase-js';

import { useEffect } from 'react';

export function useSubscriptionChannel() {
    const { setSubscription } = useDashboard();
    const { user } = useUser();

    useEffect(() => {
        if (!user?.id) return;

        const supabase = createClient();

        const channel: RealtimeChannel = supabase
            .channel(`subscription:${user.id}`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'subscriptions',
                },
                (payload: RealtimePostgresChangesPayload<Subscription>) => {
                    switch (payload.eventType) {
                        case 'INSERT':
                        case 'UPDATE':
                            setSubscription(payload.new as Subscription);
                            break;

                        case 'DELETE':
                            setSubscription(null);
                            break;
                    }
                },
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user?.id, setSubscription]);
}
