import { ChildrenProp } from '@/lib/types/common';
import Link from 'next/link';

export default function AddProjectButtonLink({ children }: ChildrenProp) {
    return (
        <Link href="/dashboard/projects?open=true" passHref>
            {children}
        </Link>
    );
}
