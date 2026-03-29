import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IconLayoutList, IconMap2 } from '@tabler/icons-react';
import ProjectsList from './projects-list';
import ProjectsMap from './projects-map';
import { ProjectWithLatLng } from '@/lib/types/api';

type ProjectsTabsProps = {
    projects: ProjectWithLatLng[];
    isPublic: boolean;
};

export default function ProjectsTabs({ projects, isPublic }: ProjectsTabsProps) {
    return (
        <Tabs defaultValue="map">
            <TabsList className="mb-3 w-full">
                <TabsTrigger value="map">
                    <IconMap2 />
                    Projects map
                </TabsTrigger>
                <TabsTrigger value="list">
                    <IconLayoutList />
                    Projects list
                </TabsTrigger>
            </TabsList>
            <TabsContent forceMount value="map" className="data-[state=inactive]:hidden">
                <ProjectsMap embed={false} projects={projects} isPublic={isPublic} />
            </TabsContent>
            <TabsContent forceMount value="list" className="data-[state=inactive]:hidden">
                <ProjectsList projects={projects} isPublic={isPublic} />
            </TabsContent>
        </Tabs>
    );
}
