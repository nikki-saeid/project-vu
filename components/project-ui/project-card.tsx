import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DATE_FORMATS } from '@/lib/constants/date-formats';
import type { ProjectCardProps } from '@/lib/types/forms';
import { IconCalendar, IconCurrencyDollarAustralian, IconMapPin, IconRulerMeasure } from '@tabler/icons-react';
import { format } from 'date-fns';
import Link from 'next/link';
import ImageCarousel from '../images-ui/image-carousel';
import StyledIconTitle from '../styled-icon-title';
import { Carousel, CarouselNext, CarouselPrevious } from '../ui/carousel';
import { getProjectCostLabel } from '@/lib/helpers/other';
import { cn } from '@/lib/utils/classes-merge';
import H4 from '../typography/H4';
import P from '../typography/P';

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
    cost,
    className,
    inMap,
}: ProjectCardProps) {
    const link = isPublic ? `/page/${slug}/projects/${id}` : `/dashboard/projects/${id}`;

    return (
        <div className={cn('relative h-full', className)}>
            <Carousel className="h-full">
                {action && <div className="absolute top-2 right-2 z-10">{action}</div>}
                {images_urls && images_urls.length > 1 && (
                    <>
                        <CarouselPrevious
                            size="icon-xs"
                            className={cn(
                                'absolute left-2 -translate-y-1/2 z-10',

                                inMap ? '' : 'sm:top-25 top-30',
                            )}
                            style={{ top: inMap ? '80px' : '' }}
                        />
                        <CarouselNext
                            size="icon-xs"
                            className={cn(
                                'absolute right-2 -translate-y-1/2 z-10',

                                inMap ? '' : 'sm:top-25 top-30',
                            )}
                            style={{ top: inMap ? '80px' : '' }}
                        />
                    </>
                )}
                <Card className="pt-0 shadow-none overflow-hidden h-full">
                    <ImageCarousel
                        link={link}
                        className={cn(inMap ? 'h-40' : 'sm:h-50 h-60')}
                        images_urls={images_urls ?? []}
                        title={title}
                    />

                    <Link href={link}>
                        <CardContent className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <H4 className="text-md leading-none font-semibold">
                                    {title && title.length > 50 ? title.substring(0, 50) + '...' : title}
                                </H4>
                                <P className="text-muted-foreground text-sm">
                                    {description && description.length > 50 ? description.substring(0, 50) + '...' : description}
                                </P>
                            </div>
                            <div className="flex flex-col gap-2">
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

                                {cost && (
                                    <StyledIconTitle
                                        StyledIconProps={{
                                            Icon: IconCurrencyDollarAustralian,
                                            className: 'size-5 bg-primary/5',
                                            IconProps: { className: 'size-3 text-primary' },
                                        }}
                                        label={getProjectCostLabel(cost)}
                                    />
                                )}
                            </div>
                        </CardContent>
                    </Link>
                </Card>
            </Carousel>
        </div>
    );
}
