import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import type { ProjectCardProps } from '@/lib/types/forms';
import { IconMapPin } from '@tabler/icons-react';
import Image from 'next/image';
import { Suspense } from 'react';
import ProjectImageSkeleton from '../skeleton-ui/project-image-skeleton';

export default function ProjectCard({ action, title, description, project_image = [], address }: ProjectCardProps) {
    return (
        <Card className="relative pt-0 border-0 overflow-hidden">
            {action && <div className="absolute top-2 right-2 z-54">{action}</div>}
            {project_image.length > 0 ? (
                <Carousel className="relative">
                    {project_image.length > 1 && (
                        <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 z-50 flex items-center justify-between w-[calc(100%-115px)]">
                            <CarouselPrevious size="icon-xs" />
                            <CarouselNext size="icon-xs" />
                        </div>
                    )}

                    <CarouselContent>
                        {project_image.map((image) => {
                            return (
                                <CarouselItem key={image.id}>
                                    <Suspense fallback={<ProjectImageSkeleton />}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={image.image_url ?? '/placeholder.svg'}
                                            width={180}
                                            height={100}
                                            alt={title ?? 'Project image'}
                                            className="relative z-90 aspect-video w-full object-cover"
                                        />
                                    </Suspense>
                                </CarouselItem>
                            );
                        })}
                    </CarouselContent>
                </Carousel>
            ) : (
                <Image
                    width={180}
                    height={100}
                    src={'/placeholder.svg'}
                    alt={title ?? 'Project image'}
                    className="relative z-20 aspect-video w-full object-cover"
                />
            )}

            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                    {description && description.length > 50 ? description.substring(0, 50) + '...' : description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <CardDescription className="flex items-center gap-1 text-xs">
                    <div>
                        <IconMapPin className="text-secondary w-3.5" />
                    </div>
                    <span>{address}</span>
                </CardDescription>
            </CardContent>
            {/* <CardFooter>
                <Button variant="outline" className="rounded-full">
                    View Project
                </Button>
            </CardFooter> */}
        </Card>
    );
}
