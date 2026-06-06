import { CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Suspense } from 'react';
import ProjectImageSkeleton from '../skeleton-ui/project-image-skeleton';
import type { ClassNameProp } from '@/lib/types/common';
import { cn } from '@/lib/utils/classes-merge';
import { VideoPlayer } from '../shadix-ui/components/video-player/video-player';
import Link from 'next/link';

type ImageCarouselProps = {
    images_urls: string[];
    title?: string;
    link?: string;
    onOpen?: (index: number) => void;
} & ClassNameProp;

export default function ImageCarousel({ images_urls, title, className, link, onOpen }: ImageCarouselProps) {
    return (
        <CarouselContent>
            {images_urls.map((image, index) => {
                return (
                    <CarouselItem key={image}>
                        <Suspense fallback={<ProjectImageSkeleton />}>
                            {image.includes('video') ? (
                                <div className={cn('relative z-1  h-40', className)}>
                                    <VideoPlayer src={image} isThumbnail cover className="rounded-none" />
                                </div>
                            ) : (
                                <Link href={link ?? ''}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={image ?? '/placeholder.svg'}
                                        alt={title ?? 'Project image'}
                                        className={cn('relative z-1 aspect-video h-40 w-full object-cover', className)}
                                        onClick={() => onOpen?.(index)}
                                    />
                                </Link>
                            )}
                        </Suspense>
                    </CarouselItem>
                );
            })}
        </CarouselContent>
    );
}
