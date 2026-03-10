import IsUserLayer from '@/components/security-layers/is-user-layer';
import type { ChildrenProp } from '@/lib/types/common';
import UserProviderInner from './_components/user-provider-inner';
import PublicProviderInner from './_components/public-provider-inner';
import ProfileProviderInner from './_components/profile-provider-inner';

export default async function UserLayout({ children }: ChildrenProp) {
    return (
        <IsUserLayer>
            <UserProviderInner>
                <ProfileProviderInner>
                    <PublicProviderInner>{children}</PublicProviderInner>
                </ProfileProviderInner>
            </UserProviderInner>
        </IsUserLayer>
    );
}
