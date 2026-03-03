import IsUserLayer from '@/components/security-layers/is-user-layer';
import type { ChildrenProp } from '@/types/common';

export default async function UserLayout({ children }: ChildrenProp) {
    return <IsUserLayer>{children}</IsUserLayer>;
}
