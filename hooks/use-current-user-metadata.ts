import { useEffect, useState } from 'react';

import { createClient } from '@/lib/supabase/client';
import type { UserMetadata } from '@supabase/supabase-js';

const useCurrentUserMetadata = () => {
    const [metadata, setMetadata] = useState<UserMetadata | null>(null);

    useEffect(() => {
        const fetchUserMetadata = async () => {
            const { data, error } = await createClient().auth.getSession();
            if (error) {
                console.error(error);
            }

            setMetadata(data.session?.user.user_metadata ?? null);
        };
        fetchUserMetadata();
    }, []);

    return metadata;
};

export default useCurrentUserMetadata;
