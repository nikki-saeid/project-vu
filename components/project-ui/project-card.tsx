import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { ProjectCardProps } from '@/lib/types/forms';
import { IconCalendar, IconMapPin, IconRulerMeasure } from '@tabler/icons-react';
import Link from 'next/link';
import ImageCarousel from '../images-ui/image-carousel';
import { Carousel, CarouselNext, CarouselPrevious } from '../ui/carousel';
import IconTitle from '../icon-title';
import { format } from 'date-fns';
import { DATE_FORMATS } from '@/lib/constants/date-formats';

export default function ProjectCard({
    slug,
    action,
    title,
    description,
    images_urls = [],
    address,
    id,
    isPublic,
    made_at,
    size,
}: ProjectCardProps) {
    return (
        <div className="relative h-full">
            <Carousel className="h-full">
                {action && <div className="absolute top-2 right-2 z-10">{action}</div>}
                {images_urls && images_urls.length > 1 && (
                    <>
                        <CarouselPrevious size="icon-xs" className="absolute sm:top-25 top-30 left-2 -translate-y-1/2 z-10" />
                        <CarouselNext size="icon-xs" className="absolute sm:top-25 top-30 right-2 -translate-y-1/2 z-10" />
                    </>
                )}
                <Link href={isPublic ? `/page/${slug}/projects/${id}` : `/dashboard/projects/${id}`}>
                    <Card className="pt-0 shadow-none overflow-hidden h-full">
                        <ImageCarousel className="sm:h-50 h-60" images_urls={images_urls ?? []} title={title} />

                        <CardHeader>
                            <CardTitle>{title}</CardTitle>
                            <CardDescription>
                                {description && description.length > 50 ? description.substring(0, 50) + '...' : description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2">
                            <IconTitle Icon={IconMapPin} title={address ?? ''} />
                            {made_at && <IconTitle Icon={IconCalendar} title={format(new Date(made_at), DATE_FORMATS.year)} />}
                            {size && <IconTitle Icon={IconRulerMeasure} title={size + ' sqm'} />}
                        </CardContent>
                    </Card>
                </Link>
            </Carousel>
        </div>
    );
}
