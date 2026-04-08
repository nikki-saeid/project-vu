import PublicProviderInner from '@/components/providers-inner/public-provider-inner';
import ProjectDetailsPageContent from './_components/project-details-page-content';

type ProjectsPageProps = {
    params: Promise<{ id: string; slug: string }>;
};

export default async function Page({ params }: ProjectsPageProps) {
    const { id, slug } = await params;

    return (
        <PublicProviderInner slug={slug}>
            <ProjectDetailsPageContent id={id} />;
        </PublicProviderInner>
    );
}
