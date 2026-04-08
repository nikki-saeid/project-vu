import ProjectDetailsPageContent from './_components/project-details-page-content';

type ProjectsPageProps = {
    params: Promise<{ id: string }>;
};

export default async function Page({ params }: ProjectsPageProps) {
    const { id } = await params;

    return <ProjectDetailsPageContent id={id} />;
}
