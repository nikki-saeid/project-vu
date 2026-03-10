import { getUserProfile } from '@/lib/api-fetcher/user/user-profile';
import { ProfileProvider } from '@/lib/providers/profile-provider';
import type { ChildrenProp } from '@/lib/types/common';

export default async function ProfileProviderInner({ children }: ChildrenProp) {
    const profile = await getUserProfile();

    return <ProfileProvider initialProfile={profile}>{children}</ProfileProvider>;
}
