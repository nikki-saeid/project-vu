import PublicProviderInner from '@/components/providers-inner/public-provider-inner';
import ProjectDetailsPageContent from './_components/project-details-page-content';
import SubNavbar from '@/components/sub-navbar';
import PublicSubNavbar from '@/components/public-pages-ui/public-sub-navbar';

type ProjectsPageProps = {
    params: Promise<{ id: string; slug: string }>;
};

export default async function Page({ params }: ProjectsPageProps) {
    const { id, slug } = await params;

    return (
        <PublicProviderInner slug={slug}>
            <PublicSubNavbar url={`/page/${slug}`}></PublicSubNavbar>
            <ProjectDetailsPageContent id={id} />
        </PublicProviderInner>
    );
}
