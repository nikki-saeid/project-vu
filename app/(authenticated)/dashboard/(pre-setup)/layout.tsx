import Container from '@/components/ui/container';
import { getUserProfile } from '@/lib/api-fetcher/user-profile';
import type { ChildrenProp } from '@/types/common';
import { redirect } from 'next/navigation';

export default async function layout({ children }: ChildrenProp) {
    const profile = await getUserProfile();

    if (profile && profile.is_onboarded) {
        redirect('/dashboard/overview');
    }
    return <Container>{children}</Container>;
}
