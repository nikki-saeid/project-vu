import P from '@/components/typography/P';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { IconSend } from '@tabler/icons-react';
import Link from 'next/link';

export default function ContactBagde() {
    return (
        <Badge variant="outline">
            <P className="">
                <strong className="font-semibold text-center text-md">support@projectvu.com.au</strong>
            </P>
            <Link href="mailto:support@projectvu.com.au">
                <Button variant="outline" size="icon-xs" className="rounded-full">
                    <IconSend />
                </Button>
            </Link>
        </Badge>
    );
}
