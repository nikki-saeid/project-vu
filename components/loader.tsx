'use client';

import { useEffect } from 'react';
import { IconCircleFilled } from '@tabler/icons-react';

export default function Loader() {
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <div className="fixed inset-0 z-1000 flex items-center justify-center gap-0.5 bg-background">
            <IconCircleFilled className="size-5 animate-[bounce_0.7s_infinite_0ms]" />
            <IconCircleFilled className="size-5 animate-[bounce_0.7s_infinite_100ms]" />
            <IconCircleFilled className="size-5 animate-[bounce_0.7s_infinite_200ms]" />
        </div>
    );
}
