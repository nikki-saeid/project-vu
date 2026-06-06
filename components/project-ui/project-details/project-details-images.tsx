'use client';

import { generateGallerySections } from '@/lib/helpers/gallery-sections';
import { ProjectWithLatLng } from '@/lib/types/api';
import { useState } from 'react';
import Gallery from '../../images-ui/gallery';
import ImageCarousel from '../../images-ui/image-carousel';
import ImagesDialog from '../../images-ui/images-dialog';
import { Carousel, CarouselNext, CarouselPrevious } from '../../ui/carousel';
import { Button } from '@/components/ui/button';
import { IconArrowsMaximize } from '@tabler/icons-react';

type ProjectDetailsPageProps = Pick<ProjectWithLatLng, 'images_urls' | 'title'>;

export default function ProjectDetailsImages({ images_urls, title }: ProjectDetailsPageProps) {
    const [open, setOpen] = useState(false);
    const gallerySections = generateGallerySections(images_urls ?? [], title);
    const [startIndex, setStartIndex] = useState(4);

    const handleOpen = (index: number) => {
        setStartIndex(index);
        setOpen(true);
    };

    return (
        <div className="relative">
            <div className="absolute right-3 top-3 z-50">
                <Button size="icon-sm" variant="outline" className="rounded-full" onClick={() => handleOpen(0)}>
                    <IconArrowsMaximize />
                </Button>
            </div>
            <div className="lg:block hidden cursor-pointer">
                <Gallery sections={gallerySections} onOpen={handleOpen} />
            </div>
            <Carousel>
                <div className="lg:hidden block rounded-lg overflow-hidden">
                    {images_urls && images_urls.length > 1 && (
                        <>
                            <CarouselPrevious size="icon-sm" className="absolute top-50 left-2 -translate-y-1/2 z-10" />
                            <CarouselNext size="icon-sm" className="absolute top-50 right-2 -translate-y-1/2 z-10" />
                        </>
                    )}
                    <div className="cursor-pointer">
                        <ImageCarousel onOpen={handleOpen} className="h-100" images_urls={images_urls ?? []} title={title} />
                    </div>
                </div>
            </Carousel>
            <ImagesDialog startIndex={startIndex} open={open} setOpen={setOpen} images_urls={images_urls ?? []} title={title} />
        </div>
    );
}
