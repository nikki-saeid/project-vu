import { ChildrenProp } from '@/lib/types/common';
import Container from '../ui/container';
import Link from 'next/link';
import { Button } from '../ui/button';
import { IconArrowLeft } from '@tabler/icons-react';

type DashboardSubNavbarProps = ChildrenProp & { url: string };

export default function PublicSubNavbar({ children, url }: DashboardSubNavbarProps) {
    return (
        <div className="bg-background sticky top-0 z-50 border-b">
            <Container>
                <div className="flex items-center py-4 justify-between">
                    <Link href={url}>
                        <Button variant="outline" size="icon-sm" className="rounded-full">
                            <IconArrowLeft />
                        </Button>
                    </Link>
                    {children}
                </div>
            </Container>
        </div>
    );
}
