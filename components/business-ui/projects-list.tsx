import ProjectCard from './project-card';

export default function ProjectsList() {
    return (
        <div className="grid  md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 md:gap-6">
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
        </div>
    );
}
