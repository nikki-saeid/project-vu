'use client';
import { usePublic } from '@/lib/contexts/public-context';
import { IconMail, IconPhone } from '@tabler/icons-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export default function BusinessContact() {
    const { business } = usePublic();
    const { phone, email } = business ?? { phone: null, email: null };

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link href={`tel:${phone}`}>
                        <Button className="w-full">
                            <IconPhone />
                            Phone
                        </Button>
                    </Link>
                </TooltipTrigger>
                <TooltipContent>{phone}</TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger asChild>
                    <Link href={`mailto:${email}`}>
                        <Button variant="outline" className="w-full">
                            <IconMail />
                            Email
                        </Button>
                    </Link>
                </TooltipTrigger>
                <TooltipContent>{email}</TooltipContent>
            </Tooltip>
        </div>
    );
}
