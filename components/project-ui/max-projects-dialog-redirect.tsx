'use client';

import { Button } from '@/components/ui/button';
import { IconCircle, IconPlus, IconX } from '@tabler/icons-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import DialogCore from '../dialog-core';
import P from '../typography/P';
import H4 from '../typography/H4';
import StyledIcon from '../styled-icon';
import Link from 'next/link';

export default function MaxProjectsDialogRedirect() {
    const searchParams = useSearchParams();
    const isOpen = searchParams.get('open') === 'true';
    const router = useRouter();
    const pathname = usePathname();
    const [open, setOpen] = useState(isOpen);

    const onOpenChange = (open: boolean) => {
        setOpen(open);
        if (isOpen && !open) {
            router.replace(pathname);
        }
    };

    return (
        <DialogCore
            trigger={
                <Button variant="default">
                    <IconPlus /> Add Project
                </Button>
            }
            action={
                <Link href="/payment/subscription-plan">
                    <Button type="submit">Upgrade Now</Button>
                </Link>
            }
            content={
                <div className="flex flex-col gap-4">
                    <P className="text-destructive">You have reached the maximum number of projects allowed on the free plan.</P>
                    <P className="font-semibold">Upgrade your plan to add unlimited projects.</P>
                </div>
            }
            title="Max projects reached"
            open={open}
            onOpenChange={onOpenChange}
        />
    );
}
