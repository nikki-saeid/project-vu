'use client';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { useDashboard } from '@/lib/contexts/dashboard-context';
import { getLiveHref, getLiveUrl } from '@/lib/helpers/other';
import Link from 'next/link';
import { toast } from 'sonner';

export default function ShareButtons() {
    const { business } = useDashboard();
    const livePageHref = getLiveHref(business?.slug);
    const handleCopyLink = async () => {
        navigator.clipboard.writeText(getLiveUrl(business?.slug));
        toast.success('Link copied successfully');
    };

    return (
        <ButtonGroup>
            <Button asChild disabled={!livePageHref} variant="outline" size="sm">
                <Link
                    href={livePageHref ?? ''}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex cursor-pointer items-center gap-2"
                >
                    Preview
                </Link>
            </Button>
            <Button disabled={!livePageHref} variant="outline" size="sm" onClick={handleCopyLink}>
                Copy link
            </Button>
        </ButtonGroup>
    );
}
