import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Suspense } from 'react';
import ProjectImageSkeleton from '../skeleton-ui/project-image-skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { VideoPlayer } from '../shadix-ui/components/video-player/video-player';

type ImagesDialogProps = {
    images_urls: string[];
    title?: string;
    open: boolean;
    setOpen: (open: boolean) => void;
};

export default function ImagesDialog({ images_urls, title, open, setOpen }: ImagesDialogProps) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent showCloseButton className="h-screen min-w-screen max-w-none rounded-none border-0 p-0">
                <DialogHeader className="absolute top-4 left-4 z-50">
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>

                <Carousel className="h-full w-full">
                    <CarouselPrevious size="icon-sm" className="absolute left-4 top-1/2 z-50 -translate-y-1/2" />

                    <CarouselNext size="icon-sm" className="absolute right-4 top-1/2 z-50 -translate-y-1/2" />

                    <CarouselContent className="h-[95vh] mt-10">
                        {images_urls.map((image) => (
                            <CarouselItem key={image} className="flex h-[95vh] items-center justify-center">
                                <Suspense fallback={<ProjectImageSkeleton />}>
                                    <div className="flex h-full w-full items-center justify-center overflow-hidden p-4">
                                        {image.includes('video') ? (
                                            <VideoPlayer src={image} autoPlay className="h-full w-full" height="h-full" />
                                        ) : (
                                            /* eslint-disable-next-line @next/next/no-img-element */
                                            <img
                                                src={image ?? '/placeholder.svg'}
                                                alt={title ?? 'Project image'}
                                                className="max-h-full max-w-full object-contain rounded-lg"
                                            />
                                        )}
                                    </div>
                                </Suspense>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </DialogContent>
        </Dialog>
    );
}
