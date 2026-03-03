import IsUserLayer from '@/components/security-layers/user-layers/is-user-layer';
import type { ChildrenProp } from '@/types/common';

export default async function UserLayout({ children }: ChildrenProp) {
    return <IsUserLayer>{children}</IsUserLayer>;
}
