import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ProjectCardProps } from '@/lib/types/features';
import { IconMapPin } from '@tabler/icons-react';
import Image from 'next/image';

export default function ProjectCard({ action, title, description, project_image = [], address }: ProjectCardProps) {
    return (
        <Card className="relative pt-0 border-0 overflow-hidden">
            {action && <div className="absolute top-2 right-2 z-54">{action}</div>}
            {project_image.length > 0 ? (
                <Carousel className="relative">
                    {project_image.length > 1 && (
                        <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 z-50 flex items-center justify-between w-[calc(100%-140px)]">
                            <CarouselPrevious />
                            <CarouselNext />
                        </div>
                    )}

                    <CarouselContent>
                        {project_image.map((image) => (
                            <CarouselItem key={image.image_url}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={image.image_url ?? '/placeholder.svg'}
                                    width={180}
                                    height={100}
                                    alt="Event cover"
                                    className="relative z-90 aspect-video w-full object-cover"
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            ) : (
                <Image
                    width={180}
                    height={100}
                    src={'/placeholder.svg'}
                    alt="Event cover"
                    className="relative z-20 aspect-video w-full object-cover"
                />
            )}

            <CardHeader>
                {/* <CardAction>
                    <Badge variant="secondary">{type}</Badge>
                </CardAction> */}
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                    {description && description.length > 30 ? description.substring(0, 30) + '...' : description}
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <CardDescription className="flex items-center gap-1 text-xs">
                    <IconMapPin className="size-4" />
                    {address}
                </CardDescription>
            </CardFooter>
        </Card>
    );
}
