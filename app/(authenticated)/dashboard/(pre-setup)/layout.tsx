import type { ChildrenProp } from '@/types/common';

export default async function layout({ children }: ChildrenProp) {
    return <div>{children}</div>;
}
