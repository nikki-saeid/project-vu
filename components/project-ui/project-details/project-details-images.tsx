'use client';

import { generateGallerySections } from '@/lib/helpers/gallery-sections';
import { ProjectWithLatLng } from '@/lib/types/api';
import { useState } from 'react';
import Gallery from '../../images-ui/gallery';
import ImageCarousel from '../../images-ui/image-carousel';
import ImagesDialog from '../../images-ui/images-dialog';
import { Carousel, CarouselNext, CarouselPrevious } from '../../ui/carousel';

type ProjectDetailsPageProps = Pick<ProjectWithLatLng, 'images_urls' | 'title'>;

export default function ProjectDetailsImages({ images_urls, title }: ProjectDetailsPageProps) {
    const [open, setOpen] = useState(false);
    const gallerySections = generateGallerySections(images_urls ?? [], title);

    return (
        <div>
            <div className="lg:block hidden cursor-pointer" onClick={() => setOpen(true)}>
                <Gallery sections={gallerySections} />
            </div>
            <div className="lg:hidden block rounded-lg overflow-hidden">
                <Carousel>
                    {images_urls && images_urls.length > 1 && (
                        <>
                            <CarouselPrevious size="icon-sm" className="absolute top-50 left-2 -translate-y-1/2 z-54" />
                            <CarouselNext size="icon-sm" className="absolute top-50 right-2 -translate-y-1/2 z-54" />
                        </>
                    )}
                    <div className="cursor-pointer" onClick={() => setOpen(true)}>
                        <ImageCarousel className="h-100" images_urls={images_urls ?? []} title={title} />
                    </div>
                </Carousel>
            </div>

            <ImagesDialog open={open} setOpen={setOpen} images_urls={images_urls ?? []} title={title} />
        </div>
    );
}
