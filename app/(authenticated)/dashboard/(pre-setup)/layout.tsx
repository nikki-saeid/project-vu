import IsUserLayer from '@/components/security-layers/user-layers/is-onboarded-layer';
import type { ChildrenProp } from '@/types/common';

export default async function layout({ children }: ChildrenProp) {
    return <IsUserLayer>{children}</IsUserLayer>;
}
