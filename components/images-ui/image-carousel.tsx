import { CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Suspense } from 'react';
import ProjectImageSkeleton from '../skeleton-ui/project-image-skeleton';
import type { ClassNameProp } from '@/lib/types/common';
import { cn } from '@/lib/utils/classes-merge';

type ImageCarouselProps = {
    images_urls: string[];
    title?: string;
} & ClassNameProp;

export default function ImageCarousel({ images_urls, title, className }: ImageCarouselProps) {
    return (
        <CarouselContent>
            {images_urls.map((image) => {
                return (
                    <CarouselItem key={image}>
                        <Suspense fallback={<ProjectImageSkeleton />}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={image ?? '/placeholder.svg'}
                                alt={title ?? 'Project image'}
                                className={cn('relative z-90 aspect-video h-40 w-full object-cover', className)}
                            />
                        </Suspense>
                    </CarouselItem>
                );
            })}
        </CarouselContent>
    );
}
