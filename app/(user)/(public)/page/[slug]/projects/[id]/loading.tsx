'use client';

import Loader from '@/components/loader';
import { useEffect } from 'react';

export default function Loading() {
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <div className="fixed inset-0 z-1000 bg-background">
            <Loader />
        </div>
    );
}
