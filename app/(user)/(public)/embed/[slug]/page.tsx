import PublicProviderInner from '@/components/providers-inner/public-provider-inner';
import type { ChildrenProp } from '@/lib/types/common';
import MainPage from './_components/main-page';

export function headers() {
    return {
        'X-Frame-Options': 'ALLOWALL',
        'Content-Security-Policy': 'frame-ancestors *',
        'Referrer-Policy': 'no-referrer',
        'X-XSS-Protection': '0',
        'X-Content-Type-Options': 'nosniff',
    };
}

export default async function EmbedMapPage({ params }: ChildrenProp & { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    return (
        <PublicProviderInner slug={slug}>
            <MainPage />
        </PublicProviderInner>
    );
}
