import { ChildrenProp } from '@/lib/types/common';
import Link from 'next/link';
import { Button } from './ui/button';
import { IconArrowLeft } from '@tabler/icons-react';

type DashboardSubNavbarProps = { noBack?: boolean } & ChildrenProp;

export default function SubNavbar({ children, noBack }: DashboardSubNavbarProps) {
    return (
        <header className="bg-background sticky top-0 z-20 border-b">
            <div className="pr-2">
                <div className="flex items-center py-2 pr-2 pl-3 justify-between">
                    {!noBack && (
                        <Link href="/dashboard/live-page">
                            <Button variant="outline" size="icon-sm" className="rounded-full">
                                <IconArrowLeft />
                            </Button>
                        </Link>
                    )}
                    {children}
                </div>
            </div>
        </header>
    );
}
