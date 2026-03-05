import IsAuthLayer from '@/components/security-layers/is-auth-layer';
import type { ChildrenProp } from '@/lib/types/common';

export default async function layout({ children }: ChildrenProp) {
    return (
        <IsAuthLayer>
            <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-lg">{children}</div>
            </div>
        </IsAuthLayer>
    );
}
