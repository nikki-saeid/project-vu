import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IconLayoutList, IconMap2 } from '@tabler/icons-react';
import ProjectsList from './projects-list';
import ProjectsMap from './projects-map';

export default function ProjectsTabs() {
    return (
        <Tabs defaultValue="map">
            <TabsList className="mb-3 w-full">
                <TabsTrigger value="map" >
                    <IconMap2 />
                    Projects map
                </TabsTrigger>
                <TabsTrigger value="list">
                    <IconLayoutList />
                    Projects list
                </TabsTrigger>
            </TabsList>
            <TabsContent forceMount value="map" className="data-[state=inactive]:hidden">
                <ProjectsMap />
            </TabsContent>
            <TabsContent forceMount value="list" className="data-[state=inactive]:hidden">
                <ProjectsList />
            </TabsContent>
        </Tabs>
    );
}
