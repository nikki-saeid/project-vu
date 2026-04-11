import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IconLayoutList, IconMap2 } from '@tabler/icons-react';
import ProjectsList from './projects-list';
import ProjectsMap from './projects-map';
import { ProjectWithLatLng } from '@/lib/types/api';
import { Button } from '../ui/button';

type ProjectsTabsProps = {
    projects: ProjectWithLatLng[];
    isPublic: boolean;
    slug: string;
};

export default function ProjectsTabs({ projects, isPublic, slug }: ProjectsTabsProps) {
    return (
        <Tabs defaultValue="map">
            <TabsList className="mb-3 w-full">
                <TabsTrigger value="map" id="map" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <IconMap2 />
                    Projects map
                </TabsTrigger>
                <TabsTrigger value="list" id="list" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <IconLayoutList />
                    Projects list
                </TabsTrigger>
            </TabsList>
            <TabsContent forceMount value="map" className="data-[state=inactive]:hidden">
                <ProjectsMap embed={false} projects={projects} isPublic={isPublic} slug={slug} />
            </TabsContent>
            <TabsContent forceMount value="list" className="data-[state=inactive]:hidden">
                <ProjectsList projects={projects} isPublic={isPublic} slug={slug} />
            </TabsContent>
        </Tabs>
    );
}
