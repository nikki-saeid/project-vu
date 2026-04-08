import { cn } from '@/lib/utils/classes-merge';

type GalleryImage = {
    src: string;
    alt: string;
    className?: string;
};

type GallerySection = {
    className?: string;
    images: GalleryImage[];
};

export default function Gallery({ sections }: { sections: GallerySection[] }) {
    return (
        <div className="flex gap-4 h-100">
            {sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className={cn('flex-1', section.className ?? 'flex flex-col gap-4')}>
                    {section.images.map((image, imageIndex) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img key={imageIndex} src={image.src} alt={image.alt} className="rounded-lg h-full w-full object-cover" />
                    ))}
                </div>
            ))}
        </div>
    );
}
