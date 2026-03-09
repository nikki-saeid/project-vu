import ProjectCardSkeleton from './project-card-skeleton';

export default function ProjectsListSkeleton() {
    return (
        <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <ProjectCardSkeleton key={i} />
            ))}
        </div>
    );
}
