import ProjectsMap from '@/components/project-ui/projects-map';
import type { ChildrenProp } from '@/lib/types/common';
import PublicProviderInner from '../../_components/public-provider-inner';

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
        <PublicProviderInner slug={slug} user_view="false">
            <div className="min-h-screen w-full">
                <ProjectsMap embed />
            </div>
        </PublicProviderInner>
    );
}
