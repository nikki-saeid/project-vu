import IsNewUserLayer from '@/components/security-layers/user-layers/is-new-user-layer';
import type { ChildrenProp } from '@/types/common';

export default async function layout({ children }: ChildrenProp) {
    return <IsNewUserLayer>{children}</IsNewUserLayer>;
}
