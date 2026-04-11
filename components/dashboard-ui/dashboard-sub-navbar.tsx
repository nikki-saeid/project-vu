import { ChildrenProp } from '@/lib/types/common';
import BackButton from '../back-button';

type DashboardSubNavbarProps = { noBack?: boolean } & ChildrenProp;

export default function DashboardSubNavbar({ children, noBack }: DashboardSubNavbarProps) {
    return (
        <header className="bg-background sticky top-0 z-20 border-b">
            <div className="pr-2">
                <div className="flex items-center py-2 pr-2 pl-3 justify-between">
                    {!noBack && <BackButton />}
                    {children}
                </div>
            </div>
        </header>
    );
}
