import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DATE_FORMATS } from '@/lib/constants/date-formats';
import type { ProjectCardProps } from '@/lib/types/forms';
import { IconCalendar, IconMapPin, IconRulerMeasure } from '@tabler/icons-react';
import { format } from 'date-fns';
import Link from 'next/link';
import ImageCarousel from '../images-ui/image-carousel';
import StyledIconTitle from '../styled-icon-title';
import { Carousel, CarouselNext, CarouselPrevious } from '../ui/carousel';

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
                            <StyledIconTitle
                                StyledIconProps={{
                                    Icon: IconMapPin,
                                    className: 'size-5 bg-primary/5',
                                    IconProps: { className: 'size-3 text-primary' },
                                }}
                                label={address ?? ''}
                            />
                            {made_at && (
                                <StyledIconTitle
                                    StyledIconProps={{
                                        Icon: IconCalendar,
                                        className: 'size-5 bg-primary/5',
                                        IconProps: { className: 'size-3 text-primary' },
                                    }}
                                    label={format(new Date(made_at), DATE_FORMATS.year)}
                                />
                            )}

                            {size && (
                                <StyledIconTitle
                                    StyledIconProps={{
                                        Icon: IconRulerMeasure,
                                        className: 'size-5 bg-primary/5',
                                        IconProps: { className: 'size-3 text-primary' },
                                    }}
                                    label={size + ' sqm'}
                                />
                            )}
                        </CardContent>
                    </Card>
                </Link>
            </Carousel>
        </div>
    );
}
