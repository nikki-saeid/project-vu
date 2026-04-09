import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { ProjectCardProps } from '@/lib/types/forms';
import { IconMapPin } from '@tabler/icons-react';
import Link from 'next/link';
import ImageCarousel from '../images-ui/image-carousel';
import { Carousel, CarouselNext, CarouselPrevious } from '../ui/carousel';

export default function ProjectCard({ slug, action, title, description, images_urls = [], address, id, isPublic }: ProjectCardProps) {
    return (
        <Carousel>
            <div className="relative">
                {action && <div className="absolute top-2 right-2 z-10">{action}</div>}
                {images_urls && images_urls.length > 1 && (
                    <>
                        <CarouselPrevious size="icon-xs" className="absolute top-20 left-2 -translate-y-1/2 z-10" />
                        <CarouselNext size="icon-xs" className="absolute top-20 right-2 -translate-y-1/2 z-10" />
                    </>
                )}
                <Link href={isPublic ? `/page/${slug}/projects/${id}` : `/dashboard/projects/${id}`}>
                    <Card className="pt-0 shadow-none overflow-hidden">
                        <ImageCarousel images_urls={images_urls ?? []} title={title} />

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
                    </Card>
                </Link>
            </div>
        </Carousel>
    );
}
