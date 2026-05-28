'use client';

import { Button } from '@/components/ui/button';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import DialogCore from '../dialog-core';
import P from '../typography/P';

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
                    <Button type="submit">Go Unlimited</Button>
                </Link>
            }
            content={
                <div className="flex flex-col gap-4">
                    <P className="">
                        Nice work! your portfolio is growing and youve reached your{' '}
                        <span className="font-semibold">3 free project limit</span>.
                    </P>
                    <P className="font-semibold">Upgrade to unlimited projects and keep showcasing your work to future clients.</P>
                </div>
            }
            title="Max projects reached"
            open={open}
            onOpenChange={onOpenChange}
        />
    );
}
