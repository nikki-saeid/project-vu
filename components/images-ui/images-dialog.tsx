import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Suspense } from 'react';
import ProjectImageSkeleton from '../skeleton-ui/project-image-skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

type ImagesDialogProps = {
    images_urls: string[];
    title?: string;
    open: boolean;
    setOpen: (open: boolean) => void;
};

export default function ImagesDialog({ images_urls, title, open, setOpen }: ImagesDialogProps) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent showCloseButton={true} className="h-[calc(100vh-2rem)] min-w-[calc(100vw-2rem)]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="relative">
                    <Carousel>
                        <CarouselPrevious size="icon-sm" className="absolute  top-1/2  -translate-y-1/2 left-2  z-54" />
                        <CarouselNext size="icon-sm" className="absolute top-1/2 right-2 -translate-y-1/2 z-54" />
                        <CarouselContent>
                            {images_urls.map((image) => {
                                return (
                                    <CarouselItem className="flex items-center justify-center" key={image}>
                                        <Suspense fallback={<ProjectImageSkeleton />}>
                                            <div className="h-[80vh] w-fit rounded-lg overflow-hidden">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={image ?? '/placeholder.svg'}
                                                    alt={title ?? 'Project image'}
                                                    className="z-90 h-full object-contain"
                                                />
                                            </div>
                                        </Suspense>
                                    </CarouselItem>
                                );
                            })}
                        </CarouselContent>
                    </Carousel>
                </div>
            </DialogContent>
        </Dialog>
    );
}
