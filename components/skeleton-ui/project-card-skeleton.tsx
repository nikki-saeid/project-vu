import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import ProjectImageSkeleton from './project-image-skeleton';

export default function ProjectCardSkeleton() {
    return (
        <Card className="relative pt-0 border-0 overflow-hidden">
            <div className="absolute top-2 right-2 z-50">
                <ProjectImageSkeleton />
            </div>
            <Skeleton className="aspect-video w-full rounded-none" />

            <CardHeader>
                <CardTitle>
                    <Skeleton className="h-5 w-3/4" />
                </CardTitle>
                <CardDescription>
                    <Skeleton className="h-4 w-full" />
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <CardDescription className="flex items-center gap-1 text-xs">
                    <Skeleton className="size-4 shrink-0 rounded" />
                    <Skeleton className="h-3 w-24" />
                </CardDescription>
            </CardFooter>
        </Card>
    );
}
