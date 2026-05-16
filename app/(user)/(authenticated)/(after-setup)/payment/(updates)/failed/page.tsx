import CardLayouts from '@/components/card-layouts';
import ContactBagde from '@/components/contact-bagde';
import StyledIcon from '@/components/styled-icon';
import { Button } from '@/components/ui/button';
import { IconX } from '@tabler/icons-react';
import Link from 'next/link';

export default function Page() {
    return (
        <CardLayouts
            action={
                <Link href="/">
                    <Button size="sm" type="submit">
                        Back home
                    </Button>
                </Link>
            }
            title={
                <div className="flex items-center gap-2">
                    <StyledIcon IconProps={{ className: 'text-red-500' }} className="bg-red-500/5" Icon={IconX} />
                    <span>Subscription failed</span>
                </div>
            }
            description="Your subscription could not be processed. Please contact support."
        >
            <ContactBagde />
        </CardLayouts>
    );
}
