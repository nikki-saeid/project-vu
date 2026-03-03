import IsAuthenticatedLayer from '@/components/security-layers/is-authenticated-layer';
import { ChildrenProp } from '@/types/common';

export default function layout({ children }: ChildrenProp) {
    return <IsAuthenticatedLayer>{children}</IsAuthenticatedLayer>;
}
