import { IconMail, IconPhone } from '@tabler/icons-react';
import { Button } from '../ui/button';
import { BusinessContactProps } from '@/lib/types/features';
import Link from 'next/link';

export default function BusinessContact({ phone, email }: BusinessContactProps) {
    return (
        <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
            <Link href={`tel:${phone}`}>
                <Button className="w-full">
                    <IconPhone />
                    Phone
                </Button>
            </Link>
            <Link href={`mailto:${email}`}>
                <Button variant="outline" className="w-full">
                    <IconMail />
                    Email
                </Button>
            </Link>
        </div>
    );
}
