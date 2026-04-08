import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { IconMail, IconPhone } from '@tabler/icons-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Business } from '@/lib/types/db';
import { ClassNameProp } from '@/lib/types/common';
import { cn } from '@/lib/utils/classes-merge';

type BusinessContactProps = Pick<Business, 'phone' | 'email'> & ClassNameProp;

export default function BusinessContact({ phone, email, className }: BusinessContactProps) {
    return (
        <div className={cn('grid md:grid-cols-2 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4', className)}>
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
